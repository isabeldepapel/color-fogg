from flask import Flask, request
import json
import os
import requests
import urllib.parse
import beeline
from beeline.middleware.flask import HoneyMiddleware

FOGG_API_KEY = os.getenv('FOGG_API_KEY')
BASE_URL = 'https://api.harvardartmuseums.org'

app = Flask(__name__, static_folder='../build', static_url_path='/')
HoneyMiddleware(app, db_events=True)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/result', methods=['POST'])
def get_artwork_by_color():
    hex_color = request.json

    url_encoded_color = urllib.parse.quote(hex_color)
    print(url_encoded_color)

    # only retrieve objects with image urls
    url = f'{BASE_URL}/object?apikey={FOGG_API_KEY}&color={url_encoded_color}&sort=random&hasimage=1&q=imagepermissionlevel:0'
    print(url)

    with beeline.tracer('fogg api call'):
        beeline.add_context({'hex_color': hex_color})
        res = requests.get(url)

        print(res.status_code)
        body = res.json()

        num_results = (len(body['records']))
        beeline.add_context({'num_results': num_results})
        return json.dumps(body['records'])
