import React from "react";
import { withRouter } from "react-router-dom";
import { Table, Pagination, Spinner } from "react-bootstrap";

class Sales extends React.Component {
  constructor() {
    super();
    this.state = { sales: [], currentPage: 1 };
  }
  getData = (page, perPage = 10) => {
    return new Promise((resolve, reject) => {
      fetch(
        `https://web422-sale-api.herokuapp.com/api/sales?page=${page}&perPage=${perPage}`
      )
        .then((res) => resolve(res.json()))
        .catch((err) => reject(err));
    });
  };
  componentDidMount = () => {
    console.log("Call");
    this.getData(this.state.currentPage)
      .then((sales) => this.setState({ sales }))
      .catch((err) => console.log(err));
  };

  previousPage = () => {
    if (this.state.currentPage > 1) {
      this.getData(this.state.currentPage - 1)
        .then((sales) =>
          this.setState({
            sales,
            currentPage: this.state.currentPage - 1,
          })
        )
        .catch((err) => console.log(err));
    }
  };

  nextPage = () => {
    this.getData(this.state.currentPage + 1)
      .then((sales) =>
        this.setState({
          sales,
          currentPage: this.state.currentPage + 1,
        })
      )
      .catch((err) => console.log(err));
  };
  render = () => {
    if (this.state.sales.length > 0) {
      return (
        <div>
          <h1 style={{ marginTop: ".5em", marginBottom: ".5em" }}>Sales</h1>
          <Table hover>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Store Location</th>
                <th>Number of Items</th>
                <th>Sale Date</th>
              </tr>
            </thead>
            <tbody>
              {this.state.sales.map((sale) => {
                return (
                  <tr
                    key={sale._id}
                    onClick={() => {
                      this.props.history.push(`/Sale/${sale._id}`);
                    }}
                  >
                    <th>{sale.customer.email}</th>
                    <th>{sale.storeLocation}</th>
                    <th>{sale.items.length}</th>
                    <th>{new Date(sale.saleDate).toLocaleDateString()}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <Pagination>
            <Pagination.Prev onClick={this.previousPage} />
            <Pagination.Item>{this.state.currentPage}</Pagination.Item>
            <Pagination.Next onClick={this.nextPage} />
          </Pagination>
        </div>
      );
    } else {
      return (
        <Spinner animation="grow" variant="secondary" className="loading" />
      ); // NOTE: This can be changed to render a <Loading /> Component for a better user experience
    }
  };
}

export default withRouter(Sales);
