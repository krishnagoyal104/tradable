import React from 'react';

const Home = (props) => {

	return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-light sticky-top my_navbar">
          <div className="container">
          <a className="navbar-brand"><img id="navbar-logo" src="/images/logo.png" /><span id="navbar-name" className="navbar-link-text">Trelix</span></a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0" id="main_nav">
                      <li className="nav-item" id="app-link">
                          <a className="nav-link" href="/explore"><span style={{color: 'white'}}>Go to App</span></a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
      <section className="container-fluid landing_page" id="main">
          <div id="background_images">
              <img id="triangle" src="/images/background/triangle.svg" alt="" />
              <img id="semi-circle" src="/images/background/semi-circle.svg" alt="" />
              <img id="square" src="/images/background/hexagon.png" />
              <img id="cube" src="/images/background/square.png" />
              <img id="circle" src="/images/background/circle.png" />
          </div>
          <div id="header">
              <img id="logo" src="/images/logo.png" />
              <h1 id="header_text">Welcome to Trelix</h1>
              <h4>Buy and Sell digital relics</h4>
              <div id="banner-container">
                <h5>Powered by </h5>
                {window.network == 'matic' ?
                    <img id="banner-image-matic" src="/images/matic.png" /> :
                    <img id="banner-image-binance" src="/images/binance.png" />
                }
              </div>
          </div>
      </section>
    </div>
  );
  
}

export default Home;