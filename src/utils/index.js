import Web3 from 'web3';
import {ERC721_ABI, EXCHANGE_ABI} from './abi.js';
import {RELIC_ADDRESS, EXCHANGE_ADDRESS} from '../config/config';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

const tokenContract = new web3.eth.Contract(ERC721_ABI, RELIC_ADDRESS);
const contract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);
//const faucet = new web3.eth.Contract(FAUCET_ABI, FAUCET_ADDRESS);

export const enableMetamask = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await window.ethereum.enable();
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getNetwork = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const network = await web3.eth.net.getNetworkType();
			if(network === window.network){
				resolve();
			}
			else{
				reject();
			}
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getAccounts = (args) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await web3.eth.getAccounts();
			resolve(result[0]);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getEthPrice = (args) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await contract.methods.ETHUSD().call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getBalance = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const balance = await web3.eth.getBalance(account);
			resolve(balance);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getOrdersByUser = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await contract.methods.getOrdersByUser(account).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const getOrders = () => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await contract.methods.getOrders().call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

//tokenContract
export const approveTokens = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await tokenContract.methods.setApprovalForAll(EXCHANGE_ADDRESS, true).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fetchAllowance = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await tokenContract.methods.isApprovedForAll(account, EXCHANGE_ADDRESS).call();
			resolve(result);
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

const fetchTotalOrders = async() => {
	try{
		const id = await contract.methods.orderId.call();
	}
	catch(e){
		console.log(e);
	}
}

export const sell = (account, tokenId, price) => {
	const weiAmount = toWei(price);
	console.log(weiAmount);
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.sell(RELIC_ADDRESS, tokenId, weiAmount).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const buy = (account, orderId, price) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			price = Number(price);
			const value = price + price * 2/100;
			console.log(price, value);
			await contract.methods.buy(orderId).send({from: account, value});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const cancelOrder = (account, orderId) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			await contract.methods.cancelOrder(orderId).send({from: account});
			resolve();
		}
		catch(e){
			reject(e);
		}
	});
	return promise;
}

export const fromWei = (amount) => {
	try{
		return Web3.utils.fromWei(amount.toString());
	}
	catch(e){
		console.log(e);
	}
}

export const toWei = (amount) => {
	try{
		return Web3.utils.toWei(amount.toString());
	}
	catch(e){
		console.log(e);
	}
}

export const search = (orders, name) => {
	const result = orders.filter((order) => {
			return order.metadata.game_name == name;
	});
	return result;
}