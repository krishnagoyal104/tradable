import Web3 from 'web3';
import {ERC721_ABI, EXCHANGE_ABI} from './abi.js';

const web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

let RELIC_ADDRESS;
let EXCHANGE_ADDRESS;

let tokenContract;
let contract;

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
			const network = await web3.eth.net.getId();
			console.log(network);
			if(network == 80001 || network == 97){
				window.network = network;
				console.log(window.network);
				RELIC_ADDRESS = network == 80001 ? '0xB73764A8D20ceed6E372662F889BA7bE5D9c264c' : '0xef2a21965b83Fb6d9d3D174789d8504B88359608';
				EXCHANGE_ADDRESS = network == 80001 ? '0x676766FA21022d27992677CaF8Cde63036fBFe78' : '0x9d1898E224Cb068DAc499199674990A960D8CaD0';
				console.log('Token: ', RELIC_ADDRESS);
				console.log('Exchange: ', EXCHANGE_ADDRESS);
				tokenContract = new web3.eth.Contract(ERC721_ABI, RELIC_ADDRESS);
				contract = new web3.eth.Contract(EXCHANGE_ABI, EXCHANGE_ADDRESS);
				resolve();
			}
			else{
				reject();
			}
		}
		catch(e){
			console.log(e);
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

export const getTokensByUser = (account) => {
	const promise = new Promise(async(resolve, reject) => {
		try{
			const result = await tokenContract.methods.getTokensByUser(account).call();
			resolve(result);
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
	if(orders.length < 1){
		return [];
	}
	const result = orders.filter((order) => {
			return order.metadata.game_name == name;
	});
	return result;
}