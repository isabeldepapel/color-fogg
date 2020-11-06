# conf.py
import logging
import os
import beeline


def post_worker_init(worker):
    logging.info(f'beeline initialization in process pid {os.getpid()}')
    beeline.init(writekey=os.getenv('HONEYCOMB_API_KEY'), dataset='colorapi',
                 service_name='colorapi', debug=True)
