'''
Created on Feb 20, 2013

@author: ashah
'''
from pymysqlreplication import BinLogStreamReader
from pymysqlreplication.row_event import *
import pika
import json


connection = pika.BlockingConnection(pika.ConnectionParameters(
               'localhost'))
channel = connection.channel()
channel.exchange_declare(exchange='update',
                                      #type="direct",
                                      type='fanout')
def close():
    if channel is not None:
        channel.close()
    if connection is not None and connection.is_open:
        connection.close()

if __name__ == '__main__':
    mysql_settings = {'host': 'localhost',\
                      'port': 3306,\
                      'user': 'replication',\
                      'passwd': 'replication_password'}
    stream = BinLogStreamReader(connection_settings = mysql_settings,\
                               only_events = [#'''DeleteRowsEvent,''' 
                                              WriteRowsEvent
                                              #''', UpdateRowsEvent'''
                                              ],\
                               blocking=True)    
    '''    
    for binlogevent in stream:
        print binlogevent.dump()
    
    stream.close()
    '''
    for binlogevent in stream:
        prefix = "%s:%s:" % (binlogevent.schema, binlogevent.table)
        if binlogevent.schema == 'wibid' \
        and binlogevent.table == 'bid':            
            for row in binlogevent.rows:   
                if isinstance(binlogevent,UpdateRowsEvent):
                    vals = row["after_values"]
                elif isinstance(binlogevent,WriteRowsEvent):
                    vals = row["values"]
                elif isinstance(binlogevent,DeleteRowsEvent):
                    pass
                channel.basic_publish(exchange='update',\
                                  routing_key='',\
                                  body=json.dumps(vals),\
                                  immediate=True)
    close()
    stream.close()
    pass