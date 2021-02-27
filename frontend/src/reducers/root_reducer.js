import listReducer from './list_reducer';
import visualizerReducer from './visualizer_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    list: listReducer,
    visualizer: visualizerReducer
})

export default rootReducer;