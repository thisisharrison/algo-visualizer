import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { configureStore } from './store/store';
import Root from './components/root';

// Refactor Later
import { highlightCompare, highlightReset } from './actions/highlight_actions';
import { reorder } from './actions/order_actions';
// import animationReducer from './reducers/animation_reducer';
import myNum from './class/myNumber';
import Util from './util/util';
import { bubbleSort, actualBubbleSort } from './actions/algorithms/bubble_sort';
import { mergeSort, actualMergeSort, merge } from './actions/algorithms/merge_sort';
import { receiveAnimation } from './actions/animation_actions';
import { receiveNumber, receiveSortedNumbers } from './actions/list_actions';


document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const store = configureStore();
    ReactDOM.render(<Root store={store} />, content);

    // TESTED
    window.store = store;
    window.dispatch = store.dispatch;
    window.highlightCompare = highlightCompare; 
    window.highlightReset = highlightReset;
    window.reorder = reorder;
    window.bubbleSort = bubbleSort;
    window.actualBubbleSort = actualBubbleSort;
    window.receiveAnimation = receiveAnimation;
    window.receiveSortedNumbers = receiveSortedNumbers;
    window.mergeSort = mergeSort;
    window.actualMergeSort = actualMergeSort;
    window.merge = merge;
    window.receiveNumber = receiveNumber;
    // TESTING
    // window.animationReducer = animationReducer;
    window.testingarray = [2, 7, 1].map((e, i) => new myNum(i, e));
    window.testingarray1 = [2, 7, 1];

    
    window.Util = Util;
});

export const SPEED = 300;


// const runAnimation = () => (dispatch, getState) => {
//     const allAnimation = getState().animation.slice();
//     const sortingArray = getState().list.sorting;
//     for (let i = 0, p = Promise.resolve(); i < allAnimation.length; i++) {
//         p = p.then(_ => new Promise(resolve => 
//             setTimeout(() => {
//                 console.log('In Timeout');
//                 let animation = allAnimation[i];
//                 let animationType = Object.keys(animation)[0];
//                 let animationNumbers = Object.values(animation)[0];
//                 let newArray = (animationType === 'swapping') ? swapByObject(animationNumbers[0], animationNumbers[1], sortingArray) : sortingArray;
//                 // if (animationType === 'one-side-sorting') ? // TO DO
//                 dispatch({
//                     type: 'RUN',
//                     klass: animationType,
//                     ids: animationNumbers.map(num => !num ?  null : num.id)
//                     // id1: !animationNumbers[0] ? null: animationNumbers[0].id,
//                     // id2: !animationNumbers[1] ? null: animationNumbers[1].id
//                 })
//                 dispatch(receiveSorting(newArray));
//                 // {
//                 //     type: 'RECEIVE_SORTING',
//                 //     numbers: 
//                 // })
//                 resolve();
//         }, 250)
//     ))}
// }
// function swapByObject(o1, o2, array) {
//     if (o1 === undefined || o2 === undefined) return array;
//     let i1 = null;
//     let i2 = null;
//     for (let i = 0; i < array.length; i++) {
//         if (i1 !== null & i2 !== null) break;
//         if (i1 === null) i1 = array[i].id === o1.id ? i : null;
//         if (i2 === null) i2 = array[i].id === o2.id ? i : null;
//     }
//     [array[i1], array[i2]] = [array[i2], array[i1]];
//     return array;
// }

// const asyncMergeSort = array => dispatch => {
//     if (array.length < 2) return array;
//     let midIdx, length, left, right, sortLeft, sortRight;
//     length = array.length;
//     midIdx = Math.floor(length / 2);
//     left = array.slice(0, midIdx);
//     right = array.slice(midIdx);
//     sortLeft = dispatch(asyncMergeSort(left));
//     // dispatch(animateSortedSide(sortLeft, right))
//     sortRight = dispatch(asyncMergeSort(right));
//     // dispatch(animateSortedSide(sortLeft, sortRight))
//     return dispatch(asyncMerge(sortLeft, sortRight))
// }
// const asyncMerge = (a1, a2) => dispatch => {
//     let merged, nextItem;
//     merged = [];
//     while (a1.length > 0 && a2.length > 0) {
//         dispatch(receiveAnimation([a1[0], a2[0]], 'COMPARE'));
//         if (a1[0].val > a2[0].val) {
//             nextItem = a2.shift();
//         } else {
//             nextItem = a1.shift();
//         }
//         merged.push(nextItem);
//     }
//     dispatch(receiveAnimation([...merged, ...a1, ...a2], 'SORTED'))
//     return [...merged, ...a1, ...a2];
// }
window.q = [1, 2, 3, 4]
window.w = [2, 4, 5, 6, 1, 3, 8, 9]
// [1, 2, 4, 5, 6, 7, 8, 9]
window.receiveSubarrayMerge = (subarray, array) => {
    let indexes = [];
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el == subarray[i]);
        indexes.push(k);
    }
    // Smallest index 
    let minIndex = indexes.sort((a, b) => a - b)[0];
    return [...array.slice(0, minIndex), ...subarray, ...array.slice(indexes[indexes.length - 1] + 1)]
}
// Find subarray smallest index 
// Delete subarray numbers from array
// Insert subarray from smallest index
// Concat the rest 
window.insertMerge = (subarray, array) => {
    let indexes = [];
    for (let i = 0; i < subarray.length; i++) {
        let k = array.findIndex(el => el == subarray[i]);
        indexes.push(k);
    }
    // Smallest index 
    let minIndex = indexes.sort((a, b) => a - b)[0];
    let without = array.filter(n => !subarray.includes(n));
    return [...without.slice(0, minIndex), ...subarray, ...without.slice(minIndex)]
}
 








// // Reducer
// let example = [2, 7, 1, 4, 3, 1, 6, 5].map((n, i) => new myNum (i, n));
// let subarray = [new myNum (2, 1), new myNum (1, 7)]

// const initialState = { unsorted: example, sorted: [], sorting: example };
// const listReducer = (oldState = initialState, action) => {
//     Object.freeze(oldState);
//     let newState = Object.assign({}, oldState);
//     switch (action.type) {
//         case 'RECEIVE_NUMBER':
//             newState.unsorted = [...newState.unsorted, action.number]
//             return newState;
//         case 'RECEIVE_SORTED_NUMBERS':
//             newState.sorted = [...newState.sorted, ...action.numbers]
//             return newState;
//         case 'RECEIVE_SORTING': // Animates the sorting order
//             newState.sorting = action.numbers
//             return newState;
//         case 'CLEAR_NUMBERS':
//             newState.sorted = [];
//             newState.unsorted = [];
//             newState.sorting = [];
//             return newState;
//         case 'QUICK_SORT':
//             newState.sorted = Util.quickSort(newState.unsorted);
//             return newState;
//         case 'MERGE_SORT':
//             newState.sorted = Util.mergeSort(newState.unsorted);
//             return newState;
//         case 'BUBBLE_SORT':
//             newState.sorted = Util.bubbleSort(newState.unsorted);
//             return newState;
//         default: 
//             return oldState;
//     }
// }
// const animationReducer = (oldState = [], action) => {
//     Object.freeze(oldState);
//     let newState = Object.assign([], oldState);
//     switch (action.type) {
//         case 'COMPARE':
//             newState.push({ comparison: action.numbers })
//             return newState
//         case 'SWAPPING':
//             newState.push({ swapping: action.numbers })
//             return newState
//         case 'SORTED':
//             newState.push({ sorted: action.numbers })
//             return newState    
//         case 'RESET': 
//             newState.push({ reset: action.numbers })
//             return newState
//         case 'CLEAR_NUMBERS': 
//             return []
//         default:
//             return oldState;
//     }
// }
// const runReducer = (oldState = {klass: '', id1: '', id2: '', ids: ''}, action) => {
//     switch (action.type) {
//         case 'RUN':
//             return { klass: action.klass, id1: action.id1, id2: action.id2 , ids: action.ids}
//         case 'CLEAR_NUMBERS':
//             return {}
//         default:
//             return oldState;
//     }
// }
// export const rootReducer = combineReducers({
//     list: listReducer,
//     animation: animationReducer,
//     running: runReducer
// })

// Store







// window.Util = Util;