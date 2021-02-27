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
        console.log('Pivot: ',pivot);
        let smaller = [];
        let larger = [];
        array.slice(1).forEach(num => {
            if (num <= pivot) {
                smaller.push(num);
                console.log('Smaller: ', smaller)
            } else {
                larger.push(num);
                console.log('Larger: ', larger)
            }
        })
        let sortSmaller = Util.quickSort(smaller);
        let sortLarger = Util.quickSort(larger);
        console.log('Smaller Total', sortSmaller)
        console.log('Larger Total', sortLarger)
        sortSmaller.push(pivot)
        console.log('Smaller Total + Pivot', sortSmaller)
        return sortSmaller.concat(sortLarger);
    }, 
    quickSort2(array, start = 0, finish = array.length - 1) {
        if (start >= finish) return;
        // partition will make swaps
        let boundary = Util.partition2(array, start, finish);
        // quick sort left
        Util.quickSort2(array, start, boundary - 1);
        // quick sort right
        Util.quickSort2(array, boundary + 1, finish);
        return array;
    },
    partition(array, start, finish) {
        let pivot = array[start];
        let lh = start + 1;
        let rh = finish;
        while (true) {
            // Finds a value that should be to the left of the pivot
            while (lh < rh && array[rh] >= pivot) rh --;
            // Finds a value that should be to the right of pivot
            while (lh < rh && array[lh] < pivot) lh ++;
            // If pointers meet, break out of the loop
            if (lh === rh) break;
            // Swap
            [array[lh], array[rh]] = [array[rh], array[lh]]
        }
        // Left hand number still greater than pivot
        // pivot does not move
        if (array[lh] >= pivot) return start;
        // Otherwise swap left hand number with pivot
        array[start] = array[lh];
        array[lh] = pivot;
        return lh;
    },
    partition2(array, start, finish) {
        let pivot = array[finish];
        let i = start - 1;
        for (let j = start; j < finish; j++) {
            if (array[j] < pivot) {
                i += 1;
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        // Move pivot to i + 1
        [array[i + 1], array[finish]] = [array[finish], array[i + 1]];
        return i + 1;
    }
}

export default Util;