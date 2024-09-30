/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DetailsList, IColumn, Stack, IconButton, DefaultButton } from '@fluentui/react';
import { ComboBox, IComboBoxOption } from '@fluentui/react/lib/ComboBox';

// import PnPPeoplePicker from '../peoplePicker/peoplePicker';
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
  gridData: any;
  updategirdData: any;
  commentsData: any;
  sp: any;
  context: any; // This is required by the PeoplePicker
  atrCreatorsList:any;
}

// Interface for the component's state
interface IATRAssigneeState {
  tableData:any;
  selectedUsers: any;
  currentRowKey: any;
  selectedStatus: any;
}

// ComboBox options for status
const statusOptions: IComboBoxOption[] = [
  
];

export class ATRAssignee extends React.Component<IATRAssigneeProps, IATRAssigneeState> {
  constructor(props: IATRAssigneeProps) {
    super(props);

    // Initialize state
    this.state = {
      tableData: this.props.gridData,
      selectedUsers: [],
      currentRowKey: null,
      selectedStatus: undefined,
    };

    this._updateStatusOptions()
  }

  private _updateStatusOptions =()=>{
    this.props.atrCreatorsList.map(
        (each:any)=>{
            console.log(each)
            statusOptions.push({key:each.atrCreatorEmailName,text:each.atrCreatorEmailName,id:each.atrCreatorId})
        }
    )

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

  // Handle ComboBox change for status
  private handleStatusChange = (option: IComboBoxOption | undefined): void => {
    const newStatus = option?.text || '';
    console.log(newStatus)
    console.log(option)
    console.log(this.props.atrCreatorsList)
    const filterATRData = this.props.atrCreatorsList.filter(
        (each:any)=>{
            console.log(each)
            console.log(each.atrCreatorId)
            console.log(option?.id)
            console.log(each.atrCreatorId === option?.id)
            console.log(this.props.context.pageContext)
            if (each.atrCreatorId === option?.id){
                return each
            }
        }
    )
    console.log(filterATRData)
    console.log([{...filterATRData[0],
             "atrAssigneeId":0,
           
            "atrAssignerEmail":this.props.context.pageContext.user.email,
            "atrAssignerEmailName": this.props.context.pageContext.user.displayName,
           
            "modifiedDate": new Date(),
            "modifiedBy": this.props.context.pageContext.user.email,
            "statusMessage": null,
           
            
            // "approverType": 2,
            // "approverOrder": 1,
            // "approverStatus": 3,
            // "approverEmail": "ib.test2@xencia.com",
            // "noteApproverComments": "1",
            // "strATRStatus": "Pending",
            // "atrStatus": 1
    }])
    this.setState({ selectedStatus: {...filterATRData[0],
        "atrAssigneeId":0,
      
       "atrAssignerEmail":this.props.context.pageContext.user.email,
       "atrAssignerEmailName": this.props.context.pageContext.user.displayName,
      
       "modifiedDate": new Date(),
       "modifiedBy": this.props.context.pageContext.user.email,
       "statusMessage": null,
      
       
       // "approverType": 2,
       // "approverOrder": 1,
       // "approverStatus": 3,
       // "approverEmail": "ib.test2@xencia.com",
       // "noteApproverComments": "1",
       // "strATRStatus": "Pending",
       // "atrStatus": 1
} });
  };

  // Handler when a row is clicked to select it
  private handleRowClick = (rowKey: number): void => {
    this.setState({ currentRowKey: rowKey });
    console.log(this.props.commentsData);
  };

  // Handle row deletion
  private handleDeleteRow = (rowKey: number): void => {
    const updatedTableData = this.state.tableData.filter((item: { key: number; }) => item.key !== rowKey);
    this.setState({ tableData: updatedTableData });
  };

  public _getDetailsFromPeoplePicker = (data: any): any => {
    const joinedCommentsData = this.props.commentsData
      .filter((each: any) => !!each)
      .map((each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`);

    const newTableData = {
      key: v4(),
      comments: joinedCommentsData.join(', '),
      assignedTo: data[0].text,
      status: 'submitted',
    };

    this.setState((prev) => {
      this.props.updategirdData([...prev.tableData, newTableData]);
      return { selectedUsers: data, tableData: [...prev.tableData, newTableData] };
    });
  };

  public render(): React.ReactElement<IATRAssigneeProps> {
    const { tableData, selectedStatus } = this.state;
    console.log(statusOptions)
    console.log(this.state)
    console.log(this.props)

    return (
      <div>
        {/* Stack to align PeoplePicker, ComboBox, and Add Button beside each other */}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          {/* <PnPPeoplePicker
            context={this.props.context}
            spProp={this.props.sp}
            getDetails={this._getDetailsFromPeoplePicker}
            typeOFButton="atr"
          /> */}

          {/* ComboBox for Status Selection */}

          <ComboBox
            placeholder="Select Status"
            options={statusOptions}
            selectedKey={selectedStatus}
            onChange={(event, option) => this.handleStatusChange(option)}
            autoComplete="on"
            allowFreeform
          />
          <DefaultButton iconProps={{iconName:"Add"}}>Add</DefaultButton>
         
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
