import React from 'react';
import Sidebar from './sidebar';
import Asset from './asset';

const Explore = (props) => {
  
  const list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'h'];

	return(
    <div className="container-fluid" id="explore-container">
      <div id="sidebar">
        <Sidebar />
      </div>
      <div className="container" id="explore-asset-container">
        {list.map((item) => (
          <Asset />
        ))}
      </div>
    </div>
  );
  
}

export default Explore;