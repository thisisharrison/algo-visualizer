import {
    RECEIVE_NUMBER,
    CLEAR_NUMBERS,
    RECEIVE_SORTED_NUMBERS,
    RESET_NUMBERS
} from '../actions/list_actions';
import { RECEIVE_NEW_ORDER } from '../actions/order_actions';
import { defaultArray } from './list_reducer';

const orderReducer = (state = defaultArray, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NUMBER:
            return [...state, action.number];
        case CLEAR_NUMBERS:
            return [];
        case RECEIVE_NEW_ORDER:
            return action.numbers;
        case RESET_NUMBERS:
            return defaultArray;
        default: 
            return state;
    }
}

export default orderReducer;