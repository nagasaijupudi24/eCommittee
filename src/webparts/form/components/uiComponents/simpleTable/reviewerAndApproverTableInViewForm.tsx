/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, IColumn, IDetailsListStyles, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { format } from 'date-fns';
import { Icon } from '@fluentui/react';

const detailsListStyles: Partial<IDetailsListStyles> = {
    root: {
      paddingTop: '0px', // Adjust top padding here
    },
  };

const ApproverAndReviewerTableInViewForm = (props: any) => {
    const { type } = props;
    const gridData = props.data;

    console.log(gridData, `----${type} Of Grid-----------`);

    // Define the columns for the DetailsList
    const columns: IColumn[] = [
        
        { key: 'text', name: type, fieldName: 'text', minWidth: 60, maxWidth: 120, isResizable: true },
        { key: 'srNo', name: 'SR No', fieldName: 'srNo', minWidth: 60, maxWidth: 120, isResizable: true },
        { key: 'optionalText', name: 'Designation', fieldName: 'optionalText', minWidth: 80, maxWidth: 150, isResizable: true },
        {
          key: 'mainStatus',
          name: 'Status',
          fieldName: 'mainStatus',
          minWidth: 100,
          maxWidth: 150,
          isResizable: true,
          onRender: (item: any) => {
            console.log(item);
        
            let iconName = '';
            console.log(item);
            console.log(item.statusNumber);
            switch (item.statusNumber) {
              case "2000": // pending reviewer
              case "3000": // pending approver
                iconName = 'Clock';
                break;
              case 'Waiting':
                iconName = 'HourGlass';
                break;
              case '4000':
                iconName = 'Send';
                break;
              case '6000':
                iconName = 'Reply';
                break;
              case '8000':
                iconName = 'Cancel';
                break;
              case '5000':
                iconName = 'ReturnKey';
                break;
              case '9000':
                iconName = 'DocumentApproval';
                break;
              default:
                iconName = 'HourGlass';
                break;
            }
        
            return (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Icon iconName={iconName} />
                <span style={{ marginLeft: '8px', lineHeight: '24px' }}>{item.mainStatus}</span>
              </div>
            );
          },
        },
        
        
        { key: 'actionDate', name: 'Action Date', fieldName: 'actionDate', minWidth: 100, maxWidth: 150, isResizable: true ,
            onRender: (item) => {
                console.log(item)
                console.log(item.actionDate)
                if (item.actionDate){
                    const formattedDate = format(new Date(item.actionDate), 'dd-MMM-yyyy');
                const formattedTime = format(new Date(item.actionDate), 'hh:mm a');
                return `${formattedDate} ${formattedTime}`;

                }
                return ''

                
              }
        } // Placeholder for actions
    ];

    return (
        <div style={{ overflowX: 'auto' }}>
            <DetailsList
                items={gridData} // Data for the table
                columns={columns} // Columns for the table
                layoutMode={DetailsListLayoutMode.fixedColumns} // Keep columns fixed
                selectionMode={SelectionMode.none} // No selection column
                isHeaderVisible={true} // Show column headers
                styles={detailsListStyles}
            />
        </div>
    );
};

export default ApproverAndReviewerTableInViewForm;
