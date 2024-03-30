import Table from "./Table";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import useSort from '../hooks/use-sort';

function SortableTable(props) {
    const { config, data } = props;
    const {sortBy, sortOrder, sortedData, setSortColumn} = useSort(data, config)
   
    const updatedConfig = config.map((column) => {
        if(!column.sortValue) {
            return column;
        }

        return {
            ...column,
            header: ()=> <th className="cursor-point hover:bg-gray-100" onClick={() => setSortColumn(column.label)}>
                <div className="flex items-center">
                    {getIcons(column.label, sortBy, sortOrder)}
                    {column.label}
                </div>
            </th>
        }
    });

    return <Table {...props} data={sortedData} config={updatedConfig}/>
}

const mappingIcons = [
    {
        sortOrder: null,
        icon: <div>
                <FaArrowUp/>
                <FaArrowDown/>
            </div>
    },
    {
        sortOrder: 'asc',
        icon: <div>
                <FaArrowUp/>
            </div>
    },
    {
        sortOrder: 'desc',
        icon: <div>
                
                <FaArrowDown/>
            </div>
    },
]

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return <div>
                <FaArrowUp/>
                <FaArrowDown/>
            </div>;
    }

    return mappingIcons.find((mapIcon) => mapIcon.sortOrder === sortOrder).icon;
}

export default SortableTable;