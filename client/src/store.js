import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducers/index'; 


const store = createStore(
    Reducer,
    compose(
      applyMiddleware(thunk)
    )
  );
  
  export default store;