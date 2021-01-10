import {
    highlightCompare,
    highlightSwap,
    highlightSorted,
    highlightReset,
    highlightSubarray
} from '../highlight_actions';
import { reorder } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';

const actualQuickSort = array => dispatch => {
    if (array.length < 2) return array;
    let pivot = array[0];
    dispatch(receiveAnimation(highlightSubarray([pivot])));
    let smaller = [];
    let larger = [];
    array.slice(1).forEach(num => {
        dispatch(receiveAnimation(highlightCompare([num, pivot])));
        if (num <= pivot) {
            smaller.push(num);
            dispatch(receiveAnimation(reorder(smaller)));
        } else {
            larger.push(num);
            dispatch(receiveAnimation(reorder(larger)));
        }
        dispatch(receiveAnimation(highlightSorted([num])))
    })
    let sortSmaller = dispatch(actualQuickSort(smaller));
    let sortLarger = dispatch(actualQuickSort(larger));
    sortSmaller.push(pivot)
    dispatch(receiveAnimation(reorder(sortSmaller)));
    let sorted = sortSmaller.concat(sortLarger);
    dispatch(receiveAnimation(reorder(sorted)));
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