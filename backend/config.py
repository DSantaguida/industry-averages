import yfinance as yf
import configparser


def addTicker(ticker):
    ticker = ticker.upper()
    try:
        tob = yf.Ticker(ticker)
    except Exception as e:
        return "Ticker information cannot be obtained. e: " + str(e)

    try:
        exist = tickerExists(ticker, tob.info.get("sector"))
        if (exist):
            return ticker + " is already in the system"
    except Exception as e:
        return "Ticker information cannot be obtained: " + str(e)

    config = configparser.ConfigParser()
    config.read("ticker.config")

    if (not sectorExists(tob.info.get("sector"))):
        config.add_section(tob.info.get("sector"))
        replace = ticker
    else:
        replace = config[tob.info.get("sector")]["tickers"] + "," + ticker

    config.set(tob.info.get("sector"), 'tickers', str(replace))

    with open("ticker.config", "w+") as file:
        config.write(file)
    return True


def tickerExists(ticker, sector):
    try:
        config = configparser.ConfigParser()
        config.read("ticker.config")
        return ticker in config[sector]["tickers"]
    except:
        return False


def sectorExists(sector):
    config = configparser.ConfigParser()
    config.read("ticker.config")
    return sector in config.sections()


def getSectors():
    config = configparser.ConfigParser()
    config.read("ticker.config")
    lst = config.sections()
    lst.remove('General')
    return lst


def getSectorTickers(sector):
    config = configparser.ConfigParser()
    config.read("ticker.config")
    return config[sector]["tickers"]


def getDatapoints():
    config = configparser.ConfigParser()
    config.read("ticker.config")
    return config["General"]["datapoints"]
