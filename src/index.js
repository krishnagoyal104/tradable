import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
window.base_url = 'https://trelix.s3.ap-south-1.amazonaws.com';
//import reportWebVitals from './reportWebVitals';

App().then((Component) => {
	ReactDOM.render(Component, document.getElementById('root'));
});

/*if(window.ethereum){
	window.ethereum.on('chainChanged', (networkId) => {
		/*console.log(networkId);
		if(networkId != 4){
			alert('Please switch to the testnet.');
		}
		//window.location.reload();
		document.location.reload()
	});
}*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
