import React from 'react';

const ListItem = ({ number, actualKlass }) => (
    <div>
        <span className="number"><li className={`item ${actualKlass}`}>{number}</li></span>
    </div>
)

export default ListItem;