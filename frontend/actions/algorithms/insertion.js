import {
    updateHighlight,
    updatePersist,
    clearPersist
} from '../highlight_actions';
import { reorder, insertBefore, swap } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

const actualInsertion = array => dispatch => {
    let clone = Object.assign([], array);
    for (let i = 1; i < clone.length; i++) {
        let pivot = clone[i];
        dispatch(receiveAnimation(
            updatePersist('pivot', [clone[i]])
        ));
        let j = i;
        while (j >= 1 && clone[j - 1].val > pivot.val) {
            dispatch(receiveAnimation(
                clearPersist('pivot', [pivot])
            ))
            dispatch(receiveAnimation(
                updateHighlight('compare', [clone[j - 1], pivot])
            ));
            dispatch(receiveAnimation(
                updatePersist('pivot', [pivot])
            ));
            clone[j] = clone[j - 1];
            dispatch(receiveAnimation(
                updateHighlight('swap', [clone[j], clone[j - 1]])
            ));
            dispatch(receiveAnimation(
                swap(j - 1, j)
            ));
            j--;
        }
        clone[j] = pivot;
    }
    return clone;
}

export const insertionSort = array => (dispatch, getState) => {
    new Promise(resolve => resolve(dispatch(actualInsertion(array))))
        .then((numbers) => {
            dispatch(receiveSortedNumbers(numbers));
            let toDispatch = getState().visualizer.animation;
            dispatch(playAnimation(toDispatch));
        })
}