/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */

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
    console.log(this.props)
    this.state = {
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      rowsData: this._getCurentUserComment() ,
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
        (each: any) => each.commentedBy === this.props.currentUserDetails.displayName
      )
    ) {
      console.log(
        this.props.data.filter(
          (each: any) => each.commentedBy === this.props.currentUserDetails.displayName
        )
      );
      return this.props.data.filter(
        (each: any) =>each.commentedBy === this.props.currentUserDetails.displayName
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

  public render(): React.ReactElement<any> {
    console.log(this.state);
    return (
      <div style={{ overflow: "auto" }}>
        <table
          style={{
            border: "1px solid black",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <tr>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Page#
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>Page</th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Comment
            </th>
            <th style={{ border: "1px solid black", padding: "10px" }}>
              Action
            </th>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              <input
                value={this.state.pageNumValue}
                onChange={(e) => this.handleInputElement(e, "pageNum")}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              <input
                value={this.state.pageValue}
                onChange={(e) => this.handleInputElement(e, "page")}
              />
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              <textarea
                value={this.state.commentValue}
                name="comments"
                rows={4} // Rows should be a number, not a string
                cols={50}
                placeholder="Enter your comment here..."
                onChange={(e) => this.handleInputElement(e, "comments")}
              ></textarea>
            </td>
            <td style={{ border: "1px solid black", padding: "10px" }}>
              <button type="button" onClick={this.handleAddBtn}>
                Add
              </button>
            </td>
          </tr>
          {this.state.editState
            ? this.state.rowsData.map((each: any, index: number) => {
                if (each.id === this.state.id) {
                  return (
                    <tr key={each.index + 1}>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <input
                          value={this.state.editPageNumValue}
                          onChange={(e) => {
                            this.handleInputElement(e, "pageNum", each.id);
                          }}
                        />
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <input
                          value={this.state.editPageValue}
                          onChange={(e) => {
                            this.handleInputElement(e, "page", each.id);
                          }}
                        />
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <input
                          value={this.state.editCommentValue}
                          onChange={(e) => {
                            this.handleInputElement(e, "comment", each.id);
                          }}
                        />
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            console.log("save btn triggered");
                            this.setState({ editState: false });
                            this.handleSaveBtn(e);
                          }}
                        >
                          Save
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={each.index + 1}>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        {each.pageNum}
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        {each.page}
                      </td>

                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        {each.comment}
                      </td>
                      <td
                        style={{ border: "1px solid black", padding: "10px" }}
                      >
                        <button type="button">Delete</button>
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Edit is triggered");
                            this.setState({ editState: true, id: each.id });
                            const filteredItem = this.state.rowsData.filter(
                              (item: any) => item.id === each.id
                            )[0];
                            this.setState({
                              editPageNumValue: filteredItem.pageNum,
                              editPageValue: filteredItem.page,
                              editCommentValue: filteredItem.comment,
                            });
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                }
              })
            : this.state.rowsData.map((each: any, index: number) => {
                return (
                  <tr key={each.index + 1}>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {each.pageNum}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {each.page}
                    </td>

                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      {each.comment}
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      <button type="button">Delete</button>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Edit is triggered");
                          this.setState({ editState: true, id: each.id });
                          const filteredItem = this.state.rowsData.filter(
                            (item: any) => item.id === each.id
                          )[0];
                          this.setState({
                            editPageNumValue: filteredItem.pageNum,
                            editPageValue: filteredItem.page,
                            editCommentValue: filteredItem.comment,
                          });
                        }}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    );
  }
}
