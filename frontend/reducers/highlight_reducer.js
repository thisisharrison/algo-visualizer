import {
    RECEIVE_COMPARE,
    RECEIVE_SWAP,
    RECEIVE_SORTED,
    RECEIVE_RESET
} from '../actions/highlight_actions';

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
        default:
            return state;
    }
}

export default highlightReducer;