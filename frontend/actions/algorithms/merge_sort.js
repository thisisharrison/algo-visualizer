import {
    highlightCompare,
    highlightSwap,
    highlightSorted,
    highlightReset,
    highlightSubarray
} from '../highlight_actions';
import { reorder, insertBefore } from '../order_actions';
import { receiveAnimation } from '../animation_actions';
import { receiveSortedNumbers } from '../list_actions';
import { playAnimation } from '../animation_actions';


export const actualMergeSort = array => dispatch => {
    if (array.length < 2) return array;
    let midIdx, length, left, right, sortLeft, sortRight;
    length = array.length;
    midIdx = Math.floor(length / 2);
    left = array.slice(0, midIdx);
    right = array.slice(midIdx);
    dispatch(receiveAnimation(highlightSubarray(left)));
    dispatch(receiveAnimation(highlightSubarray(right)));
    sortLeft = dispatch(actualMergeSort(left));
    sortRight = dispatch(actualMergeSort(right));
    return dispatch(merge(sortLeft, sortRight))
}

export const merge = (a1, a2) => dispatch => {
    let merged, nextItem;
    merged = [];
    while (a1.length > 0 && a2.length > 0) {
        if (a1[0].val > a2[0].val) {
            dispatch(receiveAnimation(highlightCompare([a1[0], a2[0]])));
            dispatch(receiveAnimation(highlightSwap([a2[0], a1[0]])));
            dispatch(receiveAnimation(insertBefore(a2[0], a1[0])));
            nextItem = a2.shift();
        } else {
            dispatch(receiveAnimation(highlightSorted([a1[0]])));
            nextItem = a1.shift();
        }
        merged.push(nextItem);
    }
    dispatch(receiveAnimation(reorder([...merged, ...a1])));
    dispatch(receiveAnimation(highlightSorted([...a1])));
    dispatch(receiveAnimation(reorder([...merged, ...a1, ...a2])));
    dispatch(receiveAnimation(highlightSorted([...a2])));
    dispatch(receiveAnimation(highlightSorted([...merged, ...a1, ...a2])))
    dispatch(receiveAnimation(highlightReset([...merged, ...a1, ...a2])))
    return [...merged, ...a1, ...a2];
}

export const mergeSort = array => (dispatch, getState) => {
    new Promise(resolve => resolve(dispatch(actualMergeSort(array))))
        .then((numbers => {
            dispatch(receiveSortedNumbers(numbers));
            let toDispatch = getState().visualizer.animation;
            dispatch(playAnimation(toDispatch));
        }))
    
}