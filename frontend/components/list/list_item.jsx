import React from 'react';

const ListItem = ({ number, actualKlass }) => (
    <div>
        <span className="number"><li className={`bar ${actualKlass}`} style={{ height: `${number * 5}px` }}>{number}</li></span>
    </div>
)

export default ListItem;