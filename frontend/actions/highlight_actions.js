export const RECEIVE_COMPARE = 'RECEIVE_COMPARE';
export const RECEIVE_SWAP = 'RECEIVE_SWAP';
export const RECEIVE_SORTED = 'RECEIVE_SORTED';
export const RECEIVE_RESET = 'RECEIVE_RESET';
export const RECEIVE_SUBARRAY = 'RECEIVE_SUBARRAY';
export const RECEIVE_PIVOT = 'RECEIVE_PIVOT';
import { SPEED } from '../entry';


// Refactor compare, swap, reset etc.
export const changeHighlight = (highlight, value) => ({
    type: UPDATE_HIGHLIGHT,
    highlight,
    value
})

export const updateHiglight = (highlight, value) => dispatch => (
    new Promise(resolve => setTimeout(() =>
        resolve(
            dispatch(changeHighlight(highlight, value))
        ), SPEED
    ))
)


export const receiveCompare = (numbers) => (
    {
        type: RECEIVE_COMPARE,
        numbers
    }
)
export const receiveSwap = (numbers) => (
    {
        type: RECEIVE_SWAP,
        numbers
    }
)
export const receiveSorted = (numbers) => (
    {
        type: RECEIVE_SORTED,
        numbers
    }
)
export const receiveReset = (numbers) => (
    {
        type: RECEIVE_RESET,
        numbers
    }
)
export const receiveSubarray = (numbers) => (
    {
        type: RECEIVE_SUBARRAY,
        numbers
    }
)
// Could we have a highlight that persist until told to reset
export const receivePivot = (number) => (
    {
        type: RECEIVE_PIVOT,
        number
    }
)

export const highlightCompare = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
    .then(() => dispatch(receiveCompare(numbers)))
)

export const highlightSwap = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSwap(numbers)))
)

export const highlightSorted = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSorted(numbers)))
)

export const highlightReset = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveReset(numbers)))
)

export const highlightSubarray = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSubarray(numbers)))
)
export const highlightPivot = number => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receivePivot(number)))
)

// import { fetchBenches } from './bench_actions'

// export const UPDATE_FILTER = 'UPDATE_FILTER';

// export const changeFilter = (filter, value) => ({
//     type: UPDATE_FILTER,
//     filter,
//     value
// });

// export const updateFilter = (filter, value) => (dispatch, getState) => {
//     dispatch(changeFilter(filter, value));
//     return fetchBenches(getState().ui.filters)(dispatch);
// };

