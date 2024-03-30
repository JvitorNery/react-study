import { useState, useEffect } from 'react';
import sortUtil from '../util/sort.util';

function useSort(data, config) {
    const [sortOrder, setSortOrder] = useState(null);
    const [sortBy, setSortBy] = useState(null);

    const setSortColumn = (label) => {
        const valueSort = label === sortBy
            ? sortUtil(sortOrder) : sortUtil(null);
        setSortOrder(valueSort);
        setSortBy(!!valueSort ? label : null);
    }

    let sortedData = data;
    if (sortOrder && sortBy) {
        const {sortValue} = config.find(column => column.label === sortBy);
        sortedData = [...data].sort((a, b) => {
            const valueA = sortValue(a);
            const valueB = sortValue(b);

            const reverseOrder = sortOrder === 'asc' ? 1 : -1;
            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB) * reverseOrder;
            } else {
                return (valueA - valueB) * reverseOrder;
            }
        });
    }

    return {
        sortedData,
        setSortColumn,
        sortOrder,
        sortBy
    }
}

export default useSort;
