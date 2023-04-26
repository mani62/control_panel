import React, {useEffect, useState} from 'react';
import './DataTable.less'
import {Table} from "antd";

interface Props {
    //ToDO: change Type
    columns: any[],
    loading: boolean,
    onChange: (value: React.Key[])=>void,
    data: []
}

const DataTable = (props: Props) =>{
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    useEffect(() => {
        props.onChange(selectedRowKeys)
    },[selectedRowKeys])

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div>
            <Table
                rowClassName={(record, index) => index % 2 === 0 ? 'tableRowDark' :  'tableRowLight'}
                rowSelection={rowSelection}
                columns={props.columns}
                dataSource={props.data}
                showHeader={false}
                size={'small'}
                loading={props.loading}
            />
        </div>
    );
}

export default DataTable;