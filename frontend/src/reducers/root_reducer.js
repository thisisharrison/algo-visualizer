import listReducer from './list_reducer';
import visualizerReducer from './visualizer_reducer';
import toolbarReducer from './toolbar_reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    list: listReducer,
    visualizer: visualizerReducer,
    toolbar: toolbarReducer
})

export default rootReducer;