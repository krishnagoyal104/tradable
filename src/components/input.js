import React from 'react';

const Input = (props) => {

	return(
    <div class="form__group field">
      <input type="input" class="form__field" placeholder={props.placeholder} name={props.name} id={props.name} required />
      <label for={props.name} class="form__label">{props.name}</label>
    </div>
  );
  
}

export default Input;