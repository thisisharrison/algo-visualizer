import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import { configureStore } from './store/store';
import Root from './components/root';

// Refactor Later
import { receiveNumber, clearNumbers, receiveSortedNumbers, quickSort, mergeSort, bubbleSort } from './actions/actions';
import myNum from './class/myNumber';


document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const store = configureStore();
    ReactDOM.render(<Root store={store} />, content);

    window.store = store;
    window.dispatch = store.dispatch;
});

// Hierarchy:
// Root
//     App (Top-level concern)
//         ToolbarContainer
//             Toolbar
//         ListContainer
//             ListItem


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
                debugger
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
                dispatch({
                    type: 'RECEIVE_SORTING',
                    numbers: newArray
                })
                
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
    // animate sorting one side // TO DO
    // We should tear down the subarray from full array
    // render sorted subarray and unsorted other half
    // render one number at a time
    // need a new action creator 
    dispatch(receiveAnimation([...merged, ...a1, ...a2], 'SORTED'))
    return [...merged, ...a1, ...a2];
}

// Reducer
let example = [2, 7, 1, 4, 3, 1, 6, 5].map((n, i) => new myNum (i, n));
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
window.Util = Util;

window.asyncMergeSort = asyncMergeSort;
window.asyncBubbleSort = asyncBubbleSort;

// Components
export const App = () => (
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
        asyncMergeSort: (array) => new Promise (resolve => {
            resolve(dispatch(asyncMergeSort(array)));
        }).then((sorted) => {
            dispatch(receiveSortedNumbers(sorted));
            dispatch(runAnimation());
        }),
        asyncBubbleSort: (array) => dispatch(asyncBubbleSort(array))
    }
)
const Toolbar = ({ array, receiveNumber, clearNumbers, quickSort, mergeSort, bubbleSort, asyncBubbleSort, asyncMergeSort }) => {
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
                onClick={ (e) => asyncMergeSort(array) }>
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
        numbers: state.list.unsorted.map(n => n.val),
        sorted: state.list.sorted.map(n => n.val),
        sorting: state.list.sorting,
        klass: state.running.klass,
        ids: state.running.ids
        // id1: state.running.id1,
        // id2: state.running.id2
    }
);
const List = ({ sorting, klass, id1, id2, ids }) => {
    const list = sorting.map((number, idx) => {
        return (<ListItem number={number} key={idx} klass={klass} id1={id1} id2={id2} ids={ids}/>)
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
const ListContainer = connect(list_mapStateToProps, null)(List);

// ListItem
class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { number, klass, id1, id2, ids } = this.props;
        let _klass, _number;
        // _klass = (number.id === id1 || number.id === id2) ? klass : "";
        _klass = (ids && ids.includes(number.id)) ? klass : "";
        _number = number.val;
        return (
        <div>
            <span className="number"><li className={`item ${_klass}`}>{_number}</li></span>
        </div>
        )    
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.running !== this.props.running) {
    //         let running = this.props.running;
    //         let numbers = Object.values(running)[0];
    //         let klass = numbers.includes(this.props.number) ? Object.keys(running)[0] : "";
    //         this.setState({klass: klass});
    //     }
    // }
}


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
            console.log('Comparison: ', a1[0], a2[0]) // Working on Visualizer
            nextItem = (a1[0] > a2[0]) ? a2.shift() : a1.shift();
            console.log('Sort: ', a1[0], a2[0])
            merged.push(nextItem);
        }
        let x = [...merged, ...a1, ...a2];
        console.log('Sorted: ', x);
        return x;
    },
    bubbleSort(array) {
        let unsorted = true;
        let clone = Object.assign([], array);
        let length = array.length;
        while (unsorted) {
            unsorted = false;
            for (let i = 0; i < length - 1; i++) {
                console.log('Compares: ', [clone[i], clone[i + 1]])
                console.log('Reset: ', [clone[i], clone[i + 1]])
                switch (clone[i] <= clone[i + 1]) {
                    case true:
                        break;
                    case false:
                        [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                        console.log('Sort: ', [clone[i], clone[i + 1]]) 
                        console.log('Reset: ', [clone[i], clone[i + 1]]) // Working on Visualizer
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
window.Util = Util;
