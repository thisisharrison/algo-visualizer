import { connect } from 'react-redux';
import { bubbleSort } from '../../actions/algorithms/bubble_sort';
import { mergeSort } from '../../actions/algorithms/merge_sort';
import { addNumber, clearNumbers } from '../../actions/list_actions';
import { getArray } from '../../reducers/selectors';
import Util from '../../util/util';
import Toolbar from './toolbar';

const mapStateToProps = state => (
    {
        array: getArray(state)
    }
)

const mapDispatchToProps = dispatch => (
    {
        receiveNumber: () => dispatch(addNumber(Util.randomNumber())),
        clearNumbers: () => dispatch(clearNumbers()),
        // quickSort: () => dispatch(quickSort()),
        mergeSort: (array) => dispatch(mergeSort(array)),
        bubbleSort: (array) => dispatch(bubbleSort(array)),
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);