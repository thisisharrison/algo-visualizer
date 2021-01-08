// Util
const Util = {
    randomNumber(min = 1, max = 99) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    },
    mergeSort(array) {
        if (array.length < 2) return array;
        let midIdx, length, left, right, sortLeft, sortRight;
        length = array.length;
        midIdx = Math.floor(length / 2);
        left = array.slice(0, midIdx);
        right = array.slice(midIdx);
        sortLeft = Util.mergeSort(left);
        sortRight = Util.mergeSort(right);
        return Util.merge(sortLeft, sortRight);
    },
    merge(a1, a2) {
        let merged, nextItem;
        merged = [];
        while (a1.length > 0 && a2.length > 0) {
            console.log('Comparison: ', a1[0], a2[0]) // Working on Visualizer
            nextItem = (a1[0] > a2[0]) ? a2.shift() : a1.shift();
            console.log('Sort: ', a1[0], a2[0])
            merged.push(nextItem);
        }
        let x = [...merged, ...a1, ...a2];
        console.log('Sorted: ', x);
        return x;
    },
    bubbleSort(array) {
        let unsorted = true;
        let clone = Object.assign([], array);
        let length = array.length;
        while (unsorted) {
            unsorted = false;
            for (let i = 0; i < length - 1; i++) {
                console.log('Compares: ', [clone[i], clone[i + 1]])
                console.log('Reset: ', [clone[i], clone[i + 1]])
                switch (clone[i] <= clone[i + 1]) {
                    case true:
                        break;
                    case false:
                        [clone[i], clone[i + 1]] = [clone[i + 1], clone[i]];
                        console.log('Sort: ', [clone[i], clone[i + 1]])
                        console.log('Reset: ', [clone[i], clone[i + 1]]) // Working on Visualizer
                        unsorted = true;
                        break;
                }
            }
        }
        return clone;
    },
    quickSort(array) {
        if (array.length < 2) return array;
        let pivot = array[0];
        let smaller = [];
        let larger = [];
        array.slice(1).forEach(num => {
            if (num <= pivot) {
                smaller.push(num);
            } else {
                larger.push(num);
            }
        })
        let sortSmaller = Util.quickSort(smaller);
        let sortLarger = Util.quickSort(larger);
        sortSmaller.push(pivot)
        return sortSmaller.concat(sortLarger);
    }
}

export default Util;

/*
animate merged subarray
    receive merge sorting 
        [0, 1, 2, 3]
    in sorting
        [0, 1, 2, 3, 4, 5, 6, 7]
        delete by index 
        saves the index
        ...original array.slice(0, index), ...merge sorting, ...original array.slice(index + merge sorting length)
  
        





        
// animate sorting one side // TO DO
// We should tear down the subarray from full array
// render sorted subarray and unsorted other half
// render one number at a time
// need a new action creator

*/