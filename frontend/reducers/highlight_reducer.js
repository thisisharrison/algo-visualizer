import {
    RECEIVE_COMPARE,
    RECEIVE_SWAP,
    RECEIVE_SORTED,
    RECEIVE_RESET,
    RECEIVE_SUBARRAY,
    RECEIVE_PIVOT
} from '../actions/highlight_actions';
import { CLEAR_NUMBERS } from '../actions/list_actions';

import { UPDATE_HIGHLIGHT } from '../actions/highlight_actions';

const initialState = {
    compare: [],
    swap: [],
    sorted: [],
    active: [],
    inactive: [],
    pivot: [],
}

// Refactor
const highlightReducer = (state = initialState, action) => {
    Object.freeze(state);
    switch (action.type) {
        case UPDATE_HIGHLIGHT:
            // We overwrite compare/swap/sorted highlights each round
            // But we don't want to overwrite if there is pivot/active/inactive highlights
            return Object.assign({}, initialState, 
                { active: state.active },
                { inactive: state.inactive },
                { pivot: state.pivot },
                { values: state.values.push(action.values) });
        case CLEAR_NUMBERS:
            return initialState;
        default:
            return state;
    }
}

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
        case RECEIVE_PIVOT: // Could we have a highlight that persist until told to reset (eg. Pivot, Active, Inactive)
            return Object.assign({}, state, { pivot: action.number })
        case CLEAR_NUMBERS: 
            return {}
        default:
            return state;
    }
}

// const defaultFilters = Object.freeze({
//     bounds: {},
//     minSeating: 1,
//     maxSeating: 10
// });
// if (action.type === UPDATE_FILTER) {
//     const newFilter = {
//         [action.filter]: action.value
//     };
//     return Object.assign({}, state, newFilter);
// } 

export default highlightReducer;