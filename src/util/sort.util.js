function sortUtil(sortOrder) {
    const filtered = mappingSortsStates
        .filter((sort) => sort.current === sortOrder);
    return filtered.length > 0 ? filtered[0].next : null;
}

const mappingSortsStates = [
    {
        current: null,
        next: 'asc'
    },
    {
        current: 'asc',
        next: 'desc'
    },
    {
        current: 'desc',
        next: null
    },
]

export default sortUtil;