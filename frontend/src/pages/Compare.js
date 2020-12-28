import React from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap';

class Compare extends React.Component{

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
      sectors: this.state.sectors.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))
    });
  } 

  async createDatapoints() {
    const response = await fetch(`http://localhost:5000/datapoints`);
    await response.json().then(data => this.setState({datapoints: data.split(",")}));
    this.setState({
      datapoints: this.state.datapoints.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))
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
          <th>{obj.name}</th>
          <th>{obj.data}</th>
        </tr>
      )})
    })
    console.log(this.state.entries);
  }

  handleSectorUpdate (event) {
    this.setState({sector: event.target.value});
  }

  handleDatapointUpdate(event) {
    this.setState({key: event.target.value});
  }
 
  render(){
    return (
      <Container fluid={true}>
        <Row className="pt-3 pb-5">
          <Col className="column">
            <p>Select Industry: </p>
            <select value={this.state.sector} onChange={this.handleSectorUpdate}>
              {this.state.sectors}
            </select>
          </Col>
          <Col className="column">
            <p>Select Data: </p>
            <select value={this.state.key} onChange={this.handleDatapointUpdate}>
              {this.state.datapoints}
            </select>
          </Col>
          <Col>
            <Button variant="primary" onClick={this.createEntries}>Compare</Button>
            {this.state.loading ? <p>Retrieving Data...</p> : null}
          </Col>
        </Row>
        <Row className="pl-3">
          <table>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Value</th>
            </tr>
            {this.state.entries}
            </tbody>
          </table>
        </Row>
    </Container>
    );
  }
}
export default Compare