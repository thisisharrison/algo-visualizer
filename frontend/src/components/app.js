import React from 'react';
import ToolbarContainer from './toolbar/toolbar_container';
import ListContainer from './list/list_container';

const App = () => (
    <div>
        <h1>Sorting Algorithms</h1>
        {/* <h1>Inside App</h1> */}
        <ToolbarContainer />
        <ListContainer />
    </div>
)

export default App;