import { connect } from 'react-redux';
import { getArray, highlightIds, highlightType, activeIds, inactiveIds, pivotId } from '../../reducers/selectors';
import List from './list';

const mapStateToProps = ({visualizer}, ownProps) => ({
    numbers: getArray(visualizer),
    klass: highlightType(visualizer),
    ids: highlightIds(visualizer), 
    activeIds: activeIds(visualizer.highlight),
    inactiveIds: inactiveIds(visualizer.highlight),
    pivotId: pivotId(visualizer.highlight)
});
export default connect(mapStateToProps, null)(List);