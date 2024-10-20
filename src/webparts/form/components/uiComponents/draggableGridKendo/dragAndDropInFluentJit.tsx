// import * as React from 'react';
// // import { Grid, GridColumn as Column, GridCellProps } from '@progress/kendo-react-grid';
// import { IPeoplePickerContext, PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
// // import { DragAndDrop } from '@progress/kendo-react-common';
// // import { DraggableRow } from './draggable-row';
// // import { DragHandleCell } from './drag-handle-cell';
// // import styles from './ReviewerSection.module.scss';
// import { spfi, SPFx } from "@pnp/sp";
// import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
// // import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
// import { Modal, IconButton } from '@fluentui/react';
// import { DetailsList, IColumn, Selection, IDragDropEvents, IDragDropContext, SelectionMode } from '@fluentui/react/lib/DetailsList';
// import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
// import { getTheme, mergeStyles } from '@fluentui/react/lib/Styling';
// import { DetailsListLayoutMode } from '@fluentui/react/lib/DetailsList';
// // import { DefaultButton } from '@fluentui/react/lib/Button';
// // import { IconButton, } from '@fluentui/react/lib/Button';
// // import { IDetailsListProps, DetailsRow,IDetailsRowProps} from '@fluentui/react/lib/DetailsList';




// const theme = getTheme();
// const dragEnterClass = mergeStyles({
//     backgroundColor: theme.palette.neutralLight,
// });



// interface Reviewer {
//     userId?: number;
//     sNo: number;
//     reviewer: string;
//     srNo: string;
//     designation: string;
//     email: string
// }

// interface Approver {
//     userId?: number;
//     sNo: number;
//     approver: string;
//     srNo: string;
//     designation: string;
//     email: string
// }



// interface ReviewerSectionProps {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     context: any;
//     onReviewersUpdate: (reviewers: Reviewer[]) => void;
//     onApproversUpdate: (approvers: Approver[]) => void;
//     // itemId?=number;
//     itemId?: number;
//     reviewers: Reviewer[];
//     approvers: Approver[];
//     // current:CurrentApproverId[];
//     // previous:LastApproverId[];

// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// class ReviewerSection extends React.Component<ReviewerSectionProps, { reviewers: Reviewer[], approvers: Approver[], showDialog: boolean, dialogMessage: string, selectedReviewer: any[], selectedApprover: any[] }> {
//     private peoplePickerContext: IPeoplePickerContext;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     sp: any;

//     private _selection: Selection;
//     private _dragDropEvents: IDragDropEvents;
//     private _draggedItem: Reviewer | undefined;
//     private _draggedIndex: number;


//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
//     componentDidUpdate(prevProps: ReviewerSectionProps) {
//         try {
//             if (prevProps.itemId !== this.props.itemId) {
//                 console.log('Item ID updated in child:', this.props.itemId);
//             }
//             if (prevProps.reviewers !== this.props.reviewers) {
//                 console.log('Reviewers updated in child:', this.props.reviewers);
//                 this.setState({ reviewers: this.props.reviewers });
//             }
//             if (prevProps.approvers !== this.props.approvers) {
//                 console.log('Approvers updated in child:', this.props.approvers);
//                 this.setState({ approvers: this.props.approvers });
//             }
//         } catch (error) {
//             console.error("Error in componentDidUpdate:", error);
//         }
//     }

//     constructor(props: ReviewerSectionProps) {
//         super(props);
//         this.peoplePickerContext = {
//             absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
//             msGraphClientFactory: this.props.context.msGraphClientFactory,
//             spHttpClient: this.props.context.spHttpClient
//         };
//         this.state = {
//             reviewers: [],
//             approvers: [],
//             showDialog: false,
//             dialogMessage: '',
//             selectedReviewer: [],
//             selectedApprover: [],

//         };
//         this.sp = spfi().using(SPFx(this.props.context));
//         this._selection = new Selection();
//         this._dragDropEvents = this._getDragDropEvents();
//         this._draggedIndex = -1;

//         console.log(this.state.reviewers)
//     }




//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     handleAddReviewer = async (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         event.stopPropagation();

//         if (this.state.selectedReviewer.length === 0) {
//             this.setState({
//                 dialogMessage: "Please select a reviewer then click on Add.",
//                 showDialog: true
//             });
//             return;
//         }

//         const selectedReviewer = this.state.selectedReviewer[0];
//         const currentUserEmail = this.props.context.pageContext.user.email;

//         console.log('Selected Reviewer Email:', selectedReviewer.secondaryText);
//         console.log('Current User Email:', currentUserEmail);

//         if (selectedReviewer.secondaryText === currentUserEmail) {
//             this.setState({
//                 dialogMessage: "You cannot add yourself as a reviewer.",
//                 showDialog: true
//             });
//             return;
//         }

//         console.log('Selected Reviewer:', selectedReviewer);

//         const isReviewer = this.state.reviewers.some(reviewer => reviewer.reviewer === selectedReviewer.text);
//         if (isReviewer) {
//             this.setState({
//                 dialogMessage: "The selected reviewer cannot be the same as existing Reviewers/Requester/CurrentActioner.",
//                 showDialog: true
//             });
//             return;
//         }

//         const isApprover = this.state.approvers.some(approver => approver.approver === selectedReviewer.text);
//         if (isApprover) {
//             this.setState({
//                 dialogMessage: "The selected reviewer cannot be the same as existing Reviewers/Requester/CurrentActioner.",
//                 showDialog: true
//             });
//             return;
//         }

//         try {
//             const user = await this.sp.web.ensureUser(selectedReviewer.loginName);
//             // const userEmail = user.Email;



//             const userEmail = user.Email;
//             const splitEmail = userEmail.split('@')[0];


//             console.log('User Email:', userEmail);
//             console.log('Split Email:', splitEmail);

//             const newReviewer: Reviewer = {
//                 sNo: this.state.reviewers.length + 1,
//                 reviewer: selectedReviewer.text,
//                 // srNo: userEmail,
//                 srNo: splitEmail,
//                 designation: await this.profileDetail(selectedReviewer.loginName),
//                 userId: user.Id,
//                 // email:user.Email
//                 email: userEmail
//             };

//             this.setState((prevState) => {
//                 const newReviewers = [...prevState.reviewers, newReviewer];
//                 console.log('Updating reviewers in parent:', newReviewers);
//                 this.props.onReviewersUpdate(newReviewers);
//                 return {
//                     reviewers: newReviewers,
//                     selectedReviewer: []
//                 };
//             });

//         } catch (error) {
//             console.error('Error adding reviewer:', error);
//             this.setState({
//                 dialogMessage: "An error occurred while adding the reviewer. Please try again.",
//                 showDialog: true
//             });
//         }
//     }




//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     handleAddApprover = async (event: React.MouseEvent<HTMLButtonElement>) => {
//         event.preventDefault();
//         event.stopPropagation();

//         if (this.state.selectedApprover.length === 0) {
//             this.setState({
//                 dialogMessage: "Please select an approver then click on Add.",
//                 showDialog: true
//             });
//             return;
//         }

//         const selectedApprover = this.state.selectedApprover[0];
//         const currentUserEmail = this.props.context.pageContext.user.email;

//         console.log('Selected Approver Email:', selectedApprover.secondaryText);
//         console.log('Current User Email:', currentUserEmail);

//         if (selectedApprover.secondaryText === currentUserEmail) {
//             this.setState({
//                 dialogMessage: "You cannot add yourself as an approver.",
//                 showDialog: true
//             });
//             return;
//         }

//         console.log('Selected Approver:', selectedApprover);

//         const isApprover = this.state.approvers.some(approver => approver.approver === selectedApprover.text);
//         const isReviewer = this.state.reviewers.some(reviewer => reviewer.reviewer === selectedApprover.text);
//         if (isApprover || isReviewer) {
//             this.setState({
//                 dialogMessage: "The selected approver cannot be the same as existing<br>Reviewers/Requester/CurrentActioner.",
//                 showDialog: true
//             });
//             return;
//         }

//         try {
//             const user = await this.sp.web.ensureUser(selectedApprover.loginName);

//             const userEmail = user.Email;
//             const splitEmail = userEmail.split('@')[0];

//             console.log('User Email:', userEmail);
//             console.log('Split Email:', splitEmail);

//             const newApprover: Approver = {
//                 sNo: this.state.approvers.length + 1,
//                 approver: selectedApprover.text,
//                 // srNo: userEmail,
//                 srNo: splitEmail,
//                 designation: await this.profileDetail(selectedApprover.loginName),
//                 userId: user.Id,
//                 email: userEmail
//             };

//             console.log(newApprover)

//             this.setState((prevState) => {
//                 const newApprovers = [...prevState.approvers, newApprover];
//                 console.log('Updating approvers in parent:', newApprovers);
//                 this.props.onApproversUpdate(newApprovers);
//                 return {
//                     approvers: newApprovers,
//                     selectedApprover: []
//                 };
//             });
//         } catch (error) {
//             console.error('Error adding approver:', error);
//             this.setState({
//                 dialogMessage: "An error occurred while adding the approver. Please try again.",
//                 showDialog: true
//             });
//         }
//     };




//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     componentDidMount() {
//         this.props.onApproversUpdate(this.state.approvers);
//         // eslint-disable-next-line @typescript-eslint/no-floating-promises
//         this._fetchApproverDetails();
//         // eslint-disable-next-line @typescript-eslint/no-floating-promises
//         // this.fetchApprovalConfigurationData();
//         console.log('ReviewerSection mounted');
//     }
//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     handleDialogClose = () => {
//         this.setState({ showDialog: false });
//     };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
//     handleReviewerChange = (items: any[]) => {
//         this.setState({ selectedReviewer: items });
//     };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
//     handleApproverChange = (items: any[]) => {
//         this.setState({ selectedApprover: items });
//     };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     // handleDeleteReviewer = (reviewer: Reviewer) => {
//     //     const newReviewers = this.state.reviewers.filter(r => r.sNo !== reviewer.sNo);
//     //     this.setState({ reviewers: newReviewers });
//     //     this.props.onReviewersUpdate(newReviewers);
//     // };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     // handleDeleteApprover = (approver: Approver) => {
//     //     const newApprovers = this.state.approvers.filter(a => a.sNo !== approver.sNo);
//     //     this.setState({ approvers: newApprovers });
//     //     this.props.onApproversUpdate(newApprovers);
//     // };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
//     reorder = (dataItem: Reviewer, direction: 'before' | 'after') => {
//         const reviewers = [...this.state.reviewers];
//         const index = reviewers.findIndex(item => item.sNo === dataItem.sNo);
//         if (index === -1) return;

//         const targetIndex = direction === 'before' ? index - 1 : index + 1;
//         if (targetIndex < 0 || targetIndex >= reviewers.length) return;

//         // Swap the data items without changing the serial numbers
//         const tempData = { ...reviewers[index], sNo: reviewers[targetIndex].sNo };
//         reviewers[index] = { ...reviewers[targetIndex], sNo: reviewers[index].sNo };
//         reviewers[targetIndex] = tempData;

//         console.log('Reordered Reviewers:', reviewers);
//         this.setState({ reviewers });
//     };






//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     reorderApprover = (dataItem: Approver, direction: 'before' | 'after') => {
//         const approvers = [...this.state.approvers];
//         const index = approvers.findIndex(item => item.sNo === dataItem.sNo);
//         const [removed] = approvers.splice(index, 1);
//         const newIndex = direction === 'before' ? Math.max(index - 1, 0) : Math.min(index + 1, approvers.length);
//         approvers.splice(newIndex, 0, removed);

//         const updatedApprovers = approvers.map((item, idx) => ({ ...item, sNo: idx + 1 }));

//         this.setState({ approvers: updatedApprovers });
//     };

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     private profileDetail = async (loginName: any): Promise<any> => {
//         let designation = "NA";
//         const profile = await this.sp.profiles.getPropertiesFor(loginName);
//         designation = profile.Title || "N/A";

//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const props: any = {};
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         profile.UserProfileProperties.forEach((prop: { Key: string; Value: any; }) => {
//             props[prop.Key] = prop.Value;
//         });

//         profile.userProperties = props;
//         return designation;
//     }

//     //  while here listname in ApproverMatrix while here i want to compare withe if arrpvertype is reviewer meand then reviewer table data sould dispaly an

//     //ApproverType          ,,,     Approver              ,,, Department


//     private _fetchApproverDetails = async (): Promise<void> => {
//         try {
//             // Fetch items from the ApproverMatrix list
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const items: any[] = await (
//                 await this.sp.web.lists
//                     .getByTitle("ApproverMatrix")
//                     .items.select("*", "Approver/Title", "Approver/EMail", "Secretary/Title", "Secretary/EMail")
//                     .expand("Approver", "Secretary")()
//             )
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 .map((each: any) => {
//                     // Check if Approver and Secretary fields are defined
//                     const approverTitle = each.Approver ? each.Approver.Title : "Unknown";
//                     const approverEmail = each.Approver ? each.Approver.EMail : "Unknown";
//                     const secretaryTitle = each.Secretary && each.Secretary.length > 0 ? each.Secretary[0].Title : "Unknown";

//                     // Map each item to a new object with the required properties
//                     const newObj = {
//                         ...each,
//                         text: approverTitle,
//                         email: approverEmail,
//                         ApproverId: each.ApproverId,
//                         ApproverType: each.ApproverType,
//                         approversOrder: each.approversOrder,
//                         Title: each.Title,
//                         id: each.ApproverId,
//                         secretary: secretaryTitle,
//                     };
//                     return newObj;
//                 })
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 .filter((each: any) => each.Title === "Development");

//             console.log("Fetched items:", items);

//             // Filter and map reviewers
//             const reviewers = await Promise.all(items.filter(e => e.ApproverType === "Reviewer").map(async (item, index) => {
//                 return {
//                     sNo: index + 1,
//                     reviewer: item.text,
//                     srNo: item.email.split('@')[0],
//                     designation: 'N/A',
//                     userId: item.id,
//                     email: item.email
//                 };
//             }));

//             // Filter and map approvers
//             const approvers = await Promise.all(items.filter(e => e.ApproverType === "Approver").map(async (item, index) => {
//                 return {
//                     sNo: index + 1,
//                     approver: item.text,
//                     srNo: item.email.split('@')[0],
//                     designation: 'N/A',
//                     userId: item.id,
//                     email: item.email
//                 };
//             }));

//             console.log("Reviewers:", reviewers);
//             console.log("Approvers:", approvers);

//             // Determine which data to display based on ApproverType
//             // if (items.some(item => item.ApproverType === "Reviewer")) {
//             //     console.log("Displaying reviewer data");
//             //     this.setState({ reviewers }, () => {
//             //         console.log("Updated state with reviewers:", this.state);
//             //         this.props.onReviewersUpdate(reviewers);
//             //     });
//             // } else if (items.some(item => item.ApproverType === "Approver")) {
//             //     console.log("Displaying approver data");
//             //     this.setState({ approvers }, () => {
//             //         console.log("Updated state with approvers:", this.state);
//             //         this.props.onApproversUpdate(approvers);
//             //     });
//             // }

//             this.setState({ reviewers, approvers }, () => {
//                 console.log("Updated state:", this.state);
//                 this.props.onReviewersUpdate(reviewers);
//                 this.props.onApproversUpdate(approvers);
//             });
//         } catch (error) {
//             console.error("Error fetching list items: ", error);
//         }
//     };


//     private _getDragDropEvents(): IDragDropEvents {
//         return {
//             canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => true,
//             canDrag: (item?: Reviewer) => true,
//             onDragEnter: (item?: Reviewer, event?: DragEvent) => dragEnterClass,
//             onDragLeave: (item?: Reviewer, event?: DragEvent) => {
//                 // No action needed on drag leave
//             },
//             onDrop: (item?: Reviewer, event?: DragEvent) => {
//                 if (this._draggedItem && item) {
//                     this._insertBeforeItem(item);
//                 }
//             },
//             onDragStart: (item?: Reviewer, itemIndex?: number, selectedItems?: Reviewer[], event?: MouseEvent) => {
//                 this._draggedItem = item;
//                 this._draggedIndex = itemIndex ?? -1;
//             },
//             onDragEnd: (item?: Reviewer, event?: DragEvent) => {
//                 this._draggedItem = undefined;
//                 this._draggedIndex = -1;
//             },
//         };
//     }



//     private _insertBeforeItem(item: Reviewer): void {
//         if (!this._draggedItem) {
//             return;
//         }

//         const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
//             ? (this._selection.getSelection() as Reviewer[])
//             : [this._draggedItem];

//         const insertIndex = this.state.reviewers.indexOf(item);
//         const reviewers = this.state.reviewers.filter(itm => draggedItems.indexOf(itm) === -1);

//         reviewers.splice(insertIndex, 0, ...draggedItems);

//         // Swap data without changing sNo
//         const updatedReviewers = reviewers.map((reviewer, index) => {
//             const originalReviewer = this.state.reviewers.find(r => r.sNo === reviewer.sNo);
//             return {
//                 ...reviewer,
//                 reviewer: originalReviewer?.reviewer ?? '',
//                 sNo: index + 1,
//                 designation: originalReviewer?.designation ?? '',
//                 email: originalReviewer?.email ?? '',
//             };
//         });


//         this.setState({ reviewers: updatedReviewers });
//     }


//     // private _renderDeleteButton = (item: Reviewer, index: number | undefined): JSX.Element => {
//     //     return (
//     //         <DefaultButton
//     //             text="Delete"
//     //             onClick={() => this._deleteItem(item)}
//     //         />
//     //     );
//     // }

//     // private _deleteItem = (item: Reviewer): void => {
//     //     const reviewers = this.state.reviewers.filter(reviewer => reviewer.sNo !== item.sNo);
//     //     this.setState({ reviewers });
//     // }

//     private _renderHamburgerButton = (): JSX.Element => {
//         return (
//             <IconButton
//                 iconProps={{ iconName: 'GlobalNavButton' }} // Hamburger icon
//                 title="Menu"
//                 ariaLabel="Menu"
//                 styles={{ root: { marginTop: '-5px' } }} // Adjust the margin to move the icon up
//             />
//         );
//     }

//     private _onRenderEmptyMessage = (): JSX.Element => {
//         return (
//             <div style={{ textAlign: 'center', padding: '20px' }}>
//                 No data available
//             </div>
//         );
//     }


//     // private _renderDeleteButtonApprover = (item: Approver, index: number | undefined): JSX.Element => {
//     //     return (
//     //         <DefaultButton
//     //             text="Delete"
//     //             onClick={() => this._deleteApprover(item)}
//     //         />
//     //     );
//     // }

//     // private _deleteApprover = (item: Approver): void => {
//     //     const approvers = this.state.approvers.filter(approver => approver.sNo !== item.sNo);
//     //     this.setState({ approvers });
//     // }

//     handleDeleteReviewer = (reviewer: Reviewer): void => {
//         const newReviewers = this.state.reviewers.filter(r => r.sNo !== reviewer.sNo);
//         this.setState({ reviewers: newReviewers }, () => {
//             this.props.onReviewersUpdate(newReviewers);
//         });
//     };

//     handleDeleteApprover = (approver: Approver): void => {
//         const newApprovers = this.state.approvers.filter(a => a.sNo !== approver.sNo);
//         this.setState({ approvers: newApprovers }, () => {
//             this.props.onApproversUpdate(newApprovers);
//         });
//     };

//     // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
//     render() {
//         const { reviewers } = this.state;
//         const columns: IColumn[] = [
//             { key: 'menu', name: '', minWidth: 50, maxWidth: 150, isResizable: false, onRender: this._renderHamburgerButton },
//             { key: 'sNo', name: 'S.No', fieldName: 'sNo', minWidth: 100, maxWidth: 150, isResizable: true },
//             { key: 'reviewer', name: 'Reviewer', fieldName: 'reviewer', minWidth: 180, maxWidth: 150, isResizable: true },
//             { key: 'srNo', name: 'SR No', fieldName: 'srNo', minWidth: 100, maxWidth: 200, isResizable: true },
//             { key: 'designation', name: 'Designation', fieldName: 'designation', minWidth: 200, maxWidth: 150, isResizable: true },
//             // { key: 'email', name: 'Email', fieldName: 'email', minWidth: 100, maxWidth: 200, isResizable: true },
//             {
//                 key: 'delete', name: 'Delete', minWidth: 100, maxWidth: 50, isResizable: false, onRender: (item: Reviewer) => (
//                     <IconButton
//                         iconProps={{ iconName: 'Delete' }}
//                         title="Delete"
//                         ariaLabel="Delete"
//                         onClick={() => this.handleDeleteReviewer(item)}
//                     />
//                 )
//             }
//         ];

//         const approverColumns: IColumn[] = [
//             { key: 'menu', name: '', minWidth: 50, maxWidth: 150, isResizable: false, onRender: this._renderHamburgerButton },
//             { key: 'sNo', name: 'S.No', fieldName: 'sNo', minWidth: 100, maxWidth: 150, isResizable: true },
//             { key: 'approver', name: 'Approver', fieldName: 'approver', minWidth: 180, maxWidth: 150, isResizable: true },
//             { key: 'srNo', name: 'SR No', fieldName: 'srNo', minWidth: 100, maxWidth: 200, isResizable: true },
//             { key: 'designation', name: 'Designation', fieldName: 'designation', minWidth: 200, maxWidth: 150, isResizable: true },
//             // { key: 'action', name: 'Action', minWidth: 100, maxWidth: 200, isResizable: true, onRender: this._renderDeleteButtonApprover },
//             {
//                 key: 'delete', name: 'Delete', minWidth: 100, maxWidth: 50, isResizable: false, onRender: (item: Approver) => (
//                     <IconButton
//                         iconProps={{ iconName: 'Delete' }}
//                         title="Delete"
//                         ariaLabel="Delete"
//                         onClick={() => this.handleDeleteApprover(item)}
//                     />
//                 )
//             }
//         ];


//         return (
//             <div className={styles.mainContainer}>
//                 <div className={styles.headerContainer}>
//                     Approver Details
//                 </div>
//                 <div className={styles.combinedNewContaner}>
//                     <div className={styles.contentContainer}>
//                         <div className={styles.addReviewer}>
//                             <div className={styles.peoplePickerWrapper}>
//                                 <PeoplePicker
//                                     context={this.peoplePickerContext}
//                                     // titleText="Add Reviewer"
//                                     personSelectionLimit={1}
//                                     groupName={""}
//                                     showtooltip={true}
//                                     required={true}
//                                     disabled={false}
//                                     ensureUser={true}
//                                     searchTextLimit={5}
//                                     onChange={this.handleReviewerChange}
//                                     principalTypes={[PrincipalType.User]}
//                                     resolveDelay={300}
//                                     defaultSelectedUsers={this.state.selectedReviewer.map(user => user.text)}
//                                     placeholder='Add Reviewer...'
//                                 />
//                             </div>
//                             <div className={styles.addButtonWrapper}>
//                                 <DefaultButton className={styles.customAddButton} onClick={this.handleAddReviewer}>+ Add</DefaultButton>
//                                 {/* <Button className={styles.customAddButton} onClick={this.handleAddReviewer}>+ Add</Button> */}
//                             </div>
//                         </div>
//                         <div className={styles.instructionText}>(Please enter minimum 4 characters to search)</div>
//                         <MarqueeSelection selection={this._selection}>
//                             <DetailsList
//                                 items={reviewers.length === 0 ? [{}] : reviewers} // Pass an empty object to keep the structure
//                                 columns={columns}
//                                 selectionMode={SelectionMode.none} // Disable selection to remove tick mark
//                                 dragDropEvents={this._dragDropEvents}
//                                 setKey="set"
//                                 layoutMode={DetailsListLayoutMode.justified}
//                                 isHeaderVisible={true}
//                                 onRenderRow={(props, defaultRender) => {
//                                     if (reviewers.length === 0) {
//                                         return (
//                                             <div style={{ textAlign: 'center', width: '100%' }}>
//                                                 {this._onRenderEmptyMessage()}
//                                             </div>
//                                         );
//                                     }
//                                     return defaultRender ? defaultRender(props) : null;
//                                 }}
//                             />
//                         </MarqueeSelection>
//                     </div>
//                     <div className={styles.contentContainer}>
//                         <div className={styles.addApprover}>
//                             <div className={styles.peoplePickerWrapperApprover}>
//                                 <PeoplePicker
//                                     context={this.peoplePickerContext}
//                                     personSelectionLimit={1}
//                                     groupName={""}
//                                     showtooltip={true}
//                                     required={true}
//                                     disabled={false}
//                                     ensureUser={true}
//                                     searchTextLimit={5}
//                                     onChange={this.handleApproverChange}
//                                     principalTypes={[PrincipalType.User]}
//                                     resolveDelay={300}
//                                     defaultSelectedUsers={this.state.selectedApprover.map(user => user.text)}
//                                     placeholder='Add Approver...'
//                                 />
//                             </div>
//                             <div className={styles.addButtonWrapperApprover}>
//                                 <DefaultButton className={styles.customAddButtonApprover} onClick={this.handleAddApprover}>+ Add</DefaultButton>
//                             </div>
//                         </div>
//                         <div className={styles.approverInstructionText}>(Please enter minimum 4 characters to search)</div>
//                         <DetailsList
//                             items={this.state.approvers.length === 0 ? [{}] : this.state.approvers} // Pass an empty object to keep the structure
//                             columns={approverColumns}
//                             selectionMode={SelectionMode.none} // Disable selection to remove tick mark
//                             dragDropEvents={this._dragDropEvents}
//                             setKey="set"
//                             layoutMode={DetailsListLayoutMode.justified}
//                             isHeaderVisible={true}
//                             onRenderRow={(props, defaultRender) => {
//                                 if (this.state.approvers.length === 0) {
//                                     return (
//                                         <div style={{ textAlign: 'center', width: '100%' }}>
//                                             {this._onRenderEmptyMessage()}
//                                         </div>
//                                     );
//                                 }
//                                 return defaultRender ? defaultRender(props) : null;
//                             }}
//                         />
//                     </div>

//                 </div>



//                 {/* {this.state.showDialog && (
//                     <Dialog
//                         hidden={!this.state.showDialog}
//                         onDismiss={() => this.setState({ showDialog: false })}
//                         dialogContentProps={{
//                             type: DialogType.normal,
//                             title: (
//                                 <div style={{ display: 'flex', alignItems: 'center' ,margin: 0, padding: 0 }}>
//                                     <span>Alert!</span>
//                                 </div>
//                             ),
//                         }}
//                         modalProps={{
//                             isBlocking: false,
//                             styles: { main: { maxWidth: 600,padding: 0  } },
//                         }}
//                     >
//                         <div>
//                             <p style={{ margin: "25px", textAlign: "center" }} dangerouslySetInnerHTML={{ __html: this.state.dialogMessage }} />
//                         </div>
//                         <DialogFooter>
//                             <PrimaryButton onClick={() => this.setState({ showDialog: false })} iconProps={{ iconName: 'ReplyMirrored' }} text="Ok" />
//                         </DialogFooter>
//                     </Dialog>
//                 )} */}


//                 {this.state.showDialog && (
//                     <Modal
//                         isOpen={this.state.showDialog}
//                         onDismiss={() => this.setState({ showDialog: false })}
//                         isBlocking={true}
//                         containerClassName={styles.successDialog} // Reusing the same class as above for consistency
//                         styles={{
//                             main: {
//                                 width: '50%',
//                                 height: 'auto',
//                                 minHeight: '200px',
//                                 maxWidth: '600px',
//                                 maxHeight: '80vh',
//                                 overflowY: 'auto',
//                                 overflowX: 'hidden',
//                             },
//                         }}
//                     >
//                         <div className={styles.successDialogHeader}>
//                             <div className={styles.successDialogHeaderContent}>
//                                 <IconButton
//                                     iconProps={{ iconName: 'Info' }}
//                                     className={styles.successIconButton}
//                                     ariaLabel="Information"
//                                 />
//                                 <span className={styles.successDialogTitle}>Alert!</span>
//                             </div>
//                             <IconButton
//                                 iconProps={{ iconName: 'Cancel' }}
//                                 onClick={() => this.setState({ showDialog: false })}
//                                 className={styles.successIconButton}
//                                 ariaLabel="Close dialog"
//                             />
//                         </div>

//                         <div className={styles.successDialogBody}>
//                             {/* Displaying the dynamic message using dangerouslySetInnerHTML */}
//                             <p dangerouslySetInnerHTML={{ __html: this.state.dialogMessage }} />
//                         </div>

//                         <div className={styles.successDialogFooter}>
//                             <PrimaryButton
//                                 onClick={() => this.setState({ showDialog: false })}
//                                 text="Ok"
//                                 iconProps={{ iconName: 'ReplyMirrored' }}
//                                 className={styles.okButton}
//                             />
//                         </div>
//                     </Modal>
//                 )}



//             </div>
//         );
//     }
// }

// export default ReviewerSection;