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