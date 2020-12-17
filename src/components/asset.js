import React from 'react';
import {fromWei} from '../utils/index';

const Asset = (props) => {

	return(
		<div id="tradable-card" onClick={() => props.navigate(props.orderId)}>
			<div id="tradable-card-top">
				<img id="asset-image" src={`https://trelix.s3.ap-south-1.amazonaws.com/icons/${props.tokenId}.png`}></img>
			</div>
			<div id="tradable-card-bottom">
				<div id="tradable-card-bottom-left">
					<span id="issuer"><b>{props.metadata.item_details['Item name']}</b></span>
					<span id="name">{props.metadata.item_details['Item type']}</span>
				</div>
				<div id="tradable-card-bottom-right">
				<p>Ξ {props.price && fromWei(props.price)}</p>
				</div>
			</div>
		</div>
	);
}

export default Asset;