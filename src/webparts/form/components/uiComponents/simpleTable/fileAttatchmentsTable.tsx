/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { DetailsList, IColumn, SelectionMode } from '@fluentui/react';

const FileAttachmentTable = (props: any) => {
  const gridData = props.data;

  // Define columns for the Fluent UI table
  const columns: IColumn[] = [
    {
      key: 'column1',
      name: 'Document Link',
      fieldName: 'fileUrl',
      minWidth: 250,
      maxWidth: 300, // Set max width for Document Link
      onRender: (item: any) => (
        <a href={item.fileUrl} download>
          {item.name}
        </a>
      ),
    },
    {
      key: 'column2',
      name: 'Attached By',
      fieldName: 'modifiedBy',
      minWidth: 120,
      maxWidth: 120,
      onRender: (item: any) => (
        <span>{item.modifiedBy}</span>
      ),
    },
    {
      key: 'column3',
      name: 'Attached Date',
      fieldName: 'createData',
      minWidth: 120,
      maxWidth: 200, // Set max width for Attached Date
      onRender: (item: any) => (
        <span>{item.createData}</span>
      ),
    },
  ];

  return (
    <div 
    // style={{ overflowX: 'auto' }}
    >
      <DetailsList
        items={gridData}
        columns={columns}
        selectionMode={SelectionMode.none}  
    
        styles={{
          root: { Width: '600px',
            paddingTop:'0px'
           },
        }}
      />
    </div>
  );
};

export default FileAttachmentTable;
