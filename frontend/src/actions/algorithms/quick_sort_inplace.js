import {
    updateHighlight,
    updatePersist,
    clearPersist
} from '../highlight_actions';
import { reorder, insertBefore } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

export const actualQuickSortInPlace = array => dispatch => {
    let clone = Object.assign([], array)
    let result;
    result = quicksort(clone, 0, clone.length - 1)(dispatch);
    return result;
}

export const quicksort = (array, start, finish) => dispatch => {
    if (start >= finish) {
        return;
    }
    const boundary = dispatch(partition(array, start, finish));
    dispatch(quicksort(array, start, boundary - 1));
    dispatch(quicksort(array, boundary + 1, finish));
}

export const partition = (array, start, finish) => dispatch => {
    let pivot = array[start];
    // left marker index
    let lh = start + 1;
    // right marker index
    let rh = finish;
    
    while (true) {
        // find a value should be left of the pivot
        // scan from left to right, stop if found smaller than pivot or l and r indexes collides
        while (lh < rh && array[lh].val < pivot.val) lh++;
        // find a value should be right of the pivot
        // scan from right to left, stop if found bigger than or equal pivot or l and r indexes collides
        while (lh < rh && array[rh].val >= pivot.val) rh--;
        // if markers meet, break out of loop
        if (lh === rh) break;
        // swap lh and rh
        [array[lh], array[rh]] = [array[rh], array[lh]];
    }
    if (array[lh].val >= pivot.val) return start;
    array[start] = array[lh];
    array[lh] = pivot;
    return lh;
}

export const quickSortInPlace = array => (dispatch, getState) => {
    new Promise(resolve => resolve(dispatch(actualQuickSortInPlace(array))))
        .then((numbers => {
            dispatch(receiveSortedNumbers(numbers));
            let toDispatch = getState().visualizer.animation;
            dispatch(playAnimation(toDispatch));
        }))
}