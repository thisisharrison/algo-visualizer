import {
    RECEIVE_NUMBER,
    CLEAR_NUMBERS,
} from '../actions/list_actions';
import { RECEIVE_REORDER } from '../actions/order_actions';


const orderReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NUMBER:
            return [...state, action.number];
        case CLEAR_NUMBERS:
            return [];
        case RECEIVE_REORDER:
            return action.numbers;
        default: 
            return state;
    }
}

export default orderReducer;