export const RECEIVE_REORDER = 'RECEIVE_REORDER';
import { SPEED } from '../entry';

export const receiveReorder = numbers => (
    {
        type: RECEIVE_REORDER,
        numbers
    }
)

export const reorder = (subarray, array) => dispatch => {
    let numbers;
    let indexes = [];
    // Find the index of subarray numbers from array
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el == subarray[i]);
        indexes.push(k);
        if (indexes.length === subarray.length) break;
    }
    // Smallest index 
    let minIndex = indexes.sort()[0];
    // Replace 
    numbers = [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
    
    return new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveReorder(numbers)))
}