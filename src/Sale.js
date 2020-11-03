import React from "react";
import { ListGroup, ListGroupItem, Table, Spinner } from "react-bootstrap";

class Sale extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sale: {}, loading: true };
  }
  componentDidMount = () => {
    console.log("Here");
    fetch(`https://web422-sale-api.herokuapp.com/api/sales/${this.props.id}`)
      .then((res) => res.json())
      .then((sale) => {
        if (sale._id === this.props.id) {
          this.props.viewedSale(sale._id);
          this.setState({ sale, loading: false });
        } else {
          this.setState({ sale: {}, loading: false });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidUpdate = (prevProps) => {
    console.log("update");
    if (prevProps.id !== this.props.id) {
      this.setState({ loading: true });
      fetch(`https://web422-sale-api.herokuapp.com/api/sales/${this.props.id}`)
        .then((res) => res.json())
        .then((sale) => {
          if (sale._id === this.props.id) {
            this.props.viewedSale(sale._id);
            this.setState({ sale, loading: false });
          } else {
            this.setState({ sale: {}, loading: false });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  itemTotal = (items) => {
    return items
      .reduce((initial, item) => initial + item.price * item.quantity, 0)
      .toFixed(2);
  };

  render = () => {
    if (this.state.loading) {
      return (
        <Spinner animation="grow" variant="secondary" className="loading" />
      ); // NOTE: This can be changed to render a <Loading /> Component for a better user experience
    } else {
      if (this.state.sale._id) {
        return (
          <div>
            <h1 style={{ marginTop: ".5em", marginBottom: ".5em" }}>
              Sale: {this.state.sale._id}
            </h1>
            <h2>Customer</h2>
            <ListGroup>
              <ListGroupItem>
                <strong>email:</strong> {this.state.sale.customer.email}
              </ListGroupItem>
              <ListGroupItem>
                <strong>age:</strong> {this.state.sale.customer.age}
              </ListGroupItem>
              <ListGroupItem>
                <strong>satisfaction:</strong>{" "}
                {this.state.sale.customer.satisfaction}/5
              </ListGroupItem>
            </ListGroup>

            <h2> Items: ${this.itemTotal(this.state.sale.items)}</h2>
            <Table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.sale.items.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        );
      } else {
        return (
          <div>
            <h1>Unable to find Sale</h1>
            <p>id: {this.props.id}</p>
          </div>
        );
      }
    }
  };
}

export default Sale;
