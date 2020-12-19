import React from 'react';
import {connect} from 'react-redux';
import Asset from './asset';
import {fetchOrders} from '../actions/orders';
import {search} from '../utils/index';

class Explore extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchOrders());
  }

  navigate = (_orderId) => {
    this.props.history.push(`/asset/${_orderId}`);
  }

  render(){
    let orders = this.props.orders;
    orders = orders.filter((order) => {
      return order.state == '0';
    });
    const games = ['Path of Exile', 'Dota 2', 'Dark Souls 3', 'New'];
    return(
      <div className="container" id="explore-container">
        <h4 id="explore-header">Buy Items</h4>
        {games.map((game, index) => {
          let data = search(orders, game);
          if(data.length < 1) return;
          return(
            <div key={index}>
              <div id="explore-game-name">
                <img src={`/images/games/${game}.png`} />
                <h5>{game}</h5>
              </div>
              <hr />
              <div className="container" id="explore-asset-container">
                {data.length > 0 && data.map((item, index) => (
                  <Asset fromDashboard={false} {...item} key={index} navigate={this.navigate} />
                ))}
              </div>
            </div>);
          })}
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
	return{
		account: state.account,
		orders: state.orders
	};
};

export default connect(mapStateToProps)(Explore);