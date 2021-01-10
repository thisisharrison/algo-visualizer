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
        if (indexes.length === subarray.length) break;
    }
    // Smallest index 
    let minIndex = indexes.sort()[0];
    // Replace 
    numbers = [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
    
    return new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveNewOrder(numbers)))
}