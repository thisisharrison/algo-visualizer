import React from 'react';
import ToolbarContainer from './toolbar/toolbar_container';
import ListContainer from './list/list_container';
import { Container, Row } from 'react-bootstrap';

const App = () => (
  <Container>
    <Row>
      <h1>Sorting Algorithms</h1>
      {/* <h1>Inside App</h1> */}
      <ToolbarContainer />
      <ListContainer />
    </Row>
  </Container>
);

export default App;