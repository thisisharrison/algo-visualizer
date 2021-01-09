import React from 'react';

class ListItem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { number, klass, id1, id2, ids } = this.props;
        let _klass, _number;
        // _klass = (number.id === id1 || number.id === id2) ? klass : "";
        _klass = (ids && ids.includes(number.id)) ? klass : "";
        _number = number.val;
        return (
            <div>
                <span className="number"><li className={`item ${_klass}`}>{_number}</li></span>
            </div>
        )
    }
    // componentDidUpdate(prevProps) {
    //     if (prevProps.running !== this.props.running) {
    //         let running = this.props.running;
    //         let numbers = Object.values(running)[0];
    //         let klass = numbers.includes(this.props.number) ? Object.keys(running)[0] : "";
    //         this.setState({klass: klass});
    //     }
    // }
}
export default ListItem;