import myNum from "../class/myNumber";

export const RECEIVE_NUMBER = 'RECEIEVE_NUMBER';
export const CLEAR_NUMBERS = 'CLEAR_NUMBERS';
export const RECEIVE_SORTED_NUMBERS = 'RECEIVE_SORTED_NUMBERS';

export const receiveNumber = (number) => (
    {
        type: RECEIVE_NUMBER,
        number
    }
)
export const clearNumbers = () => (
    {
        type: CLEAR_NUMBERS
    }
)
export const receiveSortedNumbers = (numbers) => (
    {
        type: RECEIVE_SORTED_NUMBERS,
        numbers
    }
)

export const addNumber = number => (dispatch, getState) => {
    const idx = getState().list.unsorted.length;
    dispatch(receiveNumber(new myNum(idx, number)));
}