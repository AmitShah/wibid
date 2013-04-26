'''
Created on Mar 2, 2013

@author: ashah
'''

import pika
import time
import json
import sys

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
    while True:
        data = {'time':0.0}
        sleep = 2
        try:
            unix_time = time.time()
            drift = int(unix_time%sleep)
            time.sleep((2*sleep)-drift)

            data['time'] = unix_time
            channel.basic_publish(exchange='update',\
                                  routing_key='',\
                                  body=json.dumps(data),\
                                  immediate=True)
            print "unixtime:", unix_time
            
        except:
            print "Unexpected error:", sys.exc_info()[0]
            pass
    
    close()