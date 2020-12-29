import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'


class View extends React.Component{

//TODO: Add delete ticker option

  constructor(props){
    super(props);
    this.state = { 
      loading: false,
      ticker: '',
      tickers: [],
      tickerData: []
    };

    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTickers();
  }

  handleTickerChange (event, data) {
    this.setState({ticker: data.value}, () => this.handleSubmit());
  }

  async createTickers() {
    const response = await fetch(`http://localhost:5000/tickers`);
    await response.json().then(data => this.setState({tickers: data.split(",")}));
    this.setState({tickers: this.state.tickers.map((item) => ({
      text: item,
      value: item
      }))
    });
  }

  async handleSubmit() {
    this.setState({loading: true});
    const response = await fetch(`http://localhost:5000/ticker/${this.state.ticker}`);
    await response.json().then(data => this.setState({tickerData: data}));
    this.setState({loading: false});
    console.log(this.state.tickerData);
  }

  render(){
    return (
      <Container fluid={true}>
        <Row className="pt-3 pb-5">
          <Col>
            <p>Select Ticker: </p>
            <Dropdown placeholder='Tickers' search selection options={this.state.tickers} onChange={this.handleTickerChange}/>
            {this.state.loading ? <p className="pl-2 pb-2 pt-4" style={{ fontSize: '15px' }}>Retrieving Data...</p> : null}
          </Col>
        </Row>
        <Col>
          <Row>
            <p className="pl-3 pb-2" style={{ fontSize: '30px' }}><b>{this.state.tickerData.longName}</b></p>
          </Row>
          <Row style={{ maxWidth: '100%' }}>
            <Col style={{ maxWidth: '10%' }}>
              {this.state.tickerData.logo_url ?<img src={this.state.tickerData.logo_url} alt="Company logo"/> : null}
            </Col>
            <Col style={{ maxWidth: '90%' }}>
              {this.state.tickerData.longBusinessSummary}
            </Col>
          </Row>
          <Row className="pt-5">
            {this.state.tickerData.symbol ? <p className="pl-3 pb-2" style={{ fontSize: '20px' }}>Financial Data:</p> : null}
          </Row>
            {/* financial data here */}
          <Row className="pl-3">
            {this.state.tickerData.symbol ?
            <table>
              <tbody>
                <tr>
                  <th>Currency</th>
                  <td>{this.state.tickerData.currency}</td>
                  <th>Regular Market Price</th>
                  <td>{this.state.tickerData.regularMarketPrice}</td>
                  <th>50 Day Average</th>
                  <td>{this.state.tickerData.fiftyDayAverage}</td>
                </tr>
                <tr>
                  <th>Volume</th>
                  <td>{this.state.tickerData.volume}</td>
                  <th>Average 10 Day Volume</th>
                  <td>{this.state.tickerData.averageDailyVolume10Day}</td>
                  <th>Dividend Rate</th>
                  <td>{this.state.tickerData.dividendRate}</td>
                </tr>
                <tr>
                  <th>Market Cap</th>
                  <td>{this.state.tickerData.marketCap}</td>
                  <th>Shares Outstanding</th>
                  <td>{this.state.tickerData.sharesOutstanding}</td>
                  <th>Profit Margins</th>
                  <td>{this.state.tickerData.profitMargins}</td>
                </tr>
                <tr>
                  <th>Enterprise to EBITDA</th>
                  <td>{this.state.tickerData.enterpriseToEbitda}</td>
                  <th>52 Week Change</th>
                  <td>{this.state.tickerData["52WeekChange"]}</td>
                  <th>Trailing EPS</th>
                  <td>{this.state.tickerData.trailingEps}</td>
                </tr>
                <tr>
                  <th>Trailing PE</th>
                  <td>{this.state.tickerData.trailingPE}</td>
                  <th>Book Value</th>
                  <td>{this.state.tickerData.bookValue}</td>
                  <th>Price To Book</th>
                  <td>{this.state.tickerData.priceToBook}</td>
                </tr>
                <tr>
                  <th>Forward EPS</th>
                  <td>{this.state.tickerData.forwardEps}</td>
                  <th>Forward PE</th>
                  <td>{this.state.tickerData.forwardPE}</td>
                  <th>PEG Ratio</th>
                  <td>{this.state.tickerData.pegRatio}</td>
                </tr>
            </tbody>
          </table> : null }
          </Row>
        </Col>

       
    </Container>
    );
  }

}
export default View