export const RECEIVE_COMPARE = 'RECEIVE_COMPARE';
export const RECEIVE_SWAP = 'RECEIVE_SWAP';
export const RECEIVE_SORTED = 'RECEIVE_SORTED';
export const RECEIVE_RESET = 'RECEIVE_RESET';
import { SPEED } from '../entry';

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

export const compare = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
    .then(() => dispatch(receiveCompare(numbers)))
)

export const swap = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSwap(numbers)))
)

export const sorted = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSorted(numbers)))
)

export const reset = numbers => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveSorted(numbers)))
)