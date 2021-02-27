import { SPEED } from '../entry';
export const UPDATE_HIGHLIGHT = 'UPDATE_HIGHLIGHT';
export const UPDATE_PERSIST = 'UPDATE_PERSIST';
export const CLEAR_PERSIST = 'CLEAR_PERSIST';

// highlight will dictate the className
// main ones are compare, swap, sorted
export const changeHighlight = (highlight, value) => ({
    type: UPDATE_HIGHLIGHT,
    highlight,
    value
})

// persist are highlights that persist in each renders 
// main ones are pivot for quick sort
export const changePersist = (highlight, value) => ({
    type: UPDATE_PERSIST,
    highlight,
    value
})

// action creator to clear persist
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