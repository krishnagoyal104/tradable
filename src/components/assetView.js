import React from 'react';
import {connect} from 'react-redux';
import Button from 'antd/lib/button';
import {buyItem, cancelItem} from '../actions/tx';
import {fromWei} from '../utils/index';
import {withRouter} from 'react-router-dom';
import Tag from 'antd/lib/tag';

class AssetView extends React.Component {

  constructor(props){
    super(props);
  }

  buy = (id, price, func) => {
    this.props.dispatch(buyItem(id, price, func));
  }

  cancel = (orderId) => {
    this.props.dispatch(cancelItem(orderId, this.navigate));
  }

  navigate = () => {
    this.props.history.replace('/dashboard');
  }

  render(){

    const orderId = this.props.match.params.id;
    let order = this.props.orders.filter((_order) => {  // filter returns an array
      return _order.orderId == orderId;
    });
    order = order[0];

    const RenderDetails = () => {
      const obj = order.metadata.item_details;
      const keys = Object.keys(obj);
      const colors = ['red', 'blue', 'green', 'magenta'];
      return keys.map((key, index) => {
        return (
          <div key={index} id="view-details">
            <p>{key}</p>
            <Tag className="view-tag" color={colors[index]}>{obj[key].toUpperCase()}</Tag>
          </div>
        );
      });
    }

    const isOwner = this.props.account == order.seller;
    
    return(
      <div className="container" id="view-container">
        <div id="view-container-top">
          <img id="view-image" src={`https://trelix.s3.ap-south-1.amazonaws.com/icons/${order.tokenId}.png`} />
          <div id="view-metadata-container">
            <div>
              <h1>{order.metadata.game_name || 'Path of Exile'}</h1>
              <p>In-game id: {order.metadata.item_id || '4663884-32'}</p>
            </div>
            <div>
              {
                this.props.loading ? <img id="view-loader" src="/images/loader.gif" /> :
                isOwner ?
                <Button type="primary" onClick={() => this.cancel(orderId)}>
                  Cancel sale
                </Button> :
                <Button type="primary" onClick={() => this.buy(orderId, order.price, this.navigate)}>
                  Buy item Ξ {fromWei(order.price)}
                </Button>
              }
              <p id="view-info">(Protocol fee is 2%)</p>
            </div>
          </div>
        </div>
        <div id="view-container-bottom">
          <div id="view-details-container">
            <RenderDetails />
          </div>
          <div id="view-details-container">
            <div id="view-details">
              <p>Seller</p>
              <Tag className="view-tag" color={'blue'}>{order.seller ? this.props.account == order.seller ? 'You' : order.seller.substr(0, 8) : ''}...</Tag>
            </div>
            <div id="view-details">
              <p>Token Id</p>
              <Tag className="view-tag" color={'orange'}>{order.tokenId || ''}</Tag>
            </div>
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
    loading: state.loader
	};
};

export default withRouter(connect(mapStateToProps)(AssetView));