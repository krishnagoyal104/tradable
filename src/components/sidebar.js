import React from 'react';

const Sidebar = (props) => {
  
  const list = ['a', 'b', 'c']

	return(
    <div>
      {list.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
	);
}

export default Sidebar;