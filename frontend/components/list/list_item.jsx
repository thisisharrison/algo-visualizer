import React from 'react';

const ListItem = ({ number, actualKlass }) => (
    <div>
        <span className="number">
            <li className={`bar ${actualKlass}`} 
                style={{ height: `${number * 5}px` }}>
                <span className="text">
                    {number}
                </span>
            </li>
        </span>
    </div>
)

export default ListItem;