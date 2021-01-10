import React from 'react';
import ListItem from './list_item';

// numbers received from toolbar container
// receive klass and ids from list container
const List = ({ numbers, klass, ids }) => {
    const list = numbers.map((number, idx) => {
        let actualKlass = ids.includes(number.id) ? klass : ""
        return (<ListItem number={number.val} key={idx} actualKlass={actualKlass}/>)
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
export default List;