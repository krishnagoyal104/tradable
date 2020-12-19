import notification from 'antd/lib/notification';
import {startLoading, stopLoading} from './loader';
import {buy, sell, approveTokens, cancelOrder} from '../utils/index';

const openNotification = (text) => {
	notification.open({
		placement: 'topLeft',
		duration: '5',
		message: <span style={{fontSize: '20px'}}>{!text ? 'Transaction initiated' : 'Transaction submitted'}</span>,
		description: <span style={{fontSize: '18px'}}>{!text ? 'Please accept the transaction using metamask.' : text}</span>,
		icon: <img src="/images/metamask.png" style={{height: '30px', width: '30px'}} alt="" />,
	});
};

export const buyItem = (orderId, price, func) => {
	return async(dispatch, getState) => {
		dispatch(startLoading());
		openNotification();
		try{
			const account = getState().account;
			await buy(account, orderId, price);
			dispatch(stopLoading());
			openNotification('Item purchased!');
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
		openNotification();
		try{
			const account = getState().account;
			await sell(account, tokenId, price);
			dispatch(stopLoading());
			openNotification('Sell order placed!');
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
		openNotification();
		try{
			const account = getState().account;
			await approveTokens(account);
			dispatch(stopLoading());
			openNotification('Items approved to Trelix!');
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
		openNotification();
		try{
			const account = getState().account;
			await cancelOrder(account, orderId);
			dispatch(stopLoading());
			openNotification('Sell order cancelled!');
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