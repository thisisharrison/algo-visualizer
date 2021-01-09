import highlightReducer from './highlight_reducer';
import orderReducer from './order_reducer';
import { combineReducers } from 'redux';

const visualizerReducer = combineReducers({
    highlight: highlightReducer,
    order: orderReducer, 
    animation: animationReducer
})

export default visualizerReducer;

// Order of animation
// Compare > Sorted > Reset
// Compare > Swap / Sorting > Sorted > Reset