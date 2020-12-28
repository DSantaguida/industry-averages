import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import {
  Container,
  Navbar,
  Nav
} from 'react-bootstrap';
import Home from './pages/Home';
import Add from './pages/Add';
import Compare from './pages/Compare';
import View from './pages/View';

class App extends React.Component{

  render() {

    return (
      <Router>
        <Container className="p-0 background" fluid={true}>
          <Navbar bg="primary" variant="dark" className="border-bottom" expand="lg">
            <Navbar.Brand>Industry Averages</Navbar.Brand>
            <Navbar.Toggle className="border-0" aria-controls="navbar-toggle"/>
            <Navbar.Collapse id="navbar-toggle">
              <Nav>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/add-ticker">Add Ticker</Link>
                <Link className="nav-link" to="/view-ticker">View Ticker</Link>
                <Link className="nav-link" to="/compare">Compare Industries</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path="/" exact render={() => <Home/>} />
          <Route path="/add-ticker" exact render={() => <Add/>} />
          <Route path="/compare" exact render={() => <Compare/>} />
          <Route path="/view-ticker" exact render={() => <View/>} />
        </Container>

      </Router>
      );

  }
}

export default App;
