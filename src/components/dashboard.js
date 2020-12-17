import React from 'react';
import {connect} from 'react-redux';
import Asset from './asset';
import {fetchOrders} from '../actions/orders';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchOrders());
  }

  navigate = (_orderId) => {
    this.props.history.push(`/dashboard/asset/${_orderId}`);
  }

  render(){

    const account = this.props.account;
    let orders = this.props.orders;
    orders = orders.filter((order) => {
      return (order.buyer == account);
    });

    const renderItems = () => {
      return orders.map((item, index) => (
        <Asset {...item} key={index} navigate={this.navigate} />
      ));
    }

    return(
      <div className="container" id="dashboard-container">
        <h6>Your items</h6>
        <hr />
        <div id="dashboard-sub-container">
          <div className="container" id="dashboard-asset-container">
            {orders.length > 0 ? renderItems() : <img id="dashboard-404" src="/images/404.png" />}
          </div>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
	return{
		account: state.account,
    orders: state.orders,
	};
};

export default connect(mapStateToProps)(Dashboard);