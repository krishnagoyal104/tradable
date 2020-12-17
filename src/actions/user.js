import {getOrdersByUser} from '../utils/index';
import {mapping} from '../config/config';
import {attachMetadata} from './orders';

export const setUserOrders = (orders) => {
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
}