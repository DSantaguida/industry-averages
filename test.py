import yfinance as yf
import config
import configparser
import tickerInfo

# print(yf.Ticker("AAPL").info)


# print(config.getDatapoints())
print(tickerInfo.getSectorData('Technology', 'trailingPE'))
