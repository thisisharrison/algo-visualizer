import React from 'react';

const Toolbar = ({ 
    array, 
    receiveNumber,
    clearNumbers,
    resetNumbers,
    quickSort,
    mergeSort,
    bubbleSort,
    quickSortInPlace,
    insertionSort,
    selectionSort
}) => {
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
                Quicksort naive
            </button>
            <button type="button"
                >
                Quicksort in-place
            </button>
            <button type="button"
                onClick={(e) => mergeSort(array)}
                >
                Merge Sort
            </button>
            <button type="button"
                onClick={(e) => selectionSort(array)}
                >
                Selection
                </button>
            <button type="button"
                >
                Insertion
                </button>
            <button type="button"
                onClick={(e) => bubbleSort(array)}>
                Bubble Sort
            </button>
            <button type="button"
                onClick={resetNumbers}
                >
                Reset
            </button>
            <button type="button"
                onClick={clearNumbers}>
                Clear
            </button>
        </div>
    )
}

export default Toolbar;