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


@app.route('/images', methods=['GET'])
def get_artwork_by_color():
    print('getting images')
    url_encoded_color = request.args.get('color')
    hex_color = urllib.parse.unquote(url_encoded_color)
    # print(hex_color)

    # url_encoded_color = urllib.parse.quote(hex_color)
    print('url color', url_encoded_color)

    # only retrieve objects with image urls, get first 10 at random
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


@app.errorhandler(404)
def not_found(e):
    print('not found')
    return app.send_static_file('index.html')
