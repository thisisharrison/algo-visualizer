import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';

// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    ReactDOM.render(<Root store={store} />, content);
});

// Hierarchy:
// Root
//     App (Top-level concern)
//         ToolbarContainer
//             Toolbar
//         ListContainer
//             ListItem

// Action
const receiveNumber = (number) => (
    {
        type: 'RECEIVE_NUMBER',
        number
    }
)
const clearNumbers = () => (
    {
        type: 'CLEAR_NUMBERS'
    }
)
const quickSort = () => (
    {
        type: 'QUICK_SORT'
    }
)
const mergeSort = () => (
    {
        type: 'MERGE_SORT'
    }
)
const bubbleSort = () => (
    {
        type: 'BUBBLE_SORT'
    }
)

// Reducer
const listReducer = (oldState = [], action) => {
    switch (action.type) {
        case 'RECEIVE_NUMBER':
            return [...oldState, action.number];
        case 'CLEAR_NUMBERS':
            return [];
        case 'QUICK_SORT':
            return Util.quickSort(oldState);
        case 'MERGE_SORT':
            return Util.mergeSort(oldState);
        case 'BUBBLE_SORT':
            return Util.bubbleSort(oldState);
        default: 
            return oldState;
    }
}

// Store
const store = createStore(listReducer);
window.store = store;
window.receiveNumber = receiveNumber;
window.a = [2, 7, 1, 4, 9];


// Components
const Root = ({ store }) => (
    <div>
        <h1>Inside Provider</h1>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)
const App = () => (
    <div>
        <h1>Inside App</h1>
        <ToolbarContainer />
        <ListContainer />
    </div>
)

// Toolbar
const toolbar_mapDispatchToProps = dispatch => (
    {
        receiveNumber: () => dispatch(receiveNumber(Util.randomNumber())),
        clearNumbers: () => dispatch(clearNumbers()),
        quickSort: () => dispatch(quickSort()),
        mergeSort: () => dispatch(mergeSort()),
        bubbleSort: () => dispatch(bubbleSort())
    }
)
const Toolbar = ({ receiveNumber, clearNumbers, quickSort, mergeSort, bubbleSort }) => {
    return (
        <div>
            <h1>Inside Toolbar</h1>
            <button type="button"
                onClick={ receiveNumber }>
                Add Number
            </button>
            <button type="button"
                onClick={ quickSort }>
                Quick Sort
            </button>
            <button type="button"
                onClick={ mergeSort }>
                Merge Sort
            </button>
            <button type="button"
                onClick={bubbleSort}>
                Bubble Sort
            </button>
            <button type="button"
                onClick={ clearNumbers }>
                Clear
            </button>
        </div>
    )
}
const ToolbarContainer = connect(null, toolbar_mapDispatchToProps)(Toolbar);

// List
const list_mapStateToProps = state => (
    {
        numbers: state
    }
);
const List = ({ numbers }) => {
    const list = numbers.map((number, idx) => <ListItem number={number} key={idx} />)
    return (
        <div>
            <h1>Inside List</h1>
            <ul className="list">
                {list}
            </ul>
        </div>
    )
}
const ListContainer = connect(list_mapStateToProps, null)(List);

// ListItem
const ListItem = ({number}) => (
    <li className="item">{number}</li>
)


// Util
const Util = {
    randomNumber(min = 1, max = 99) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    mergeSort(array) {
        if (array.length < 2) return array;
        let midIdx, length, left, right, sortLeft, sortRight;
        length = array.length;
        midIdx = Math.floor(length / 2);
        left = array.slice(0, midIdx);
        right = array.slice(midIdx);
        sortLeft = Util.mergeSort(left); 
        sortRight = Util.mergeSort(right);
        return Util.merge(sortLeft, sortRight);
    },
    merge(a1, a2) {
        let merged, nextItem;
        merged = [];
        while (a1.length > 0 && a2.length > 0) {
            nextItem = (a1[0] > a2[0]) ? a2.shift() : a1.shift();
            merged.push(nextItem);
        }
        return [...merged, ...a1, ...a2];
    },
    bubbleSort(array) {
        let unsorted = true;
        let clone = Object.assign([], array);
        let length = array.length;
        while (unsorted) {
            unsorted = false;
            for (let i = 0; i < length - 1; i++) {
                switch (clone[i] <= clone[i + 1]) {
                    case true:
                        break;
                    case false:
                        [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                        unsorted = true;
                        break;
                }
            }
        }
        return clone;
    },
    quickSort(array) {
        if (array.length < 2) return array;
        let pivot = array[0];
        let smaller = [];
        let larger = [];
        array.slice(1).forEach(num => {
            if(num <= pivot) {
                smaller.push(num);
            } else {
                larger.push(num);
            }
        })
        let sortSmaller = Util.quickSort(smaller);
        let sortLarger = Util.quickSort(larger);
        sortSmaller.push(pivot)
        return sortSmaller.concat(sortLarger);
    }
}
export default Util;
window.Util = Util;