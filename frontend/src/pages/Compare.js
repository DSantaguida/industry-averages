import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react'


class Compare extends React.Component{

//TODO: Add compare with all tickers

  constructor(props) {
    super(props);
    this.state = { 
      sector: 'Technology',
      key: 'trailingAnnualDividendRate',
      loading: false,
      sectors: [],
      datapoints: [],
      entries: []
    };
    this.createSectors()
    this.createDatapoints()

    this.handleSectorUpdate = this.handleSectorUpdate.bind(this);
    this.handleDatapointUpdate = this.handleDatapointUpdate.bind(this);
    this.createEntries = this.createEntries.bind(this);

  }

  async createSectors() {
    const response = await fetch(`http://localhost:5000/sectors`);
    await response.json().then(data => this.setState({sectors: data}));
    this.setState({
      sectors: this.state.sectors.map((item) => ({
        text: item,
        value: item
      }))
    });
  } 

  async createDatapoints() {
    const response = await fetch(`http://localhost:5000/datapoints`);
    await response.json().then(data => this.setState({datapoints: data.split(",")}));
    this.setState({
      datapoints: this.state.datapoints.map((item) => ({
        text: item,
        value: item
      }))
    });
  } 

  async createEntries() {
    this.setState({loading: true});
    const response = await fetch(`http://localhost:5000/compare/${this.state.sector}/${this.state.key}`);
    const data = await response.json();
    this.setState({loading: false});
    this.setState({entries: []});
    data.forEach(obj => {
      this.setState({entries: this.state.entries.concat(
        <tr>
          <td>{obj.name}</td>
          <td>{obj.data}</td>
        </tr>
      )})
    })
    console.log(this.state.entries);
  }

  handleSectorUpdate (event, data) {
    this.setState({sector: data.value});
  }

  handleDatapointUpdate(event, data) {
    this.setState({key: data.value});
  }
 
  render(){
    return (
      <Container fluid={true}>
        <Row className="pt-3 pb-5">
          <Col className="column">
            <p>Select Industry: </p>
            <Dropdown placeholder='Ticker' search selection options={this.state.sectors} onChange={this.handleSectorUpdate}/>
          </Col>
          <Col className="column">
            <p>Select Data: </p>
            <Dropdown placeholder='Data' search selection options={this.state.datapoints} onChange={this.handleDatapointUpdate}/>
          </Col>
          <Col>
            <Button variant="primary" onClick={this.createEntries}>Compare</Button>
            {this.state.loading ? <p>Retrieving Data...</p> : null}
          </Col>
        </Row>
        <Row className="pl-3">
          {this.state.entries.length !== 0 ? <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Value</th>
            </tr>
            {this.state.entries}
            </tbody>
          </table> : null}
        </Row>
    </Container>
    );
  }
}
export default Compare