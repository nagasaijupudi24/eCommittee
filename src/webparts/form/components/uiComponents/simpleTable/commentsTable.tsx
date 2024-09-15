/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
// import { Button } from "@progress/kendo-react-buttons";



const CommentsLogTable = (props: any) => {
//    const {fieldData} = props
    
    const gridData = props.data;

    // Function to handle removing a data item from the grid
   

   

    switch(props.type){
        case "generalComments":
            return <div>{" "}</div>
        case "commentsLog":
            return (
                <div style={{ overflow: 'auto' }}>
                    <Grid
                        style={{ minWidth: '800px' }} // Sets minimum width for scrolling
                        data={gridData}
                        dataItemKey={"ProductID"}
                    >
        
                       
                        <Column field='pageNum' title="Page#" width="60px" />
                        <Column field='page' title="Doc Reference" width="90px" />
                        <Column field='comment'  title="Comments" width="90px" />
                        <Column field='commentedBy'  title="Comment By" />
                       
                    </Grid>
                </div>
            );
            default:
                return <div>{" "}</div>
        

    }
};

export default CommentsLogTable;
