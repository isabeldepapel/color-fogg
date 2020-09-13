from flask import Flask, request
import os
import requests
import urllib.parse

FOGG_API_KEY = os.getenv('FOGG_API_KEY')
BASE_URL = 'https://api.harvardartmuseums.org'

app = Flask(__name__)

@app.route('/result', methods = ['POST'])
def get_artwork_by_color():
    hex_color = request.json
    url_encoded_color = urllib.parse.quote(hex_color)
    print(url_encoded_color)

    # color = '646464'
    url = f'{BASE_URL}/object?apikey={FOGG_API_KEY}&color={url_encoded_color}'
    print(url)
    res = requests.get(url)
    print(res.status_code)
    return res.json()
