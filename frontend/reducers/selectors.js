export const highlightIds = ({ visualizer: { highlight } }) => {
    if (Object.keys(highlight).length === 0) {
        return [];
    } else {
        return Object.values(highlight)[0].filter(n => !!n).map(j => j.id);
    }
}

export const highlightType = ({ visualizer: { highlight } }) => {
    if (Object.keys(highlight).length === 0) {
        return {};
    } else {
        return Object.keys(highlight)[0];
    }
}

export const getArray = ({ visualizer: { order }}) => {
    if (order.length === 0) {
        return [];
    } else {
        return order;
    }
}

export const getNumbers = ({ visualizer: { order } }) => {
    if (order.length === 0) {
        return [];
    } else {
        return order.map(n => n.val);
    }
}