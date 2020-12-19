import React from 'react';
import {connect} from 'react-redux';
import Asset from './asset';
import {fetchTokensByUser} from '../actions/user';

class Dashboard extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(fetchTokensByUser());
  }

  navigate = (_orderId) => {
    this.props.history.push(`/inventory/asset/${_orderId}`);
  }

  render(){

    const account = this.props.account;
    let tokens = this.props.tokens;

    const renderItems = () => {
      return tokens.map((item, index) => (
        <Asset fromDashboard={true} {...item} key={index} navigate={this.navigate} />
      ));
    }

    return(
      <div className="container" id="dashboard-container">
        <h6>Your items</h6>
        <hr />
        <div id="dashboard-sub-container">
          <div className="container" id="dashboard-asset-container">
            {tokens.length > 0 ? renderItems() : <img id="dashboard-404" src="/images/404.png" />}
          </div>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
	return{
		account: state.account,
    tokens: state.user
	};
};

export default connect(mapStateToProps)(Dashboard);