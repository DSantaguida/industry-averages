import React from "react";
import {
  Container
} from 'react-bootstrap';
import { Message, Form } from "semantic-ui-react";


class Add extends React.Component {


  constructor(props) {
    super(props);
    this.state = { 
      ticker: '',
      formResult: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ticker: event.target.value});
    this.setState({formResult: ''});
  }

  async handleSubmit(event) {

    const response = await fetch(`http://localhost:5000/add-ticker/${this.state.ticker}`);
    const data = await response.json();
    this.setState({formResult: data})
  }

  render() {



    return (
      <Container fluid={true}>
      <div>
        <Form>
          <h3 className="pt-3 pb-3">Add a ticker symbol:</h3>
          <Form.TextArea
            required
            value={this.state.ticker.toUpperCase()}
            onChange={this.handleChange}
          />
          <Form.Button fluid color="blue" disabled={false} onClick={this.handleSubmit}>
            Submit
          </Form.Button>
          {this.state.formResult ? this.state.formResult === true ? (
            <Message
              positive
              header={this.state.ticker.toUpperCase()}
              content="Successfully added the ticker"
            />
          ) : (
            <Message
              negative
              header={this.state.ticker.toUpperCase()}
              content={this.state.formResult}
            />
          ) : null}
        </Form>
      </div>
    </Container>
    );
  }
}
export default Add