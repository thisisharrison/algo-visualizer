import {
    RECEIVE_COMPARE,
    RECEIVE_SWAP,
    RECEIVE_SORTED,
    RECEIVE_RESET,
    RECEIVE_SUBARRAY
} from '../actions/highlight_actions';
import { CLEAR_NUMBERS } from '../actions/list_actions';

const highlightReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_COMPARE:
            return { compare: action.numbers }
        case RECEIVE_SWAP:
            return { swap: action.numbers }
        case RECEIVE_SORTED:
            return { sorted: action.numbers }
        case RECEIVE_RESET:
            return { reset: action.numbers }
        case RECEIVE_SUBARRAY:
            return { subarray: action.numbers }
        case CLEAR_NUMBERS: 
            return {}
        default:
            return state;
    }
}

export default highlightReducer;