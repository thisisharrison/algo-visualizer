import {
    RECEIVE_NUMBER,
    CLEAR_NUMBERS,
    RECEIVE_SORTED_NUMBERS
} from '../actions/list_actions';
import myNum from '../class/myNumber';

export const defaultArray = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48].map((n, i) => new myNum (i, n));

const _listInitialState = {
    unsorted: defaultArray,
    sorted: []
}
const listReducer = (state = _listInitialState, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_NUMBER:
            let unsorted = [...state.unsorted, action.number];
            return Object.assign({}, state, { unsorted: unsorted });
        case CLEAR_NUMBERS:
            return _listInitialState;
        case RECEIVE_SORTED_NUMBERS:
            return Object.assign({}, state, { sorted: action.numbers })
        default:
            return state;
    }
}

export default listReducer;