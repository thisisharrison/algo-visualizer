import { connect } from 'react-redux';
import List from './list';

const list_mapStateToProps = state => (
    {
        numbers: state.list.unsorted.map(n => n.val),
        sorted: state.list.sorted.map(n => n.val),
        sorting: state.list.sorting,
        klass: state.running.klass,
        ids: state.running.ids
        // id1: state.running.id1,
        // id2: state.running.id2
    }
);
export default connect(list_mapStateToProps, null)(List);