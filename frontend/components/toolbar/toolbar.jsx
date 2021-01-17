import React from 'react';

const Toolbar = ({ array, receiveNumber, clearNumbers, quickSort, mergeSort, bubbleSort }) => {
    return (
        <div>
            <h1>Inside Toolbar</h1>
            <button type="button"
                onClick={receiveNumber}>
                Add Number
            </button>
            <button type="button"
                onClick={(e) => quickSort(array)}
                >
                Quick Sort
            </button>
            <button type="button"
                onClick={(e) => mergeSort(array)}
                >
                Merge Sort
            </button>
            <button type="button"
                onClick={(e) => bubbleSort(array)}>
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