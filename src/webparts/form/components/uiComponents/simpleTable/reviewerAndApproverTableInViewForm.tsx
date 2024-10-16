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
                console.log(item)


//                 Draft -  100
// Call back - 200
// Cancel - 300
// Submit - 1000
// Pending Reviewer - 2000
// Pending Approver - 3000
// Refer - 4000
// Return - 5000
// Reject - 8000
// Approved - 9000
              // Determine the icon and color based on the status
              let iconName = '';
              let iconColor = '';
        
              switch (item.statusNumber) {
                case "2000"://pending reviewer
                case "3000"://pending approver
                  iconName = 'Clock';
                  iconColor = 'orange';
                  break;
                case 'Waiting':
                  iconName = 'HourGlass';
                  iconColor = 'gray';
                  break;
                case '4000':
                  iconName = 'Send';
                  iconColor = 'blue';
                  break;
                case '6000':
                  iconName = 'Reply';
                  iconColor = 'purple';
                  break;
                case '8000':
                  iconName = 'Cancel';
                  iconColor = 'red';
                  break;
                case '5000':
                  iconName = 'ReturnKey';
                  iconColor = 'green';
                  break;
                default:
                  iconName = 'HourGlass';
                  iconColor = 'gray';
                  break;
              }
        
              return (
                <div style={{ display: 'flex',flexDirection:'column', justifyContent: 'center', alignItems: 'center', paddingRight: 46 }}>
                  
                  <Icon
                    iconName={iconName}
                    styles={{ root: { color: iconColor, } }}
                  />
                  <span>{item.mainStatus}</span>
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
