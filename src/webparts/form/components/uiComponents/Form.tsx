/* eslint-disable react/self-closing-comp */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react";
import styles from "../Form.module.scss";
// import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
// import { SPFI } from "@pnp/sp";
import { IFormProps } from "../IFormProps";
import {
  DefaultButton,
  Dropdown,
  Icon,
  Stack,
  TextField,
} from "@fluentui/react";
import { IDropdownOption } from "office-ui-fabric-react";
// import {  InputChangeEvent } from '@progress/kendo-react-inputs';


// import PdfViewer from "../pdfVeiwer/pdfVeiwer";
import { PrimaryButton } from "@fluentui/react/lib/Button";

//spinner related

import { Spinner } from "@fluentui/react/lib/Spinner";
// import { IStackTokens } from "@fluentui/react/lib/Stack";
// import { Label } from "@fluentui/react/lib/Label";
// import TableComponent from "./tableSwap";
import UploadFileComponent from "./uploadFile";
// import Header from "./Header/header";
import Title from "./titleSectionComponent/title";
import SpanComponent from "./spanComponent/spanComponent";

import MyDialog from "./dialog/dialog";
import ApproverOrReviewerDialog from "./ApproverOrReviewerDialog/approverOrReviewerDialog";
// import GetForm from '../spListGet/spListGet';
// import PeoplePicker from "./peoplePickerInKenod/peoplePickerInKendo";
// import MultiComboBoxTable from "./comboBoxTable/comboBoxTable";
// import AlertComponent from "./alter/alter";
// import DraggableTable from "./draggableGridKendo/draggableGridKendo";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

import { format } from "date-fns";
import "@progress/kendo-theme-default/dist/all.css";
import "@pnp/sp/site-users/web";

import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/site-groups/web";
import "@pnp/sp/files";
import "@pnp/sp/profiles";
import "@pnp/sp/site-groups";
// import { Upload, UploadOnAddEvent, UploadFileInfo } from '@progress/kendo-react-upload';
// import { ConsoleListener } from "@pnp/logging";
import {
  PeoplePicker,
  PrincipalType,
  IPeoplePickerContext,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
// import { ConfirmationDialog } from "./dialogFluentUi/submitDialog";
import DraftSuccessDialog from "./dialogFluentUi/draftDialog";
import CancelConfirmationDialog from "./dialogFluentUi/cancelDialog";
import SuccessDialog from "./dialogFluentUi/endDialog";
// import TableComponent from "./tableSwap";
import { DetailsListDragDropExample } from "./draggableGridKendo/dragAndDropFluent";
import ConfirmationDialog from "./dialogFluentUi/submitConfirmation";

// const customTheme = createTheme({
//   palette: {
//     themePrimary: '#d29200',
//   },
// });

// import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

// const data: any = [
//   {
//     title: "Section 1",
//     content: [
//       { key: "Item 1.1", value: "Description 1.1" },
//       { key: "Item 1.2", value: "Description 1.2" },
//     ],
//   },
//   {
//     title: "Section 2",
//     content: [
//       { key: "Item 2.1", value: "Description 2.1" },
//       { key: "Item 2.2", value: "Description 2.2" },
//     ],
//   },
// ];

interface INoteObject {
  Department: string;
  CommitteeName: string;
  Subject: string;
  natureOfNote: string;
  NatuerOfApprovalSanction: string;
  NoteType: string;
  TypeOfFinancialNote: string;
  Amount: number;
  Search_x0020_Keyword: any;
  Purpose: any;
  ApproverDetails: any;
  Status: string;
  statusNumber: any;
  AuditTrail: any;
  ReviewerId: any;
  ApproverId: any;
}

export interface IFileDetails {
  name?: string;
  content?: File;
  index?: number;
  fileUrl?: string;
  ServerRelativeUrl?: string;
  isExists?: boolean;
  Modified?: string;
  isSelected?: boolean;
}

interface IMainFormState {
  isLoading: boolean;
  department: string;
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
  new: string;
  itemsFromSpList: any[];
  getAllDropDownOptions: any;
  natureOfNote: IDropdownOption[];
  natureOfApprovalSancation: IDropdownOption[];
  committename: IDropdownOption[];
  typeOfFinancialNote: IDropdownOption[];
  noteType: IDropdownOption[];
  purpose: any;
  othersFieldValue: any;
  isPuroposeVisable: boolean;
  isAmountVisable: boolean;
  isTypeOfFinacialNote: boolean;
  isNatureOfApprovalOrSanction: boolean;
  //generalSection
  committeeNameFeildValue: string;
  subjectFeildValue: string;

  natureOfNoteFeildValue: string;
  noteTypeFeildValue: string;
  natureOfApprovalOrSanctionFeildValue: string;
  typeOfFinancialNoteFeildValue: string;
  searchTextFeildValue: any;
  amountFeildValue: any;
  puroposeFeildValue: any;
  // eslint-disable-next-line @rushstack/no-new-null
  notePdfFile: File | null;
  // eslint-disable-next-line @rushstack/no-new-null
  supportingFile: File | null;
  isWarning: boolean;
  isWarningCommitteeName: boolean;
  isWarningSubject: boolean;
  isWarningNatureOfNote: boolean;
  isWarningNatureOfApporvalOrSanction: boolean;
  isWarningNoteType: boolean;
  isWarningTypeOfFinancialNote: boolean;

  isWarningSearchText: boolean;

  isWarningAmountField: boolean;
  isWarningPurposeField: boolean;
  eCommitteData: any;

  noteTofiles: any[];
  isWarningNoteToFiles: boolean;

  wordDocumentfiles: any[];
  isWarningWordDocumentFiles: boolean;

  supportingDocumentfiles: any[];
  isWarningSupportingDocumentFiles: boolean;

  isWarningPeoplePicker: boolean;
  isDialogHidden: boolean;
  isApproverOrReviewerDialogHandel: boolean;

  peoplePickerData: any;
  peoplePickerApproverData: any;
  approverInfo: any;
  reviewerInfo: any;

  status: string;
  statusNumber: any;
  filesClear: any;
  auditTrail: any;
  currentApprover: any;
  pastApprover: any;
  referredFromDetails: any;
  refferredToDetails: any;

  approverIdsHavingSecretary: any;
  noteSecretaryDetails: any;

  draftResolutionFieldValue: any;

  /// submit form state dialog box

  isConfirmationDialogVisible: boolean;
  isSuccessDialogVisible: boolean;

  // State for cancel confirmation dialog
  showCancelDialog: boolean;

  //save as draft dialog
  showDialog: boolean;

  //success dialog
  isVisibleAlter: boolean;
}

// let fetchedData:any[];

//spinner
// const stackTokens: IStackTokens = {
//   childrenGap: 20,
//   maxWidth: 250,
// };

export const FormContext = React.createContext<any>(null);

// const committeeOptions = [
//    'committeeA' ,
//    'committeeB',
//    'committeeC'
// ];

const getIdFromUrl = (): any => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("ItemId");
  // const Id = params.get("itemId");
  console.log(Id);
  return Id;
};

const getFromType = (): any => {
  const params = new URLSearchParams(window.location.search);
  const formType = params.get("type");
  // console.log(Id);
  return formType;
};

// export const PeoplePickerData = (placeholder:any,onChangeFunc:any):any=>{
//   return (
//     <PeoplePicker
//       placeholder="Reviewer Details"
//       context={this._peopplePicker}
//       // titleText="People Picker"
//       personSelectionLimit={1}
//       groupName={""} // Leave this blank in case you want to filter from all users
//       showtooltip={true}
//       defaultSelectedUsers={[""]}
//       disabled={false}
//       ensureUser={true}
//       onChange={this._getPeoplePickerItems}
//       // showHiddenInUI={false}
//       principalTypes={[PrincipalType.User]}
//       resolveDelay={1000}
//     />
//   );
// }

// const dropdownStyles: Partial<IDropdownStyles> = {
//   dropdown: { width: 300 },
// };

export default class Form extends React.Component<IFormProps, IMainFormState> {
  private _peopplePicker: IPeoplePickerContext;
  private _userName: string;
  private _role: string;
  private _itemId: number = Number(getIdFromUrl());
  private _formType: string = getFromType();
  private _currentUserEmail = this.props.context.pageContext.user.email;

  private _absUrl: any = this.props.context.pageContext.web.serverRelativeUrl;
  private _folderName: string = `${this._absUrl}/${
    this.props.libraryId
  }/${this._folderNameGenerate(this._itemId)}`;
  // private _folderName:string;

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      isLoading: true,
      department: "",
      isNoteType: false,
      noteTypeValue: undefined,
      new: "",
      itemsFromSpList: [],
      getAllDropDownOptions: {},
      natureOfNote: [],
      committename: [],
      natureOfApprovalSancation: [],
      typeOfFinancialNote: [],
      noteType: [],
      purpose: [],
      othersFieldValue: "",
      isPuroposeVisable: false,
      isAmountVisable: false,
      isTypeOfFinacialNote: false,
      isNatureOfApprovalOrSanction: false,
      //generalSection
      committeeNameFeildValue: "",
      subjectFeildValue: "",
      natureOfNoteFeildValue: "",
      noteTypeFeildValue: "",
      natureOfApprovalOrSanctionFeildValue: "",
      typeOfFinancialNoteFeildValue: "",
      searchTextFeildValue: "",
      amountFeildValue: null,
      puroposeFeildValue: "",
      notePdfFile: null,
      supportingFile: null,
      isWarning: false,
      isWarningCommitteeName: false,
      isWarningSubject: false,
      isWarningNatureOfNote: false,
      isWarningNatureOfApporvalOrSanction: false,
      isWarningNoteType: false,
      isWarningTypeOfFinancialNote: false,
      isWarningSearchText: false,
      isWarningAmountField: false,
      isWarningPurposeField: false,
      isWarningPeoplePicker: false,
      eCommitteData: {},
      noteTofiles: [],
      isWarningNoteToFiles: false,

      wordDocumentfiles: [],
      isWarningWordDocumentFiles: false,

      supportingDocumentfiles: [],
      isWarningSupportingDocumentFiles: false,
      isDialogHidden: true,
      isApproverOrReviewerDialogHandel: true,
      peoplePickerData: [],
      peoplePickerApproverData: [],
      approverInfo: [],
      reviewerInfo: [],
      status: "",
      statusNumber: null,
      filesClear: [],
      auditTrail: [],
      currentApprover: [],
      pastApprover: [],
      referredFromDetails: [],
      refferredToDetails: [],

      approverIdsHavingSecretary: [],
      noteSecretaryDetails: [],

      // submit form state dialog box
      isConfirmationDialogVisible: false,
      isSuccessDialogVisible: false,

      // /save as draft dialog
      showDialog: false,

      // State for cancel confirmation dialog
      showCancelDialog: false,

      //success dialog
      isVisibleAlter: false,

      draftResolutionFieldValue: "",
    };
    console.log(this._itemId);
    console.log(this._formType);
    console.log(this._folderName);
    this._generateRequsterNumber = this._generateRequsterNumber.bind(this);
    this._folderNameGenerate = this._folderNameGenerate.bind(this);

    this._peopplePicker = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      // msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient,
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getfield();
    // this.props.formType === "Edit" && this._getItemData(this._itemId, this._folderName);
    this._itemId && this._getItemData(this._itemId, this._folderName);
    // this.props.formType === "Edit" && this._getItemDocumentsData();
    this._getItemDocumentsData();
    // this._GetMyProfile("421")
    // eslint-disable-next-line no-void
    // void this.createFolder();
  }
  //

  // private handleAdd = (event: UploadOnAddEvent) => {
  //   const newFiles = event.newState
  //     .filter((file: UploadFileInfo) => file.getRawFile !== undefined)
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //     .map((file: UploadFileInfo) => file.getRawFile!());

  //     console.log(newFiles)

  //   // this.setState({ files: newFiles });
  //   // this.setState(prev=>({files:[...prev.files,newFiles]}))
  // };

  private _getUserProperties = async (loginName: any): Promise<any> => {
    // console.log(loginName)
    let designation = "NA";
    let email = "NA";
    // const loginName = this.state.peoplePickerData[0]
    const profile = await this.props.sp.profiles.getPropertiesFor(loginName);
    console.log(profile);
    // console.log(profile.DisplayName);
    // console.log(profile.Email);
    // console.log(profile.Title);
    // console.log(profile.UserProfileProperties.length);
    designation = profile.Title;
    email = profile.Email;
    // Properties are stored in inconvenient Key/Value pairs,
    // so parse into an object called userProperties
    const props: any = {};
    profile.UserProfileProperties.forEach(
      (prop: { Key: string | number; Value: any }) => {
        props[prop.Key] = prop.Value;
      }
    );

    profile.userProperties = props;
    // console.log("Account Name: " + profile.userProperties.AccountName);
    return [designation, email];
  };

  // private _extractValueFromHtml = (htmlString: string): string => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");
  //   const extractedValue = doc.querySelector("div")?.textContent || "";
  //   console.log(extractedValue);
  //   return extractedValue;
  // };

  // private _getApproversData =(data:any,userId:any):any=>{
  //   // console.log(data)
  //   console.log(
  //     {
  //       id:userId,
  //       text:data.DisplayName,
  //       srNo:data.Email.split("@")[0],
  //       optionalText:this._getUserProperties(data.AccountName).then((res)=>res)!==null?this._getUserProperties(data.AccountName).then((res)=>res):''
  //     }
  //   )
  //   return {
  //     id:userId,
  //     text:data.DisplayName,
  //     srNo:data.Email.split("@")[0],
  //     optionalText:this._getUserProperties(data.LoginName).then((res)=>res)
  //   }

  // }

  // private _getUserDetailsById = async (userIds: any[],ApporverType:string): Promise<any> => {
  //   try {
  //     const userDetails = await Promise.all(
  //       userIds.map(async (userId) => {
  //         const user = await this.props.sp.web.getUserById(userId)();
  //         // console.log(user)
  //         const userProperties =await this.props.sp.profiles.getPropertiesFor(user.LoginName).then((result)=>this._getApproversData(result,userId))
  //         // console.log(userProperties)

  //         return userProperties;
  //       })
  //     );
  //     console.log(userDetails)
  //     if (ApporverType === 'Reviewer'){
  //       this.setState({peoplePickerData:userDetails})

  //     }
  //     // else{
  //     //   this.setState({peoplePickerApproverData:userDetails})

  //     // }

  //     // return userDetails;
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //     // return [];
  //   }
  // };

  private _getJsonifyReviewer = (item: any, type: string): any[] => {
    console.log(item);
    console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Reviewer") {
        console.log(each, "Reviewer data.................parsed item");
        return each;

        // this.setState(prev =>(
        //   {peoplePickerData:[...prev.peoplePickerData,{
        //     text:each.approverEmailName,
        //     srNo:each.approverEmailName,
        //     designation:each.designation,

        //   }]}
        // ))
      }
    });
    console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 1,
      ...each,
    }));
    console.log(approverData);
    // this.setState(()=>{
    //   console.log("State updated")
    //   return {peoplePickerApproverData:approverData}
    // })
    // if ()
    return approverData;
  };

  private _getJsonifyApprover = (item: any, type: string): any[] => {
    console.log(item);
    console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Approver") {
        console.log(each, "Approver data.................parsed item");
        return each;

        // this.setState(prev =>(
        //   {peoplePickerData:[...prev.peoplePickerData,{
        //     text:each.approverEmailName,
        //     srNo:each.approverEmailName,
        //     designation:each.designation,

        //   }]}
        // ))
      }
    });
    console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 2,
      ...each,
    }));
    console.log(approverData);
    // this.setState(()=>{
    //   console.log("State updated")
    //   return {peoplePickerApproverData:approverData}
    // })
    // if ()
    return approverData;
  };

  private _getFileObj = (data: any): any => {
    const tenantUrl = window.location.protocol + "//" + window.location.host;
    console.log(tenantUrl);

    const formatDateTime = (date: string | number | Date) => {
      const formattedDate = format(new Date(date), "dd-MMM-yyyy");
      const formattedTime = format(new Date(), "hh:mm a");
      return `${formattedDate} ${formattedTime}`;
    };

    const result = formatDateTime(data.TimeCreated);

    const filesObj = {
      name: data.Name,
      content: data,
      index: 0,
      fileUrl: tenantUrl + data.ServerRelativeUrl,
      ServerRelativeUrl: "",
      isExists: true,
      Modified: "",
      isSelected: false,
      size: parseInt(data.Length),
      type: `application/${data.Name.split(".")[1]}`,
      modifiedBy: data.Author.Title,
      createData: result,
    };
    console.log(filesObj);
    return filesObj;
  };

  private _getItemDocumentsData = async () => {
    try {
      console.log("------------------Pdf-----------------------------------");

      console.log(`${this._folderName}/Pdf`);
      const folderItemsPdf = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/Pdf`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      console.log(folderItemsPdf);
      console.log(folderItemsPdf[0]);
      // this.setState({noteTofiles:[folderItem]})

      const tempFilesPdf: IFileDetails[] = [];
      folderItemsPdf.forEach((values) => {
        tempFilesPdf.push(this._getFileObj(values));
      });
      console.log(tempFilesPdf);
      this.setState({ noteTofiles: tempFilesPdf });

      //Word Documents
      console.log(
        "------------------Word Document-----------------------------------"
      );
      console.log(`${this._folderName}/WordDocument`);
      const folderItemsWordDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/WordDocument`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      console.log(folderItemsWordDocument);
      console.log(folderItemsWordDocument[0]);

      const tempFilesWordDocument: IFileDetails[] = [];
      folderItemsWordDocument.forEach((values) => {
        tempFilesWordDocument.push(this._getFileObj(values));
      });
      console.log(tempFilesWordDocument);
      this.setState({ wordDocumentfiles: tempFilesWordDocument });

      //supporting documents
      console.log(
        "------------------Supporting Document-----------------------------------"
      );

      console.log(`${this._folderName}/SupportingDocument`);
      const SupportingDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/SupportingDocument`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      console.log(SupportingDocument);
      console.log(SupportingDocument[0]);

      const tempFilesSupportingDocument: IFileDetails[] = [];
      SupportingDocument.forEach((values) => {
        tempFilesSupportingDocument.push(this._getFileObj(values));
      });
      console.log(tempFilesSupportingDocument);
      this.setState({ supportingDocumentfiles: tempFilesSupportingDocument });
    } catch {
      console.log("failed to fetch");
    }
  };

  // private _GetMyProfile = (id:any) => {
  //   this.props.context.msGraphClientFactory.getClient(id).then((client): void => {
  //     client.api('me').get((error, user: MicrosoftGraph.User, rawResponse?: any) => {
  //       console.log(user)
  //       if (user) {
  //         //set the user information object in state property
  //         this.setState({
  //           eCommitteData: user
  //         })
  //       }
  //     })
  //   })
  // }

  private _getItemData = async (id: any, folderPath: any) => {
    const item: any = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(id)
      .select(
        "*",
        "Approvers",
        "Approvers/Title",
        "Reviewers/Title",
        "Approvers/EMail",
        "Reviewers/EMail",
        "CurrentApprover/Title",
        "CurrentApprover/EMail"
      )
      .expand("Approvers", "Reviewers", "CurrentApprover")();
    console.log(`${id} ------Details`, item);
    console.log(folderPath);
    // const folderItem =  await this.props.sp.web.getFolderByServerRelativePath(`${folderPath}/Pdf`)
    // .files().then(res => res);
    // console.log(folderItem)
    console.log(this._getJsonifyReviewer(item.NoteApproversDTO, "Reviewer"));
    console.log(this._getJsonifyApprover(item.NoteApproversDTO, "Approver"));
    console.log(item.Purpose);

    this.setState({
      committeeNameFeildValue:
        item.CommitteeName !== null ? item.CommitteeName : "",
      subjectFeildValue: item.Subject !== null ? item.Subject : "",
      natureOfNoteFeildValue:
        item.NatureOfNote !== null ? item.NatureOfNote : "",
      noteTypeFeildValue: item.NoteType !== null ? item.NoteType : "",
      natureOfApprovalOrSanctionFeildValue:
        item.NatureOfApprovalOrSanction !== null
          ? item.NatureOfApprovalOrSanction
          : "",
      typeOfFinancialNoteFeildValue:
        item.FinancialType !== null ? item.FinancialType : "",
      searchTextFeildValue:
        item.SearchKeyword !== null ? item.SearchKeyword : "",
      amountFeildValue: item.Amount !== null ? item.Amount : null,
      puroposeFeildValue: item.Purpose !== null ? item.Purpose : "",
      // peoplePickerData:this._getUserDetailsById(item.ReviewerId,"Reviewer"),
      peoplePickerData: this._getJsonifyReviewer(
        item.NoteApproversDTO,
        "Reviewer"
      ),
      peoplePickerApproverData: this._getJsonifyApprover(
        item.NoteApproversDTO,
        "Approver"
      ),
      status: item.Status,
      auditTrail: JSON.parse(item.AuditTrail),
      statusNumber: item.StatusNumber,
      draftResolutionFieldValue: item.DraftResolution,
    });
    return item;
  };

  private getfield = async () => {
    try {
      const fieldDetails = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .fields.filter("Hidden eq false and ReadOnlyField eq false")();
      console.log(fieldDetails);

      const profile = await this.props.sp.profiles.myProperties();
      console.log(profile);
      this._userName = profile.DisplayName;
      this._role = profile.Title;

      profile.UserProfileProperties.filter((element: any) => {
        // console.log(element)
        if (element.Key === "Department") {
          // console.log(element)
          //
          this.setState({ department: element.Value });
        }
      });

      // fieldDetails.map(each=>console.log(each.StaticName))
      const filtering = fieldDetails.map((_x) => {
        if (_x.TypeDisplayName === "Choice") {
          // console.log(_x.InternalName, ":", _x.Choices);

          return [_x.InternalName, _x.Choices];
        }
      });
      console.log(filtering);
      const finalList = filtering?.filter((each) => {
        if (typeof each !== "undefined") {
          // console.log(each);
          return each;
        }
      });
      console.log(finalList);

      finalList?.map((each) => {
        // console.log(each)
        if (
          each !== undefined &&
          Array.isArray(each) &&
          each.length > 1 &&
          Array.isArray(each[1])
        ) {
          if (each[0] === "NatureOfNote") {
            // console.log(each[1]);
            const natureOfNoteArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ natureOfNote: natureOfNoteArray });
          } else if (each[0] === "NoteType") {
            // console.log(each[1]);
            const noteTypeArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            // console.log(noteTypeArray);

            this.setState({ noteType: noteTypeArray });
          } else if (each[0] === "NatureOfApprovalOrSanction") {
            // console.log(each[1]);
            const typeOfNatureOfApprovalSancation = each[1].map(
              (item, index) => {
                return { key: item, text: item };
              }
            );

            this.setState({
              natureOfApprovalSancation: typeOfNatureOfApprovalSancation,
            });
          } else if (each[0] === "FinancialType") {
            // console.log(each[1]);
            const typeOfFinancialNoteArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ typeOfFinancialNote: typeOfFinancialNoteArray });
          } else if (each[0] === "CommitteeName") {
            // console.log(each[1]);
            const committenameArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ committename: committenameArray });
          } else if (each[0] === "Purpose") {
            console.log(each[1]);
            const purposeArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ purpose: purposeArray });
          }
          // each[1].map(item => console.log(item));
        }
      });
      console.log(finalList);
      // finalList?.map((each) => {
      //   // console.log(each)
      //   if (
      //     each !== undefined &&
      //     Array.isArray(each) &&
      //     each.length > 1 &&
      //     Array.isArray(each[1])
      //   ) {
      //     if (each[0] === "natureOfNote") {
      //       // console.log(each[1]);
      //       const natureOfNoteArray = each[1].map((item, index) => {
      //         return item;
      //       });

      //       this.setState({ natureOfNote: natureOfNoteArray });
      //     } else if (each[0] === "NoteType") {
      //       // console.log(each[1]);
      //       const noteTypeArray = each[1].map((item, index) => {
      //         return item;
      //       });

      //       // console.log(noteTypeArray);

      //       this.setState({ noteType: noteTypeArray });
      //     } else if (each[0] === "NatuerOfApprovalSanction") {
      //       // console.log(each[1]);
      //       const typeOfNatureOfApprovalSancation = each[1].map(
      //         (item, index) => {
      //           return item;
      //         }
      //       );

      //       this.setState({
      //         natureOfApprovalSancation: typeOfNatureOfApprovalSancation,
      //       });
      //     } else if (each[0] === "TypeOfFinancialNote") {
      //       // console.log(each[1]);
      //       const typeOfFinancialNoteArray = each[1].map((item, index) => {
      //         return item;
      //       });

      //       this.setState({ typeOfFinancialNote: typeOfFinancialNoteArray });
      //     } else if (each[0] === "CommitteeName") {
      //       // console.log(each[1]);
      //       const committenameArray = each[1].map((item, index) => {
      //         return item;
      //       });

      //       this.setState({ committename: committenameArray });
      //     } else if (each[0] === "Purpose") {
      //       console.log(each[1]);
      //       const purposeArray = each[1].map((item, index) => {
      //         return item;
      //       });

      //       this.setState({ purpose: purposeArray });
      //     }
      //     // each[1].map(item => console.log(item));
      //   }
      // });

      // const filterDataFieldData = fieldDetails.map(each=>({"each":each.choices})})

      // Assuming fieldDetails is an array of items you want to add
      this.setState((prevState) => ({
        itemsFromSpList: [...prevState.itemsFromSpList, ...finalList],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching field details: ", error);
    }
  };

  public componentDidMount = (): void => {
    console.log(this._itemId > 0);
    this._itemId === 0 &&
      this._fetchApproverDetails()
        .then(() => {
          console.log("List items fetched successfully.");
        })
        .catch((error) => {
          console.error("Error fetching list items: ", error);
        });
  };

  private _fetchApproverDetails = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const items = (
        await this.props.sp.web.lists
          .getByTitle("ApproverMatrix")
          .items.select(
            "*",
            "Approver/Title",
            "Approver/EMail",
            "Secretary/Title",
            "Secretary/EMail"
          )
          .expand("Approver", "Secretary")()
      ).map((each: any) => {
        console.log(each);
        // console.log(this._getUserProperties(each.email))
        if (each.ApproverType === "Approver") {
          const newObj = {
            text: each.Approver.Title,
            email: each.Approver.EMail,
            ApproversId: each.ApproverId,
            approverType: each.ApproverType,
            // approversOrder: each.ApproverType === "Approver"?2:1,
            Title: each.Title,
            id: each.ApproverId,
            secretary: each.Secretary.Title,
            srNo: each.Approver.EMail.split("@")[0],
          };
          console.log(newObj);
          const secretaryObj = {
            noteSecretarieId: each.SecretaryId,
            noteApproverId: each.ApproverId,
            noteId: "",
            secretaryEmail: each.Secretary.EMail,
            approverEmail: each.Approver.EMail,
            approverEmailName: each.Approver.Title,
            secretaryEmailName: each.Secretary.Title,
            createdBy: "",
            modifiedDate: "",
            modifiedBy: "",
          };
          this.setState((prev) => {
            this.setState({
              noteSecretaryDetails: [
                ...prev.noteSecretaryDetails,
                secretaryObj,
              ],
              approverIdsHavingSecretary: [
                ...prev.approverIdsHavingSecretary,
                {
                  ApproverId: each.ApproverId,
                  SecretaryId: each.SecretaryId,
                  secretaryObj,
                },
              ],
            });
          });
          if (each.ApproverType === "Approver") {
            this.setState({ peoplePickerApproverData: [newObj] });
          }
        }

        //  else {
        //   this.setState({ peoplePickerData: [newObj] });

        // }
      });

      console.log(items);

      const atrItems = (
        await this.props.sp.web.lists
          .getByTitle("ATRCreators")
          .items.select("*", "ATRCreators/Title", "ATRCreators/EMail")
          .expand("ATRCreators")()
      ).map((each: any) => {
        console.log(each);
        // console.log(this._getUserProperties(each.email))

        const newObj = {
          text: each.ATRCreators.Title,
          email: each.ATRCreators.EMail,
          ApproversId: each.ATRCreatorsId,
          approverType: each.ApproverType,
          // approversOrder: each.ApproverType === "Approver"?2:1,
          //  Title: each.Title,
          //  id: each.ApproverId,
          //  secretary: each.Secretary,
          //  srNo:each.Approver.EMail.split("@")[0]
        };
        console.log(newObj);
      });

      console.log(atrItems, "Atr Items fetched");

      // this.setState({ itemsFromSpList:items });
      // this.setState(prevState => ({
      //   itemsFromSpList: [...prevState.itemsFromSpList, ...items]
      // }));
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  };

  // private handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item?: IDropdownOption): void => {
  //   console.log(typeof item);
  //   console.log(this.state.natureOfNote)
  //   // console.log(this.state.itemsFromSpList)
  //   // const {text} = item
  //   // console.log(text)
  //   this.setState({ noteTypeValue: item }); // Update state with selected item
  // };

  private _getPeoplePickerItems = async (items: any[]) => {
    console.log("Items:", items);
    // fetchedData = items
    console.log(items[0].loginName);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    console.log(items, "this._getUserProperties(items[0].loginName)");

    // this.setState({approverInfo:items})

    const dataRec = await this._getUserProperties(items[0].loginName);
    // const finalData = await dataRec.json()
    // dataRec.then((x: any)=>{
    //   console.log(x)
    //   designation=x
    // });
    // console.log(typeof dataRec?.toString());

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map(
        (obj: { [x: string]: any; loginName: any }) => {
          console.log(obj);
          return {
            ...obj,
            optionalText: "N/A",
            approverTypeNum: 1,
            approverType: "Reviewer",
            email: obj.secondaryText,
          };
        }
      );
      console.log(newItemsDataNA);
      this.setState({ reviewerInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map(
        (obj: { secondaryText: any; loginName: any }) => {
          console.log(obj);
          return {
            ...obj,
            optionalText: dataRec[0],
            approverTypeNum: 1,
            approverType: "Reviewer",
            email: dataRec[1],
            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
          };
        }
      );
      // console.log(newItemsData)
      this.setState({ reviewerInfo: newItemsData });
    }
  };

  private _getPeoplePickerItemsApporvers = async (items: any[]) => {
    console.log("Items:", items);
    // fetchedData = items
    // console.log(items[0].loginName);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // console.log(items, "this._getUserProperties(items[0].loginName)");

    // this.setState({approverInfo:items})

    const dataRec = await this._getUserProperties(items[0].loginName);
    // const finalData = await dataRec.json()
    // dataRec.then((x: any)=>{
    //   console.log(x)
    //   designation=x
    // });
    // console.log(typeof dataRec?.toString());

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map(
        (obj: { [x: string]: any; loginName: any }) => {
          console.log(obj);
          return {
            ...obj,
            optionalText: "N/A",
            approverTypeNum: 2,
            approverType: "Approver",
            email: obj.secondaryText,
            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
          };
        }
      );
      console.log(newItemsDataNA);
      this.setState({ approverInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map((obj: { loginName: any }) => {
        console.log(obj);
        return {
          ...obj,
          optionalText: dataRec[0],
          approverTypeNum: 2,
          approverType: "Approver",
          email: dataRec[1],
        };
      });
      // console.log(newItemsData)
      this.setState({ approverInfo: newItemsData });
    }
  };

  public reOrderData = (reOrderData: any[], type: string): void => {
    console.log(reOrderData);
    if (type === "Reviewer") {
      this.setState({ peoplePickerData: reOrderData });
    } else {
      this.setState({ peoplePickerApproverData: reOrderData });
    }
  };

  public removeDataFromGrid = (dataItem: any, typeOfTable: string): void => {
    this.setState((prev) => ({
      noteSecretaryDetails: prev.noteSecretaryDetails.filter(
        (each: any) => each.noteApproverId !== dataItem.id
      ),
    }));
    console.log(dataItem);
    if (typeOfTable === "Reviewer") {
      console.log("Remove triggered from Reviewer Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerData: filterData });
    } else {
      console.log("Remove triggered Approver Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerApproverData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerApproverData: filterData });
    }
  };

  private checkReviewer = (): boolean => {
    const approverTitles = this.state.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    console.log('Approver Titles:', approverTitles);

    const reviewerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );
    console.log('Reviewer Titles:', reviewerTitles);

    const reviewerInfo = this.state.reviewerInfo[0];
    const reviewerEmail = reviewerInfo.email || reviewerInfo.secondaryText;
    const reviewerName = reviewerInfo.text;

    console.log('Current User Email:', this._currentUserEmail);
    console.log('Reviewer Email:', reviewerEmail);
    console.log('Reviewer Name:', reviewerName);

    // Condition checks
    const isReviewerOrApprover =
      reviewerTitles.includes(reviewerName) ||
      approverTitles.includes(reviewerName);
    
    const isCurrentUserReviewer = this._currentUserEmail === reviewerEmail;

    console.log('Is Reviewer or Approver:', isReviewerOrApprover);
    console.log('Is Current User Reviewer:', isCurrentUserReviewer);

    // Return true only if both conditions are met
    return isReviewerOrApprover || isCurrentUserReviewer;
};

  private checkApprover = () => {
    const approverTitles = this.state.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    console.log(approverTitles);

    const reveiwerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );
    console.log(reveiwerTitles);

    console.log(reveiwerTitles.includes(this.state.approverInfo[0].text))
    console.log(approverTitles.includes(this.state.approverInfo[0].text))
    console.log(this.state.approverInfo[0].email || this.state.approverInfo[0].secondaryText)
    const returnBoolean =
      (reveiwerTitles.includes(this.state.approverInfo[0].text) ||
      approverTitles.includes(this.state.approverInfo[0].text)) ||(this._currentUserEmail === (this.state.approverInfo[0].email || this.state.approverInfo[0].secondaryText));
    return returnBoolean;
  };

  private handleOnAdd = async (event: any, type: string): Promise<void> => {
    console.log(type);
    if (type === "reveiwer") {
      // console.log(this.checkReviewer());
      // this.checkReviewer()

      // console.log(event)
      // let designation=""
      // eslint-disable-next-line no-return-assign

      // console.log(this._getUserProperties(this.state.approverInfo[0].loginName).then(x),"title")

      // console.log(type,newItemsData,"test",designation)
      if (this.checkReviewer()) {
        console.log("Data already Exist in Reviewer Table or Approver Table");
        this.setState({ isApproverOrReviewerDialogHandel: false });
      } else {
        console.log(this.state.reviewerInfo, "Reviewer Info");
        const getSecretaryDetails =
          this.state.approverIdsHavingSecretary.filter((each: any) => {
            console.log(each);
            return each.ApproverId === this.state.reviewerInfo[0].id;
          });
        console.log(getSecretaryDetails);
        if (getSecretaryDetails.length > 0) {
          console.log("if entered");
          this.setState((prev) => ({
            peoplePickerData: [
              ...prev.peoplePickerData,
              ...this.state.reviewerInfo,
            ],
            noteSecretaryDetails: [
              ...prev.noteSecretaryDetails,
              getSecretaryDetails[0]?.secretaryObj,
            ],
          }));
        } else {
          console.log("else entered");
          this.setState((prev) => ({
            peoplePickerData: [
              ...prev.peoplePickerData,
              ...this.state.reviewerInfo,
            ],
          }));
        }
      }

      // console.log(fetchedData)
      // this._getPeoplePickerItems()
      console.log(this.state.reviewerInfo, "handle On Add-reveiwer section");
    } else {
      // console.log(event)
      // let designation=""
      // eslint-disable-next-line no-return-assign

      // console.log(this._getUserProperties(this.state.approverInfo[0].loginName).then(x),"title")

      // console.log(type,newItemsData,"test",designation)
      if (this.checkApprover()) {
        console.log("Data already Exist in Reviewer Table or Approver Table");
        this.setState({ isApproverOrReviewerDialogHandel: false });
      } else {
        console.log(this.state.approverInfo, "Approver Info");
        const getSecretaryDetails =
          this.state.approverIdsHavingSecretary.filter((each: any) => {
            console.log(each);
            return each.ApproverId === this.state.approverInfo[0].id;
          });
        console.log(getSecretaryDetails);
        if (getSecretaryDetails.length > 0) {
          this.setState((prev) => ({
            peoplePickerApproverData: [
              ...prev.peoplePickerApproverData,
              ...this.state.approverInfo,
            ],
            noteSecretaryDetails: [
              ...prev.noteSecretaryDetails,
              getSecretaryDetails[0]?.secretaryObj,
            ],
          }));
        } else {
          this.setState((prev) => ({
            peoplePickerApproverData: [
              ...prev.peoplePickerApproverData,
              ...this.state.approverInfo,
            ],
          }));
        }
      }

      // console.log(fetchedData)
      // this._getPeoplePickerItems()
      console.log(this.state.approverInfo, "handle On Add-Approver section");
    }
  };

  // private handleCommittenameRedBorder = (event: any): void => {
  //   // Handle click event
  //   console.log("Dropdown clicked");
  //   const value = event.value;
  //   console.log(value);
  //   this.setState({ isWarningCommitteeName: false, committeeNameFeildValue: value });
  // };

  // general section --------handling
  // general section --------handling
  // general section --------handling
  // private handleCommittename(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  //   // console.log(item.text);
  //   // this.setState({ noteTypeValue: item });
  //   const value = item.text
  //   this.setState({committeeNameFeildValue:value})
  // }

  private handleCommittename = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";
    console.log(value);

    this.setState({
      committeeNameFeildValue: value,
      isWarningCommitteeName: !value, // Set warning state if value is empty
    });
  };
  // private closeDialog = (): void => {
  //   this.setState({isDialogHidden:true})
  // };

  // private handleSubject(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void {
  //   // console.log(newValue)
  //   const value = newValue || ''; // Ensure value is a string
  //   this.setState({ subjectFeildValue: value });
  // }

  // private handleSubject = (event: InputChangeEvent): void => {
  //   const value = event.target.value ?? ''; // Handle undefined values
  //   console.log(value);
  //   this.setState({ subjectFeildValue: value });
  // };

  private handleSubjectChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningSubject;

    this.setState({
      subjectFeildValue: value,
      isWarningSubject: isWarning,
    });
  };

  private handleNatureOfNoteChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";
    console.log(value);

    this.setState({
      isPuroposeVisable:true,
      natureOfNoteFeildValue: value,
      isWarningNatureOfNote: !value, // Set warning state if value is empty
    });

    if (value === 'Information' || value === 'Ratification'){
      this.setState({natureOfApprovalOrSanctionFeildValue:'',puroposeFeildValue:'',othersFieldValue:''})
    }
  };

  private handleNatureOfApprovalOrSanctionChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";
    console.log(value);

    this.setState({
      natureOfApprovalOrSanctionFeildValue: value,
      isWarningNatureOfApporvalOrSanction: !value, // Set warning if no value is selected
    });
  };

  private handleNoteTypeChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";
    console.log(value);

    this.setState({
      noteTypeFeildValue: value,
      isWarningNoteType: !value, // Set warning state if value is empty
    });

    console.log(`${value}uuu`)
    // Non-Financial
    if(value==='Non-Financial'){
      console.log("entered")
      this.setState({typeOfFinancialNoteFeildValue:'',amountFeildValue:''})
    }
  };

  // private handleNoteType(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {
  //   // console.log(item.text);

  //   if (item.text === "Financial" ){
  //     console.log(item.text);
  //     this.setState({ noteTypeFeildValue: item.text ,isTypeOfFinacialNote:true,isAmountVisable:true});

  //   }else{
  //     this.setState({ noteTypeFeildValue: item.text,isTypeOfFinacialNote:false,isAmountVisable:false });
  //   }
  // }
  public handletextBoxChange = (e: any, fieldName: string) => {
    const { value } = e.target;
    console.log(this.state.eCommitteData, "eCommitteData");
    this.setState((prev) => ({
      eCommitteData: {
        ...prev.eCommitteData,
        [fieldName]: value,
      },
    }));
  };
  private handleTypeOfFinancialNote = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const selectedKey = option ? option.key.toString() : "";
    const isWarning = !selectedKey;
    this.setState({
      typeOfFinancialNoteFeildValue: selectedKey,
      isWarningTypeOfFinancialNote: isWarning,
    });
   
  };

  private handleSearchTextChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningSearchText;

    this.setState({
      searchTextFeildValue: value,
      isWarningSearchText: isWarning,
    });
  };

  private handleAmountChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningAmountField;

    this.setState({
      amountFeildValue: value,
      isWarningAmountField: isWarning,
    });
  };

  private handlePurposeDropDown = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const selectedKey = option ? option.key.toString() : "";
    this.setState({
      puroposeFeildValue: selectedKey,
      isWarningPurposeField: !selectedKey, // Set warning if no value is selected
    });

    if(selectedKey !=='Others'){
      this.setState({othersFieldValue:''})
    }
  };

  private handlePurposeChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningPurposeField;

    this.setState({
      puroposeFeildValue: value,
      isWarningPurposeField: isWarning,
    });
  };

  private handleOthersChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningPurposeField;

    this.setState({
      othersFieldValue: value,
      isWarningPurposeField: isWarning,
    });
  };

  // general section --------handling---------end
  // general section --------handling---------end
  // general section --------handling---------end

  private createSubFolder = async (parentFolderPath: string): Promise<void> => {
    console.log(parentFolderPath);

    async function getFileArrayBuffer(file: any): Promise<ArrayBuffer> {
      if (file.arrayBuffer) {
        return await file.arrayBuffer();
      } else {
        // Ensure the file is a Blob before reading it
        let blob: Blob;

        if (file instanceof Blob) {
          blob = file;
        } else {
          // Convert the file to Blob if it's not already
          blob = new Blob([file]);
        }

        // Use FileReader to read the file as an ArrayBuffer
        return new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as ArrayBuffer);
            } else {
              reject(new Error("Failed to read file as ArrayBuffer"));
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      }
    }

    try {
      const { sp } = this.props;
      const filesDataArray = [
        {
          folderName: "Pdf",
          files: this.state.noteTofiles,
        },
        {
          folderName: "SupportingDocument",
          files: this.state.supportingDocumentfiles,
        },
        {
          folderName: "WordDocument",
          files: this.state.wordDocumentfiles,
        },
      ];

      this.state.noteSecretaryDetails.length > 0 &&
        (async function () {
          await sp.web.rootFolder.folders.addUsingPath(
            `${parentFolderPath}/GistDocuments`
          );
          console.log(`folder is created ${parentFolderPath}/GistDocuments`);
        })();

      for (const { folderName, files } of filesDataArray) {
        const siteUrl = `${parentFolderPath}/${folderName}`;
        console.log(siteUrl);

        // Create the folder in SharePoint
        await sp.web.rootFolder.folders.addUsingPath(siteUrl);

        for (const file of files) {
          console.log(file);

          // Get the ArrayBuffer of the file
          const arrayBuffer = await getFileArrayBuffer(file);
          console.log(arrayBuffer);

          // Upload the file to the SharePoint Library
          await sp.web
            .getFolderByServerRelativePath(siteUrl)
            .files.addUsingPath(file.name, arrayBuffer, {
              Overwrite: true,
            });
        }

        console.log(
          `Folder -----${folderName}---- created successfully in list`
        );
      }
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  };

  private createFolder = async (req: string): Promise<void> => {
    const folderName = req.replace(/\//g, "-");
    try {
      // const url = "/sites/uco/Shared Documents/MyFolder"
      console.log(this.props.context.pageContext.web.serverRelativeUrl);
      const absUrl = this.props.context.pageContext.web.serverRelativeUrl;
      this._folderName = `${absUrl}/${this.props.libraryId}/${folderName}`;

      const siteUrl = `${absUrl}/${this.props.libraryId}/${folderName}`;
      console.log(siteUrl);
      // const filesData = this.state.files;
      // const folderId =
      await this.props.sp.web.rootFolder.folders.addUsingPath(siteUrl);
      //   .then(async (res) => {
      //     for (let i = 0; i < filesData.length; i++) {
      //       const file = filesData[i];
      //       const arrayBuffer = await file.arrayBuffer();
      //       // Upload a file to the SharePoint Library
      //       await this.props.sp.web
      //         .getFolderByServerRelativePath(siteUrl)
      //         .files.addUsingPath(file.name, arrayBuffer, { Overwrite: true });
      //     }
      //   }
      // );

      // creates a new folder for web with specified server relative url
      // const folderAddResult = await this.props.sp.web.folders.addUsingPath(url);

      console.log(`Folder '${folderName}' created successfully in list `);
      // eslint-disable-next-line no-void
      void this.createSubFolder(siteUrl);
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  };

  private _getApproverDetails = (
    reveiwerData: any,
    apporverData: any,
    typeOfParameter: any
  ): any => {
    const dataOfReveiwerAndApprover = [...reveiwerData, ...apporverData];
    console.log(dataOfReveiwerAndApprover);
    const finalData = dataOfReveiwerAndApprover.map(
      (each: any, index: number) => {
        console.log(each);

        if (each.approverType === "Reviewer") {
          return {
            approverType: each.approverType,
            approverEmail: each.email,
            approverOrder: index + 1,
            approverStatus: 1,
            id: each.id,
            status: index === 0 ? "pending" : "waiting",
            mainStatus: index === 0 ? "pending with Reviewer" : "waiting",
            email: each.secondaryText,
            designation: each.optionalText,
            approverEmailName: each.text,
            srNo: each.srNo,
            secretary: "IB Test 1",
            ...each,
          };
        } else {
          return {
            approverType: each.approverType,
            approverEmail: each.email,
            approverOrder: index + 1,
            approverStatus: 1,
            id: each.id,
            status: index === 0 ? "pending" : "waiting",
            mainStatus: index === 0 ? "pending with Approver" : "waiting",
            email: each.secondaryText,
            designation: each.optionalText,
            approverEmailName: each.text,
            srNo: each.srNo,
            secretary: "IB Test 1",
            ...each,
          };
        }
      }
    );
    console.log(finalData);

    console.log(JSON.stringify(finalData));

    if (typeOfParameter === "intialOrderApproverDetails") {
      return JSON.stringify([finalData[0]]);
    } else {
      return JSON.stringify(finalData);
    }
  };

  private _getAuditTrail = (status: any): any => {
    console.log(this._userName, this._role);
    const auditLog = [
      {
        Actioner: this._userName,
        ActionerEmail: this._currentUserEmail,

        ActionTaken:
          this.props.formType === "New"
            ? `ECommittee note is ${status}`
            : `Board Note is ${status}`,
        Role: this._role,
        ActionTakenOn:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        Comments: "No Comments",
      },
    ];
    console.log(this.state.auditTrail);

    return JSON.stringify([...this.state.auditTrail, ...auditLog]);
  };

  private _getReviewerId = () => {
    const arr = this.state.peoplePickerData.map((each: any) => {
      if (each.id !== "undefined") {
        return each.id;
      }
    });

    const nw = arr.filter((each: any) => {
      if (each !== undefined) {
        return `${each}`;
      }
    });
    console.log(nw);
    return nw;
  };

  private _getApproverId = () => {
    const arr = this.state.peoplePickerApproverData.map((each: any) => {
      if (each.id !== "undefined") {
        return each.id;
      }
    });

    const nw = arr.filter((each: any) => {
      if (each !== undefined) {
        return `${each}`;
      }
    });
    console.log(nw);
    return nw;
  };

  private _getCurrentApproverId = (data: any, purpose: any) => {
    console.log(data, "...data", purpose, "...purpose");
    const arr = data.map((each: any) => {
      if (each.id !== "undefined") {
        return each.id;
      }
    });

    const nw = arr.filter((each: any) => {
      if (each !== undefined) {
        return `${each}`;
      }
    });

    console.log(nw);

    if (purpose === "intialOrderApproverDetails") {
      return nw[0];
    } else {
      const finalApprover = nw[nw.length - 1];
      return finalApprover;
    }
  };

  // private returnSecretaryDto = ():any =>{
  //   const dto = {
  //     "noteSecretarieId": 3078,
  //     "noteApproverId": 4550,
  //     "noteId": 979,
  //     "secretaryEmail": "ib.test5@xencia.com",
  //     "approverEmail": "ib.test2@xencia.com",
  //     "approverEmailName": "IB Test2",
  //     "secretaryEmailName": "IB Test5",
  //     "gistWordDocumentPath": null,
  //     "gistWordDocumentPathPart1": null,
  //     "gistWordDocumentPathPart2": null,
  //     "gistWordDocumentPathPart3": null,
  //     "gistWordDocumentPathPart4": null,
  //     "gistWordDocumentPathPart5": null,
  //     "gistWordDocumentPathPart6": null,
  //     "gistWordDocumentPathPart7": null,
  //     "gistWordDocumentPathPart8": null,
  //     "gistWordDocumentPathPart9": null,
  //     "gistWordDocumentPathPart10": null,
  //     "gistWordDocumentFileName": null,
  //     "createdDate": "2024-09-26T16:55:00",
  //     "createdBy": "Jupudinaga.sai@xencia.com",
  //     "modifiedDate": "2024-09-26T16:55:00",
  //     "modifiedBy": "Jupudinaga.sai@xencia.com",
  //     "gistWordBase64": null,
  //     "gistWordDocumentPathLength": null
  // }
  // console.log(dto)
  // return dto
  // }

  private createEcommitteeObject = (
    status: string,
    statusNumber: any
  ): INoteObject => {
    console.log(status)
    const ecommitteObject: any = {
      Department: this.state.department,
      CommitteeName: this.state.committeeNameFeildValue,
      Subject: this.state.subjectFeildValue,
      NatureOfNote: this.state.natureOfNoteFeildValue,
      NatureOfApprovalOrSanction:
        this.state.natureOfApprovalOrSanctionFeildValue,
      NoteType: this.state.noteTypeFeildValue,
      FinancialType: this.state.typeOfFinancialNoteFeildValue,
      Amount: parseInt(this.state.amountFeildValue),
      SearchKeyword: this.state.searchTextFeildValue,
      Purpose:
        this.state.puroposeFeildValue === "Others"
          ? this.state.othersFieldValue
          : this.state.puroposeFeildValue,
      NoteApproversDTO: this._getApproverDetails(
        this.state.peoplePickerData,
        this.state.peoplePickerApproverData,
        "allDetails"
      ),
      Status: status,
      StatusNumber: status === "Submitted" ? statusNumber : "100",
      AuditTrail:
        this.state.status === "Call Back"
          ? this._getAuditTrail("Re-submitted")
          : this._getAuditTrail(status),
      ReviewersId: this._getReviewerId(),
      ApproversId: this._getApproverId(),
      // ReviewersId: 36,
      // ApproversId: 45,
      CurrentApproverId: this._getCurrentApproverId(
        [
          ...this.state.peoplePickerData,
          ...this.state.peoplePickerApproverData,
        ],
        "intialOrderApproverDetails"
      ),
      DraftResolution: this.state.draftResolutionFieldValue,
      NoteSecretaryDTO: JSON.stringify(this.state.noteSecretaryDetails),
      FinalApproverId: this._getCurrentApproverId(
        [
          ...this.state.peoplePickerData,
          ...this.state.peoplePickerApproverData,
        ],
        "FinalOrderApproverDetails"
      ),
    };
    console.log(ecommitteObject);
    return ecommitteObject;
  };

  // private isNatureOfApprovalOrSanction=()=>{
  //   let isValid=true;
  //   if((this.state.natureOfNoteFeildValue === "Sanction" || this.state.natureOfNoteFeildValue ==="Approval") && this.state.natureOfApprovalOrSanctionFeildValue ===""){
  //     isValid =false;
  //   }
  //   return isValid;
  // }

  // Handle when the Confirm button in the confirmation dialog is clicked

  // Handle when the Cancel button in the confirmation dialog is clicked
 
  // Handle when the OK button in the success dialog is clicked
  // private handleSuccessDialogClose = () => {
  //   // Close the success dialog
  //   this.setState({ isSuccessDialogVisible: false });
  // };

   // Show the dialog
   private showDialog = () => {
    this.setState({ isConfirmationDialogVisible: true });
  };

  // Hide the dialog
  private handleCancelDialog = () => {
    this.setState({ isConfirmationDialogVisible: false });
  };

  private handleConfirmSubmit = async () => {
    this.handleCancelDialog(); // Hide the dialog
    this.handleSubmit('Submitted');
  };

  private handleSubmit = async (
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    statusOfForm: string
  ): Promise<void> => {
    // event.preventDefault();
    console.log(event);
    console.log("Event Triggered");
    const {
      committeeNameFeildValue,
      subjectFeildValue,
      natureOfNoteFeildValue,
      noteTypeFeildValue,
      natureOfApprovalOrSanctionFeildValue,
      typeOfFinancialNoteFeildValue,
      searchTextFeildValue,
      amountFeildValue,
      puroposeFeildValue,
    } = this.state;
    console.log(committeeNameFeildValue, "-----------committeeNameFeildValue");
    console.log(subjectFeildValue, "-----------subjectFeildValue");
    console.log(natureOfNoteFeildValue, "-----------natureOfNoteFeildValue");
    console.log(
      natureOfApprovalOrSanctionFeildValue,
      "--------------natureOfApprovalOrSanctionFeildValue"
    );
    console.log(noteTypeFeildValue, "-----------noteTypeFeildValue");
    console.log(
      typeOfFinancialNoteFeildValue,
      "-----------typeOfFinancialNoteFeildValue"
    );
    console.log(searchTextFeildValue, "-----------searchTextFeildValue");
    console.log(amountFeildValue, "-----------amountFeildValue");
    console.log(puroposeFeildValue, "-----------puroposeFeildValue");
    console.log(
      this.state.noteTypeFeildValue === "Financial" &&
        (this.state.natureOfNoteFeildValue === "Information" || "Ratification"),
      ",check.........................."
    );

    if (statusOfForm === 'Draft'){
      let id;
      let status;
    
        // eslint-disable-next-line prefer-const
        id = await this.props.sp.web.lists
          .getByTitle(this.props.listId)
          .items.add(this.createEcommitteeObject(statusOfForm, "300"));
        console.log(id.Id, "id");
      
      console.log(id.Id, "id -----", status, "Status");

    
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      await this._generateRequsterNumber(id.Id);

      // console.log(id)
      console.log("Item Drafted successfully");
      this.setState({ isVisibleAlter: true });
    }

    else{
      try {
        // eslint-disable-next-line no-constant-condition
        if (
          this.state.noteTypeFeildValue === "Financial" &&
          (this.state.natureOfNoteFeildValue === "Information" ||
            this.state.natureOfNoteFeildValue === "Ratification")
        ) {
          console.log("financial");
          if (
            this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.noteTypeFeildValue &&
            this.state.typeOfFinancialNoteFeildValue &&
            this.state.amountFeildValue &&
            this.state.searchTextFeildValue &&
            this.state.noteTofiles.length > 0 &&
            (this.state.noteSecretaryDetails.length > 0
              ? this.state.wordDocumentfiles.length > 0
              : true) &&
            // this.state.wordDocumentfiles.length>0 &&
            // this.state.peoplePickerData.length > 0&&
            this.state.peoplePickerApproverData.length > 0
  
            // this.isNatureOfApprovalOrSanction()
          ) {
            this.setState({ status: "Submitted", statusNumber: "1000" });
  
            let id;
            let status;
            if (this.state.status === "Call Back") {
              status = "Re-Submitted";
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(status, "2500"));
            } else {
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(statusOfForm, "1000"));
              console.log(id.Id, "id");
            }
            console.log(id.Id, "id -----", status, "Status");
  
            this.state.peoplePickerData.map(async (each: any) => {
              console.log(each);
              // const listItem = await this.props.sp.web.lists
              //   .getByTitle(this.props.listId)
              //   .items.add({
              //     Title: `${each.id}`,
              //     // Approvers:each.text
              //   });
              // console.log(listItem);
            });
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            await this._generateRequsterNumber(id.Id);
  
            // console.log(id)
            console.log("Item added successfully");
            this.setState({
              committeeNameFeildValue: "",
              subjectFeildValue: "",
              natureOfNoteFeildValue: "",
              noteTypeFeildValue: "",
              typeOfFinancialNoteFeildValue: "",
              amountFeildValue: "",
              searchTextFeildValue: "",
              noteTofiles: [],
              wordDocumentfiles: [],
              supportingDocumentfiles: [],
              peoplePickerData: [],
              peoplePickerApproverData: [],
              puroposeFeildValue: "",
            });
            this._fetchApproverDetails();
            this.setState({
              isWarning: false,
              isWarningCommitteeName: false,
              isWarningSubject: false,
              isWarningNatureOfNote: false,
              isWarningNoteType: false,
              isWarningTypeOfFinancialNote: false,
  
              // isWarningS
              isWarningAmountField: false,
              isWarningPurposeField: false,
              isWarningSearchText: false,
              isWarningNoteToFiles: false,
              isWarningWordDocumentFiles: false,
              // isWarningPeoplePicker: false,
            });
            console.log(
              `Form with ${id.Id} is Successfully Created in SP List - ********* ${statusOfForm} ********`
            );
            this.setState({ isVisibleAlter: true });
          } else {
            this.setState({
              isWarning: true,
              isWarningCommitteeName: true,
              isWarningSubject: true,
              isWarningNatureOfNote: true,
              isWarningNoteType: true,
              isWarningTypeOfFinancialNote: true,
              isWarningAmountField: true,
              isWarningPurposeField: true,
              isWarningSearchText: true,
  
              // isWarningPeoplePicker: true,
              isDialogHidden: false,
            });
  
            this.setState({
              eCommitteData: {
                committeeNameFeildValue: [
                  this.state.committeeNameFeildValue,
                  "CommitteName",
                ],
                subjectFeildValue: [this.state.subjectFeildValue, "Subject"],
                natureOfNoteFeildValue: [
                  this.state.natureOfNoteFeildValue,
                  "Nature Of Note",
                ],
                noteTypeFeildValue: [this.state.noteTypeFeildValue, "Note Type"],
                typeOfFinancialNoteFeildValue: [
                  this.state.typeOfFinancialNoteFeildValue,
                  "Type of Financial Note",
                ],
                amountFeildValue: [this.state.amountFeildValue, "Amount"],
                puroposeFeildValue: [this.state.puroposeFeildValue, "Purpose"],
                searchTextFeildValue: [
                  this.state.searchTextFeildValue,
                  "Search Text",
                ],
                noteTofiles: [
                  this.state.noteTofiles,
                  "Please select Valid Pdf File",
                ],
                wordDocumentfiles: [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ],
                supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
                AppoverData: [
                  this.state.peoplePickerApproverData,
                  "Please select atleast one Approver to submit request",
                ],
              },
            });
          }
        } else if (
          (this.state.natureOfNoteFeildValue === "Sanction" ||
            this.state.natureOfNoteFeildValue === "Approval") &&
          this.state.noteTypeFeildValue === "NonFinancial"
        ) {
          console.log("else entered", "sanction,approval", "nonFinancial");
          if (
            this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.natureOfApprovalOrSanctionFeildValue &&
            this.state.noteTypeFeildValue &&
            this.state.searchTextFeildValue &&
            this.state.noteTofiles.length > 0 &&
            (this.state.noteSecretaryDetails.length > 0
              ? this.state.wordDocumentfiles.length > 0
              : true) &&
            this.state.peoplePickerApproverData.length > 0
          ) {
            this.setState({ status: "Submitted", statusNumber: "1000" });
            let id;
            let status;
            if (this.state.status === "Call Back") {
              status = "Re-Submitted";
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(status, "2500"));
            } else {
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(statusOfForm, "1000"));
              console.log(id.Id, "id");
            }
            console.log(id.Id, "id -----", status, "Status");
            this.state.peoplePickerData.map(async (each: any) => {
              console.log(each);
              // const listItem = await this.props.sp.web.lists
              //   .getByTitle(this.props.listId)
              //   .items.add({
              //     Title: `${each.id}`,
              //     // Approvers:each.text
              //   });
              // console.log(listItem);
            });
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            await this._generateRequsterNumber(id.Id);
  
            // console.log(id)
            console.log("Item added successfully");
  
            this.setState({
              committeeNameFeildValue: "",
              subjectFeildValue: "",
              natureOfNoteFeildValue: "",
              natureOfApprovalOrSanctionFeildValue: "",
              noteTypeFeildValue: "",
              searchTextFeildValue: "",
  
              noteTofiles: [],
              supportingDocumentfiles: [],
              wordDocumentfiles: [],
              peoplePickerApproverData: [],
              peoplePickerData: [],
            });
            this._fetchApproverDetails();
            this.setState({
              isWarning: false,
              isWarningCommitteeName: false,
              isWarningSubject: false,
              isWarningNatureOfNote: false,
              isWarningNatureOfApporvalOrSanction: false,
              isWarningNoteType: false,
              isWarningSearchText: false,
  
              isWarningNoteToFiles: false,
              isWarningWordDocumentFiles: false,
              isWarningPeoplePicker: false,
            });
            console.log(
              `Form with ${id.Id} is Successfully Created in SP List - ********* ${statusOfForm} ********`
            );
            this.setState({ isVisibleAlter: true });
          } else {
            this.setState({
              isWarning: true,
              isWarningCommitteeName: true,
              isWarningSubject: true,
              isWarningNatureOfNote: true,
              isWarningNatureOfApporvalOrSanction: true,
              isWarningNoteType: true,
              isWarningSearchText: true,
  
              isDialogHidden: false,
            });
  
            this.setState({
              eCommitteData: {
                committeeNameFeildValue: [
                  this.state.committeeNameFeildValue,
                  "CommitteName",
                ],
                subjectFeildValue: [this.state.subjectFeildValue, "Subject"],
                natureOfNoteFeildValue: [
                  this.state.natureOfNoteFeildValue,
                  "Nature Of Note",
                ],
                natureOfApprovalOrSanctionFeildValue: [
                  this.state.natureOfApprovalOrSanctionFeildValue,
                  "Nature Of Appr/Sanc",
                ],
                noteTypeFeildValue: [this.state.noteTypeFeildValue, "Note Type"],
                searchTextFeildValue: [
                  this.state.searchTextFeildValue,
                  "Search Text",
                ],
  
                noteTofiles: [
                  this.state.noteTofiles,
                  "Please select Valid Pdf File",
                ],
                wordDocumentfiles: [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ],
                supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
                AppoverData: [
                  this.state.peoplePickerApproverData,
                  "Please select atleast one Approver to submit request",
                ],
              },
            });
          }
        } else if (
          (this.state.natureOfNoteFeildValue === "Sanction" ||
            this.state.natureOfNoteFeildValue === "Approval") &&
          this.state.noteTypeFeildValue === "Financial"
        ) {
          console.log("else entered", "sanction,approval", "financial");
          if (
            this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.natureOfApprovalOrSanctionFeildValue &&
            this.state.noteTypeFeildValue &&
            this.state.typeOfFinancialNoteFeildValue &&
            this.state.amountFeildValue &&
            this.state.searchTextFeildValue &&
            this.state.puroposeFeildValue &&
            this.state.noteTofiles.length > 0 &&
            (this.state.noteSecretaryDetails.length > 0
              ? this.state.wordDocumentfiles.length > 0
              : true) &&
            this.state.peoplePickerApproverData.length > 0
          ) {
            this.setState({ status: "Submitted", statusNumber: "1000" });
            let id;
            let status;
            if (this.state.status === "Call Back") {
              status = "Re-Submitted";
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(status, "2500"));
            } else {
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(statusOfForm, "1000"));
              console.log(id.Id, "id");
            }
            console.log(id.Id, "id -----", status, "Status");
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            await this._generateRequsterNumber(id.Id);
            this.state.peoplePickerData.map(async (each: any) => {
              console.log(each);
              // const listItem = await this.props.sp.web.lists
              //   .getByTitle(this.props.listId)
              //   .items.add({
              //     Title: `${each.id}`,
              //     // Approvers:each.text
              //   });
              // console.log(listItem);
            });
  
            // console.log(id)
            console.log("Item added successfully");
            this.setState({
              committeeNameFeildValue: "",
              subjectFeildValue: "",
              natureOfNoteFeildValue: "",
              natureOfApprovalOrSanctionFeildValue: "",
              noteTypeFeildValue: "",
              typeOfFinancialNoteFeildValue: "",
              amountFeildValue: 0,
              searchTextFeildValue: "",
              puroposeFeildValue: "",
              noteTofiles: [],
              supportingDocumentfiles: [],
              wordDocumentfiles: [],
              peoplePickerApproverData: [],
              peoplePickerData: [],
            });
            this._fetchApproverDetails();
            this.setState({
              isWarning: false,
              isWarningCommitteeName: false,
              isWarningSubject: false,
              isWarningNatureOfNote: false,
              isWarningNatureOfApporvalOrSanction: false,
              isWarningNoteType: false,
              isWarningTypeOfFinancialNote: false,
              isWarningAmountField: false,
              isWarningSearchText: false,
              isWarningPurposeField: false,
              isWarningNoteToFiles: false,
              isWarningWordDocumentFiles: false,
              isWarningPeoplePicker: false,
            });
            console.log(
              `Form with ${id.Id} is Successfully Created in SP List - ********* ${statusOfForm} ********`
            );
            this.setState({ isVisibleAlter: true });
          } else {
            this.setState({
              isWarning: true,
              isWarningCommitteeName: true,
              isWarningSubject: true,
              isWarningNatureOfNote: true,
              isWarningNatureOfApporvalOrSanction: true,
              isWarningNoteType: true,
              isWarningTypeOfFinancialNote: true,
              isWarningAmountField: true,
              isWarningSearchText: true,
              isWarningPurposeField: true,
  
              isDialogHidden: false,
            });
            this.setState({
              eCommitteData: {
                committeeNameFeildValue: [
                  this.state.committeeNameFeildValue,
                  "CommitteName",
                ],
                subjectFeildValue: [this.state.subjectFeildValue, "Subject"],
                natureOfNoteFeildValue: [
                  this.state.natureOfNoteFeildValue,
                  "Nature Of Note",
                ],
                natureOfApprovalOrSanctionFeildValue: [
                  this.state.natureOfApprovalOrSanctionFeildValue,
                  "Nature Of Appr/Sanc",
                ],
                noteTypeFeildValue: [this.state.noteTypeFeildValue, "Note Type"],
                typeOfFinancialNoteFeildValue:
                  this.state.typeOfFinancialNoteFeildValue,
                amountFeildValue: this.state.amountFeildValue,
                searchTextFeildValue: [
                  this.state.searchTextFeildValue,
                  "Search Text",
                ],
                puroposeFeildValue: this.state.puroposeFeildValue,
                noteTofiles: [
                  this.state.noteTofiles,
                  "Please select Valid Pdf File",
                ],
                wordDocumentfiles: [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ],
                supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
                AppoverData: [
                  this.state.peoplePickerApproverData,
                  "Please select atleast one Approver to submit request",
                ],
              },
            });
          }
        } else {
          console.log("final else");
          this.setState({ status: "Submitted", statusNumber: "1000" });
          // eslint-disable-next-line no-constant-condition
          if (
            this.state.natureOfNoteFeildValue === "Approval" ||
            "Sanction" ||
            this.state.noteTypeFeildValue === "Financial"
          ) {
            this.setState({
              isWarningNatureOfApporvalOrSanction: true,
              isWarningPurposeField: true,
              isWarningAmountField: true,
              isWarningTypeOfFinancialNote: true,
            });
          }
          if (
            this.state.committeeNameFeildValue &&
            this.state.subjectFeildValue &&
            this.state.natureOfNoteFeildValue &&
            this.state.noteTypeFeildValue &&
            this.state.searchTextFeildValue &&
            this.state.noteTofiles.length > 0 &&
            (this.state.noteSecretaryDetails.length > 0
              ? this.state.wordDocumentfiles.length > 0
              : true) &&
            this.state.peoplePickerApproverData.length > 0
          ) {
            console.log("else entered");
            let id;
            let status;
            if (this.state.status === "Call Back") {
              status = "Re-Submitted";
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(status, "2500"));
            } else {
              id = await this.props.sp.web.lists
                .getByTitle(this.props.listId)
                .items.add(this.createEcommitteeObject(statusOfForm, "1000"));
              console.log(id.Id, "id");
            }
            console.log(id.Id, "id -----", status, "Status");
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            await this._generateRequsterNumber(id.Id);
            this.state.peoplePickerData.map(async (each: any) => {
              console.log(each);
              // const listItem = await this.props.sp.web.lists
              //   .getByTitle(this.props.listId)
              //   .items.add({
              //     Title: `${each.id}`,
              //     // // Approvers:each.text
              //   });
              // console.log(listItem);
            });
  
            this.setState({
              committeeNameFeildValue: "",
              subjectFeildValue: "",
              natureOfNoteFeildValue: "",
              noteTypeFeildValue: "",
              searchTextFeildValue: "",
              noteTofiles: [],
              supportingDocumentfiles: [],
              wordDocumentfiles: [],
              peoplePickerApproverData: [],
              peoplePickerData: [],
              puroposeFeildValue: "",
              filesClear: [],
            });
            this._fetchApproverDetails();
  
            // console.log(id)
            console.log("Item added successfully");
            this.setState({
              isWarning: false,
              isWarningCommitteeName: false,
              isWarningSubject: false,
              isWarningNatureOfNote: false,
  
              isWarningNoteType: false,
              isWarningPurposeField: false,
              isWarningSearchText: false,
              isWarningNoteToFiles: false,
              // isWarningSupportingDocumentFiles: false,no warning required
              isWarningWordDocumentFiles: false,
              isWarningPeoplePicker: false,
            });
            console.log(
              `Form with ${id.Id} is Successfully Created in SP List - ********* ${statusOfForm} ********`
            );
            this.setState({ isVisibleAlter: true });
          } else {
            // alert("Required Fields")
  
            this.setState({
              isWarning: true,
              isWarningCommitteeName: true,
              isWarningSubject: true,
              isWarningNatureOfNote: true,
  
              isWarningNoteType: true,
  
              isWarningSearchText: true,
              isDialogHidden: false,
            });
            this.setState({
              eCommitteData: {
                committeeNameFeildValue: [
                  this.state.committeeNameFeildValue,
                  "CommitteName",
                ],
                subjectFeildValue: [this.state.subjectFeildValue, "Subject"],
                natureOfNoteFeildValue: [
                  this.state.natureOfNoteFeildValue,
                  "Nature Of Note",
                ],
  
                noteTypeFeildValue: [this.state.noteTypeFeildValue, "Note Type"],
  
                searchTextFeildValue: [
                  this.state.searchTextFeildValue,
                  "Search Text",
                ],
  
                noteTofiles: [
                  this.state.noteTofiles,
                  "Please select Valid Pdf File",
                ],
                wordDocumentfiles: [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ],
                supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
                AppoverData: [
                  this.state.peoplePickerApproverData,
                  "Please select atleast one Approver to submit request",
                ],
              },
            });
          }
        }
        this.setState({ status: "" });
      } catch (error) {
        console.error("Error adding item: ", error);
      }


    }
   
  };

  private getObject = (): any => ({
    Department: this.state.department,
    CommitteeName: this.state.committeeNameFeildValue,
    Subject: this.state.subjectFeildValue,
    NatureOfNote: this.state.natureOfNoteFeildValue,
    NatureOfApprovalOrSanction: this.state.natureOfApprovalOrSanctionFeildValue,
    NoteType: this.state.noteTypeFeildValue,
    FinancialType: this.state.typeOfFinancialNoteFeildValue,
    Amount: this.state.amountFeildValue,
    SearchKeyword: this.state.searchTextFeildValue,
    Purpose: this.state.puroposeFeildValue,
    NoteApproversDTO: this._getApproverDetails(
      this.state.peoplePickerData,
      this.state.peoplePickerApproverData,
      "allDetails"
    ),
    Status: "Submitted",
    StatusNumber: "1000",
    AuditTrail: this._getAuditTrail("ReSubmitted"),
    // Reviewer:{result:this._getReviewerId()}
    ReviewersId: this._getReviewerId(),
    ApproversId: this._getApproverId(),
    CurrentApproverId: this._getCurrentApproverId(
      [...this.state.peoplePickerData, ...this.state.peoplePickerApproverData],
      "intialOrderApproverDetails"
    ),
    DraftResolution: this.state.draftResolutionFieldValue,
    NoteSecretaryDTO: JSON.stringify(this.state.noteSecretaryDetails),
    FinalApproverId: this._getCurrentApproverId(
      [...this.state.peoplePickerData, ...this.state.peoplePickerApproverData],
      "FinalOrderApproverDetails"
    ),
  });

  public async clearFolder(
    libraryName: any,
    folderRelativeUrl: string
  ): Promise<void> {
    try {
      // Get the folder
      const folder = await this.props.sp.web.getFolderByServerRelativePath(
        folderRelativeUrl
      );

      // Get all items in the folder
      const items = await folder.files();

      // Loop through each item and delete it
      for (const item of items) {
        await this.props.sp.web
          .getFileByServerRelativePath(item.ServerRelativeUrl)
          .recycle();
      }

      console.log(
        `All files in folder '${folderRelativeUrl}' have been deleted.`
      );
    } catch (error) {
      console.error("Error clearing folder:", error);
    }
  }

  private async updatePdfFolderItems(libraryName: any[], folderPath: string) {
    await this.clearFolder(libraryName, folderPath);

    async function getFileArrayBuffer(file: any): Promise<ArrayBuffer> {
      if (file.arrayBuffer) {
        return await file.arrayBuffer();
      } else {
        // Ensure the file is a Blob before reading it
        let blob: Blob;

        if (file instanceof Blob) {
          blob = file;
        } else {
          // Convert the file to Blob if it's not already
          blob = new Blob([file]);
        }

        // Use FileReader to read the file as an ArrayBuffer
        return new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as ArrayBuffer);
            } else {
              reject(new Error("Failed to read file as ArrayBuffer"));
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      }
    }

    try {
      for (const file of libraryName) {
        console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      console.log("updated PDF document successfully");
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private async updateSupportingDocumentFolderItems(
    libraryName: any[],
    folderPath: string
  ) {
    await this.clearFolder(libraryName, folderPath);
    async function getFileArrayBuffer(file: any): Promise<ArrayBuffer> {
      if (file.arrayBuffer) {
        return await file.arrayBuffer();
      } else {
        // Ensure the file is a Blob before reading it
        let blob: Blob;

        if (file instanceof Blob) {
          blob = file;
        } else {
          // Convert the file to Blob if it's not already
          blob = new Blob([file]);
        }

        // Use FileReader to read the file as an ArrayBuffer
        return new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as ArrayBuffer);
            } else {
              reject(new Error("Failed to read file as ArrayBuffer"));
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      }
    }

    try {
      for (const file of libraryName) {
        console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      console.log("updated Supporting document successfully");
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private async updateWordDocumentFolderItems(
    libraryName: any[],
    folderPath: string
  ) {
    await this.clearFolder(libraryName, folderPath);
    async function getFileArrayBuffer(file: any): Promise<ArrayBuffer> {
      if (file.arrayBuffer) {
        return await file.arrayBuffer();
      } else {
        // Ensure the file is a Blob before reading it
        let blob: Blob;

        if (file instanceof Blob) {
          blob = file;
        } else {
          // Convert the file to Blob if it's not already
          blob = new Blob([file]);
        }

        // Use FileReader to read the file as an ArrayBuffer
        return new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(reader.result as ArrayBuffer);
            } else {
              reject(new Error("Failed to read file as ArrayBuffer"));
            }
          };
          reader.onerror = reject;
          reader.readAsArrayBuffer(blob);
        });
      }
    }

    try {
      for (const file of libraryName) {
        console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      console.log("updated Word document successfully");
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private handleUpdate = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    event.preventDefault();
    console.log(event);
    console.log("Update Event Triggered");

    const {
      committeeNameFeildValue,
      subjectFeildValue,
      natureOfNoteFeildValue,
      noteTypeFeildValue,
      natureOfApprovalOrSanctionFeildValue,
      typeOfFinancialNoteFeildValue,
      searchTextFeildValue,
      amountFeildValue,
      puroposeFeildValue,
    } = this.state;

    console.log(committeeNameFeildValue, "-----------committeeNameFeildValue");
    console.log(subjectFeildValue, "-----------subjectFeildValue");
    console.log(natureOfNoteFeildValue, "-----------natureOfNoteFeildValue");
    console.log(
      natureOfApprovalOrSanctionFeildValue,
      "--------------natureOfApprovalOrSanctionFeildValue"
    );
    console.log(noteTypeFeildValue, "-----------noteTypeFeildValue");
    console.log(
      typeOfFinancialNoteFeildValue,
      "-----------typeOfFinancialNoteFeildValue"
    );
    console.log(searchTextFeildValue, "-----------searchTextFeildValue");
    console.log(amountFeildValue, "-----------amountFeildValue");
    console.log(puroposeFeildValue, "-----------puroposeFeildValue");

    try {
      this.setState({ status: "Edited", statusNumber: "2000" });

      // Update SharePoint item
      console.log(
        this.getObject(),
        "*********************Edited passed Object*********************"
      );
      const itemToUpdate = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update(this.getObject());

      // Usage example
      this.updatePdfFolderItems(
        this.state.noteTofiles,
        `${this._folderName}/Pdf`
      );
      this.updateSupportingDocumentFolderItems(
        this.state.supportingDocumentfiles,
        `${this._folderName}/SupportingDocument`
      );
      this.updateWordDocumentFolderItems(
        this.state.wordDocumentfiles,
        `${this._folderName}/WordDocument`
      );

      console.log(itemToUpdate, "item updated");
      this.setState({ isVisibleAlter: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Generate Request Number
  private async _generateRequsterNumber(id: number) {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `DEP/${currentyear}-${nextYear}/C${id}`;
    // const requesterNo=`AD1/${currentyear}-${nextYear}/C${id}`

    const currentItem = await this._getItemData(id, "");
    console.log(currentItem);

    const getUpdatedNoteSecretaryDTO = (): any => {
      const updatedSecretaryDTO = JSON.parse(currentItem.NoteSecretaryDTO).map(
        (each: any) => {
          return { ...each, noteId: id, createdBy: each.Author };
        }
      );
      console.log(updatedSecretaryDTO);
      return updatedSecretaryDTO;
    };

    await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(id)
      .update({
        Title: requesterNo,
        NoteSecretaryDTO: JSON.stringify(getUpdatedNoteSecretaryDTO()),

        // NoteApproversDTO:JSON.stringify(this._getNewUpdatedNoteApproverDTO(this.state.peoplePickerData,this.state.peoplePickerApproverData))
      })
      .then((data) => console.log(data, "data"));
    console.log(requesterNo);
    // eslint-disable-next-line no-void
    await this.createFolder(requesterNo);
  }

  public _folderNameGenerate(id: any): any {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `DEP/${currentyear}-${nextYear}/C${id}`;
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }

  private handleNoteToFileChange = (files: File[], typeOfDoc: string) => {
    console.log(typeOfDoc, files);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }

    if (this.state.isWarningNoteToFiles) {
      this.setState({ isWarningNoteToFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   noteTofiles: [...prev.noteTofiles, ...filesArray],
      // }));
      this.setState({ noteTofiles: [...filesArray] });
    }
  };

  private handleSupportingFileChange = (files: File[], typeOfDoc: string) => {
    console.log(typeOfDoc);
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }

    if (this.state.isWarningSupportingDocumentFiles) {
      this.setState({ isWarningSupportingDocumentFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   supportingDocumentfiles: [
      //     ...prev.supportingDocumentfiles,
      //     ...filesArray,
      //   ],
      // }));
      this.setState({ supportingDocumentfiles: [...filesArray] });
    }
  };

  private handleWordDocumentFileChange = (files: File[], typeOfDoc: string) => {
    console.log(typeOfDoc, files);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
    }

    if (this.state.isWarningWordDocumentFiles) {
      this.setState({ isWarningWordDocumentFiles: false });
    }

    if (files) {
      console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   wordDocumentfiles: [...prev.wordDocumentfiles, ...filesArray],
      // }));
      this.setState({ wordDocumentfiles: [...filesArray] });
    }
  };

  public handleDialogBox = (): void => {
    console.log("Dialog handling");
    this.setState({ isDialogHidden: true });
  };

  public handleApproverOrReviewerDialogBox = (): void => {
    console.log("Dialog handling");
    this.setState({ isApproverOrReviewerDialogHandel: true });
  };

  public checkUserIsIBTes2 = (
    peoplePickerData: any,
    peoplePickerApproverData: any
  ): boolean => {
    // console.log(peoplePickerData)
    const allData = [...peoplePickerData, ...peoplePickerApproverData];
    const booleanCheck = allData?.some((each: any) => {
      if (each.text === "IB Test1" || "IB Test3") {
        return true;
      }
    });
    // console.log(booleanCheck)
    return booleanCheck;
  };

  private onTextChange = (newText: string) => {
    // this.properties.myRichText = newText;
    console.log(newText);
    this.setState({ draftResolutionFieldValue: newText });
    return newText;
  };

  // Method to show the cancel confirmation dialog
  private handleShowCancelDialog = () => {
    this.setState({ showCancelDialog: true });
  };

  // Existing handleCancel logic
  private handleCancel = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    try {
      const updateAuditTrail = await this._getAuditTrail(statusFromEvent);
      console.log(updateAuditTrail);

      const itemToUpdate = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
          AuditTrail: updateAuditTrail,
        });

      console.log(itemToUpdate);
      // Close the dialog after successful cancellation
      this.setState({ showCancelDialog: false });
      this.setState({ isVisibleAlter: true });
    } catch (error) {
      console.error("Error updating the item:", error);
      // Handle error, possibly show notification
    }
  };

  // Method to handle confirmation of cancellation
  private handleConfirmCancel = async () => {
    await this.handleCancel("Cancelled", "300"); // Call with appropriate parameters
  };

  public _closeDialogAlter = () => {
    this.setState({ isVisibleAlter: false });
  };

  private onRenderCaretDowncommitteeNameFeildValue = (): JSX.Element => {
    return this.state.committeeNameFeildValue ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ committeeNameFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ committeeNameFeildValue: "" });
        }}
      />
    );
  };

  private onRenderCaretDownnatureOfNoteFeildValue = (): JSX.Element => {
    return this.state.natureOfNoteFeildValue ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ natureOfNoteFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ natureOfNoteFeildValue: "" });
        }}
      />
    );
  };

  private onRenderCaretDowNatureOfApprovalOrSanctionFeildValue = (): JSX.Element => {
    return this.state.natureOfApprovalOrSanctionFeildValue ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ natureOfApprovalOrSanctionFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ natureOfApprovalOrSanctionFeildValue: "" });
        }}
      />
    );
  };

  private onRenderCaretDowNoteTypeFeildValue = (): JSX.Element => {
    return this.state.noteTypeFeildValue ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ noteTypeFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ noteTypeFeildValue: "" });
        }}
      />
    );
  };

  private onRenderCaretDownTypeOfFinancialNoteFeildValue = (): JSX.Element => {
    return this.state.typeOfFinancialNote ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ natureOfNoteFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ natureOfNoteFeildValue: "" });
        }}
      />
    );
  };

  private onRenderCaretDownPurpoesFeildValue = (): JSX.Element => {
    return this.state.puroposeFeildValue ? (
      <Icon
        iconName="Cancel"
        onClick={() => {
          this.setState({ puroposeFeildValue: "" });
        }}
      />
    ) : (
      <Icon
        iconName="ChevronDown"
        onClick={() => {
          this.setState({ puroposeFeildValue: "" });
        }}
      />
    );
  };

  public render(): React.ReactElement<IFormProps> {
    console.log(this.state);
    console.log(this.props.formType, "Type of Form");
    console.log(this._formType === "view");
    // console.log(this.state.peoplePickerData, "Data..........PeoplePicker");
    // console.log(this.checkUserIsIBTes2(this.state.peoplePickerData))

    // console.log(
    //   this.state.peoplePickerData,
    //   "Data..........Reviewer PeoplePicker"
    // );
    // console.log(
    //   this.state.peoplePickerApproverData,
    //   "Data..........Approver PeoplePicker"
    // );

    return (
      // <ThemeProvider theme={customTheme}>
      <div>
        {this.state.isLoading ? (
          // <Stack
          //   tokens={stackTokens}
          //   style={{ height: "100vh", width: "100", border: "1px solid red" }}
          //   horizontalAlign="center"
          //   verticalAlign="center"
          // >
          <div
          // tokens={stackTokens}
          // style={{
          //   // height: "100vh",
          //   // width:'100vw',
          //   // display: "flex",
          //   // justifyContent: "center",
          //   // alignItems: "center",
          // }}
          >
            <Spinner
              label="Wait, wait..."
              ariaLive="assertive"
              // labelPosition="right"
            />
          </div>
        ) : (
          // </Stack>
          <div className={styles.form}>
            {/* <Header /> */}
            <Title
              itemId={this._itemId}
              formType={this._formType}
              propPaneformType={this.props.formType}
              statusOfRequest={this.state.status}
            />
            {/* {this.state.isDialogHidden&&<MyDialog  />} */}

            {/* success  dialog */}
            <SuccessDialog
              statusOfReq={this.state.status}
              isVisibleAlter={this.state.isVisibleAlter}
              onCloseAlter={this._closeDialogAlter}
            />
            {/* success  dialog */}
            <MyDialog
              hidden={this.state.isDialogHidden}
              data={this.state.eCommitteData}
              handleDialogBox={this.handleDialogBox}
            />
            <ApproverOrReviewerDialog
              hidden={this.state.isApproverOrReviewerDialogHandel}
              handleDialogBox={this.handleApproverOrReviewerDialogBox}
            />

            {/* Render the ConfirmationDialog component */}
            {/* <ConfirmationDialog
              isConfirmationDialogVisible={
                this.state.isConfirmationDialogVisible
              }
              isSuccessDialogVisible={this.state.isSuccessDialogVisible}
              onConfirm={this.handleConfirmSubmit}
              onCancel={this.handleCancelDialog}
              onCloseSuccessDialog={this.handleSuccessDialogClose}
            /> */}

<ConfirmationDialog
          hidden={!this.state.isConfirmationDialogVisible}
          onConfirm={this.handleConfirmSubmit} // Action when "Yes" is clicked
          onCancel={this.handleCancelDialog} // Action when "No" is clicked
          title="Submit Confirmation"
          subText="Are you sure you want to submit the form?"
        />

            {/* Use the DraftSuccessDialog component */}
            <DraftSuccessDialog
              hidden={!this.state.showDialog}
              onClose={() => this.setState({ showDialog: false })} // Close the dialog
            />

            {/* Use the CancelConfirmationDialog component */}
            <CancelConfirmationDialog
              hidden={!this.state.showCancelDialog}
              onConfirm={this.handleConfirmCancel} // Call handleConfirmCancel on confirm
              onCancel={() => this.setState({ showCancelDialog: false })} // Close the cancel dialog
            />

            {/* General Section */}
            <Stack>
              <div
                className={`${styles.generalSectionMainContainer}`}
                style={{ flexGrow: 1, margin: "10 10px" }}
              >
                <h1
                className={styles.sectionContainer}
                
                >
                  General Section
                </h1>
              </div>
            </Stack>

            <div
              className={`${styles.generalSection}`}
              style={{
                flexGrow: 1,
                margin: "10 10px",
                boxSizing: "border-box",
              }}
            >
              {/* <div className={`${styles.generalSectionContainer1}`}> */}
              {/* Department Sub Section */}
              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                Department<span className={styles.warning}>*</span>
                <h4 style={{margin:'5px', marginLeft: "20px" }}>{this.state.department}</h4>
              </div>
              {/* Committee Name Sub Section */}
              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                <Dropdown
                  placeholder="Select an option"
                  
                  label={
                    <label>
                      Committee Name
                      <SpanComponent />
                    </label>
                  }
                  options={this.state.committename}
                  selectedKey={this.state.committeeNameFeildValue}
                  onChange={this.handleCommittename}
                  onRenderCaretDown={() =>
                    this.onRenderCaretDowncommitteeNameFeildValue()
                  }
                  styles={{
                    dropdown: {
                      // width: 300,
                      borderRadius: "0px",
                      fontSize: "16px",
                      // fontFamily: 'Poppins',
                      border:
                        this.state.isWarningCommitteeName &&
                        this.state.committeeNameFeildValue === ""
                          ? "2px solid red"
                          : "none",
                    },
                  }}
                />
              </div>
              {/* Subject Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                <label style={{display:'block', fontWeight: "600",marginBottom:'5px' }}>
                  Subject <SpanComponent />
                </label>
                <textarea style={{display:'block',padding:'2px', height: '32px',boxSizing:'border-box',width:'100%' , border: this.state.isWarningSubject
                        ? "2px solid red"
                        : "1px solid black",}}  value={this.state.subjectFeildValue}
                  onChange={this.handleSubjectChange}></textarea>
                {/* <TextField onChange={this.handleSubject} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} /> */}
                
              </div>
              {/* <TextField multiline rows={1} styles={{ fieldGroup:  { height: '20px',width:'100%' }, field: { height: '100%' } }} /> */}
              {/* Nature of Note Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                
                <Dropdown
                  placeholder="Select nature of note"
                  // label="Nature of Note"
                  label={
                    <label>
                      Nature of Note
                      <SpanComponent />
                    </label>
                  }
                  options={this.state.natureOfNote}
                  selectedKey={this.state.natureOfNoteFeildValue}
                  onChange={this.handleNatureOfNoteChange}
                  onRenderCaretDown={() =>
                    this.onRenderCaretDownnatureOfNoteFeildValue()
                  }
                  styles={{
                    dropdown: {
                      borderRadius: "0px",
                      fontSize: "16px",
                      // fontFamily: 'Poppins',
                      border:
                        this.state.isWarningNatureOfNote &&
                        this.state.natureOfNoteFeildValue === ""
                          ? "2px solid red"
                          : "none",
                    },
                  }}
                />
              </div>

              {/* Nature of Approval/Sanction Sub Section */}
              {this.state.natureOfNoteFeildValue === "Approval" ||
              this.state.natureOfNoteFeildValue === "Sanction" ? (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  <Dropdown
                    placeholder="Select an approval or sanction type"
                    // label="Nature of Approval or Sanction"
                    label={
                      <label>
                        Nature of Approval/Sanction
                        <SpanComponent />
                      </label>
                    }
                    options={this.state.natureOfApprovalSancation}
                    onRenderCaretDown={() =>
                      this.onRenderCaretDowNatureOfApprovalOrSanctionFeildValue()
                    }
                    selectedKey={
                      this.state.natureOfApprovalOrSanctionFeildValue
                    }
                    onChange={this.handleNatureOfApprovalOrSanctionChange}
                    styles={{
                      dropdown: {
                        border:
                          this.state.isWarningNatureOfApporvalOrSanction &&
                          this.state.natureOfApprovalOrSanctionFeildValue === ""
                            ? "1px solid red"
                            : "1px solid rgb(211, 211, 211)",
                        borderRadius: "0px",
                        fontSize: "16px",
                        // fontFamily: 'Poppins',
                      },
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/*  Note Type Sub Section */}
              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
               
                <Dropdown
                  placeholder="Select a note type"
                  
                  label={
                    <label>
                    Note Type
                    <SpanComponent />
                  </label>
                  }
                  options={this.state.noteType}
                  selectedKey={this.state.noteTypeFeildValue}
                  onChange={this.handleNoteTypeChange}

                  onRenderCaretDown={() =>
                    this.onRenderCaretDowNoteTypeFeildValue()
                  }
                  styles={{
                    dropdown: {
                      border:
                        this.state.isWarningNoteType &&
                        this.state.noteTypeFeildValue === ""
                          ? "1px solid red"
                          : "1px solid rgb(211, 211, 211)",
                      borderRadius: "0px",
                      fontSize: "16px",
                      // fontFamily: 'Poppins',
                    },
                  }}
                />
              </div>
              {/*  Type of Financial Note Sub Section */}
              {this.state.noteTypeFeildValue === "Financial" && (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  
                  <Dropdown
                    placeholder="Select a financial note"
                    label={
                      <label>
                      Type of Financial Note
                      <SpanComponent />
                    </label>
                    }
                   
                    options={this.state.typeOfFinancialNote}
                    selectedKey={this.state.typeOfFinancialNoteFeildValue}
                    onRenderCaretDown={() =>
                      this.onRenderCaretDownTypeOfFinancialNoteFeildValue()
                    }
                    onChange={this.handleTypeOfFinancialNote}
                    styles={{
                      dropdown: {
                        border: `1px solid ${
                          this.state.isWarningTypeOfFinancialNote &&
                          !this.state.typeOfFinancialNoteFeildValue
                            ? "red"
                            : "rgb(211, 211, 211)"
                        }`,
                        borderRadius: "0px",
                      },
                    }}
                  />
                </div>
              )}
              {/* {this.state.isTypeOfFinacialNote? 
            <div className={styles.halfWidth} style={{ margin: '4px', marginTop: '18px' }}>
              <label>
                Type of Financial Note<SpanComponent />
              </label>
              <DropDownList
                     data={this.state.typeOfFinancialNote} // This should be an array of objects with `text` and `value` properties
                // textField="text"  // The field from data items to display in the dropdown
                // dataItemKey="value"  // The field from data items to use as the key
                onChange={this.handleTypeOfFinancialNote}
                // value={this.state.noteTypeValue}  // Assuming noteTypeValue is an object with a `value` field
                style={{ border: '1px solid rgb(211, 211, 211)', borderRadius: '8px' }}  // Inline styles
              />
               {this.state.isWarning?<AlertComponent/>:''}
            </div>:""} */}

              {/*  Search Text Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "18px" }}
              >
                <label style={{display:'block', fontWeight: "600",marginBottom:'5px' }}>
                  Search Text
                  <SpanComponent />
                </label>
                {/* <TextField onChange={this.handleSearchText} styles={{ fieldGroup: { borderRadius: '8px', border: '1px solid rgb(211, 211, 211)' } }} /> */}
                <textarea style={{display:'block',padding:'2px', height: '32px',boxSizing:'border-box',width:'100%' , border: this.state.isWarningSubject
                        ? "2px solid red"
                        : "1px solid black",}}
                  rows={
                    this.state.isWarningSearchText &&
                    !this.state.searchTextFeildValue
                      ? 3
                      : 1
                  } // Adjust rows based on warning state
                  value={this.state.searchTextFeildValue}
                  onChange={this.handleSearchTextChange}
                  
                />
              </div>

              {/* Amount Sub Section */}
              {this.state.noteTypeFeildValue === "Financial" && (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  <label style={{display:'block', fontWeight: "600",marginBottom:'5px' }}>
                    Amount
                    <SpanComponent />
                  </label>
                  <textarea style={{display:'block',padding:'2px', height: '32px',boxSizing:'border-box',width:'100%' , border: this.state.isWarningSubject
                        ? "2px solid red"
                        : "1px solid black",}}
                    onChange={this.handleAmountChange}
                    value={this.state.amountFeildValue}
                   
                  />
                </div>
              )}
              {/* {this.state.isAmountVisable ? (
            <div
              className={styles.halfWidth}
              style={{ margin: "4px", marginTop: "18px" }}
            >
              <label style={{ fontWeight: "600" }}>
                Amount
                <SpanComponent />
              </label>

              <TextBox onChange={this.handleAmount} />
              
            </div>
          ) : (
            ""
          )} */}

              {/* Purpose Sub Section */}

              {this.state.isPuroposeVisable &&
             ( this.state.natureOfNoteFeildValue === "Approval" ||
              this.state.natureOfNoteFeildValue === "Information" ? (
                this.state.natureOfNoteFeildValue === "Approval" ? (
                  <div
                    className={styles.halfWidth}
                    style={{ margin: "4px", marginTop: "18px" }}
                  >
                   
                    <Dropdown
                      placeholder="Select a purpose"
                     
                      label={
                        <label>
                        Purpose
                        <SpanComponent />
                      </label>
                      }
                      options={this.state.purpose.slice(0, 4)}
                      selectedKey={this.state.puroposeFeildValue}
                      onChange={this.handlePurposeDropDown}
                      onRenderCaretDown={() =>
                        this.onRenderCaretDownPurpoesFeildValue()
                      }
                      styles={{
                        dropdown: {
                          border: `1px solid ${
                            this.state.isWarningPurposeField &&
                            !this.state.noteTypeFeildValue
                              ? "red"
                              : "rgb(211, 211, 211)"
                          }`,
                          borderRadius: "0px",
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className={styles.halfWidth}
                    style={{ margin: "4px", marginTop: "18px" }}
                  >
                    
                    <Dropdown
                      placeholder="Select a purpose"
                      label={
                        <label>
                        Purpose
                        <SpanComponent />
                      </label>
                      }
                      options={this.state.purpose.slice(4)} // Slice starting from index 4 to get remaining items
                      selectedKey={this.state.puroposeFeildValue}
                      onChange={this.handlePurposeDropDown}
                      onRenderCaretDown={() =>
                        this.onRenderCaretDownPurpoesFeildValue()
                      }
                      styles={{
                        dropdown: {
                          border: `1px solid ${
                            this.state.isWarningPurposeField &&
                            !this.state.puroposeFeildValue
                              ? "red"
                              : "rgb(211, 211, 211)"
                          }`,
                          borderRadius: "0px",
                        },
                      }}
                    />
                  </div>
                )
              ) : (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  <label style={{display:'block', fontWeight: "600",marginBottom:'5px' }}>
                    Purpose
                    <SpanComponent />
                  </label>
                  <textarea style={{display:'block',padding:'2px', height: '32px',boxSizing:'border-box',width:'100%' , border: this.state.isWarningSubject
                        ? "2px solid red"
                        : "1px solid black",}}
                    rows={
                      this.state.isWarningPurposeField &&
                      !this.state.puroposeFeildValue
                        ? 3
                        : 1
                    }
                    value={this.state.puroposeFeildValue}
                    onChange={this.handlePurposeChange}
                   
                  />
                </div>
              ))
              }
              {this.state.natureOfNoteFeildValue === "Approval" &&
              this.state.puroposeFeildValue === "Others" ? (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "18px" }}
                >
                  <label style={{ fontWeight: "600" }}>
                    others
                    <SpanComponent />
                  </label>
                  <TextField
                    multiline
                    rows={
                      this.state.isWarningPurposeField &&
                      !this.state.othersFieldValue
                        ? 3
                        : 1
                    }
                    value={this.state.othersFieldValue}
                    onChange={this.handleOthersChange}
                    styles={{
                      fieldGroup: {
                        border: this.state.isWarningPurposeField  &&
                        !this.state.othersFieldValue
                          ? "2px solid red"
                          : "1px solid red", // Apply red border if in warning state
                        borderRadius: "0px",
                      },
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              {/* </div> */}
            </div>

            {/* Approver Details Section */}
            <div
              className={`${styles.generalSectionMainContainer}`}
              style={{ flexGrow: 1, margin: "10 10px" }}
            >
              <h1
               className={styles.sectionContainer}
               
              >
                Approver Details
              </h1>
            </div>
            <div
              className={`${styles.generalSectionApproverDetails}`}
              style={{ flexGrow: 1, margin: "10 10px" }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <PeoplePicker
                      placeholder="Reviewer Details"
                      context={this._peopplePicker}
                      // titleText="People Picker"
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      defaultSelectedUsers={[""]}
                      disabled={false}
                      ensureUser={true}
                      onChange={this._getPeoplePickerItems}
                      // showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
                    />
                    {/* <PeoplePicker /> */}
                    <DefaultButton
                      style={{ marginTop: "0px", marginLeft: "6px" }}
                      type="button"
                      className={`${styles.responsiveButton}`}
                      onClick={(e) => this.handleOnAdd(e, "reveiwer")}
                      iconProps={{ iconName: "Add" }}
                    >
                      Add
                    </DefaultButton>
                  </div>
                  <span style={{ color: "blue" }}>
                    (Please enter minimum character to search)
                  </span>
                </div>
              </div>
              {/* <TableComponent /> */}
              <div className={`${styles.tableContainer}`}>
                {/* <TableComponent /> */}
               

<DetailsListDragDropExample
                      data={this.state.peoplePickerData}
                      reOrderData={this.reOrderData}
                      removeDataFromGrid={this.removeDataFromGrid}
                      type="Reviewer"
                    />

                {/* <MultiComboBoxTable/>/ */}
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <PeoplePicker
                      placeholder="Approver Details"
                      context={this._peopplePicker}
                      // titleText="People Picker"
                      personSelectionLimit={1}
                      groupName={""} // Leave this blank in case you want to filter from all users
                      showtooltip={true}
                      defaultSelectedUsers={[""]}
                      disabled={false}
                      ensureUser={true}
                      onChange={this._getPeoplePickerItemsApporvers}
                      // showHiddenInUI={false}
                      principalTypes={[PrincipalType.User]}
                      resolveDelay={1000}
                    />
                    {/* <PeoplePicker /> */}
                    <DefaultButton
                      style={{ marginTop: "0px", marginLeft: "6px" }}
                      type="button"
                      className={`${styles.responsiveButton}`}
                      onClick={(e) => this.handleOnAdd(e, "approver")}
                      iconProps={{ iconName: "Add" }}
                    >
                      Add
                    </DefaultButton>
                  </div>
                  <span style={{ color: "blue" }}>
                    (Please enter minimum character to search)
                  </span>
                </div>
              </div>
              <div className={`${styles.tableContainer}`}>
              <DetailsListDragDropExample
                        data={this.state.peoplePickerApproverData}
                        reOrderData={this.reOrderData}
                        removeDataFromGrid={this.removeDataFromGrid}
                        type="Approver"
                      />
              </div>
            </div>

            {/* Draft Resoultion Section */}
            {this.props.formType === "BoardNoteNew" && (
              <div style={{ flexGrow: 1, margin: "10 10px" }}>
                <div className={`${styles.generalSectionMainContainer}`}>
                  <h1
                    className={styles.sectionContainer}
                  >
                    Draft Resoultion
                  </h1>
                </div>
                <div className={`${styles.generalSectionApproverDetails}`}>
                  <div className={styles.richTextContainer}>
                    <RichText
                      value={this.state.draftResolutionFieldValue}
                      onChange={(text) => this.onTextChange(text)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/*  File Attachments Section */}
            <div
              className={`${styles.generalSectionMainContainer}`}
              style={{ flexGrow: 1, margin: "10 10px" }}
            >
              <h1
               className={styles.sectionContainer}
                
              >
                File Attachments
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexGrow: 1,
                margin: "10 10px",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
              className={`${styles.generalSectionApproverDetails}`}
            >
              <div className={`${styles.fileInputContainers}`}>
                <p className={styles.label} style={{ margin: "0px" }}>
                  Note PDF<span className={styles.warning}>*</span>
                </p>
                {this.state.isWarningNoteToFiles ? (
                  this.state.noteTofiles.length > 0 ? (
                    <div style={{ width: "100%", margin: "0px" }}>
                      <UploadFileComponent
                        typeOfDoc="notePdF"
                        onChange={this.handleNoteToFileChange}
                        accept=".pdf"
                        multiple={false}
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                        data={this.state.noteTofiles}
                        // value={this.state.noteTofiles}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        border: "1px solid red",
                        margin: "0px",
                      }}
                    >
                      <UploadFileComponent
                        typeOfDoc="notePdF"
                        onChange={this.handleNoteToFileChange}
                        accept=".pdf"
                        multiple={false}
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                        data={this.state.noteTofiles}
                        // value={this.state.noteTofiles}
                      />
                    </div>
                  )
                ) : (
                  <div style={{ width: "100%", margin: "0px" }}>
                    <UploadFileComponent
                      typeOfDoc="notePdF"
                      onChange={this.handleNoteToFileChange}
                      accept=".pdf"
                      multiple={false}
                      maxFileSizeMB={10}
                      maxTotalSizeMB={10}
                      data={this.state.noteTofiles}
                      // value={this.state.noteTofiles}
                    />
                  </div>
                )}

                <p
                  className={styles.message}
                  style={{ textAlign: "right", margin: "0px" }}
                >
                  Allowed only one PDF. Up to 10MB max.
                </p>
              </div>

              {this.state.noteSecretaryDetails.length > 0 ? (
                <div className={`${styles.fileInputContainers}`}>
                  <p className={styles.label} style={{ margin: "0px" }}>
                    Word Document <span className={styles.warning}>*</span>
                  </p>
                  {this.state.isWarningWordDocumentFiles ? (
                    this.state.wordDocumentfiles.length > 0 ? (
                      <div style={{ width: "100%", margin: "0px" }}>
                        <UploadFileComponent
                          typeOfDoc="Word Document"
                          onChange={this.handleWordDocumentFileChange}
                          accept=".doc,.docx"
                          multiple={false}
                          maxFileSizeMB={10}
                          maxTotalSizeMB={10}
                          data={this.state.wordDocumentfiles}
                          // value={this.state.wordDocumentfiles}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          border: "1px solid red",
                          margin: "0px",
                        }}
                      >
                        <UploadFileComponent
                          typeOfDoc="Word Document"
                          onChange={this.handleWordDocumentFileChange}
                          accept=".doc,.docx"
                          multiple={false}
                          maxFileSizeMB={10}
                          maxTotalSizeMB={10}
                          data={this.state.wordDocumentfiles}
                          // value={this.state.wordDocumentfiles}
                        />
                      </div>
                    )
                  ) : (
                    <div style={{ width: "100%", margin: "0px" }}>
                      <UploadFileComponent
                        typeOfDoc="Word Document"
                        onChange={this.handleWordDocumentFileChange}
                        accept=".doc,.docx"
                        multiple={false}
                        maxFileSizeMB={10}
                        maxTotalSizeMB={10}
                        data={this.state.wordDocumentfiles}
                        // value={this.state.wordDocumentfiles}
                      />
                    </div>
                  )}

                  <p className={styles.message} style={{ margin: "0px" }}>
                    Allowed Formats (doc,docx only) Upto 10MB max.
                  </p>
                </div>
              ) : (
                ""
              )}

              <div className={`${styles.fileInputContainers}`}>
                <p className={styles.label} style={{ margin: "0px" }}>
                  Supporting Documents
                </p>
                {this.state.isWarningSupportingDocumentFiles ? (
                  <div
                    style={{
                      width: "100%",
                      border: "1px solid red",
                      margin: "0px",
                    }}
                  >
                    <UploadFileComponent
                      typeOfDoc="supportingDocument"
                      onChange={this.handleSupportingFileChange}
                      accept=".xlsx,.pdf,.doc,.docx"
                      multiple={true}
                      maxFileSizeMB={25}
                      maxTotalSizeMB={25}
                      data={this.state.supportingDocumentfiles}
                      // value={this.state.supportingDocumentfiles}
                    />
                  </div>
                ) : (
                  <div style={{ width: "100%", margin: "0px" }}>
                    <UploadFileComponent
                      typeOfDoc="supportingDocument"
                      onChange={this.handleSupportingFileChange}
                      accept=".xlsx,.pdf,.doc,.docx"
                      multiple={true}
                      maxFileSizeMB={25}
                      maxTotalSizeMB={25}
                      data={this.state.supportingDocumentfiles}
                      // value={this.state.supportingDocumentfiles}
                    />
                  </div>
                )}

                <p className={styles.message} style={{ margin: "0px" }}>
                  Allowed Formats (pdf,doc,docx,xlsx only) Upto 25MB max.
                </p>
              </div>
            </div>
            {/*  Buttons Section */}

            <div
              style={{
                margin: "10px 0px",
                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              {this._itemId && this.state.status !== "Returned" ? (
                <PrimaryButton
                  type="button"
                  className={`${styles.responsiveButton}`}
                  iconProps={{ iconName: "Save" }}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault()
                    this.handleSubmit( "Draft");
                  }}
                >
                  Save as Draft
                </PrimaryButton>
              ) : this.state.status === "Returned" ? (
                <PrimaryButton
                  type="button"
                  className={styles.responsiveButton} // Use the CSS module
                  iconProps={{ iconName: "Cancel" }}
                  onClick={this.handleShowCancelDialog} // Show the cancel dialog
                >
                  Cancel
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  type="button"
                  className={`${styles.responsiveButton}`}
                  iconProps={{ iconName: "Save" }}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault()
                    this.handleSubmit( "Draft");
                  }}
                >
                  Save as Draft
                </PrimaryButton>
              )}
              {this._itemId ? (
                <PrimaryButton
                  type="button"
                  className={`${styles.responsiveButton}`}
                  onClick={this.handleUpdate}
                  iconProps={{ iconName: "Send" }}
                >
                  Edit Submit
                </PrimaryButton>
              ) : (
                <PrimaryButton
                  type="button"
                  className={`${styles.responsiveButton}`}
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => {
                    e.preventDefault()
                    this.showDialog()
                    // this.handleSubmit( "Submitted");
                  }}
                  iconProps={{ iconName: "Send" }}
                >
                  Submit
                </PrimaryButton>
              )}

              <DefaultButton
                // type="button"
                className={`${styles.responsiveButton} `}
                iconProps={{ iconName: "Cancel" }}
              >
                Exit
              </DefaultButton>
            </div>
            {/* <ul>
            {this.state.files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul> */}
          </div>
        )}
        {/* <div>
          {data.map((section: any, index: any) => (
            <ExpandableList
              key={index}
              title={section.title}
              content={section.content}
            />
          ))}
        </div> */}
        {/* <PdfViewer pdfUrl="https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB"/> */}
      </div>

      // </ThemeProvider>
    );
  }
}
