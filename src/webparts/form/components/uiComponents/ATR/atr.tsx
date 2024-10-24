/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @rushstack/no-new-null */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DetailsList, IColumn, Stack, IconButton, DefaultButton, SelectionMode, Modal, Icon, PrimaryButton, mergeStyleSets } from '@fluentui/react';
import { IComboBoxOption } from '@fluentui/react/lib/ComboBox';

import PnPPeoplePicker from '../peoplePicker/peoplePicker';
import { v4 } from 'uuid';

// Interface for each table item
interface ITableItem {
  id: any;
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
  artCommnetsGridData:any;

  deletedGridData:any;
}

// Interface for the component's state
interface IATRAssigneeState {
  tableData:any;
  selectedUsers: any;
  currentRowKey: any;
  selectedStatus: any;
  selectedValue:any;
  commentsData:any;
  isModalOpen: boolean;
  modalMessage: string;
}

// ComboBox options for status
const statusOptions: IComboBoxOption[] = [
  
];

export class ATRAssignee extends React.Component<IATRAssigneeProps, IATRAssigneeState> {
  constructor(props: IATRAssigneeProps) {
    super(props);

    // Initialize state
    this.state = {
      tableData: this.props.artCommnetsGridData,
      selectedUsers: [],
      currentRowKey: null,
      selectedStatus: undefined,
      selectedValue:'',
      commentsData:this.props.commentsData,
      isModalOpen: false,
      modalMessage: "",
    };

    this._updateStatusOptions()
  }

  private _updateStatusOptions = () => {
    this.props.atrCreatorsList.forEach((each: any) => {
      // Check if the item with the same key already exists
      const exists = statusOptions.some(option => option.key === each.atrCreatorEmailName);
      
      // Only push if it doesn't already exist
      if (!exists) {
        statusOptions.push({
          key: each.atrCreatorEmailName,
          text: each.atrCreatorEmailName,
          id: each.atrCreatorId
        });
      }
    });
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
//   private handleStatusChange = (option: IComboBoxOption | undefined): void => {
//     const newStatus = option?.text || '';
//     console.log(newStatus)
//     console.log(option)
//     console.log(this.props.atrCreatorsList)
//     const filterATRData = this.props.atrCreatorsList.filter(
//         (each:any)=>{
//             console.log(each)
//             console.log(each.atrCreatorId)
//             console.log(option?.id)
//             console.log(each.atrCreatorId === option?.id)
//             console.log(this.props.context.pageContext)
//             if (each.atrCreatorId === option?.id){
//                 return each
//             }
//         }
//     )
//     console.log(filterATRData)
//     console.log([{...filterATRData[0],
//              "atrAssigneeId":0,
           
//             "atrAssignerEmail":this.props.context.pageContext.user.email,
//             "atrAssignerEmailName": this.props.context.pageContext.user.displayName,
           
//             "modifiedDate": new Date(),
//             "modifiedBy": this.props.context.pageContext.user.email,
//             "statusMessage": null,
           
            
//             // "approverType": 2,
//             // "approverOrder": 1,
//             // "approverStatus": 3,
//             // "approverEmail": "ib.test2@xencia.com",
//             // "noteApproverComments": "1",
//             // "strATRStatus": "Pending",
//             // "atrStatus": 1
//     }])
//     this.setState({ selectedStatus:filterATRData[0].atrCreatorEmail ,selectedValue:newStatus});
// //        {...filterATRData[0],
// //         "atrAssigneeId":0,
      
// //        "atrAssignerEmail":this.props.context.pageContext.user.email,
// //        "atrAssignerEmailName": this.props.context.pageContext.user.displayName,
      
// //        "modifiedDate": new Date(),
// //        "modifiedBy": this.props.context.pageContext.user.email,
// //        "statusMessage": null,
      
       
// //        // "approverType": 2,
// //        // "approverOrder": 1,
// //        // "approverStatus": 3,
// //        // "approverEmail": "ib.test2@xencia.com",
// //        // "noteApproverComments": "1",
// //        // "strATRStatus": "Pending",
// //        // "atrStatus": 1
// // }

//   };

  // Handler when a row is clicked to select it
  private handleRowClick = (rowKey: number): void => {
    this.setState({ currentRowKey: rowKey });
    console.log(this.props.commentsData);
  };

  // Handle row deletion
  private handleDeleteRow = (rowKey: number): void => {
    const updatedTableData = this.state.tableData.filter((item: { key: number; }) => item.key !== rowKey);
    this.setState({ tableData: updatedTableData });
    this.props.deletedGridData(updatedTableData);
  };

  public _getDetailsFromPeoplePicker = (): any => {
    console.log("add btn triggered in ATR Assignee")


    const itemExists = this.state.tableData.some(
      (item: ITableItem) => item.id === this.state.selectedValue.id
    );


    if (itemExists) {
      this.setState({
        isModalOpen: true,
        modalMessage: "The user already exists. Please add another user.",
      });
      return;
    }
    
    console.log(this.state.commentsData)
    const joinedCommentsData = this.state.commentsData
      .filter((each: any) => !!each)
      .map((each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`);


      // const updatedCommentsGridData = this.props.artCommnetsGridData.map(
      //   (each:any)=>{
      //     console.log(each)
          
      //     return {...each,comments:joinedCommentsData.join(', ')}
      //   }
      // )

    const newTableData = {
      key: v4(),
      comments: joinedCommentsData.join(', '),
      assignedTo: this.state.selectedValue.text,
      status: 'submitted',
    };

    // this.setState((prev) => {
    //   this.props.updategirdData([...prev.tableData, newTableData]);
    //   return { selectedUsers: data, tableData: [...prev.tableData, newTableData] };

    
  this.props.updategirdData({assigneeDetails:this.state.selectedValue,comments:[...this.state.tableData,newTableData]});
    // });
    this.setState({tableData:[...this.state.tableData,newTableData]})
    
  };

  public _getDetailsFromPeoplePickerData = (data: any,type:any): any => {
    console.log("add btn triggered in ATR Assignee")
    console.log(data)
    console.log(type)


    
    if (data[0]!==''){
      this.setState({selectedValue:data[0]})
    }
  };


  private _closeModal = (): void => {
    this.setState({ isModalOpen: false });
  };

  public render(): React.ReactElement<IATRAssigneeProps> {
    const { tableData } = this.state;
    console.log(statusOptions)
    console.log(this.state)
    console.log(this.props)


    const styles = mergeStyleSets({
      modal: {
        padding: "10px",
        minWidth: "300px",
        maxWidth: "80vw",
        width: "100%",
        "@media (min-width: 768px)": {
          maxWidth: "580px", // Adjust width for medium screens
        },
        "@media (max-width: 767px)": {
          maxWidth: "290px", // Adjust width for smaller screens
        },
        margin: "auto",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px 0",
      },
      footer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "20px",
        borderTop: "1px solid #ddd", // Added border to the top of the footer
        paddingTop: "10px",
      },
    });

    const {  isModalOpen, modalMessage } = this.state;

    return (
      <div>
        {/* Stack to align PeoplePicker, ComboBox, and Add Button beside each other */}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PnPPeoplePicker
            context={this.props.context}
            spProp={this.props.sp}
            getDetails={this._getDetailsFromPeoplePickerData}
            typeOFButton="atr"
          />

          {/* ComboBox for Status Selection */}

          {/* <ComboBox
            placeholder="Select Status"
            options={statusOptions}
            selectedKey={this.state.selectedValue}
            onChange={(event, option) => this.handleStatusChange(option)}
            // autoComplete="on"
            // allowFreeform
          /> */}
          <DefaultButton iconProps={{iconName:"Add"}} onClick={this._getDetailsFromPeoplePicker}>Add</DefaultButton>
         
        </Stack>
        

        {/* DetailsList to show table data */}
        <DetailsList
          items={tableData}
          columns={this.columns}
          setKey="set"
          layoutMode={0} // Justified layout
          selectionMode={SelectionMode.none}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          onItemInvoked={(item: ITableItem) => this.handleRowClick(item.key)} // Click to select row
        />



         {/* Modal for alerts */}
         <Modal
          isOpen={isModalOpen}
          onDismiss={this._closeModal}
          isBlocking={true}
          containerClassName={styles.modal}
        >
          <div className={styles.header}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Icon iconName="Info" />
              <h2 style={{ marginLeft: "10px" }}>Alert</h2>
            </div>
            <IconButton
              iconProps={{ iconName: "ErrorBadge" }}
              ariaLabel="Close popup modal"
              onClick={this._closeModal}
            />
          </div>
          <div className={styles.body}>
            <p>{modalMessage}</p>
          </div>
          <div className={styles.footer}>
            <PrimaryButton
              iconProps={{ iconName: "ReturnToSession" }}
              onClick={this._closeModal}
              text="OK"
            />
          </div>
        </Modal>
      </div>
    );
  }
}
