/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DetailsList, IColumn, Stack, IconButton } from '@fluentui/react';

import PnPPeoplePicker from '../peoplePicker/peoplePicker';
import { v4 } from 'uuid';

// Interface for each table item
interface ITableItem {
  key: any;
  comments: any;
  assignedTo: any;
  status: any;
}

// Interface for the component's props
interface IATRAssigneeProps {
    gridData:any;
    updategirdData:any;
    commentsData:any;
  sp: any;
  context: any; // This is required by the PeoplePicker
}

// Interface for the component's state
interface IATRAssigneeState {
  tableData: ITableItem[];
  selectedUsers: string[];
  currentRowKey: number | null;
}

// const tableData = [
//     { key: 1, comments: 'Initial Comment 1', assignedTo: [], status: 'Open' },
//     { key: 2, comments: 'Initial Comment 2', assignedTo: [], status: 'Open' },
//   ]

export class ATRAssignee extends React.Component<IATRAssigneeProps, IATRAssigneeState> {
  constructor(props: IATRAssigneeProps) {
    super(props);

    // Initialize state
    this.state = {
      tableData: this.props.gridData,
      selectedUsers: [],
      currentRowKey: null,
    };
  }

  // Define the columns for the DetailsList
  private columns: IColumn[] = [
    {
      key: 'comments',
      name: 'Comments',
      fieldName: 'comments',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'assignedTo',
      name: 'Assigned To',
      fieldName: 'assignedTo',
      minWidth: 150,
      maxWidth: 300,
      isResizable: true,
    //   onRender: (item: ITableItem) => item.assignedTo.join(', '),
    },
    {
      key: 'status',
      name: 'Status',
      fieldName: 'status',
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: 'delete',
      name: 'Delete',
      fieldName: 'delete',
      minWidth: 50,
      maxWidth: 75,
      onRender: (item: ITableItem) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          title="Delete"
          ariaLabel="Delete"
          onClick={() => this.handleDeleteRow(item.key)} // Delete row handler
        />
      ),
    },
  ];

  // Handler when a row is clicked to select it
  private handleRowClick = (rowKey: number): void => {
    this.setState({ currentRowKey: rowKey });
    console.log(this.props.commentsData)
    
  };

  // Handle row deletion
  private handleDeleteRow = (rowKey: number): void => {
    const updatedTableData = this.state.tableData.filter(item => item.key !== rowKey);
    this.setState({ tableData: updatedTableData });
  };

  // Add selected users to the 'Assigned To' column
//   private handleAddUsersToTable = (): void => {
//     const { tableData, selectedUsers, currentRowKey } = this.state;

//     if (currentRowKey !== null && selectedUsers.length > 0) {
//       const updatedTableData = tableData.map((item) => {
//         if (item.key === currentRowKey) {
//           return { ...item, assignedTo: [...item.assignedTo, ...selectedUsers] };
//         }
//         return item;
//       });

//       // Clear the selected users and reset row selection
//       this.setState({ tableData: updatedTableData, selectedUsers: [], currentRowKey: null });
//     }
//   };

  public _getDetailsFromPeoplePicker = (data: any): any => {
    console.log("function trigered")
    console.log(data)
    console.log(this.props.commentsData)
    const joinedCommentsData = this.props.commentsData.filter(
        (each:any)=>{

            if (each){
                return each
            }
            
           
        }   
    ).map(
        (each:any)=>{

            if (each){
                console.log(each)
                console.log(`${each?.pageNum} ${each?.page} ${each?.comment}`)
                return `${each?.pageNum} ${each?.page} ${each?.comment}`
            }
            
           
        }
    )
    console.log(joinedCommentsData)
    console.log(joinedCommentsData.join(' ,'))

    const newTableData = {
        key:v4(),
        comments:joinedCommentsData.join(' ,'),
        assignedTo:data[0].text,
        status:"submitted"


    }
    this.setState((prev)=>{
        this.props.updategirdData([...prev.tableData,newTableData])
        return { selectedUsers: data ,tableData:[...prev.tableData,newTableData]}

    });
    
  };

  public render(): React.ReactElement<IATRAssigneeProps> {
    const { tableData} = this.state;

    return (
      <div>
        {/* Stack to align PeoplePicker and Add Button beside each other */}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PnPPeoplePicker
            context={this.props.context}
            spProp={this.props.sp}
            getDetails={this._getDetailsFromPeoplePicker}
            typeOFButton="atr"
          />
       
        </Stack>

        {/* DetailsList to show table data */}
        <DetailsList
          items={tableData}
          columns={this.columns}
          setKey="set"
          layoutMode={0} // Justified layout
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          onItemInvoked={(item: ITableItem) => this.handleRowClick(item.key)} // Click to select row
        />
      </div>
    );
  }
}
