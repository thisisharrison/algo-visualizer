import { connect } from 'react-redux';
import { highlightIds, highlightType } from '../../reducers/selectors';
import { getNumbers, getArray } from '../../reducers/selectors';
import List from './list';

const mapStateToProps = (state, ownProps) => ({
    numbers: getArray(state),
    klass: highlightType(state),
    ids: highlightIds(state)
});
export default connect(mapStateToProps, null)(List);