import React from 'react';
import ListItem from './list_item';

const List = ({ sorting, klass, id1, id2, ids }) => {
    const list = sorting.map((number, idx) => {
        return (<ListItem number={number} key={idx} klass={klass} id1={id1} id2={id2} ids={ids} />)
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