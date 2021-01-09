import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { configureStore } from './store/store';
import Root from './components/root';
import App from './components/app';

// Refactor Later
import { receiveNumber, clearNumbers, receiveSortedNumbers, receiveSorting, quickSort, mergeSort, bubbleSort } from './actions/actions';
import { compare, reset } from './actions/highlight_actions';
import { reorder } from './actions/order_actions';
// import animationReducer from './reducers/animation_reducer';
import myNum from './class/myNumber';
import Util from './util/util';


document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const store = configureStore();
    ReactDOM.render(<Root store={store} />, content);

    // TESTED
    window.store = store;
    window.dispatch = store.dispatch;
    window.compare = compare; 
    window.reset = reset;
    window.reorder = reorder;
    // TESTING
    // window.animationReducer = animationReducer;
    
    window.Util = Util;
});

export const SPEED = 2000;


const receiveAnimation = (numbers, type) => dispatch => {
    dispatch({
        type: type,
        numbers
    })
    dispatch({
        type: 'RESET',
        numbers
    })
}
const runAnimation = () => (dispatch, getState) => {
    const allAnimation = getState().animation.slice();
    const sortingArray = getState().list.sorting;
    for (let i = 0, p = Promise.resolve(); i < allAnimation.length; i++) {
        p = p.then(_ => new Promise(resolve => 
            setTimeout(() => {
                console.log('In Timeout');
                let animation = allAnimation[i];
                let animationType = Object.keys(animation)[0];
                let animationNumbers = Object.values(animation)[0];
                let newArray = (animationType === 'swapping') ? swapByObject(animationNumbers[0], animationNumbers[1], sortingArray) : sortingArray;
                // if (animationType === 'one-side-sorting') ? // TO DO
                dispatch({
                    type: 'RUN',
                    klass: animationType,
                    ids: animationNumbers.map(num => !num ?  null : num.id)
                    // id1: !animationNumbers[0] ? null: animationNumbers[0].id,
                    // id2: !animationNumbers[1] ? null: animationNumbers[1].id
                })
                dispatch(receiveSorting(newArray));
                // {
                //     type: 'RECEIVE_SORTING',
                //     numbers: 
                // })
                resolve();
        }, 250)
    ))}
}
function swapByObject(o1, o2, array) {
    if (o1 === undefined || o2 === undefined) return array;
    let i1 = null;
    let i2 = null;
    for (let i = 0; i < array.length; i++) {
        if (i1 !== null & i2 !== null) break;
        if (i1 === null) i1 = array[i].id === o1.id ? i : null;
        if (i2 === null) i2 = array[i].id === o2.id ? i : null;
    }
    [array[i1], array[i2]] = [array[i2], array[i1]];
    return array;
}
const asyncBubbleSort = array => dispatch => {
    let unsorted = true;
    let clone = Object.assign([], array);
    let length = array.length;
    while (unsorted) {
        unsorted = false;
        for (let i = 0; i < length - 1; i++) {
            dispatch(receiveAnimation([clone[i], clone[i + 1]], 'COMPARE'));
            switch (clone[i].val <= clone[i + 1].val) {
                case true:
                    dispatch(receiveAnimation([clone[i], clone[i + 1]], 'SORTED'));
                    break;
                case false:
                    [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                    dispatch(receiveAnimation([clone[i], clone[i + 1]], 'SWAPPING'));
                    dispatch(receiveAnimation([clone[i], clone[i + 1]], 'SORTED'));
                    unsorted = true;
                    break;
            }
        }
    }
    dispatch(receiveSortedNumbers(clone));
    dispatch(runAnimation());
    return clone;   
}
const asyncMergeSort = array => dispatch => {
    if (array.length < 2) return array;
    let midIdx, length, left, right, sortLeft, sortRight;
    length = array.length;
    midIdx = Math.floor(length / 2);
    left = array.slice(0, midIdx);
    right = array.slice(midIdx);
    sortLeft = dispatch(asyncMergeSort(left));
    // dispatch(animateSortedSide(sortLeft, right))
    sortRight = dispatch(asyncMergeSort(right));
    // dispatch(animateSortedSide(sortLeft, sortRight))
    return dispatch(asyncMerge(sortLeft, sortRight))
}
const asyncMerge = (a1, a2) => dispatch => {
    let merged, nextItem;
    merged = [];
    while (a1.length > 0 && a2.length > 0) {
        dispatch(receiveAnimation([a1[0], a2[0]], 'COMPARE'));
        if (a1[0].val > a2[0].val) {
            nextItem = a2.shift();
        } else {
            nextItem = a1.shift();
        }
        merged.push(nextItem);
    }
    dispatch(receiveAnimation([...merged, ...a1, ...a2], 'SORTED'))
    return [...merged, ...a1, ...a2];
}
const receiveSubarrayMerge = subarray => (dispatch, getState) => {
    let indexes = [];
    let array = getState().list.sorting;
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el.id == subarray[i].id);
        indexes.push(k);
        if (indexes.length === subarray.length) break;
    }
    // Smallest index 
    let minIndex = indexes.sort()[0];
    let numbers = [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
    dispatch(receiveSorting(numbers));
}

// Reducer
let example = [2, 7, 1, 4, 3, 1, 6, 5].map((n, i) => new myNum (i, n));
let subarray = [new myNum (2, 1), new myNum (1, 7)]
window.subarray = subarray
window.receiveSubarrayMerge = receiveSubarrayMerge;
window.receiveSorting = receiveSorting;
const initialState = { unsorted: example, sorted: [], sorting: example };
const listReducer = (oldState = initialState, action) => {
    Object.freeze(oldState);
    let newState = Object.assign({}, oldState);
    switch (action.type) {
        case 'RECEIVE_NUMBER':
            newState.unsorted = [...newState.unsorted, action.number]
            return newState;
        case 'RECEIVE_SORTED_NUMBERS':
            newState.sorted = [...newState.sorted, ...action.numbers]
            return newState;
        case 'RECEIVE_SORTING': // Animates the sorting order
            newState.sorting = action.numbers
            return newState;
        case 'CLEAR_NUMBERS':
            newState.sorted = [];
            newState.unsorted = [];
            newState.sorting = [];
            return newState;
        case 'QUICK_SORT':
            newState.sorted = Util.quickSort(newState.unsorted);
            return newState;
        case 'MERGE_SORT':
            newState.sorted = Util.mergeSort(newState.unsorted);
            return newState;
        case 'BUBBLE_SORT':
            newState.sorted = Util.bubbleSort(newState.unsorted);
            return newState;
        default: 
            return oldState;
    }
}
const animationReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    let newState = Object.assign([], oldState);
    switch (action.type) {
        case 'COMPARE':
            newState.push({ comparison: action.numbers })
            return newState
        case 'SWAPPING':
            newState.push({ swapping: action.numbers })
            return newState
        case 'SORTED':
            newState.push({ sorted: action.numbers })
            return newState    
        case 'RESET': 
            newState.push({ reset: action.numbers })
            return newState
        case 'CLEAR_NUMBERS': 
            return []
        default:
            return oldState;
    }
}
const runReducer = (oldState = {klass: '', id1: '', id2: '', ids: ''}, action) => {
    switch (action.type) {
        case 'RUN':
            return { klass: action.klass, id1: action.id1, id2: action.id2 , ids: action.ids}
        case 'CLEAR_NUMBERS':
            return {}
        default:
            return oldState;
    }
}
export const rootReducer = combineReducers({
    list: listReducer,
    animation: animationReducer,
    running: runReducer
})

// Store

window.animationReducer = animationReducer;
window.runReducer = runReducer;
window.a = [2, 7, 1, 4].map((e, i) => new myNum (i, e));
window.b = [2, 7, 1, 4];
window.asyncMergeSort = asyncMergeSort;
window.asyncBubbleSort = asyncBubbleSort;





window.Util = Util;