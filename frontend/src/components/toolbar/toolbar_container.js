import { connect } from 'react-redux';
import { bubbleSort } from '../../actions/algorithms/bubble_sort';
import { mergeSort } from '../../actions/algorithms/merge_sort';
import { quickSort } from '../../actions/algorithms/quick_sort';
import { quickSortInPlace } from '../../actions/algorithms/quick_sort_inplace';
import { insertionSort } from '../../actions/algorithms/insertion';
import { selectionSort } from '../../actions/algorithms/selection';
import { addNumber, clearNumbers, resetNumbers } from '../../actions/list_actions';
import { getArray } from '../../reducers/selectors';
import Util from '../../util/util';
import Toolbar from './toolbar';

const mapStateToProps = ({visualizer, toolbar}) => ({
    array: getArray(visualizer),
    disabled: toolbar.disabled
})

const mapDispatchToProps = dispatch => ({
    receiveNumber: () => dispatch(addNumber(Util.randomNumber())),
    clearNumbers: () => dispatch(clearNumbers()),
    resetNumbers: () => dispatch(resetNumbers()),
    quickSort: (array) => dispatch(quickSort(array)),
    mergeSort: (array) => dispatch(mergeSort(array)),
    bubbleSort: (array) => dispatch(bubbleSort(array)),
    quickSortInPlace : (array) => dispatch(quickSortInPlace(array)),
    insertionSort : (array) => dispatch(insertionSort(array)),
    selectionSort : (array) => dispatch(selectionSort(array))
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);