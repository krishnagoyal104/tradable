import React from 'react';
import {fromWei} from '../utils/index';

const Asset = (props) => {

	return(
		<div className="container" id="about-container">
      <h3>Overview</h3>
      <p>
        Trelix is a marketplace for in-game digital goods like collectables, skins and items and facilitates de-centralized exchange of these assets as NFTs.<br/>
      </p>
      <br/>

      <h3>Market requirement</h3>
      <p>
        A large number of online multiplayer games provide in-game items with randomly generated modifiers, that determine the quality and rarity of the items. These games usually also support extensive customization of play styles that depend on the availability of specific gear. Contemporarily popular strategic trends or ‘Meta’, as gamers call it, are always in development influencing the demand and price of items. Such games widely benefit from an active marketplace that facilitates a frictionless exchange of goods.
      </p>
      <br />

      <h3>Features</h3>
      <ul>
        <li>De-centralized marketplace for in-game assets as NFTs</li>

        <li>Contract that supports any game with tokenized assets following the ERC721 standard</li>

        <li>Visualization of in-game inventory, directly on the platform</li>
      </ul>
      <br />

      <h3>How it works</h3>
      <ul>
        <li>Games shall on-board to Trelix and deploy a separate ERC721 contract, where each token represents an in-game item.</li>

        <li>New tokens are minted by the game servers to any user who gets an item in the game. In essence, each in-game item shall be converted to a tradable entity and trade is then facilitated by Trelix.</li>

        <li>The games shall ensure that the ownership of the items as seen in the game is in direct sync with that on the chain. To ensure this, the game servers will fetch the latest assets owned by a user from the contract and populate the user’s inventory in the game. A player can also purchase listed items on Trelix. Once purchased, you will possess on-chain ownership of that asset. The game servers will fetch this information and subsequently, update your in-game inventory. </li>

        <li>Any item obtained by a player can be put up for sale from within the game. The game shall re-direct to Trelix, where he can put the item up for sale, specifying his proposed price. </li>
      </ul>
      <br />

      <h3>Existing solutions</h3>
      <p>
        Existing solutions like G2G and PlayerAuctions are platforms that facilitate the listing and viewing of items and getting the details to connect in-game. The actual trade itself happens in the game with the platforms acting as escrows, which has several shortcomings . In contrast, Trelix has the potential of converting each item into an actual tradable token, the exchange of which directly happens trustlessly on Trelix. The possession of the token is equivalent to the possession of the item and trades are seamless.<br/>
      </p>
      <br />

      {
      window.network == 'matic' ?
        <div>
          <h3>Integration with Matic</h3>
          <p>
            Trelix as a blockchain based platform, requires support for a high throughput of transactions happening smoothly over the blockchain. We see Matic, with its high transaction throughput and negligible transaction costs, as the optimum platform for our application.
          </p>
        </div> :
        <div>
          <h3>Integration with Binance Smart Chain</h3>
          <p>
            Trelix as a blockchain based platform, requires support for a high throughput of transactions happening smoothly over the blockchain. We see the Binance Smart Chain, with its high transaction throughput and negligible transaction costs, as the optimum platform for our application.
          </p>
        </div>
      }
      <br />

      <h3>Future work</h3>
      <ul>
        <li>Support for auctioning items</li>
        <li>Partnering up with games</li>
        <li>Support for ERC1155 token standard</li>
        <li>API support for onboarding game developers</li>
      </ul>
    </div>
	);
}

export default Asset;