import {getOrdersByUser, getTokensByUser} from '../utils/index';
import metadata from '../utils/metadata.json';

export const setUserTokens = (tokens) => {
  return {
    type: 'SET_USER_TOKENS',
    tokens
  };
};

export const fetchTokensByUser = () => {
  return async(dispatch, getState) => {
    try{
      const account = getState().account;
      let tokenIds = await getTokensByUser(account);
      const data = [];
      tokenIds.map((tokenId) => {
        const meta = metadata[tokenId];
        meta['tokenId'] = tokenId;
        data.push(meta);
      })
      dispatch(setUserTokens(data));
    }
    catch(e){
      console.log(e);
    }
  }
}