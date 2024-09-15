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
  id:any;
  editPageNumValue:string;
      editPageValue:string;
      editCommentValue:string
}

export default class GeneralCommentsFluentUIGrid extends React.Component<
  any,
  IGridState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      pageNumValue: "",
      pageValue: "",
      commentValue: "",
      rowsData:this.props.data,
      editState: false,
      id:'',
      editPageNumValue:'',
      editPageValue:'',
      editCommentValue:''
    };
    console.log(v4());
  }

  public handleInputElement = (event: any, type: any='',id:any='') => {
    console.log(event.target.value);
    if (this.state.editState){
        switch (type) {
            case "pageNum":
              this.setState((prev)=>{
                const updatedData = prev.rowsData.map(
                    (each:any)=>{
                        if (each.id===id){
                            return {...each, pageNumValue: event.target.value}
                        }
                        return each
                    }
                )
                return {rowsData:updatedData}
              });
              break;
            case "page":
                this.setState((prev)=>{
                    const updatedData = prev.rowsData.map(
                        (each:any)=>{
                            if (each.id===id){
                                return {...each, pageValue: event.target.value}
                            }
                            return each
                        }
                    )
                    return {rowsData:updatedData}
                  });
              break;
            default:
                this.setState((prev)=>{
                    const updatedData = prev.rowsData.map(
                        (each:any)=>{
                            if (each.id===id){
                                return {...each, commentValue: event.target.value}
                            }
                            return each
                        }
                    )
                    return {rowsData:updatedData}
                  });
          }
        

    }else{
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
        commentedBy:this.props.currentUserDetails.displayName
      }
      console.log(commentsObj)
      this.props.handleCommentDataFuntion(commentsObj)
    this.setState((prev) => ({
      rowsData: [
        ...prev.rowsData,
            commentsObj,
      ]
    }));
  };

  public _getValue = (type:any='')=>{
    switch (type) {
        case "pageNum":
          return this.state.rowsData.filter((each:any)=>{
                if (each.id === this.state.id){
                    return each
                }
          })[0].pageNum
          
        case "page":
            return this.state.rowsData.filter((each:any)=>{
                if (each.id === this.state.id){
                    return each
                }
          })[0].page
        default:
            return this.state.rowsData.filter((each:any)=>{
                if (each.id === this.state.id){
                    return each
                }
          })[0].comment
      }
    


  }

  public render(): React.ReactElement<any> {
    console.log(this.state)
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
                return (
                  <tr key={each.index + 1}>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                        <input value={this._getValue("pageNum")}  onChange={(e)=>{
                            this.handleInputElement(e,"pageNum",each.id)
                        }}/>
                      
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                     
                      <input value={each.page} onChange={(e)=>{
                        this.handleInputElement(e,"page",each.id)
                      }}/>
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      
                      <input value={each.comment} onChange={(e)=>{
                        this.handleInputElement(e,"comment",each.id)
                      }}/>
                    </td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                        <button type="button" onClick={()=>{
                            console.log("save btn triggered")
                            this.setState({editState:false})
                            }}>Save</button>
                    </td>
                  </tr>
                );
              })
            : this.state.rowsData.map((each: any, index: number) => {
                return (
                  <tr key={each.index + 1}>
                    <td style={{ border: "1px solid black", padding: "10px" }}>{each.pageNum}</td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>{each.page}</td>
                    
                    <td style={{ border: "1px solid black", padding: "10px" }}>{each.comment}</td>
                    <td style={{ border: "1px solid black", padding: "10px" }}>
                      
                      <button type="button">Delete</button>
                      <button type="button" onClick={()=>{
                        console.log("Edit is triggered")
                        this.setState({editState:true,id:each.id})}}>Edit</button>
                    </td>
                  </tr>
                );
              })}
        </table>
      </div>
    );
  }
}
