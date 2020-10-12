from flask import Flask, request
import json
import os
import requests
import urllib.parse

FOGG_API_KEY = os.getenv('FOGG_API_KEY')
BASE_URL = 'https://api.harvardartmuseums.org'

app = Flask(__name__)

@app.route('/result', methods = ['POST'])
def get_artwork_by_color():
    hex_color = request.json
    # hex_color='#646464'
    url_encoded_color = urllib.parse.quote(hex_color)
    print(url_encoded_color)

    # only retrieve objects with image urls
    url = f'{BASE_URL}/object?apikey={FOGG_API_KEY}&color={url_encoded_color}&sort=random&hasimage=1&q=imagepermissionlevel:0'
    print(url)
    res = requests.get(url)
    print(res.status_code)
    body = res.json()
    # print(body)
    # print(body['records'])
   
    # records = res.records
    # print(res.status_code)
    print(len(body['records']))
    return json.dumps(body['records'])
