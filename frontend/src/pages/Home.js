import React from 'react';
import {
  Container
} from 'react-bootstrap';

function Home(props){
  return (
    <Container fluid={true}>
    <div className="pt-3">
      <h1>Industry Averages</h1>
      <p>This app is meant to be a tool to be used for comparing the financials of companies within the same industry. It is a simple tool made to assist with investment decisions. The following functions are available:</p>
      <ol>
        <li><h4>Add Ticker: </h4>Add a ticker to the app. The app will check whether the ticker exists or not and automatically categorize it into its respective sector.</li>
        <li><h4>View Ticker: </h4>View a tickers information. Information such as current price, shares outstanding, and other information will be displayed.</li>
        <li><h4>Compare Industries: </h4>Compare all companies in the system with other companies within the same industry. Select which piece of data to compare it on and the system will display an average of all companies in the industry and list that data for each company within that sector.</li>
      </ol>
    </div>
   </Container>
  );

}
export default Home