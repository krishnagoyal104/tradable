import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import accountReducer from '../reducers/account';
import orderReducer from '../reducers/orders';
import userReducer from '../reducers/user';
import loader from '../reducers/loader';

let composeEnhancers = compose;

if(process.env.NODE_ENV === 'development'){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['orders']
}

const rootReducer = combineReducers({
  account: accountReducer,
  orders: orderReducer,
  user: userReducer,
  loader: loader
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
  const persistor = persistStore(store);
  //persistor.purge();
  return {store, persistor};
};