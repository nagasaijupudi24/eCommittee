import { TextArea } from '@progress/kendo-react-inputs';
import * as React from 'react';
// import { TextField, PrimaryButton, DefaultButton, Stack, DetailsList, DetailsListLayoutMode, IColumn, } from '@fluentui/react';

interface IGridRow {
  pageNumber: string;
  page: string;
  comments: string;
  isEditing: boolean;
}

interface IGridState {
    pageNum:string;
    page:string;
    comment:string;
    rowsData:any;
    editState:boolean;

 
}

export default class GeneralCommentsFluentUIGrid extends React.Component<any, IGridState> {
  constructor(props: any) {
    super(props);
    this.state = {
        pageNum:'',
        page:'',
        comment:'',
        rowsData:{},
        editState:false,
      
    };
  }


  public render(): React.ReactElement<any> {
   return <div>
    <table>
        <th>
            <td>
                Page#
            </td>
            <td>
                Page
            </td>
            <td>
                Comment
            </td>
            <td>
                Action
            </td>
        </th>
        <tr>
                <td>
                    <input value={this.state.pageNum}/>

                </td>
                <td>
                    <input value={this.state.page}/>

                </td>
                <td>
                    <TextArea value={this.state.comment}/>

                </td>
            <td>
                <button type="button">
                    Add
                </button>

            </td>
        </tr>
        {/* {this.state.editState? <tr>
            {this.state.rowsData.map(
                (each:any,index:number)=>{
                    return <>{each}</div>>
                }
            )}
            
        </tr>:
         <tr>
         {this.state.rowsData.map(
             (each:any,index:number)=>{
                 return <div>{each}</div>>
             }
         )}
         
     </tr>} */}
       

    </table>
    </div>
  }
}
