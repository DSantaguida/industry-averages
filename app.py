from flask import Flask
import tickerInfo
import config
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/compare/<sector>/<data>', methods=['GET'])
def compare_sector(sector, data):
    return tickerInfo.getSectorData(sector, data)


@app.route('/ticker/<ticker>', methods=['GET'])
def ticker_data(ticker):
    return tickerInfo.getTickerData(ticker)


@app.route('/add-ticker/<ticker>', methods=['GET'])
def add_ticker(ticker):
    return json.dumps(config.addTicker(ticker))


@app.route('/sectors', methods=['GET'])
def get_sectors():
    return json.dumps(config.getSectors())


@app.route('/datapoints', methods=['GET'])
def get_datapoints():
    return json.dumps(config.getDatapoints())


@app.route('/tickers', methods=['GET'])
def get_tickers():
    return json.dumps(config.getTickers())


app.run()
