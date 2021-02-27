import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    const store = configureStore();
    ReactDOM.render(<Root store={store} />, content);

    // TESTING
    window.store = store;
    window.getState = store.getState;
});

export const SPEED = 100;