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

// Action
const receiveNumber = (number) => (
    {
        type: 'RECEIVE_NUMBER',
        number
    }
)
const mergeSort = () => (
    {
        type: 'MERGE_SORT'
    }
)

// Reducer
const listReducer = (oldState = [], action) => {
    switch (action.type) {
        case 'RECEIVE_NUMBER':
            return [...oldState, action.number];
        case 'MERGE_SORT':
            return Util.mergeSort(oldState);
        default: 
            return oldState;
    }
}

// Store
const store = createStore(listReducer);
window.store = store;
window.receiveNumber = receiveNumber;


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
        mergeSort: () => dispatch(mergeSort())
    }
)
const Toolbar = ({ receiveNumber, mergeSort }) => {
    return (
        <div>
            <h1>Inside Toolbar</h1>
            <button type="button"
                onClick={ receiveNumber }>
                Add Number
            </button>
            <button type="button"
                onClick={ mergeSort }>
                Merge Sort
            </button>
        </div>
    )
}
const ToolbarContainer = connect(null, toolbar_mapDispatchToProps)(Toolbar);

// List 
const list_mapStateToProps = state => (
    {
        numbers: store.getState()
    }
);
const List = ({ numbers }) => {
    const list = numbers.map((number, idx) => <Number number={number} key={idx} />)
    return (
        <div>
            <h1>Inside List</h1>
            <ul>
                {list}
            </ul>
        </div>
    )
}
const ListContainer = connect(list_mapStateToProps, null)(List);

// Number
class Number extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return <li>{this.props.number}</li>
    }
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
            nextItem = (a1[0] > a2[0]) ? a2.shift() : a1.shift();
            merged.push(nextItem);
        }
        return [...merged, ...a1, ...a2];
    }
}
export default Util;
window.Util = Util;