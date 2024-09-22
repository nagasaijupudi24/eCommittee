/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { format } from 'date-fns';

const WorkFlowLogsTable = (props: any) => {
    const { data } = props;

    // Function to format date and time
    const formatDateTime = (date: string | number | Date) => {
        const formattedDate = format(new Date(date), 'dd-MMM-yyyy');
        const formattedTime = format(new Date(date), 'hh:mm a');
        return `${formattedDate} ${formattedTime}`;
    };

    // Define the columns for the DetailsList
    const columns: IColumn[] = [
        { key: 'ActionTaken', name: 'Action', fieldName: 'ActionTaken', minWidth: 120, maxWidth: 150, isResizable: true },
        { key: 'Actioner', name: 'Action By', fieldName: 'Actioner', minWidth: 120, maxWidth: 150, isResizable: true },
        {
            key: 'ActionTakenOn',
            name: 'Action Date',
            fieldName: 'ActionTakenOn',
            minWidth: 120,
            maxWidth: 150,
            isResizable: true,
            onRender: (item: any) => (
                <span>{formatDateTime(item.ActionTakenOn)}</span>
            ),
        },
    ];

    return (
        <div style={{ overflowX: 'auto' }}>
            <DetailsList
                items={data} // Data for the table
                columns={columns} // Column definitions
                layoutMode={DetailsListLayoutMode.fixedColumns} // Keep columns fixed
                selectionMode={SelectionMode.none} // Disable row selection
                isHeaderVisible={true} // Show header
            />
        </div>
    );
};

export default WorkFlowLogsTable;
