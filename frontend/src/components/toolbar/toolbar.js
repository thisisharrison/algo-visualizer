import React from 'react';
import { Button } from 'react-bootstrap';

const Toolbar = ({ 
    disabled,
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
        {/* <h1>Inside Toolbar</h1> */}
        <button type="button" onClick={receiveNumber} disabled={disabled}>
          Add Number
        </button>
        <button
          type="button"
          onClick={(e) => quickSort(array)}
          disabled={disabled}
        >
          Quicksort naive
        </button>
        {/* <button type="button"
                onClick={(e) => quickSortInPlace(array)}
                disabled={disabled}
                >
                Quicksort in-place
            </button> */}
        <button
          type="button"
          onClick={(e) => mergeSort(array)}
          disabled={disabled}
        >
          Merge Sort
        </button>
        <button
          type="button"
          onClick={(e) => selectionSort(array)}
          disabled={disabled}
        >
          Selection
        </button>
        <button
          type="button"
          onClick={(e) => insertionSort(array)}
          disabled={disabled}
        >
          Insertion
        </button>
        <button
          type="button"
          onClick={(e) => bubbleSort(array)}
          disabled={disabled}
        >
          Bubble Sort
        </button>
        <button type="button" onClick={resetNumbers} disabled={disabled}>
          Reset
        </button>
        <button type="button" onClick={clearNumbers} disabled={disabled}>
          Clear
        </button>
      </div>
    );
}

export default Toolbar;