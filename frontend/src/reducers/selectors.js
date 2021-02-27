export const highlightIds = ({ highlight }) => {
    let numbers = []
    if (highlight.compare.length > 0) {
        numbers = highlight['compare']
    } else if (highlight.swap.length > 0) {
        numbers = highlight['swap']
    } else if (highlight.sorted.length > 0) {
        numbers = highlight['sorted']
    }
    if (numbers.length === 0) {
        return [];
    } else {
        return numbers.filter(n => !!n).map(j => j.id);
    }
}

export const highlightType = ({ highlight }) => {
    if (highlight.compare.length > 0) {
        return 'compare';
    } else if (highlight.swap.length > 0) {
        return 'swap';
    } else if (highlight.sorted.length > 0) {
        return 'sorted';
    } else {
        return '';
    }
}

export const activeIds = ({ active }) => {
    return Object.values(active).filter(n => !!n).map(j => j.id);
}

export const inactiveIds = ({ inactive }) => {
    return Object.values(inactive).filter(n => !!n).map(j => j.id);
}

export const pivotId = ({ pivot }) => {
    return Object.values(pivot).filter(n => !!n).map(j => j.id);
}

export const getArray = ({ order }) => {
    if (order.length === 0) {
        return [];
    } else {
        return order;
    }
}

export const getNumbers = ({ order }) => {
    if (order.length === 0) {
        return [];
    } else {
        return order.map(n => n.val);
    }
}