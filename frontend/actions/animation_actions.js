export const RECEIVE_ANIMATION = 'RECEIEVE_ANIMATION';

export const receiveAnimation = animation => ({
    type: RECEIVE_ANIMATION,
    animation
})

// Plays all the animation recorded
// each loop is a promise that calls next action creator in a promise
export const playAnimation = toDispatch => dispatch => {
    for (let i = 0, p = Promise.resolve(); i < toDispatch.length; i++) {
        p = p.then(_ => dispatch(toDispatch[i]))
    }
}