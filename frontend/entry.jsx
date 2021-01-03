import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { Provider, connect } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


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
const receiveSortedNumbers = (numbers) => (
    {
        type: 'RECEIVE_SORTED_NUMBERS',
        numbers
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
const receiveCompare = (x, y) => dispatch => {
    setTimeout(()=> {
        dispatch({
            type: 'COMPARE',
            numbers: [x, y]
        })
    }, 0)
    setTimeout(() => {
        dispatch({
            type: 'RESET',
            numbers: [x, y]
        })
    }, 5000)
}
const receiveSort = (x, y) => dispatch => {
    setTimeout(() => {
        dispatch({
            type: 'SORT',
            numbers: [x, y]
        })
    }, 0)
    setTimeout(() => {
        dispatch({
            type: 'RESET',
            numbers: [x, y]
        })
    }, 5000)
}

// async thunk action creator => this should be what's dispatched by clicking on a sorting algorithm
// const asyncMergeSort = array => dispatch => ({
    // merge sort algorithm
    // dispatch(compare(...))
    // dispatch(sort())
// })
// Then the reducers should just change the for each _SORT case newState.sorted = action.array
const asyncBubbleSort = array => dispatch => {
    let unsorted = true;
    let clone = Object.assign([], array);
    let length = array.length;
    while (unsorted) {
        unsorted = false;
        for (let i = 0; i < length - 1; i++) {
            dispatch(receiveCompare(clone[i], clone[i + 1]));
            switch (clone[i] <= clone[i + 1]) {
                case true:
                    break;
                case false:
                    [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                    dispatch(receiveSort(clone[i], clone[i + 1]));
                    unsorted = true;
                    break;
            }
        }
    }
    dispatch(receiveSortedNumbers(clone))
    return clone;   
}

// Reducer
const initialState = { unsorted: [2, 7, 1, 4, 9, 3, 8, 10], sorted: []};
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
        case 'CLEAR_NUMBERS':
            newState.sorted = [];
            newState.unsorted = [];
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
            return newState;
        case 'SORT':
            newState.push({ sort: action.numbers })
            return newState;
        case 'RESET': 
            newState.push({ reset: action.numbers })
            return newState;
        default:
            return oldState;
    }
}
const rootReducer = combineReducers({
    list: listReducer,
    animation: animationReducer
})

// Store
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
window.store = store;
window.receiveSort = receiveSort;
window.receiveCompare = receiveCompare;
window.animationReducer = animationReducer;
window.a = [2, 7, 1, 4, 9, 3, 8, 10, 1];


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
const toolbar_mapStateToProps = state => ({
    array: state.list.unsorted
})
const toolbar_mapDispatchToProps = dispatch => (
    {
        receiveNumber: () => dispatch(receiveNumber(Util.randomNumber())),
        clearNumbers: () => dispatch(clearNumbers()),
        quickSort: () => dispatch(quickSort()),
        mergeSort: () => dispatch(mergeSort()),
        bubbleSort: () => dispatch(bubbleSort()),
        asyncBubbleSort: (array) => dispatch(asyncBubbleSort(array))
    }
)
const Toolbar = ({ array, receiveNumber, clearNumbers, quickSort, mergeSort, bubbleSort, asyncBubbleSort }) => {
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
                // onClick={bubbleSort}
                onClick = {(e) => asyncBubbleSort(array)}>
                Bubble Sort
            </button>
            <button type="button"
                onClick={ clearNumbers }>
                Clear
            </button>
        </div>
    )
}
const ToolbarContainer = connect(toolbar_mapStateToProps, toolbar_mapDispatchToProps)(Toolbar);

// List
const list_mapStateToProps = state => (
    {
        numbers: state.list.unsorted,
        sorted: state.list.sorted,
        animation: Array.from(state.animation) // Maybe we animate after sorted array is finish. And set timeout per anime
    }
);
const List = ({ numbers, animation }) => {
    let klass = "";
    let cloneAnimation = Object.assign([], animation);
    const list = numbers.map((number, idx) => {
        if (cloneAnimation.length > 0) {
            let anime = cloneAnimation[0];
            klass = Object.keys(anime)[0];
            let values = anime[klass];
            if (values.includes(number)) { 
                cloneAnimation.shift();
            }
            console.log(klass)
            if (klass === "reset") {
                debugger
                klass = "";
            }
        }
        return (<ListItem number={number} key={idx} klass={klass}/>)
    })
    return (
        <div>
            <h1>Inside List</h1>
            <ul className="list">
                {list}
            </ul>
        </div>
    )
}
// class List extends React.Component {
//     render() {
//         const list = this.props.numbers.map((number, idx) => <ListItem number={number} key={idx} ogIdx={idx}/>)
//         return (
//             <div>
//                 <h1>Inside List</h1>
//                 <ul className="list">
//                     {list}
//                 </ul>
//             </div>
//         )
//     }
// }
const ListContainer = connect(list_mapStateToProps, null)(List);

// ListItem
const ListItem = ({number, klass}) => {
    return (
    <div>
        <li className={`item ${klass}`} >{number}</li>
    </div>

)}
// If I push to the Ul new List Item every add new I can keep the ogIdx the same. 
// How will I get the newIdx?
// Maybe the animation tracks the idx and then find the Listitem with state that matches
// and then change that ListItem?
// class ListItem extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             ogIdx: this.props.ogIdx,
//             newIdx: "",
//             compare: false,
//             swap: false,
//             active: true
//         }
//     }
//     render(){
//         const number = this.props.number;
//         return(
//         <li className="item">{number}</li>
//         )
//     }
// }


// Util
const Util = {
    randomNumber(min = 1, max = 99) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    mergeSort(array) {
        if (array.length < 2) return array;
        console.log('Active: ', array) // Working on Visualizer
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
            console.log('Comparison: ', a1[0], a2[0]) // Working on Visualizer
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

// Using thunk to create UI of sorting indexes 
// However, Indexes will change.
// List Reducer should keep original index and new index order
function animateSort(state) {
    return function (dispatch) {
        let array = state.animation
        for (subarray of array) {
            setTimeout(() => {
                dispatch(comparison(subarray))
            }, 5000) // Maybe needs some kind of promise, if doesn't need to sort
            setTimeout(() => {
                dispatch(swap(subarray))
            }, 10000) // So we will have 5 sec between compare and swap cycle
        }
    }
}
// If we could track index changes
// [0,1,2,3,4,5]
// [1,0,2,3,4,5]
// [1,0,3,2,4,5]
// Maybe a reducer with a state tree like 
// {
//     animation: 
//     [
//         {
//             comparison: [1, 2]
//         },
//         {
//             swap: [1, 2]
//         },
//         {
//             comparison: [3, 4]
//         },
//         {
//             swap: [3, 4]
//         }
//     ]
// },
//      list: {
//              unsorted: [],
//              sorted: []
//          }
// }