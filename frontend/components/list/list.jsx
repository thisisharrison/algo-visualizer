import React from 'react';
import ListItem from './list_item';

const List = ({ numbers, klass, ids, activeIds, inactiveIds, pivotId }) => {
    const list = numbers.map((number, idx) => {
        let actualKlass = activeIds.includes(number.id) ? 'active' : '';
        actualKlass = inactiveIds.includes(number.id) ? 'inactive' : actualKlass;
        actualKlass = ids.includes(number.id) ? klass : actualKlass;
        actualKlass = pivotId.includes(number.id) ? 'pivot' : actualKlass;
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