/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable @rushstack/no-new-null */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from "react";
// import {
//   DetailsList,
//   IColumn,
//   Stack,
//   IconButton,
//   DefaultButton,
// } from "@fluentui/react";
// import { IComboBoxOption } from "@fluentui/react/lib/ComboBox";

// import PnPPeoplePicker from "../peoplePicker/peoplePicker";


// // Interface for each table item
// interface ITableItem {
//   id: any;
//   comments: any;
//   assignedTo: any;
//   status: any;
// }

// // Interface for the component's props
// interface IATRAssigneeProps {
//   gridData: any;
//   updategirdData: any;

//   sp: any;
//   context: any; // This is required by the PeoplePicker

//   artCommnetsGridData: any;
//   submitFunctionForMarkInfo:any;
//   deletedGridData: any;
// }

// // Interface for the component's state
// interface IATRAssigneeState {
//   tableData: any;
//   selectedUsers: any;
//   currentRowKey: any;
//   selectedStatus: any;
//   selectedValue: any;
// }

// // ComboBox options for status
// const statusOptions: IComboBoxOption[] = [];

// export class MarkInfo extends React.Component<
//   IATRAssigneeProps,
//   IATRAssigneeState
// > {
//   constructor(props: IATRAssigneeProps) {
//     super(props);

//     // Initialize state
//     this.state = {
//       tableData: this.props.artCommnetsGridData,
//       selectedUsers: [],
//       currentRowKey: null,
//       selectedStatus: undefined,
//       selectedValue: "",
//     };

   
//   }

  

//   // Define the columns for the DetailsList
//   private columns: IColumn[] = [
//     {
//       key: "serialNo",
//       name: "S.No",

//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: false,
//       onRender: (_item: any, _index?: number) => (
//         <span>{(_index !== undefined ? _index : 0) + 1}</span>
//       ),
//     },
//     {
//       key: "text",
//       name: "User Info",
//       fieldName: "text",
//       minWidth: 100,
//       maxWidth: 150,
//       isResizable: true,
//     },

//     {
//       key: "delete",
//       name: "Action",
//       fieldName: "delete",
//       minWidth: 100,
//       maxWidth: 150,
//       onRender: (item: ITableItem) => (
//         <IconButton
//           iconProps={{ iconName: "Delete" }}
//           title="Delete"
//           ariaLabel="Delete"
//           onClick={() => this.handleDeleteRow(item.id)} // Delete row handler
//         />
//       ),
//     },
//   ];

//   // Handle row deletion
//   private handleDeleteRow = (rowKey: number): void => {
//     console.log(rowKey)
//     const updatedTableData = this.state.tableData.filter(
//       (item: { id: number }) => {
//         console.log(item)
//         console.log(item.id)
//         return item.id !== rowKey
//       }
//     );
//     this.setState({ tableData: updatedTableData });
//     this.props.deletedGridData(updatedTableData);
//   };

//   public _handleAdd = (): any => {
//     console.log("add btn triggered in ATR Assignee");
//     console.log(this.state)

//     this.props.updategirdData({
//         markInfoassigneeDetails: this.state.selectedValue,
//     });
//     // });
//     this.setState({
//       tableData: [...this.state.tableData, this.state.selectedValue],
//     });
//   };

//   public _getDetailsFromPeoplePickerData = (data: any, type: any): any => {
//     console.log("add btn triggered in ATR Assignee");
//     console.log(data);
//     console.log(type);
//     this.setState({ selectedValue: data[0] });
//   };

//   public render(): React.ReactElement<IATRAssigneeProps> {
//     const { tableData } = this.state;
//     console.log(statusOptions);
//     console.log(this.state);
//     console.log(this.props);

//     return (
//       <div>
//         {/* Stack to align PeoplePicker, ComboBox, and Add Button beside each other */}
//         <Stack horizontal tokens={{ childrenGap: 10 }}>
//           <PnPPeoplePicker
//             context={this.props.context}
//             spProp={this.props.sp}
//             getDetails={this._getDetailsFromPeoplePickerData}
//             typeOFButton="markInfo"
//           />

//           <DefaultButton
//             iconProps={{ iconName: "Add" }}
//             onClick={this._handleAdd}
//           >
//             Add
//           </DefaultButton>
//         </Stack>

//         {/* DetailsList to show table data */}
//         <DetailsList
//           items={tableData}
//           columns={this.columns}
//           setKey="set"
//           layoutMode={0} // Justified layout
//           selectionPreservedOnEmptyClick={false}
//           ariaLabelForSelectionColumn="Toggle selection"
//           ariaLabelForSelectAllCheckbox="Toggle selection for all items"
//           // Click to select row
//         />
//        <div style={{ textAlign: "right" }}>
//   <DefaultButton
//     iconProps={{ iconName: "Save" }}
//     onClick={this.props.submitFunctionForMarkInfo}
//   >
//     Submit
//   </DefaultButton>
// </div>



        
//       </div>
//     );
//   } 
// }



import * as React from "react";
import {
  DetailsList,
  IColumn,
  Stack,
  IconButton,
  DefaultButton,
  Modal,
  Icon,
  PrimaryButton,
  SelectionMode,
} from "@fluentui/react";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";

// Interface for each table item
interface ITableItem {
  id: any;
  comments: any;
  assignedTo: any;
  status: any;
}

// Interface for the component's props
interface IATRAssigneeProps {
  gridData: any;
  updategirdData: any;
  sp: any;
  context: any; // This is required by the PeoplePicker
  artCommnetsGridData: any;
  submitFunctionForMarkInfo: any;
  deletedGridData: any;
}

// Interface for the component's state
interface IATRAssigneeState {
  tableData: any;
  selectedUsers: any;
  currentRowKey: any;
  selectedStatus: any;
  selectedValue: any;
  isModalOpen: boolean;
  modalMessage: string;
}

export class MarkInfo extends React.Component<
  IATRAssigneeProps,
  IATRAssigneeState
> {
  constructor(props: IATRAssigneeProps) {
    super(props);

    // Initialize state
    this.state = {
      tableData: this.props.artCommnetsGridData,
      selectedUsers: [],
      currentRowKey: null,
      selectedStatus: undefined,
      selectedValue: "",
      isModalOpen: false,
      modalMessage: "",
    };
  }

  // Define the columns for the DetailsList
  private columns: IColumn[] = [
    {
      key: "serialNo",
      name: "S.No",
      minWidth: 100,
      maxWidth: 150,
      isResizable: false,
      onRender: (_item: any, _index?: number) => (
        <span>{(_index !== undefined ? _index : 0) + 1}</span>
      ),
    },
    {
      key: "text",
      name: "User Info",
      fieldName: "text",
      minWidth: 100,
      maxWidth: 150,
      isResizable: true,
    },
    {
      key: "delete",
      name: "Action",
      fieldName: "delete",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: ITableItem) => (
        <IconButton
          iconProps={{ iconName: "Delete" }}
          title="Delete"
          ariaLabel="Delete"
          onClick={() => this.handleDeleteRow(item.id)} // Delete row handler
        />
      ),
    },
  ];

  // Handle row deletion
  private handleDeleteRow = (rowKey: number): void => {
    const updatedTableData = this.state.tableData.filter(
      (item: { id: number }) => item.id !== rowKey
    );
    this.setState({ tableData: updatedTableData });
    this.props.deletedGridData(updatedTableData);
  };

  public _handleAdd = (): any => {
    const { tableData, selectedValue } = this.state;

    if (tableData.length >= 10) {
      this.setState({
        isModalOpen: true,
        modalMessage: "You cannot add more than 10 items.",
      });
      return;
    }

    const itemExists = tableData.some(
      (item: ITableItem) => item.id === selectedValue.id
    );

    if (itemExists) {
      this.setState({
        isModalOpen: true,
        modalMessage: "The user already exists. Please add another user.",
      });
      return;
    }

    this.props.updategirdData({
      markInfoassigneeDetails: selectedValue,
    });

    this.setState({
      tableData: [...tableData, selectedValue],
    });
  };

  public _getDetailsFromPeoplePickerData = (data: any, type: any): any => {
    this.setState({ selectedValue: data[0] });
  };

  private _closeModal = (): void => {
    this.setState({ isModalOpen: false });
  };

  private _handleSubmit = (): void => {
    if (this.state.tableData.length === 0) {
      this.setState({
        isModalOpen: true,
        modalMessage: "Please select a user and click Add.",
      });
      return;
    }

    this.props.submitFunctionForMarkInfo();
    this.setState({
      isModalOpen: true,
      modalMessage: "Submission successful!",
    });
  };

  public render(): React.ReactElement<IATRAssigneeProps> {
    const { tableData, isModalOpen, modalMessage } = this.state;
    console.log(this.props)
    console.log(this.state)

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

    return (
      <div>
        {/* Stack to align PeoplePicker, ComboBox, and Add Button beside each other */}
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PnPPeoplePicker
            context={this.props.context}
            spProp={this.props.sp}
            getDetails={this._getDetailsFromPeoplePickerData}
            typeOFButton="markInfo"
          />

          <DefaultButton
            iconProps={{ iconName: "Add" }}
            onClick={this._handleAdd}
          >
            Add
          </DefaultButton>
        </Stack>

        {/* DetailsList to show table data */}
        <DetailsList
          items={tableData}
          columns={this.columns}
          setKey="set"
          layoutMode={0} // Justified layout
          selectionMode={SelectionMode.none} // Disable selection
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />

        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <DefaultButton
            iconProps={{ iconName: "Save" }}
            onClick={this._handleSubmit}
          >
            Submit
          </DefaultButton>
        </div>

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
              iconProps={{ iconName: "Cancel" }}
              ariaLabel="Close popup modal"
              onClick={this._closeModal}
            />
          </div>
          <div className={styles.body}>
            <p>{modalMessage}</p>
          </div>
          <div className={styles.footer}>
            <PrimaryButton
              iconProps={{ iconName: "CheckMark" }}
              onClick={this._closeModal}
              text="OK"
            />
          </div>
        </Modal>
      </div>
    );
  }
}



