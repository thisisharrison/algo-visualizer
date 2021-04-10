export const RECEIVE_ANIMATION = 'RECEIEVE_ANIMATION';
export const START_ANIMATION = 'START_ANIMATION';
export const END_ANIMATION = 'END_ANIMATION';

export const receiveAnimation = animation => ({
    type: RECEIVE_ANIMATION,
    animation
})

export const startAnimation = () => ({
    type: START_ANIMATION
})

export const endAnimation = () => ({
    type: END_ANIMATION,
});

// Plays all the animation recorded
// each loop is a promise that calls next action creator in a promise
export const playAnimation = toDispatch => dispatch => {
    dispatch(startAnimation());
    for (let i = 0, p = Promise.resolve(); i < toDispatch.length; i++) {
        p = p.then(_ => dispatch(toDispatch[i]))
            .then(() => {
                if (i === toDispatch.length - 1) dispatch(endAnimation());
            })
    }
    
}