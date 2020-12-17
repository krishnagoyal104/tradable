import React from 'react';
import {connect} from 'react-redux';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import {fetchOrders} from '../actions/orders';
import {fromWei} from '../utils/index';

const columns = [
  {
    title: 'Game',
    dataIndex: 'game_name',
    key: 'game_name',
    render: text => (
      <div>
        <img className="table-image" src={`images/games/${text}.png`} />
        <span className="table-text"><b>{text}</b></span>
      </div>
      ),
  },
  {
    title: 'Token Id',
    dataIndex: 'tokenId',
    key: 'tokenId',
    render: text => <span className="table-text">{text}</span>,
  },
  {
    title: 'Item Id',
    dataIndex: 'item_id',
    key: 'item_id',
    render: text => <span className="table-text">{text}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: text => <span>Ξ {fromWei(text)}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'state',
    key: 'state',
    render: tag => {
      let text, color;
      if(tag == '0'){
        text = 'Open';
        color = 'blue';
      }
      else if(tag == '1'){
        text = 'Filled';
        color = 'green';
      }
      else {
        text = 'Cancelled';
        color = 'red';
      }
      return (
        <Tag color={color} key={tag}>
          {text.toUpperCase()}
        </Tag>
      );
    }
  }
]

class Trades extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchOrders());
  }

  createData = (orders) => {
    const data = [];
    let obj;
    orders.map((order) => {
      const {tokenId, price, state, metadata: {game_name, item_id}} = order;
      obj = {tokenId, price, state, game_name, item_id, key: item_id};
      data.push(obj);
    });
    this.data = data;
    console.log(data);
  }

  render(){

    let orders = this.props.orders;
    this.createData(orders);

    return(
      <div className="container" id="trade-container">
        <h5>Recent Trades</h5>
        <hr />
        <Table columns={columns} dataSource={this.data} />
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
	return{
    orders: state.orders
	};
};

export default connect(mapStateToProps)(Trades);