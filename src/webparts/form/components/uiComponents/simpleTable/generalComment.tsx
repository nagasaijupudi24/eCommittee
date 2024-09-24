/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */

import { PrimaryButton } from "@fluentui/react";
import * as React from "react";
import { v4 } from "uuid";

// import { TextField, PrimaryButton, DefaultButton, Stack, DetailsList, DetailsListLayoutMode, IColumn, } from '@fluentui/react';

// interface IGridRow {
//   pageNumber: string;
//   page: string;
//   comments: string;
//   isEditing: boolean;
// }

interface IGridState {
  pageNumValue: string;
  pageValue: string;
  commentValue: string;
  rowsData: any;
  editState: boolean;
  id: any;
  editPageNumValue: string;
  editPageValue: string;
  editCommentValue: string;
}

export default class GeneralCommentsFluentUIGrid extends React.Component<
  any,
  IGridState
> {
  constructor(props: any) {
    super(props);
    console.log(this.props);
    this.state = {
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      rowsData: this._getCurentUserComment(),
      editState: false,
      id: "",
      editPageNumValue: "",
      editPageValue: "",
      editCommentValue: "",
    };
    console.log(v4());
  }

  public _getCurentUserComment = (): any => {
    // console.log(this.props.data?.some(
    //     (each: any) =>{
    //         console.log(each.commentedBy)
    //         return  each.commentedBy === this.props.currentUserDetails.displayName
    //     }
    //   ))

    //   console.log(this.props.currentUserDetails.displayName)
    if (
      this.props.data?.some(
        (each: any) =>
          each?.commentedBy === this.props.currentUserDetails.displayName
      )
    ) {
      console.log(
        this.props.data?.filter(
          (each: any) =>
            each?.commentedBy === this.props.currentUserDetails.displayName
        )
      );
      return this.props.data?.filter(
        (each: any) =>
          each?.commentedBy === this.props.currentUserDetails.displayName
        //     {
        //     console.log(each)
        //     console.log(each.commentedBy === this.props.currentUserDetails.displayName)
        //     console.log(each.commentedBy)
        //     console.log( this.props.currentUserDetails.displayName)
        //     // if (each.commentedBy === this.props.currentUserDetails.displayName){
        //     //         console.log(each.commentedBy === this.props.currentUserDetails.displayName)
        //     //         return each
        //     // }

        // }
      );
    } else {
      return [];
    }
  };

  public handleInputElement = (event: any, type: any = "", id: any = "") => {
    console.log(event.target.value);
    if (this.state.editState) {
      switch (type) {
        case "pageNum":
          this.setState({ editPageNumValue: event.target.value });
          break;
        case "page":
          this.setState({ editPageValue: event.target.value });
          break;
        default:
          this.setState({ editCommentValue: event.target.value });
      }
    } else {
      switch (type) {
        case "pageNum":
          this.setState({ pageNumValue: event.target.value });
          break;
        case "page":
          this.setState({ pageValue: event.target.value });
          break;
        default:
          this.setState({ commentValue: event.target.value });
      }
    }
  };

  public handleAddBtn = (event: any) => {
    console.log("Add btn event triggered");
    const { pageNumValue, pageValue, commentValue } = this.state;
    const commentsObj = {
      id: v4(),
      pageNum: pageNumValue,
      page: pageValue,
      comment: commentValue,
      commentedBy: this.props.currentUserDetails.displayName,
    };
    console.log(commentsObj);
    this.props.handleCommentDataFuntion(commentsObj, "add");
    this.setState((prev) => ({
      rowsData: [...prev.rowsData, commentsObj],
    }));
  };

  public handleSaveBtn = (event: any) => {
    console.log("Save btn event triggered");
    const { id, editPageNumValue, editPageValue, editCommentValue } =
      this.state;
    const commentsObj = {
      id: id,
      pageNum: editPageNumValue,
      page: editPageValue,
      comment: editCommentValue,
      commentedBy: this.props.currentUserDetails.displayName,
    };
    console.log(commentsObj);
    const filterIdforUpdateState = this.state.rowsData.filter(
      (each: any) => each.id === this.state.id
    )[0];
    console.log(filterIdforUpdateState);
    const returnValue = (rowData: any): any => {
      console.log(rowData);
      const result = rowData.map((item: any) => {
        console.log(item);
        if (item.id === filterIdforUpdateState.id) {
          return commentsObj;
        }
        return item;
      });
      console.log(result);
      return result;
    };
    console.log(returnValue(this.state.rowsData));
    this.setState({ rowsData: returnValue(this.state.rowsData) });

    //   this.setState(prev=>({rowsData:returnValue(prev.rowsData)}))
    this.props.handleCommentDataFuntion(commentsObj, "save", this.state.id);
    // this.setState((prev) => ({
    //   rowsData: [
    //     ...prev.rowsData,
    //         commentsObj,
    //   ]
    // }));
  };

  public _getValue = (type: any = "") => {
    switch (type) {
      case "pageNum":
        return this.state.rowsData.filter((each: any) => {
          if (each.id === this.state.id) {
            return each;
          }
        })[0].pageNum;

      case "page":
        return this.state.rowsData.filter((each: any) => {
          if (each.id === this.state.id) {
            return each;
          }
        })[0].page;
      default:
        return this.state.rowsData.filter((each: any) => {
          if (each.id === this.state.id) {
            return each;
          }
        })[0].comment;
    }
  };

  private handleDelete = (id: any) => {
    console.log(id)
    console.log('delete triggred')
    
    this.props.handleCommentDataFuntion(this.state.rowsData.filter(
      (item: { id: any }) => item.id === id
    ), "delete", id);
    
    this.setState({
      rowsData: this.state.rowsData.filter(
        (item: { id: any }) => item.id !== id
      ),
    });
  };

  public render(): React.ReactElement<any> {
    console.log(this.state);
    return (
      <div style={{ overflow: "auto" }}>
        <table
          style={{
            minWidth: "800px",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: "120px",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Page#
              </th>
              <th
                style={{
                  width: "120px",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Page
              </th>
              <th
                style={{
                  width: "120px",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Comment
              </th>
              <th
                style={{
                  width: "120px",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <input
                  value={this.state.pageNumValue}
                  onChange={(e) => this.handleInputElement(e, "pageNum")}
                />
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <input
                  value={this.state.pageValue}
                  onChange={(e) => this.handleInputElement(e, "page")}
                />
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <textarea
                  value={this.state.commentValue}
                  name="comments"
                  rows={4}
                  cols={50}
                  placeholder="Enter your comment here..."
                  onChange={(e) => this.handleInputElement(e, "comments")}
                ></textarea>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <PrimaryButton type="button" onClick={this.handleAddBtn}>
                  Add
                </PrimaryButton>
              </td>
            </tr>
            {this.state.editState
              ? this.state.rowsData.map((each: any) => {
                  if (each.id === this.state.id) {
                    return (
                      <tr key={each.index + 1}>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <input
                            value={this.state.editPageNumValue}
                            onChange={(e) => {
                              this.handleInputElement(e, "pageNum", each.id);
                            }}
                          />
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <input
                            value={this.state.editPageValue}
                            onChange={(e) => {
                              this.handleInputElement(e, "page", each.id);
                            }}
                          />
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <textarea
                            value={this.state.editCommentValue}
                            name="comments"
                            rows={4}
                            cols={50}
                            placeholder="Enter your comment here..."
                            onChange={(e) => {
                              this.handleInputElement(e, "comment", each.id);
                            }}
                          ></textarea>
                          {/* <input
                      value={this.state.editCommentValue}
                      onChange={(e) => {
                        this.handleInputElement(e, "comment", each.id);
                      }}
                    /> */}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <PrimaryButton
                            type="button"
                            onClick={(e) => {
                              console.log("save btn triggered");
                              this.setState({ editState: false });
                              this.handleSaveBtn(e);
                            }}
                          >
                            Save
                          </PrimaryButton>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={each.index + 1}>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {each.pageNum}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {each.page}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          {each.comment}
                        </td>
                        <td
                          style={{ border: "1px solid #ddd", padding: "8px" }}
                        >
                          <PrimaryButton
                            type="button"
                            onClick={() => this.handleDelete(each.id)}
                          >
                            Delete
                          </PrimaryButton>
                          <PrimaryButton
                            type="button"
                            onClick={() => {
                              console.log("Edit is triggered");
                              this.setState({ editState: true, id: each.id });
                              const filteredItem = this.state.rowsData.find(
                                (item: { id: any }) => item.id === each.id
                              );
                              this.setState({
                                editPageNumValue: filteredItem.pageNum,
                                editPageValue: filteredItem.page,
                                editCommentValue: filteredItem.comment,
                              });
                            }}
                          >
                            Edit
                          </PrimaryButton>
                        </td>
                      </tr>
                    );
                  }
                })
              : this.state.rowsData.map((each: any) => {
                  return (
                    <tr key={each.index + 1}>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {each.pageNum}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {each.page}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {each.comment}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <PrimaryButton type="button" onClick={() => this.handleDelete(each.id)}>Delete</PrimaryButton>
                        <PrimaryButton
                          type="button"
                          onClick={() => {
                            console.log("Edit is triggered");
                            this.setState({ editState: true, id: each.id });
                            const filteredItem = this.state.rowsData.find(
                              (item: { id: any }) => item.id === each.id
                            );
                            this.setState({
                              editPageNumValue: filteredItem.pageNum,
                              editPageValue: filteredItem.page,
                              editCommentValue: filteredItem.comment,
                            });
                          }}
                        >
                          Edit
                        </PrimaryButton>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  }
}

// fluent ui code

// import * as React from "react";
// import { v4 } from "uuid";
// import {
//   DetailsList,
//   DetailsListLayoutMode,
//   SelectionMode,
//   IColumn,
//   TextField,
//   PrimaryButton,
//   DefaultButton,
// } from "@fluentui/react";

// interface IGridState {
//   pageNumValue: string;
//   pageValue: string;
//   commentValue: string;
//   rowsData: any;
//   editState: boolean;
//   id: any;
//   editPageNumValue: string;
//   editPageValue: string;
//   editCommentValue: string;
// }

// export default class GeneralCommentsFluentUIGrid extends React.Component<
//   any,
//   IGridState
// > {
//   private columns: IColumn[];

//   constructor(props: any) {
//     super(props);

//     this.columns = [
//       { key: "column1", name: "Page#", fieldName: "pageNum", minWidth: 50, maxWidth: 100, isResizable: true },
//       { key: "column2", name: "Page", fieldName: "page", minWidth: 100, maxWidth: 200, isResizable: true },
//       { key: "column3", name: "Comment", fieldName: "comment", minWidth: 200, maxWidth: 300, isResizable: true },
//       { key: "column4", name: "Action", fieldName: "action", minWidth: 100, maxWidth: 200, isResizable: true },
//     ];

//     this.state = {
//       pageNumValue: "",
//       pageValue: "",
//       commentValue: "",
//       rowsData: this._getCurentUserComment(),
//       editState: false,
//       id: "",
//       editPageNumValue: "",
//       editPageValue: "",
//       editCommentValue: "",
//     };
//   }

//   public _getCurentUserComment = (): any => {
//     if (
//       this.props.data?.some(
//         (each: any) => each?.commentedBy === this.props.currentUserDetails.displayName
//       )
//     ) {
//       return this.props.data?.filter(
//         (each: any) =>
//           each?.commentedBy === this.props.currentUserDetails.displayName
//       );
//     } else {
//       return [];
//     }
//   };

//   public handleInputElement = (event: any, type: string) => {
//     if (this.state.editState) {
//       switch (type) {
//         case "pageNum":
//           this.setState({ editPageNumValue: event.target.value });
//           break;
//         case "page":
//           this.setState({ editPageValue: event.target.value });
//           break;
//         default:
//           this.setState({ editCommentValue: event.target.value });
//       }
//     } else {
//       switch (type) {
//         case "pageNum":
//           this.setState({ pageNumValue: event.target.value });
//           break;
//         case "page":
//           this.setState({ pageValue: event.target.value });
//           break;
//         default:
//           this.setState({ commentValue: event.target.value });
//       }
//     }
//   };

//   public handleAddBtn = () => {
//     const { pageNumValue, pageValue, commentValue } = this.state;
//     const commentsObj = {
//       id: v4(),
//       pageNum: pageNumValue,
//       page: pageValue,
//       comment: commentValue,
//       commentedBy: this.props.currentUserDetails.displayName,
//     };

//     this.props.handleCommentDataFuntion(commentsObj, "add");
//     this.setState((prev) => ({
//       rowsData: [...prev.rowsData, commentsObj],
//       pageNumValue: "",
//       pageValue: "",
//       commentValue: "",
//     }));
//   };

//   public handleSaveBtn = () => {
//     const { id, editPageNumValue, editPageValue, editCommentValue } =
//       this.state;
//     const commentsObj = {
//       id: id,
//       pageNum: editPageNumValue,
//       page: editPageValue,
//       comment: editCommentValue,
//       commentedBy: this.props.currentUserDetails.displayName,
//     };

//     const updatedRows = this.state.rowsData.map((item: any) =>
//       item.id === id ? commentsObj : item
//     );

//     this.setState({ rowsData: updatedRows, editState: false, id: "" });
//     this.props.handleCommentDataFuntion(commentsObj, "save", id);
//   };

//   public render(): React.ReactElement<any> {
//     const items = this.state.rowsData.map((row: any) => ({
//       key: row.id,
//       pageNum: row.pageNum,
//       page: row.page,
//       comment: row.comment,
//       action: this.state.editState && this.state.id === row.id ? (
//         <PrimaryButton text="Save" onClick={this.handleSaveBtn} />
//       ) : (
//         <>
//           <DefaultButton
//             text="Edit"
//             onClick={() => {
//               this.setState({
//                 editState: true,
//                 id: row.id,
//                 editPageNumValue: row.pageNum,
//                 editPageValue: row.page,
//                 editCommentValue: row.comment,
//               });
//             }}
//           />
//           <DefaultButton text="Delete" />
//         </>
//       ),
//     }));

//     return (
//       <div style={{ overflow: "auto" }}>
//         <DetailsList
//           items={items}
//           columns={this.columns}
//           setKey="set"
//           layoutMode={DetailsListLayoutMode.fixedColumns}
//           selectionMode={SelectionMode.none}
//         />

//         {/* First row with input fields */}
//         <div style={{ display: "flex", marginTop: "10px" }}>
//           <TextField
//             placeholder="Page#"
//             value={this.state.pageNumValue}
//             onChange={(e) => this.handleInputElement(e, "pageNum")}
//             styles={{ root: { marginRight: 10, width: 100 } }}
//           />
//           <TextField
//             placeholder="Page"
//             value={this.state.pageValue}
//             onChange={(e) => this.handleInputElement(e, "page")}
//             styles={{ root: { marginRight: 10, width: 200 } }}
//           />
//           <TextField
//             placeholder="Comment"
//             multiline
//             rows={4}
//             value={this.state.commentValue}
//             onChange={(e) => this.handleInputElement(e, "comments")}
//             styles={{ root: { marginRight: 10, width: 300 } }}
//           />
//           <PrimaryButton text="Add" onClick={this.handleAddBtn} />
//         </div>
//       </div>
//     );
//   }
// }
