import React from 'react';
import {connect} from 'react-redux';
import Button from 'antd/lib/button';
import {approveItems, sellItem} from '../actions/tx';
import {fromWei} from '../utils/index';
import {withRouter} from 'react-router-dom';
import Input from './input';
import {fetchAllowance} from '../utils/index';
import Tag from 'antd/lib/tag';

class DasboardAsset extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
      approved: false
    }
  }

  async componentDidMount(){
    try{
      const result = await fetchAllowance(this.props.account);
      if(result){
        this.setState(({
          approved: true
        }));
      }
    }
    catch(e){
      console.log(e);
    }
  }

  onInput = (text) => {
    this.setState(({
      text
    }));
  }

  navigate = () => {
    this.props.history.replace('/explore');
  }

  sell = (tokenId) => {  //not orderId
    if(this.state.text){
      this.props.dispatch(sellItem(tokenId, this.state.text, this.navigate));
    }
    else {
      alert('Please enter the price.')
    }
  }

  approve = async() => {
    try{
      await this.props.dispatch(approveItems());
      this.setState(({
        approved: true
      }));
    }
    catch(e){
      console.log(e);
    }
  }

  render(){

    const tokenId = this.props.match.params.id;
    let token = this.props.tokens.filter((_token) => {
      return _token.tokenId == tokenId;
    });
    token = token[0];

    const RenderDetails = () => {
      const obj = token.item_details;
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
    
    console.log(token, this.state);
    
    return(
      <div className="container" id="view-container">
        <h4>Sell item</h4>
        <hr />
        <div id="view-container-top">
          <img id="view-image" src={`https://trelix.s3.ap-south-1.amazonaws.com/icons/${token.tokenId}.png`} />
          <div id="view-metadata-container">
            <div>
              <h1>{token.game_name || 'Path of Exile'}</h1>
              <span>{token.item_id || '4663884-32'}</span>
            </div>
            <div>
              {
                this.props.loading ? (<img id="view-loader" src="/images/loader.gif" />) :
                this.state.approved ?
                (<div>
                  <Input name={"Price"} value={this.state.text} placeholder="Enter price" onInput={this.onInput} />
                  <Button type="primary" onClick={() => this.sell(token.tokenId)}>
                    Sell item
                  </Button>
                </div>) :
                (<Button type="primary" onClick={() => this.approve()}>
                  Approve all
                </Button>)
              }
            </div>
          </div>
        </div>
        <div id="view-container-bottom">
          <div id="view-details-container">
            <RenderDetails />
            <div id="view-details">
              <p>Token Id</p>
              <Tag className="view-tag" color={'orange'}>{token.tokenId || ''}</Tag>
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
    loading: state.loader,
    tokens: state.user
	};
};

export default withRouter(connect(mapStateToProps)(DasboardAsset));