import React from 'react';
import { Provider } from 'react-redux';
import App from './app';

const Root = ({ store }) => (
    <div>
        <h1>Inside Provider</h1>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)

export default Root;

/*
Consider: 
<Provider>
    <Layout>
<Provider>

<Layout>
    <Navbar>
    <Toolbar>
    <Content component = <List>/ <Bar>/ <Graph> > // Depending on Navbar and URL
<Layout> 
*/