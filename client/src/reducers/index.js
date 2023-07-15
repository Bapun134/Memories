import { combineReducers } from 'redux';

import posts from './posts';

const Reducer  = combineReducers({ 
    posts: posts 
});

export default Reducer;