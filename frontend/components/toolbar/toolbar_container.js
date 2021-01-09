import { connect } from 'react-redux';
import Toolbar from './toolbar';
import { bubbleSort } from '../../actions/algorithms/bubble_sort';

const toolbar_mapStateToProps = state => ({
    array: state.list.unsorted
})
const toolbar_mapDispatchToProps = dispatch => (
    {
        receiveNumber: () => dispatch(receiveNumber(Util.randomNumber())),
        clearNumbers: () => dispatch(clearNumbers()),
        quickSort: () => dispatch(quickSort()),
        mergeSort: () => dispatch(mergeSort()),
        bubbleSort: (array) => dispatch(bubbleSort(array)),
        asyncMergeSort: (array) => new Promise(resolve => {
            resolve(dispatch(asyncMergeSort(array)));
        }).then((sorted) => {
            dispatch(receiveSortedNumbers(sorted));
            dispatch(runAnimation());
        })
        // ,
        // asyncBubbleSort: (array) => dispatch(asyncBubbleSort(array))
    }
)

export default connect(toolbar_mapStateToProps, toolbar_mapDispatchToProps)(Toolbar);