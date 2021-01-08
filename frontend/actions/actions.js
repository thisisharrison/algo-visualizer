export const receiveNumber = (number) => (
    {
        type: 'RECEIVE_NUMBER',
        number
    }
)
export const clearNumbers = () => (
    {
        type: 'CLEAR_NUMBERS'
    }
)
export const receiveSortedNumbers = (numbers) => (
    {
        type: 'RECEIVE_SORTED_NUMBERS',
        numbers
    }
)
export const quickSort = () => (
    {
        type: 'QUICK_SORT'
    }
)
export const mergeSort = () => (
    {
        type: 'MERGE_SORT'
    }
)
export const bubbleSort = () => (
    {
        type: 'BUBBLE_SORT'
    }
)