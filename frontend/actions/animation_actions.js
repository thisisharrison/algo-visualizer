export const RECEIVE_ANIMATION = 'RECEIEVE_ANIMATION';

export const receiveAnimation = thunkAction => ({
    type: RECEIVE_ANIMATION,
    animation: thunkAction
})

// Plays all the animation recorded
export const playAnimation = toDispatch => dispatch => {
    toDispatch.forEach(thunkAction => dispatch(thunkAction) );
}