import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link, Switch, Redirect, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Sales from "./Sales";
import Sale from "./Sale";
import NotFound from "./NotFound";

class App extends React.Component {
  constructor() {
    super();
    this.state = { recentlyViewed: [], searchId: "" };
  }

  viewedSale = (id) => {
    let allRecentlyViewed = this.state.recentlyViewed;

    if (this.state.recentlyViewed.indexOf(id) === -1) {
      allRecentlyViewed.push(id);
      this.setState({ recentlyViewed: allRecentlyViewed });
    }
  };

  updateSearchId = (e) => {
    this.setState({ searchId: e.target.value });
  };

  render = () => {
    return (
      <div>
        <Navbar collapseOnSelect bg="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>WEB422 - Sales</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="mr-auto">
                <LinkContainer to="/Sales">
                  <Nav.Link>All Sales</Nav.Link>
                </LinkContainer>

                <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                  {this.state.recentlyViewed.length > 0 ? (
                    this.state.recentlyViewed.map((id, index) => (
                      <LinkContainer to={`/Sale/${id}`} key={index}>
                        <NavDropdown.Item>Sale: {id}</NavDropdown.Item>
                      </LinkContainer>
                    ))
                  ) : (
                    <NavDropdown.Item>...</NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>

              <Form inline>
                <Form.Group>
                  <Form.Control
                    type="text"
                    onChange={this.updateSearchId}
                    placeholder="Sale ID"
                  />
                </Form.Group>
                <Link
                  className="btn btn-secondary"
                  to={"/Sale/" + this.state.searchId}
                >
                  Search
                </Link>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Row>
            <Col md={12}>
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/Sales" />} />
                <Route exact path="/Sales" render={() => <Sales />} />
                <Route
                  path="/Sale/:id"
                  render={(props) => (
                    <Sale
                      id={props.match.params.id}
                      viewedSale={this.viewedSale}
                    />
                  )}
                />
                <Route render={() => <NotFound />} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
}

export default App;
