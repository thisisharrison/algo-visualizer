export const RECEIVE_NEW_ORDER = 'RECEIVE_NEW_ORDER';
import { SPEED } from '../entry';

export const receiveNewOrder = numbers => (
    {
        type: RECEIVE_NEW_ORDER,
        numbers
    }
)

export const reorder = subarray => (dispatch, getState) => {
    let numbers;
    let array = getState().visualizer.order.slice();
    let indexes = [];
    // Find the index of subarray numbers from array
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el.id === subarray[i].id);
        indexes.push(k);
        // if (indexes.length === subarray.length) break;
    }
    // Smallest index 
    let minIndex = indexes.sort((a, b) => a - b)[0];
    let clone = array.filter(num => !subarray.map(sub => sub.id).find(id => id === num.id))
    // Replace 
    numbers = [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
    // numbers = [...array.slice(0, minIndex), ...subarray, ...clone]
    if (numbers.length < 10) {
        debugger
    }
    return new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveNewOrder(numbers)))
}