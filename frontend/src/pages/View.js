import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'

class View extends React.Component{

  constructor(props){
    super(props);
    this.state = { 
      ticker: '',
      tickers: []
    };

    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createTickers();
  }

  handleTickerChange (event, data) {
    this.setState({ticker: data.value});
  }

  async createTickers() {
    const response = await fetch(`http://localhost:5000/tickers`);
    await response.json().then(data => this.setState({tickers: data.split(",")}));
    this.setState({tickers: this.state.tickers.map((item) => ({
      key: item,
      text: item,
      value: item
    }))
    });
  }

  handleSubmit() {
    //TODO: Add loading indicator if retrieval of data is too slow
    console.log(this.state.ticker)
  }

  render(){
    return (
      <Container fluid={true}>
        <Row className="pt-3 pb-5">
          <Col>
            <p>Select Ticker: </p>
            <Dropdown placeholder='Tickers' search selection options={this.state.tickers} onChange={this.handleTickerChange}/>
            <Button variant="primary" onClick={this.handleSubmit}>Submit</Button>
          </Col>
        </Row>
        Work in progress...
    </Container>
    );
  }

}
export default View