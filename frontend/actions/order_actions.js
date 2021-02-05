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
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el.id === subarray[i].id);
        indexes.push(k);
    }
    let minIndex = indexes.sort((a, b) => a - b)[0];
    let without = array.filter(num => !subarray.map(s => s.id).includes(num.id));
    // Replace 
    numbers = [...without.slice(0, minIndex), ...subarray, ...without.slice(minIndex)]
    
    if (numbers.length !== array.length)
    { debugger }
    return new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveNewOrder(numbers)))
}

export const insertBefore = (num1, num2) => (dispatch, getState) => {
    if (num1 === undefined || num2 === undefined) return;
    let array = getState().visualizer.order.slice();
    // Inserts num1 before num2
    // Find index of num2
    let idx = array.findIndex(el => el.id === num2.id);
    // Split left and right. Right includes num2
    // Filter left and right (no num1)
    let left = array.slice(0, idx).filter(el => el.id !== num1.id);
    let right = array.slice(idx).filter(el => el.id !== num1.id);
    // [...left, num1, ...right]
    let numbers = [...left, num1, ...right];
    return new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(receiveNewOrder(numbers)))
}

export const swap = (idx1, idx2) => (dispatch, getState) => {
    let array = getState().visualizer.order.slice();
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]]
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
    .then(() => dispatch(receiveNewOrder(array)))
}

// [1, 2, 4, 5, 6, 7, 8, 9]
// window.receiveSubarrayMerge = (subarray, array) => {
//     let indexes = [];
//     for (let i = 0; i < subarray.length; i++) {
//         let k = array.findIndex(el => el == subarray[i]);
//         indexes.push(k);
//     }
//     // Smallest index 
//     let minIndex = indexes.sort((a, b) => a - b)[0];
//     return [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
// }
// Find subarray smallest index 
// Delete subarray numbers from array
// Insert subarray from smallest index
// Concat the rest 
// window.insertMerge = (subarray, array) => {
//     let indexes = [];
//     for (let i = 0; i < subarray.length; i++) {
//         let k = array.findIndex(el => el == subarray[i]);
//         indexes.push(k);
//     }
//     // Smallest index 
//     let minIndex = indexes.sort((a, b) => a - b)[0];
//     let without = array.filter(n => !subarray.includes(n));
//     return [...without.slice(0, minIndex), ...subarray, ...without.slice(minIndex)]
// }