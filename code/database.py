'''
Created on Jan 23, 2013

@author: ashah
'''
CONNECTION_STRING = 'mysql://wibid:wibid_user@localhost/wibid'
ECHO = True
MAX_ROW_COUNT=5000

import sys
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from functools import wraps

wibid_engine = create_engine(CONNECTION_STRING, echo=ECHO)

class DatabaseService(object):
    def __init__(self, engine):
        self.engine = engine

from sqlalchemy import Column,Float, BigInteger,Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
Base= declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(BigInteger,primary_key=True)
    userid = Column('userId',String)
    salt = Column(String)
    hash = Column(String)
    email = Column(String)

class Bid(Base):    
    __tablename__='bid'
    id = Column(BigInteger,primary_key=True)
    productid = Column('productId',String)
    userid = Column('userId', String)
    bid = Column(Float)
    timestamp = Column(BigInteger)

class BidService(DatabaseService):
    def __init__(self, engine):
        self.session_factory = sessionmaker(bind=engine)
        
    def save_bid(self,bid):        
        session = self.session_factory() 
        try:
            session.add(bid)           
            session.commit()
        except:
            session.rollback()
            print "Unexpected error:", sys.exc_info()[0]
            return False
        session.close()     
        return True
    
    def get_bids(self):
        session = self.session_factory() 
        try:
            bids = session.query(Bid).all()           
            session.expunge_all()                 
        except:            
            print "Unexpected error:", sys.exc_info()[0]
        
        session.close()             
        return bids
    
    def get_bids_for_product(self,productid):
        session = self.session_factory() 
        try:
            bids = session.query(Bid).\
            filter(Bid.productid==productid).all()           
            session.expunge_all()                 
        except:            
            print "Unexpected error:", sys.exc_info()[0]
        
        session.close()             
        return bids
    
    
    
    
    
if __name__ == '__main__':
    pass

