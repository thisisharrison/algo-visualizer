import {
    updateHighlight
} from '../highlight_actions';
import { reorder } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

export const actualBubbleSort = array => dispatch => {
    let unsorted = true;
    let clone = Object.assign([], array);
    let length = array.length;
    while (unsorted) {
        unsorted = false;
        for (let i = 0; i < length - 1; i++) {
            dispatch(receiveAnimation(
                updateHighlight('compare', [clone[i], clone[i + 1]])
            ));
            switch (clone[i].val <= clone[i + 1].val) {
                case true:
                    dispatch(receiveAnimation(
                        updateHighlight('sorted', [clone[i], clone[i + 1]])
                    ));
                    break;
                case false:
                    [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                    dispatch(receiveAnimation(
                        updateHighlight('swap', [clone[i], clone[i + 1]])
                    ));
                    dispatch(receiveAnimation(
                        reorder([clone[i], clone[i + 1]])
                    ));
                    dispatch(receiveAnimation(
                        updateHighlight('sorted', [clone[i], clone[i + 1]])
                    ));
                    unsorted = true;
                    break;
            }
        }
    }
    dispatch(receiveAnimation(
        updateHighlight('sorted', clone)
    ));
    return clone;
}

export const bubbleSort = array => (dispatch, getState) => {
    new Promise (resolve => resolve(dispatch(actualBubbleSort(array))))
    .then((numbers) => {
        dispatch(receiveSortedNumbers(numbers));
        let toDispatch = getState().visualizer.animation;
        dispatch(playAnimation(toDispatch));
    })
}