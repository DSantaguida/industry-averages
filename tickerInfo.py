import config
import yfinance as yf
import json


def getSectorData(sector, data):
    result = []
    info = {}
    sum = 0
    total = 0
    for ticker in config.getSectorTickers(sector).split(","):
        pe = yf.Ticker(ticker).info.get(data)
        if (pe is not None):
            sum += pe
            total += 1
        info = {}
        info["name"] = ticker
        info["data"] = pe if pe is not None else "N/A"
        result.append(info)
    info = {}
    info["name"] = 'AVERAGE'
    info["data"] = round(sum / total, 4)
    result.append(info)
    return json.dumps(result)


def getTickerData(ticker):
    return yf.Ticker(ticker).info
