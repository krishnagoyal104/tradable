import React from 'react';

const Home = (props) => {

	return(
    <div>
      <nav class="navbar navbar-expand-lg navbar-light sticky-top my_navbar">
          <div class="container">
              <a class="navbar-brand" href="#main">Tradable</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                  <ul class="navbar-nav ml-auto mt-2 mt-lg-0" id="main_nav">
                      <li class="nav-item" id="app-link">
                          <a class="nav-link" href="/explore"><span>Go to App</span></a>
                      </li>
                  </ul>
              </div>
          </div>
      </nav>
      <section class="container-fluid landing_page" id="main">
          <div id="background_images">
              <img id="triangle" src="images/background/triangle.svg" alt="" />
              <img id="semi-circle" src="images/background/semi-circle.svg" alt="" />
              <img id="square" src="images/background/hexagon.png" />
              <img id="cube" src="images/background/square.png" />
              <img id="circle" src="images/background/circle.png" />
          </div>
          <div id="header">
              <img id="logo" src="images/logo.png" />
              <h1 id="header_text">Welcome to Tradable</h1>
          </div>
      </section>
    </div>
  );
  
}

export default Home;