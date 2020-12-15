import React from 'react';
import Input from './input';

const Create = (props) => {

	return(
    <div className="container" id="create-container">
      <h1>Create ERC721 Asset</h1>
      <Input name={"Name"} placeholder="Name of the token" />
      <Input name={"Symbol"} placeholder="Symbol of the token" />
      <Input name={"Description"} placeholder="Description of the token" />
      <button id="create-button"><span>Create</span></button>
    </div>
  );
  
}

export default Create;