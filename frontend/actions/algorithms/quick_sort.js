import {
    highlightCompare,
    highlightSwap,
    highlightSorted,
    highlightReset,
    highlightSubarray, 
    highlightPivot
} from '../highlight_actions';
import { reorder, insertBefore } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

const actualQuickSort = array => dispatch => {
    if (array.length < 2) return array;
    let pivot = array[0];
    dispatch(receiveAnimation(highlightSubarray([pivot])));
    let smaller = [];
    let larger = [];
    array.slice(1).forEach((num, i) => {
        dispatch(receiveAnimation(highlightCompare([pivot, num])));
        if (num.val <= pivot.val) {
            smaller.push(num);
            dispatch(receiveAnimation(insertBefore(num, pivot)));
        } else {
            larger.push(num);
            // 8, 10
            dispatch(receiveAnimation(insertBefore(num, array.slice(1)[i + 1])));
        }
        dispatch(receiveAnimation(highlightSorted([num])))
    })
    dispatch(receiveAnimation(highlightSubarray(smaller)));
    let sortSmaller = dispatch(actualQuickSort(smaller));
    dispatch(receiveAnimation(highlightSubarray(larger)));
    let sortLarger = dispatch(actualQuickSort(larger));
    sortSmaller.push(pivot)
    // dispatch(receiveAnimation(reorder(sortSmaller)));
    let sorted = sortSmaller.concat(sortLarger);
    // dispatch(receiveAnimation(reorder(sorted)));
    return sorted;
}

export const quickSort = array => (dispatch, getState) => {
    new Promise(resolve => resolve(dispatch(actualQuickSort(array))))
        .then((numbers => {
            dispatch(receiveSortedNumbers(numbers));
            let toDispatch = getState().visualizer.animation;
            dispatch(playAnimation(toDispatch));
        }))

}