'''
Created on Feb 15, 2013

@author: ashah
'''

'''
Created on Jan 12, 2013

@author: ashah
'''
import tornado
from tornado import ioloop,web, websocket,template,escape,util
import datetime
import time
from pika.adapters.tornado_connection import TornadoConnection
from pika import ConnectionParameters
import json
import os,sys
import database 

'''Utility definition to quickly generate enums'''
def enum(*sequential, **named):
    enums = dict(zip(sequential, range(len(sequential))), **named)
    return type('Enum', (), enums)

'''Currently serving Pika Connection State'''
ConnectionState = enum('INIT','OPEN','CLOSE')


class PikaClient(object):
    # Create a global channel variable to hold our channel object in
    channel = None
    state = None
    def __init__(self, handler,ioloop):
        self.handler  = handler        
        self.ioloop = ioloop
    

    def connect(self):
        #TODO not thread safe... 
        params = ConnectionParameters()       
        self.connection = TornadoConnection(params,self.on_connected)   
        self.state = ConnectionState.INIT 
        
    # Step #2
    def on_connected(self,connection):
        """Called when we are fully connected to RabbitMQ"""
        # Open a channel
        self.state = ConnectionState.OPEN
        if self.state != ConnectionState.CLOSE:
            self.connection.channel(self.on_channel_open)        
        
    # Step #3
    def on_channel_open(self,new_channel):
        """Called when our channel has opened"""
        if self.state != ConnectionState.CLOSE:
            self.channel = new_channel
            self.channel.exchange_declare(exchange='update',
                                      #type="direct",
                                      type='fanout',
                                      #auto_delete=True,
                                      #durable=False,
                                     callback=self.on_exchange_declared)
        else:
            new_channel.close()

    def on_exchange_declared(self, frame):
        if self.state != ConnectionState.CLOSE:
            self.channel.queue_declare(auto_delete=True,\
                                       queue = 'queue-%s'%id(self),\
                                       durable=False,\
                                       exclusive=True,\
                                       callback=self.on_queue_declared)
            
    def on_queue_declared(self,frame):
        if self.state != ConnectionState.CLOSE:
            self.channel.queue_bind(self.on_bind_declared,\
                                    'queue-%s'%id(self),\
                                    'update',\
                                    #routing_key=self.routing_key)
                                    )
            
    def on_bind_declared(self,frame):
        if self.state != ConnectionState.CLOSE:
            """Called when RabbitMQ has told us our Queue has been declared, frame is the response from RabbitMQ"""
            self.channel.basic_consume(self.handle_delivery, queue='queue-%s'%id(self))
            def writenewline():
                try:
                    self.handler.write_message('\r\n')                    
                    self.timer = self.ioloop.add_timeout(datetime.timedelta(0.0002), writenewline)
                except:
                    self.close()
            #self.timer = self.ioloop.add_timeout(datetime.timedelta(0.0002), writenewline)
            
    def handle_delivery(self,channel, method, header, body):
        def write():
            try:
                #self.ioloop.remove_timeout(self.timer)                
                data = body
                self.handler.write_message(data)               
                def writenewline():
                    self.handler.write_message('\r\n')                   
                    self.timer = self.ioloop.add_timeout(datetime.timedelta(0.0002), writenewline)
                #self.timer = self.ioloop.add_timeout(datetime.timedelta(0.0002), writenewline)
            except:
                self.close()
        self.ioloop.add_callback(write)
        
    def on_close(self):
        self.handler.done() 
    
    def close(self):        
        if self.channel is not None and self.channel.is_open:
            self.channel.queue_delete()
        if self.connection is not None and self.connection.is_open:
            self.connection.close()        
        self.state = ConnectionState.CLOSE

class BaseHandler(tornado.web.RequestHandler):        
    def initialize(self,bid_service):
        self.bid_service = bid_service
        pass

    def get_current_user(self):
        '''used for web api administration access'''
        #self.account_service.getUserWithPassword()
        user = self.get_secure_cookie('user')
        if user is not None:            
            user = json.loads(self.get_secure_cookie("user"))
        return user

class LoginHandler(BaseHandler):
    def get(self):
        self.render('login.html')
    def post(self):
        userid = self.get_argument('userid', True)
        password = self.get_argument('password',True)
        #TODO: add auth service here
        user = userid
        if user is not None:            
            self.set_secure_cookie("user",userid)
            self.redirect(self.get_argument("next", u"/"))
        else:
            self.render('login.html',message='Error logging in, please try again.\
            If you continue to experience issues, please contact support')

class LogoutHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.clear_cookie("user")
        self.redirect(u"/login")
        
class MainHandler(BaseHandler):
    @tornado.web.authenticated
    def get(self):
        self.render('home.html')
        
class BidHandler(BaseHandler):
    @tornado.web.authenticated
    @tornado.web.asynchronous
    def get(self): 
        #update bid, notify listeners
        bid = database.Bid()
        bid.userid = self.get_argument('userid')
        bid.productid=1
        bid.timestamp = time.time()
        bid.bid = float(self.get_argument('bid'))
        self.bid_service.save_bid(bid)
        self.finish()
            
class UpdateHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        self.pika = PikaClient(self,tornado.ioloop.IOLoop.instance())
        self.pika.connect()
        
    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def on_close(self):
        self.pika.close()
        print "WebSocket closed"
        
    
        
from tornado.httpserver import HTTPServer
    
if __name__ == "__main__":
    settings = dict(
        template_path=os.path.join(os.path.dirname(__file__), "template"),
        static_path=os.path.join(os.path.dirname(__file__), "static"),
        cookie_secret= 'secret_key',
        login_url='/login'
        )  
    services = dict(
        bid_service = database.BidService(database.wibid_engine)
        )
    application = tornado.web.Application([
    (r"/update", UpdateHandler),
    (r"/bid", BidHandler,services),
    (r"/", MainHandler,services)       
    ], **settings)
    
    sockets = tornado.netutil.bind_sockets(9999)
    #tornado.process.fork_processes(0)
    server = HTTPServer(application)
    server.add_sockets(sockets)
    tornado.ioloop.IOLoop.instance().start()
    
