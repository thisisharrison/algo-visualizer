import { CLEAR_NUMBERS } from '../actions/list_actions';
import { UPDATE_HIGHLIGHT, UPDATE_PERSIST, CLEAR_PERSIST } from '../actions/highlight_actions';

const initialState = {
    compare: [],
    swap: [],
    sorted: [],
    active: [],
    inactive: [],
    pivot: [],
}

const highlightReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case UPDATE_HIGHLIGHT:
            const persists = {
                active: state.active,
                inactive: state.inactive,
                pivot: state.pivot
            }
            return Object.assign({}, initialState,
                { [action.highlight]: action.value },
                persists
                );
        case UPDATE_PERSIST:
            const elements = state[action.highlight];
            return Object.assign({}, state, 
                { [action.highlight]: [...elements, ...action.value] }
                )
        case CLEAR_PERSIST:
            return Object.assign({}, state, 
                { [action.highlight] : [] }
                );
        case CLEAR_NUMBERS:
            return initialState;
        default:
            return state;
    }
}

export default highlightReducer;