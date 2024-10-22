/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
// import { Link } from '@fluentui/react/lib/Link';
import {
  DetailsList,
  Selection,
  IColumn,

 
  IDragDropEvents,
  IDragDropContext,
  SelectionMode,
} from '@fluentui/react/lib/DetailsList';
// import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
// import { createListItems, IExampleItem } from '@fluentui/example-data';


// import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';
import { getTheme, IconButton, mergeStyles } from '@fluentui/react';
import { IExampleItem } from '@fluentui/example-data';

const theme = getTheme();

const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight,
});
// const controlWrapperClass = mergeStyles({
//   display: 'flex',
//   flexWrap: 'wrap',
// });



interface IDetailsListDragDropExampleState {
  items: any;
  columns: IColumn[];
 
}

// const items=[
//     { key: '1', name: 'Item 1', description: 'Description of Item 1', quantity: 10 },
//     { key: '2', name: 'Item 2', description: 'Description of Item 2', quantity: 20 },
//     { key: '3', name: 'Item 3', description: 'Description of Item 3', quantity: 15 },
//     { key: '4', name: 'Item 4', description: 'Description of Item 4', quantity: 25 },
//     { key: '5', name: 'Item 5', description: 'Description of Item 5', quantity: 30 },
//   ]


// const columns: IColumn[] = [
//     {
//       key: 'dragHandle',
//       name: '',
//       fieldName: 'dragHandle',
//       minWidth: 50,
//       maxWidth: 50,
//       isResizable: false,
//       onRender: (item) => (
//         <Icon iconName="GripperDotsVertical" aria-label="Drag" style={{ cursor: 'grab' }} />
//       ),
//     },
//     {
//       key: 'text',
//       name: "type", // replace 'type' with your actual title
//       fieldName: 'text',
//       minWidth: 200,
//       maxWidth: 200,
//       isResizable: true,
//     },
//     {
//       key: 'srNo',
//       name: 'SR No',
//       fieldName: 'srNo',
//       minWidth: 200,
//       maxWidth: 200,
//       isResizable: true,
//     },
//     {
//       key: 'designation',
//       name: 'Designation',
//       fieldName: 'optionalText',
//       minWidth: 200,
//       maxWidth: 200,
//       isResizable: true,
//     },
//     {
//       key: 'actions',
//       name: 'Actions',
//       fieldName: 'actions',
//       minWidth: 200,
//       maxWidth: 200,
//       isResizable: false,
//       onRender: (item) => (
//         <IconButton
//           iconProps={{ iconName: 'Delete' }} // Using Fluent UI's delete icon
//           title="Delete"
//           ariaLabel="Delete"
//         //   onClick={() => remove(item)} // Replace with your delete function
//         />
//       ),
//     },
//   ];

export class DetailsListDragDropExample extends React.Component<any, IDetailsListDragDropExampleState> {
  private _selection: Selection;
  private _dragDropEvents: IDragDropEvents;
  private _draggedItem: any[] | undefined;
  private _draggedIndex: number;
  private _columns:any =[
    {
      key: 'dragHandle',
      name: '',
      fieldName: 'dragHandle',
      minWidth: 50,
      maxWidth: 50,
      isResizable: false,
      onRender: (item: any) => (
        <IconButton
                iconProps={{ iconName: 'GlobalNavButton' }} // Hamburger icon
                title="Menu"
                ariaLabel="Menu"
                styles={{ root: { marginTop: '-5px' } }} // Adjust the margin to move the icon up
            />
      ),
    },
    {
      key: 'serialNo',
      name: 'S.No',
      
      minWidth: 100,
      maxWidth: 150,
      isResizable: false,
      onRender: (_item: any, _index?: number) => (
        <span>{(_index !== undefined ? _index : 0) + 1}</span>
      ),
    },
    {
      key: 'text',
      name:this.props.type, // replace 'type' with your actual title
      fieldName: 'text',
      minWidth: 180,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'srNo',
      name: 'SR No',
      fieldName: 'srNo',
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'optionalText',
      name: 'Designation',
      fieldName: 'optionalText',
      minWidth: 200,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'actions',
      name: 'Actions',
      fieldName: 'actions',
      minWidth: 100,
      maxWidth: 200,
      isResizable: false,
      onRender: (_item: any) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }} // Using Fluent UI's delete icon
          title="Delete"
          ariaLabel="Delete"
          onClick={()=>{
            console.log(_item)
            this._remove(_item)
          }} // Replace with your delete function
        />
      ),
    },
  ];


  private _remove = (dataItem:any) => {
    this.props.removeDataFromGrid(dataItem,this.props.type)
    
  };
  constructor(props: any) {
    super(props);

    this._selection = new Selection();
    this._dragDropEvents = this._getDragDropEvents();
    this._draggedIndex = -1;
    // const items = createListItems(10, 0);

    this.state = {
      items:this.props.data,
      columns:this._columns,
     
    };
    console.log(this.props)
  }


  public render(): JSX.Element {
    const {  columns, } = this.state;

    return (
      <div>
        <div 
        // className={controlWrapperClass}
        >
          

          
        </div>
        {/* <MarqueeSelection selection={this._selection}> */}
          <DetailsList
            setKey="items"
            items={this.props.data}
            columns={columns}
            selection={this._selection}
            selectionMode={SelectionMode.none}
            selectionPreservedOnEmptyClick={true}
            // onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._dragDropEvents}
            // columnReorderOptions={this.state.isColumnReorderEnabled ? this._getColumnReorderOptions() : undefined}
            // ariaLabelForSelectionColumn="Toggle selection"
            // ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            // checkButtonAriaLabel="select row"
          />
        {/* </MarqueeSelection> */}
      </div>
    );
  }

  



 


  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
        return true;
      },
      canDrag: (item?: any) => {
        return true;
      },
      onDragEnter: (item?: any, event?: DragEvent) => {
        // return string is the css classes that will be added to the entering element.
        return dragEnterClass;
      },
      onDragLeave: (item?: any, event?: DragEvent) => {
        return;
      },
      onDrop: (item?: any, event?: DragEvent) => {
        if (this._draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        this._draggedItem = item;
        this._draggedIndex = itemIndex!;
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        this._draggedItem = undefined;
        this._draggedIndex = -1;
      },
    };
  }

//   private _onRenderItemColumn = (item: any, index: number, column: IColumn): JSX.Element | string => {
//     const key = column.key as keyof any;
//     if (key === 'name') {
//       return (
//         <Link data-selection-invoke={true} underline>
//           {item[key]}
//         </Link>
//       );
//     }

//     return String(item[key]);
//   };

private _insertBeforeItem(item: IExampleItem): void {
  const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
    ? (this._selection.getSelection() as IExampleItem[])
    : [this._draggedItem!];

  const insertIndex = this.props.data.indexOf(item);
  const items = this.props.data.filter((itm: any) => draggedItems.indexOf(itm) === -1);

  items.splice(insertIndex, 0, ...draggedItems);

  this.setState({ items:items });
  console.log(items)
  this.props.reOrderData(items,this.props.type);
}
}
