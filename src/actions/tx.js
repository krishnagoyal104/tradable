import {startLoading, stopLoading} from './loader';
import {buy, sell, approveTokens, cancelOrder} from '../utils/index';

export const buyItem = (orderId, price, func) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		//openNotification();
		try{
			const account = getState().account;
			await buy(account, orderId, price);
			dispatch(stopLoading());
			func();
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const sellItem = (tokenId, price, func) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		//openNotification();
		try{
			const account = getState().account;
			await sell(account, tokenId, price);
			dispatch(stopLoading());
			func();
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const approveItems = () => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		//openNotification();
		try{
			const account = getState().account;
			await approveTokens(account);
			dispatch(stopLoading());
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}

export const cancelItem = (orderId, func) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		//openNotification();
		try{
			const account = getState().account;
			await cancelOrder(account, orderId);
			dispatch(stopLoading());
			func();
			return Promise.resolve();
		}
		catch(e){
			console.log(e);
			dispatch(stopLoading());
			return Promise.reject(e);
		}
	};
}