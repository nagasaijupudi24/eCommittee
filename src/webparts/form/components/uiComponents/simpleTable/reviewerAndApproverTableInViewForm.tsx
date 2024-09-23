/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';

const ApproverAndReviewerTableInViewForm = (props: any) => {
    const { type } = props;
    const gridData = props.data;

    console.log(gridData, `----${type} Of Grid-----------`);

    // Define the columns for the DetailsList
    const columns: IColumn[] = [
        { key: 'id', name: 'ID', fieldName: 'id', minWidth: 60, maxWidth: 60, isResizable: true },
        { key: 'text', name: type, fieldName: 'text', minWidth: 90, maxWidth: 120, isResizable: true },
        { key: 'srNo', name: 'SR No', fieldName: 'srNo', minWidth: 90, maxWidth: 120, isResizable: true },
        { key: 'optionalText', name: 'Designation', fieldName: 'optionalText', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, maxWidth: 150, isResizable: true },
        { key: 'actions', name: 'Action Date', fieldName: '', minWidth: 100, maxWidth: 150, isResizable: true } // Placeholder for actions
    ];

    return (
        <div style={{ overflowX: 'auto' }}>
            <DetailsList
                items={gridData} // Data for the table
                columns={columns} // Columns for the table
                layoutMode={DetailsListLayoutMode.fixedColumns} // Keep columns fixed
                selectionMode={SelectionMode.none} // No selection column
                isHeaderVisible={true} // Show column headers
            />
        </div>
    );
};

export default ApproverAndReviewerTableInViewForm;
