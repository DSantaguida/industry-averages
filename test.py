import yfinance as yf
import config
import configparser
import tickerInfo

# print(yf.Ticker("AAPL").info)


# print(config.getTickers())
# print(tickerInfo.getSectorData('Technology', 'trailingPE'))

print(config.removeTicker('temp', 'test'))
