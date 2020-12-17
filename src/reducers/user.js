const initialState = [];

export default(state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_ORDERS':
      return action.orders;
    default:
      return state;  
  };
}