/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  PrimaryButton,
  TextField,
  SelectionMode,
  Dialog,
  DialogFooter,
  DialogType,
  DefaultButton,
} from "@fluentui/react";
import * as React from "react";
import { v4 } from "uuid";
import CommentsMandatoryDialog from "../dialogFluentUi/generalCommentsMandiatoryDialog";

interface IGridRow {
  id: string;
  pageNum: string;
  page: string;
  comment: string;
  commentedBy: string;
  commentedByEmail:any;
  commentsFrom:any
}

interface IGridProps {
  data: any;
  currentUserDetails: any;
  type:any;
  handleCommentDataFuntion: (data: any, action: any, id?: any) => void; // Pass the function as a prop
}

interface IGridState {
  isVisibleAlter:any;
  pageNumValue: string;
  pageValue: string;
  commentValue: string;
  rowsData: IGridRow[];
  editRowId: string;
  isDialogOpen: boolean;
  isEditMode: boolean;
}

export default class GeneralCommentsFluentUIGrid extends React.Component<
  IGridProps,
  IGridState
> {
  constructor(props: IGridProps) {
    super(props);
    this.state = {
      isVisibleAlter:false,
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      rowsData: this._getCurentUserComment(),
      editRowId: "",
      isDialogOpen: false,
      isEditMode: false,
    };
  }

  private _getCurentUserComment = (): IGridRow[] => {
    console.log(this.props.currentUserDetails)
    console.log(this.props.data)
    if (
      this.props.data.length > 0
    ) {
      return this.props.data?.filter(
        (each: any) =>
          each?.commentedBy === this.props.currentUserDetails.displayName &&
          each?.commentsFrom === "generalComments"
      );
    } else {
      return [];
    }
  };

  private handleInputChange = (event: any, field: string) => {
    this.setState({ [field]: event.target.value } as Pick<
      IGridState,
      keyof IGridState
    >);
  };

  // Trigger Add Dialog
  private handleAddBtn = () => {
    this.setState({
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      isDialogOpen: true,
      isEditMode: false, // Setting to Add Mode
    });
  };

  // Save Add or Edit
  private handleSave = () => {
    if (this.state.isEditMode) {
      this.handleSaveBtn();
    } else {

      this.state.commentValue !== ''?this.handleAddNewComment():this.setState({isVisibleAlter:true});
    }
  };

  // Add a new comment
  private handleAddNewComment = () => {
    const { pageNumValue, pageValue, commentValue } = this.state;
    
    const commentsObj: IGridRow = {
      id: v4(),
      pageNum: pageNumValue,
      page: pageValue,
      comment: commentValue,
      commentsFrom:'generalComments',
      commentedBy: this.props.currentUserDetails.displayName,
      commentedByEmail: this.props.currentUserDetails.email,
    };

    this.setState((prevState) => ({
      rowsData: [...prevState.rowsData, commentsObj],
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      isDialogOpen: false,
    }));

    // Call the function passed from the parent component
    this.props.handleCommentDataFuntion(commentsObj, "add");
  };

  // Open Edit Dialog with data populated
  private handleEdit = (id: string) => {
    const row = this.state.rowsData.find((each) => each.id === id);
    if (row) {
      this.setState({
        pageNumValue: row.pageNum,
        pageValue: row.page,
        commentValue: row.comment,
        editRowId: id,
        isDialogOpen: true,
        isEditMode: true, // Setting to Edit Mode
      });
    }
  };
  
  // Save the Edited row
  private handleSaveBtn = () => {
    const { editRowId, pageNumValue, pageValue, commentValue } = this.state;

    const updatedRows = this.state.rowsData.map((row) =>
      row.id === editRowId
        ? {
            ...row,
            pageNum: pageNumValue,
            page: pageValue,
            comment: commentValue,
          }
        : row
    );

    this.setState({
      rowsData: updatedRows,
      editRowId: "",
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      isDialogOpen: false,
    });

    // Call the function passed from the parent component
    const updatedRow = updatedRows.find((row) => row.id === editRowId);
    this.props.handleCommentDataFuntion(updatedRow, "edit", editRowId);
  };

  // Handle Delete Action
  private handleDelete = (id: string) => {
    const filteredRows = this.state.rowsData.filter((row) => row.id !== id);
    this.setState({ rowsData: filteredRows });
    
    // Call the function passed from the parent component
    this.props.handleCommentDataFuntion(this.state.rowsData.filter(
      (item: { id: any }) =>{
        console.log(item)
        return item.id === id
      } 
    ), "delete", id);
  };

  private closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  public render(): React.ReactElement<any> {
    const columns: IColumn[] = [
      { key: "pageNum", name: "Page#", fieldName: "pageNum", minWidth: 100, maxWidth: 150, isResizable: true },
      { key: "page", name: "Doc Reference", fieldName: "page", minWidth: 100, maxWidth: 150, isResizable: true },
      { key: "comment", name: "Comment", fieldName: "comment", minWidth: 200, maxWidth: 300, isResizable: true },
      {
        key: "actions",
        name: "Actions",
        fieldName: "actions",
        minWidth: 250,

        onRender: (item: IGridRow) => (
          <>
            <PrimaryButton text="Edit" onClick={() => this.handleEdit(item.id)} />
            <PrimaryButton text="Delete" onClick={() => this.handleDelete(item.id)} style={{ marginLeft: 8 }} />
          </>
        ),
      },
    ];
    console.log(this.state)
    console.log(this.props)

    return (
      <div style={{ display: "flex",flexDirection:'column' }}>
        {/* Add Button to Open Dialog */}
        <PrimaryButton style={{ alignSelf:'flex-end' }} text="Add Comment" onClick={this.handleAddBtn} />
        <CommentsMandatoryDialog isVisibleAlter={this.state.isVisibleAlter} onCloseAlter={
          ()=>{
            this.setState({ isVisibleAlter: false});
          }
        } statusOfReq={"undefined"}/>
        {/* Fluent UI Dialog */}
        <Dialog
          hidden={!this.state.isDialogOpen}
          onDismiss={this.closeDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: this.state.isEditMode ? "Edit Comment" : "Add Comment", // Title based on mode
            closeButtonAriaLabel: "Close",
          }}
        >
          <div style={{ display: "flex",flexDirection:'column', gap: "8px", marginBottom: "16px" }}>
            <TextField
              label="Page#"
              value={this.state.pageNumValue}
              onChange={(e) => this.handleInputChange(e, "pageNumValue")}
            />
            <TextField
              label="Doc Reference"
              value={this.state.pageValue}
              onChange={(e) => this.handleInputChange(e, "pageValue")}
            />
            <TextField
              label="Comment"
              value={this.state.commentValue}
              multiline
              rows={4}
              onChange={(e) => this.handleInputChange(e, "commentValue")}
            />
          </div>

          {/* Dialog Footer for Add/Edit and Cancel Buttons */}
          <DialogFooter>
            <PrimaryButton
              text={this.state.isEditMode ? "Save" : "Add"}
              onClick={this.handleSave}
            />
            <DefaultButton text="Cancel" onClick={this.closeDialog} />
          </DialogFooter>
        </Dialog>

        {/* Grid for Showing Comments */}
        <DetailsList
          items={this.state.rowsData}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selectionMode={SelectionMode.none}
        />
      </div>
    );
  }
}
