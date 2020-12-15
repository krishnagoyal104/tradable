import React from 'react';

const Sidebar = (props) => {
  
  const list = ['a', 'b', 'c']

	return(
    <div>
      {list.map((item) => (
        <p>{item}</p>
      ))}
    </div>
	);
}

export default Sidebar;