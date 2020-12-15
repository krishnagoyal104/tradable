import React from 'react';

const Navbar = (props) => {

	return(
    <nav class="navbar navbar-expand-lg navbar-light sticky-top my_navbar">
      <div class="container">
        <a class="navbar-brand">Tradable</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse tradable-navbar" id="navbarResponsive">
          <ul class="navbar-nav ml-auto mt-2 mt-lg-0" id="main_nav">
            <li class="nav-item">
                <a class="nav-link" href="/explore">Explore</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/trades">Trades</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/create">Create</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
  
}

export default Navbar;