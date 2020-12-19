import React from 'react';
import Tag from 'antd/lib/tag';

const Navbar = (props) => {

	return(
    <nav className="navbar navbar-expand-lg navbar-light my_navbar">
      <div className="container">
        <a className="navbar-brand" href="/explore"><img id="navbar-logo" src="/images/logo.png" /><span id="navbar-name" className="navbar-link-text">Trelix</span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse tradable-navbar" id="navbarResponsive">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0" id="main_nav">
            <li className="nav-item">
                <a className="nav-link" href="/explore"><span className="navbar-link-text">Explore</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/trades"><span className="navbar-link-text">Trades</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/inventory"><span className="navbar-link-text">Inventory</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/about"><span className="navbar-link-text">About</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link"><Tag id="navbar-network" color='red'>{window.network == 'matic' ? 'matic' : 'binance'} testnet</Tag></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  
}

export default Navbar;