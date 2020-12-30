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

// Reducer
const listReducer = (oldState = [], action) => {
    switch (action.type) {
        case 'RECEIVE_NUMBER':
            return [...oldState, action.number]
        default: 
            return oldState
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
        <Toolbar />
        <ListContainer />
    </div>
)
const Toolbar = () => (
    <div>
        <h1>Inside Toolbar</h1>
        <button type="button"
                onClick={() => store.dispatch(receiveNumber(5))}>
            Add Number
        </button>
    </div>
)
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
class Number extends React.Component {
    constructor(props) {
        super(props)
    }
    render(){
        return <li>{this.props.number}</li>
    }
}