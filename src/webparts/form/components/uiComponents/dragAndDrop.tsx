/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { Link } from '@fluentui/react/lib/Link';
import {
  DetailsList,
  Selection,
  IColumn,

  IColumnReorderOptions,
  IDragDropEvents,
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import {  IExampleItem } from '@fluentui/example-data';


import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';
import { IconButton } from '@fluentui/react';

const theme = getTheme();

const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight,
});



interface IDetailsListDragDropExampleState {
  items: IExampleItem[];
  columns: any[];
  isColumnReorderEnabled: boolean;
  frozenColumnCountFromStart: string;
  frozenColumnCountFromEnd: string;
}

export class DetailsListDrag extends React.Component<any, IDetailsListDragDropExampleState> {
  private _selection: Selection;
  private _dragDropEvents: IDragDropEvents;
  private _draggedItem: IExampleItem | undefined;
  private _draggedIndex: number;
  private _columns:any[] =[
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

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();
    this._dragDropEvents = this._getDragDropEvents();
    this._draggedIndex = -1;
  

    this.state = {
      items :this.props.data,
      columns:this._columns,
      isColumnReorderEnabled: true,
      frozenColumnCountFromStart: '1',
      frozenColumnCountFromEnd: '0',
    };
  }

  private _remove = (dataItem:any) => {
    this.props.removeDataFromGrid(dataItem,this.props.type)
    
  };

  public render(): JSX.Element {
    const { items, columns } = this.state;

    return (
      <div>
       
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey="items"
            items={items}
            columns={columns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._dragDropEvents}
            columnReorderOptions={this.state.isColumnReorderEnabled ? this._getColumnReorderOptions() : undefined}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />

        </MarqueeSelection>
      </div>
    );
  }

  private _handleColumnReorder = (draggedIndex: number, targetIndex: number) => {
    const draggedItems = this.state.columns[draggedIndex];
    const newColumns: IColumn[] = [...this.state.columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    newColumns.splice(targetIndex, 0, draggedItems);
    this.setState({ columns: newColumns });
  };

  private _getColumnReorderOptions(): IColumnReorderOptions {
    return {
      frozenColumnCountFromStart: parseInt(this.state.frozenColumnCountFromStart, 10),
      frozenColumnCountFromEnd: parseInt(this.state.frozenColumnCountFromEnd, 10),
      handleColumnReorder: this._handleColumnReorder,
    };
  }





  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: () => {
        return true;
      },
      canDrag: () => {
        return true;
      },
      onDragEnter: () => {
        // return string is the css classes that will be added to the entering element.
        return dragEnterClass;
      },
      onDragLeave: () => {
        return;
      },
      onDrop: (item?: any) => {
        if (this._draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number) => {
        this._draggedItem = item;
        this._draggedIndex = itemIndex!;
      },
      onDragEnd: () => {
        this._draggedItem = undefined;
        this._draggedIndex = -1;
      },
    };
  }

  private _onRenderItemColumn = (item: IExampleItem, index: number, column: IColumn): JSX.Element | string => {
    const key = column.key as keyof IExampleItem;
    if (key === 'name') {
      return (
        <Link data-selection-invoke={true} underline>
          {item[key]}
        </Link>
      );
    }

    return String(item[key]);
  };

  private _insertBeforeItem(item: IExampleItem): void {
    const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
      ? (this._selection.getSelection() as IExampleItem[])
      : [this._draggedItem!];

    const insertIndex = this.state.items.indexOf(item);
    const items = this.state.items.filter(itm => draggedItems.indexOf(itm) === -1);

    items.splice(insertIndex, 0, ...draggedItems);

    console.log(items)
    this.setState({ items:items });
    this.props.reOrderData(items,this.props.type);
  }
}
