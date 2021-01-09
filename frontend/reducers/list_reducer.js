import {
    RECEIVE_NUMBER,
    CLEAR_NUMBERS,
    RECEIVE_SORTED_NUMBERS
} from '../actions/list_actions';

const _listInitialState = {
    unsorted: [],
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