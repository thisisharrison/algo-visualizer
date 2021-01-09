import React from 'react';

const Toolbar = ({ array, receiveNumber, clearNumbers, quickSort, mergeSort, bubbleSort, asyncBubbleSort, asyncMergeSort }) => {
    return (
        <div>
            <h1>Inside Toolbar</h1>
            <button type="button"
                onClick={receiveNumber}>
                Add Number
            </button>
            <button type="button"
                onClick={quickSort}>
                Quick Sort
            </button>
            <button type="button"
                onClick={(e) => asyncMergeSort(array)}>
                Merge Sort
            </button>
            <button type="button"
                // onClick={bubbleSort}
                onClick={(e) => asyncBubbleSort(array)}>
                Bubble Sort
            </button>
            <button type="button"
                onClick={clearNumbers}>
                Clear
            </button>
        </div>
    )
}

export default Toolbar;