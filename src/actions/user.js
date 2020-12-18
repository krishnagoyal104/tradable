import {getOrdersByUser, getTokensByUser} from '../utils/index';
//import {mapping} from '../config/config';
//import {attachMetadata} from './orders';
import metadata from '../utils/metadata.json';

/*export const setUserOrders = (orders) => {
  return {
    type: 'SET_USER_ORDERS',
    orders
  };
};

export const fetchOrdersByUsers = () => {
  return async(dispatch, getState) => {
    try{
      const account = getState().account;
      let orders = await getOrdersByUser(account);
      orders = attachMetadata(orders);
      dispatch(setUserOrders(orders));
    }
    catch(e){
      console.log(e);
    }
  }
}*/

export const setUserTokens = (tokens) => {
  return {
    type: 'SET_USER_TOKENS',
    tokens
  };
};

export const fetchTokensByUser = () => {
  return async(dispatch, getState) => {
    try{
      const account = getState().account;
      let tokenIds = await getTokensByUser(account);
      const data = [];
      tokenIds.map((tokenId) => {
        const meta = metadata[tokenId];
        meta['tokenId'] = tokenId;
        data.push(meta);
      })
      dispatch(setUserTokens(data));
    }
    catch(e){
      console.log(e);
    }
  }
}