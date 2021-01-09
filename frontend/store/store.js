import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

export const configureStore = () => {
    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
    return store;
}
