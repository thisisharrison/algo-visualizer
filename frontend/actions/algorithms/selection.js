import {
    updateHighlight,
    updatePersist,
    clearPersist
} from '../highlight_actions';
import { reorder, insertBefore, swap } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

const actualSelection = array => dispatch => {
    let clone = Object.assign([], array);
    let min;
    for (let i = 0; i < clone.length - 1; i++) {
        min = i;
        dispatch(receiveAnimation(
            updatePersist('pivot', [clone[min]])
            ))
        for (let k = i + 1; k < clone.length; k++) {
            dispatch(receiveAnimation(
                updateHighlight('compare', [clone[min], clone[k]])
            ))
            if (clone[k].val < clone[min].val) {
                dispatch(receiveAnimation(
                    updateHighlight('reset', [clone[min], clone[k]])
                ))
                dispatch(receiveAnimation(
                    clearPersist('pivot', [clone[min]])
                ))
                min = k;
                dispatch(receiveAnimation(
                    updatePersist('pivot', [clone[min]])
                ))
            }
            dispatch(receiveAnimation(
                updateHighlight('reset', [clone[min], clone[k]])
            ))
            // THIS IS NOT WORKING
            if (min !== i) {
                [clone[i], clone[min]] = [clone[min], clone[i]]
                dispatch(receiveAnimation(
                    updateHighlight('swap', [clone[i], clone[min]])
                ))
                dispatch(receiveAnimation(
                    swap(i, min)
                ))
                dispatch(receiveAnimation(
                    updateHighlight('sorted', [clone[i], clone[min]])
                ))
            }
        }
        dispatch(receiveAnimation(
            clearPersist('pivot', [clone[min]])
        ))
    }
    return clone;
}

export const selectionSort = array => (dispatch, getState) => {
    new Promise(resolve => resolve(dispatch(actualSelection(array))))
        .then((numbers) => {
            dispatch(receiveSortedNumbers(numbers));
            let toDispatch = getState().visualizer.animation;
            dispatch(playAnimation(toDispatch));
        })
}