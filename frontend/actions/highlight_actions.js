import { SPEED } from '../entry';
export const UPDATE_HIGHLIGHT = 'UPDATE_HIGHLIGHT';
export const UPDATE_PERSIST = 'UPDATE_PERSIST';
export const CLEAR_PERSIST = 'CLEAR_PERSIST';

export const changeHighlight = (highlight, value) => ({
    type: UPDATE_HIGHLIGHT,
    highlight,
    value
})

export const changePersist = (highlight, value) => ({
    type: UPDATE_PERSIST,
    highlight,
    value
})

export const clearPersist = (highlight, value) => ({
    type: CLEAR_PERSIST,
    highlight,
    value
})

export const updateHighlight = (highlight, value) => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(changeHighlight(highlight, value)))
)

export const updatePersist = (highlight, value) => dispatch => (
    new Promise(resolve => setTimeout(() => resolve(), SPEED))
        .then(() => dispatch(changePersist(highlight, value)))
)