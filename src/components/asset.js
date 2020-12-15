import React from 'react';

const Asset = (props) => {

	return(
		<div id="tradable-card">
			<div id="tradable-card-top">
				<img src="images/logo.svg"></img>
			</div>
			<div id="tradable-card-bottom">
				<div id="tradable-card-bottom-left">
					<span id="issuer">issuer</span>
					<span id="name">name</span>
				</div>
				<div id="tradable-card-bottom-right">
					<p>price</p>
				</div>
			</div>
		</div>
	);
}

export default Asset;