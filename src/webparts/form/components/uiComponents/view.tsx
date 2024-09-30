/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
import * as React from "react";
import { IViewFormProps } from "../IViewFormProps"; // Ensure this file exists
import { IDropdownOption } from "office-ui-fabric-react";
import {
  Stack,
  IconButton,
  Text,
  PrimaryButton,
  DefaultButton,
  IColumn,
  DetailsList,
  SelectionMode,
  Dialog,
  DialogFooter,
} from "@fluentui/react";
import styles from "../Form.module.scss";
// import DraggableTable from "./draggableGridKendo/draggableGridKendo";
import ApproverAndReviewerTableInViewForm from "./simpleTable/reviewerAndApproverTableInViewForm";
import CommentsLogTable from "./simpleTable/commentsTable";
import WorkFlowLogsTable from "./simpleTable/workFlowLogsTable";
import FileAttatchmentTable from "./simpleTable/fileAttatchmentsTable";
// import PDFView from "../pdfVeiwer/pdfVeiwer";
// import PDFViews from "../pdfVeiwer/pdfreact";
//spinner related
// import WebViewer from "../comPdfKit/comPdfKit";

import { Spinner } from "@fluentui/react/lib/Spinner";
// import AdobePdfWebPart from "../../../adobePdf/AdobePdfWebPart";
import AdobePdfViewer from "../adobe/adobepdf";
import { DialogBlockingExample } from "./dialogFluentUi/dialogFluentUi";
import { format } from "date-fns";
// import PdfViewer from "../pdfVeiwer/pdfreact";
import GeneralCommentsFluentUIGrid from "./simpleTable/generalComment";
import UploadFileComponent from "./uploadFile";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { v4 } from "uuid";
import { ATRAssignee } from "./ATR/atr";
// import PSPDFKitViewer from "../psdpdfKit/psdPDF";
// import PnPPeoplePicker from "./peoplePicker/peoplePicker";
// import PnPPeoplePicker2 from "./peoplePicker/people";
// import { WebPartContext } from "@microsoft/sp-webpart-base";
// import { WebPartContext } from "@microsoft/sp-webpart-base";

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

export interface IViewFormState {
  title: string;
  expandSections: { [key: string]: boolean };
  pdfLink: string;
  isLoading: boolean;
  department: string;
  noteTypeValue?: IDropdownOption;
  isNoteType: boolean;
  new: string;
  itemsFromSpList: any[];
  getAllDropDownOptions: any;
  natureOfNote: string[];
  natureOfApprovalSancation: string[];
  committename: string[];
  typeOfFinancialNote: string[];
  noteType: string[];
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
  searchTextFeildValue: string | number | readonly string[];
  amountFeildValue: string | number | readonly string[];
  puroposeFeildValue: string | number | readonly string[];
  // eslint-disable-next-line @rushstack/no-new-null
  notePdfFile: File | null;
  // eslint-disable-next-line @rushstack/no-new-null
  supportingFile: File | null;
  isWarning: boolean;
  isWarningCommittteeName: boolean;
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

  supportingFilesInViewForm: any[];

  isWarningPeoplePicker: boolean;
  isDialogHidden: boolean;
  isApproverOrReviewerDialogHandel: boolean;

  peoplePickerData: any;
  peoplePickerApproverData: any;
  approverInfo: any;
  reviewerInfo: any;

  status: string;
  statusNumber: any;
  auditTrail: any;
  filesClear: any;
  createdByEmail: any;
  ApproverDetails: any;
  ApproverOrder: any;
  ApproverType: any;

  dialogFluent: any;
  dialogDetails: any;

  commentsData: any;
  currentApprover: any;
  pastApprover: any;
  referredFromDetails: any;
  refferredToDetails: any;
  noteReferrerDTO: any;

  noteSecretaryDetails:any;
  secretaryGistDocs:any[];

  atrCreatorsList:any;
  atrGridData:any;


  // reject and return dialog box 
  isDialogVisible:any;
  dialogContent:any;


  draftResolutionFieldValue: any;
}

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

export default class ViewForm extends React.Component<
  IViewFormProps,
  IViewFormState
> {
  // private _userName: string = _getUserDetails();
  private _itemId: number = Number(getIdFromUrl());
  private _currentUserEmail = this.props.context.pageContext.user.email;

  // private _currentUserEmail ="ib.test4@xencia.com";
  // private _currentUserEmail ="Manidhar.j@xencia.com";
  // private _currentUserEmail ="ib.test2@xencia.com";
  // private _currentUserEmail ="Nandu.krishna@xencia.com";
  private _formType: string = getFromType();
  private _absUrl: any = this.props.context.pageContext.web.serverRelativeUrl;
  private _folderName: string = `${this._absUrl}/${
    this.props.libraryId
  }/${this._folderNameGenerate(this._itemId)}`;

  constructor(props: IViewFormProps) {
    super(props);
    this.state = {
      title: "",
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
      amountFeildValue: 0,
      puroposeFeildValue: "",
      notePdfFile: null,
      supportingFile: null,
      isWarning: false,
      isWarningCommittteeName: false,
      isWarningSubject: false,
      isWarningNatureOfNote: false,
      isWarningNatureOfApporvalOrSanction: false,
      isWarningNoteType: false,
      isWarningTypeOfFinancialNote: false,
      isWarningSearchText: false,
      isWarningAmountField: false,
      isWarningPurposeField: false,
      isWarningPeoplePicker: false,
      eCommitteData: [],
      noteTofiles: [],
      isWarningNoteToFiles: false,

      wordDocumentfiles: [],
      isWarningWordDocumentFiles: false,

      supportingDocumentfiles: [],
      isWarningSupportingDocumentFiles: false,

      supportingFilesInViewForm: [],

      isDialogHidden: true,
      isApproverOrReviewerDialogHandel: true,
      peoplePickerData: [],
      peoplePickerApproverData: [],
      ApproverDetails: [],
      approverInfo: [],
      ApproverType: "",
      reviewerInfo: [],
      status: "",
      statusNumber: null,
      auditTrail: [],
      filesClear: [],
      expandSections: {}, // Keeps track of expanded sections
      pdfLink: "",

      // "https://xencia1.sharepoint.com/sites/XenciaDemoApps/uco/ECommitteeDocuments/AD1-2024-25-C147/Pdf/E0300SBIBZ.pdf",
      //   "https://xencia1.sharepoint.com/sites/XenciaDemoApps/uco/ECommitteeDocuments/AD1-2024-25-C147/SupportingDocument/Export.xlsx?d=w5597c83c4c7744daab598c33704569bc"
      // "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
      createdByEmail: "",
      ApproverOrder: "",
      dialogFluent: true,
      dialogDetails: {},
      commentsData: [],
      currentApprover: [],
      pastApprover: [],
      referredFromDetails: [],
      refferredToDetails: [],
      noteReferrerDTO: [],

      noteSecretaryDetails:[],
      secretaryGistDocs:[],

      atrCreatorsList:[],
      atrGridData:[],

      // reject dialog box 
        isDialogVisible:false,
        dialogContent:{},


      draftResolutionFieldValue: "",
    };
    console.log(this._itemId);
    console.log(this._formType);
    console.log(this.props.context.pageContext.user);
    this._fetchATRCreatorDetails()
    this._getItemData(this._itemId, this._folderName);
    this._getItemDocumentsData();
    
    // this._getUserCountry();
    // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest()
    // console.log(this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest())
  }

  // private _getUserCountry = async () => {
  //   try {
  //     // Get the current user's regional settings
  //   const regionalSettings = await this.props.sp.web.regionalSettings.timeZone.get();

  //   // Log or return the time zone details
  //   console.log("Time Zone Description:", regionalSettings.Description);
  //   console.log("Time Zone ID:", regionalSettings.Id);

  //   return regionalSettings;

  //     // return country;
  //   } catch (error) {
  //     console.error("Error retrieving user profile properties:", error);
  //   }
  // };


  private _fetchATRCreatorDetails = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      
      
      // await this.props.sp.web.lists
      // .getByTitle("ATRCreators")
      // .items()
      console.log(
        await this.props.sp.web.lists
          .getByTitle("ATRCreators")
          .items())


      const atrItems =  (

        (await this.props.sp.web.lists
         .getByTitle("ATRCreators")
         .items.select("*", "Author/Title", "Author/EMail","Editor/Title", "Editor/EMail", "ATRCreators/Title", "ATRCreators/EMail").expand("Author","ATRCreators","Editor")()).map((each: any) => {
           console.log(each);
           // console.log(this._getUserProperties(each.email))

           this.setState({atrCreatorsList:[...this.state.atrCreatorsList,{
            "atrCreatorId": each.ATRCreatorsId,
          "atrCreatorEmail": each.ATRCreators.EMail,
          "atrCreatorEmailName": each.ATRCreators.Title,
          "createdDate": each.Created,
          "createdBy": each.Author.EMail,
          "modifiedDate": each.Modified,
          "modifiedBy": each.Author.EMail,
        "statusMessage": null
           }]})
           return each
         

         })
       )
        
     console.log(atrItems,"Atr Items fetched")
     

    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  };

  public _folderNameGenerate(id: any): any {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `DEP/${currentyear}-${nextYear}/C${id}`;
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }

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

  private _extractValueFromHtml = (htmlString: string): string => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const extractedValue = doc.querySelector("div")?.textContent || "";
    console.log(extractedValue);
    return extractedValue;
  };

  private _getItemData = async (id: any, folderPath: any) => {
    const item: any = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(id)
      .select(
        "*",
        "Author/Title",
        "Author/EMail",
        "Approvers",
        "Approvers/Title",
        "Reviewers/Title",
        "Approvers/EMail",
        "Reviewers/EMail",
        "CurrentApprover/Title",
        "CurrentApprover/EMail"
      )
      .expand("Author", "Approvers", "Reviewers", "CurrentApprover")();

    console.log(`${id} ------Details`, item);
    console.log(folderPath);
    // const folderItem =  await this.props.sp.web.getFolderByServerRelativePath(`${folderPath}/Pdf`)
    // .files().then(res => res);
    // console.log(folderItem)
    console.log(this._getJsonifyReviewer(item.NoteApproversDTO, "Reviewer"));
    console.log(this._getJsonifyApprover(item.NoteApproversDTO, "Approver"));

    this.setState({
      eCommitteData: [
        {
          tableData: [
            item.CommitteeName !== null && {
              column1: "Note Number",
              column2: `${item.Title}`,
            },
            item.CommitteeName !== null && {
              column1: "Requester",
              column2: `${item.Author.Title}`,
            },
            item.Created !== null && {
              column1: "Request Date",
              column2: `${this._formatDateTime(item.Created)}`,
            },
            item.Status !== null && {
              column1: "Status",
              column2: `${item.Status}`,
            },
            item.NoteApproversDTO !== null && {
              column1: "Current Approver",
              column2: `${this._getPendingStatus(
                JSON.parse(item.NoteApproversDTO)
              )}`,
            },
            item.Department !== null && {
              column1: "Department",
              column2: `${item.Department}`,
            },

            item.CommitteeName !== null && {
              column1: "CommitteeName",
              column2: `${item.CommitteeName}`,
            },
            item.Subject !== null && {
              column1: "Subject",
              column2: `${item.Subject}`,
            },
            item.NatureOfNote !== null && {
              column1: "NatureOfNote",
              column2: `${item.NatureOfNote}`,
            },
            item.NoteType !== null && {
              column1: "NoteType",
              column2: `${item.NoteType}`,
            },
            item.NatureOfApprovalOrSanction !== null && {
              column1: "NatuerOfApprovalSanction",
              column2: `${item.NatureOfApprovalOrSanction}`,
            },

            item.FinancialType !== null && {
              column1: "TypeOfFinancialNote",
              column2: `${item.FinancialType}`,
            },
            item.SearchKeyword !== null && {
              column1: "Search Keyword",
              column2: item.SearchKeyword,
            },
            item.Amount !== null && {
              column1: "Amount",
              column2: `${item.Amount}`,
            },
            item.Purpose !== null && {
              column1: "Purpose",
              column2: `${item.Purpose}`,
            },
          ],
        },
      ],
    });
    // const dataApproverInfo =
    //   item.Author.EMail !== this._currentUserEmail &&
    //   this._getApproverOrder(JSON.parse(item.NoteApproversDTO),item.StatusNumber);
    // console.log(dataApproverInfo);
    // console.log(item.CommentsLog);
    // console.log(typeof item.CommentsLog);

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
        item.SearchKeyword !== null
          ? this._extractValueFromHtml(item.SearchKeyword)
          : "",
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
      auditTrail: JSON.parse(item.AuditTrail),
      isLoading: false,
      createdByEmail: item.Author.EMail,
      status: item.Status==="Submitted"?this._getStatus(item.NoteApproversDTO):item.Status,
      statusNumber: item.StatusNumber,
      ApproverDetails: JSON.parse(item.NoteApproversDTO),
      currentApprover: this._getCurrentApproverDetails(
        item.CurrentApprover,
        item.NoteApproversDTO
      ),
      ApproverOrder:
       (item.CurrentApprover && this._getCurrentApproverDetails(
          item.CurrentApprover,
          item.NoteApproversDTO
        )[0].approverOrder),
      ApproverType:
        (item.CurrentApprover &&this._getCurrentApproverDetails(
          item.CurrentApprover,
          item.NoteApproversDTO
        )[0].approverType),

      title: item.Title,
      commentsData:
        item.NoteApproverCommentsDTO !== null
          ? JSON.parse(item.NoteApproverCommentsDTO)
          : [],
      referredFromDetails:
        item.NoteReferrerDTO !== null
          ? this._getReferedFromAndToDetails(item.NoteReferrerDTO, "from")
          : [],
      refferredToDetails:
        item.NoteReferrerDTO !== null
          ? this._getReferedFromAndToDetails(item.NoteReferrerDTO, "to")
          : [],
      

      draftResolutionFieldValue: item.DraftResoultion,
      noteSecretaryDetails:item.NoteSecretaryDTO !== null ?JSON.parse(item.NoteSecretaryDTO):[],
      noteReferrerDTO:
        item.NoteReferrerDTO !== null ? JSON.parse(item.NoteReferrerDTO) : [],
      //   item.CommentsLog && typeof item.CommentsLog === "object"|| "string"
      // ?  []
      // : JSON.parse(item.CommentsLog),

      //don't use this commentsData:item.CommentsLog !== typeof null||'null' ? JSON.parse(item.CommentsLog):[],
    });
  };

  private _getStatus = (e:any):any =>{
    console.log(e)
    e = JSON.parse(e)
    return e[0].mainStatus

  }

  private _getReferedFromAndToDetails = (
    commentsData: any,
    typeOfReferee: any
  ): any => {
    commentsData = JSON.parse(commentsData);
    console.log(commentsData);
    if (typeOfReferee === "to") {
      return commentsData[0].referredTo;
    }
    return commentsData[0].referredFrom;
  };

  private _getCurrentApproverDetails = (
    currentApproverData: any,
    ApproverDetails: any
  ): any => {
    ApproverDetails = JSON.parse(ApproverDetails);
    console.log(currentApproverData);

    if (currentApproverData) {
      const filterApproverData = ApproverDetails.filter((each: any) => {
        console.log(each);
        if ((each.email || each.approverEmail) === currentApproverData.EMail) {
          return { ...each, ...currentApproverData };
        }
      });
      console.log(filterApproverData);

      return filterApproverData;
    }
    return null;
  };

  private _formatDateTime = (date: string | number | Date) => {
    const formattedDate = format(new Date(date), "dd-MMM-yyyy");
    const formattedTime = format(new Date(date), "hh:mm a");
    return `${formattedDate} ${formattedTime}`;
  };

  private _checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest =
    (): any => {
      return this.state.ApproverDetails.filter((each: any) => {
        // console.log(each);
        if (
          (each.approverEmail || each.approverEmailName || each.email) ===
          this._currentUserEmail
        ) {
          if (
            each.status === "Refered" &&
            this.state.refferredToDetails[0]?.status === "Refered Back"
          ) {
            switch (each.status) {
              case "Approved":
                console.log(each.status);
                return false;
              case "Rejected":
                console.log(each.status);
                return false;
              case "Refered":
                console.log(each.status);
                return true;
              case "pending":
                console.log(each.status);
                return true;
              case "Refered Back":
                console.log(each.status);
                return true;

              default:
                console.log("default");
                return false;
            }
          } else {
            switch (each.status) {
              case "Approved":
                console.log(each.status);
                return false;
              case "Rejected":
                console.log(each.status);
                return false;
              case "Refered":
                console.log(each.status);
                return false;
              case "pending":
                console.log(each.status);
                return true;
              case "Refered Back":
                console.log(each.status);
                return true;

              default:
                console.log("default");
                return false;
            }
          }
        }
      })[0];

      // const checkItem = this.state.ApproverDetails.filter((each: any) => {
      //   console.log(each);
      //   // console.log( each.approverEmailName)
      //   // console.log(each.approverEmail)
      //   // console.log(each.approverEmail || each.approverEmailName)
      //   // console.log( this._currentUserEmail)
      //   // console.log((each.approverEmail || each.approverEmailName) === this._currentUserEmail)
      //   // console.log(each.status)
      //   // console.log((
      //   //   (each.approverEmail || each.approverEmailName) === this._currentUserEmail &&
      //   //   (each.status === "Approved"||each.status === "Refered"||each.status === "Rejected")
      //   // ))
      //   console.log(each.status === "Approved","Approved" )
      //   console.log(each.status === "Returned" ,"Returned")
      //   console.log(each.status === "Referred Back","Referred Back" )
      //   console.log(each.status === "pending" ,"pending")
      //   console.log(each.status === "Refered","Refered" )
      //   console.log(  (each.status === "Approved" ||each.status === "Returned" ||
      //     (each.status === "Referred Back"||( this.state.refferredToDetails[0]?.status ==="Referred Back")) ||
      //     each.status === "pending" || each.status === 'Refered' ))

      //     console.log(
      //       (each.approverEmail || each.approverEmailName) ===
      //       (this._currentUserEmail &&
      //     (each.status === "Approved" ||each.status === "Returned" ||
      //       (each.status === "Referred Back"||( this.state.refferredToDetails[0]?.status ==="Referred Back")) ||
      //       each.status === "pending" || each.status === 'Refered' ))

      //     )
      //     if (
      //       (each.approverEmail || each.approverEmailName) ===
      //       (this._currentUserEmail &&
      //     (each.status === "Approved" ||each.status === "Returned" ||
      //       (each.status === "Referred Back"||( this.state.refferredToDetails[0]?.status ==="Referred Back")) ||
      //       each.status === "pending" || each.status === 'Refered' ))
      //     ){
      //       return each
      //     }
      //   // return (
      //   //   (each.approverEmail || each.approverEmailName) ===
      //   //     (this._currentUserEmail &&
      //   //   (each.status === "Approved" ||each.status === "Returned" ||
      //   //     (each.status === "Referred Back"||( this.state.refferredToDetails[0]?.status ==="Referred Back")) ||
      //   //     each.status === "pending" || each.status === 'Refered' ))
      //   // );
      // });
      // console.log(checkItem);

      // if (checkItem) {
      //   console.log(checkItem);
      //   // console.log(checkItem.approverEmail);
      //   // console.log(this._currentUserEmail);
      //   // Return or perform actions based on checkItem
      //   return (
      //     (checkItem.approverEmail || checkItem.approverEmailName) ===
      //     this._currentUserEmail
      //   );
      // } else {
      //   // console.log("No matching approver found.");
      //   return null; // Or handle it appropriately
      // }
    };

  // private _getApproverOrder = (data: any,statusNum:any): any => {
  //   console.log(statusNum)
  //   console.log(data)
  //   console.log(statusNum !=='5000' || statusNum !=='6000')
  //   console.log(statusNum !=='5000' || statusNum !=='6000'?statusNum !=='5000':statusNum !=='6000')
  //   console.log(statusNum !=='5000' || statusNum !=='6000'?false:true)
  //   if(statusNum !=='5000' || statusNum !=='6000'?false:true){
  //     const order = data.filter((each: any) => {
     
  //       // console.log(each);
  //       console.log(each.approverEmail);
  //       console.log(this._currentUserEmail);
  //       console.log(each.approverEmail || each.email);
  
  //       console.log(each.approverEmail === this._currentUserEmail);
  
  //       if ((each.approverEmail || each.email) === this._currentUserEmail) {
  //         // console.log(each.approverOrder);
  //         return each;
  //       }
  //     });
  //     console.log(order);
  //     return [order[0].approverOrder, order[0].approverType];

  //   }
  //   else{
  //     return ''
  //   }
   
  // };

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
      // //   const SupportingDocuments = await this.props.sp.web
      // //     .getFolderByServerRelativePath(`EnoteDocuments/AD1-2024-25-415/SupportingDocuments`)
      // //     .files.select("*")
      // //     .expand("Author", "Editor")()
      // //     .then((res) => res);

      // //     console.log(SupportingDocuments)   //testing based on other author name (other than current user)

      console.log(`${this._folderName}/Pdf`);
      const folderItemsPdf = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/Pdf`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      console.log(folderItemsPdf);
      // console.log(folderItemsPdf[0]);
      // this.setState({noteTofiles:[folderItem]})

      const tempFilesPdf: IFileDetails[] = [];
      folderItemsPdf.forEach((values) => {
        tempFilesPdf.push(this._getFileObj(values));
        this.setState({ pdfLink: this._getFileObj(values).fileUrl });
      });

      // console.log(tempFilesPdf);
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
      // console.log(folderItemsWordDocument[0]);

      const tempFilesWordDocument: IFileDetails[] = [];
      folderItemsWordDocument.forEach((values) => {
        tempFilesWordDocument.push(this._getFileObj(values));
      });
      // console.log(tempFilesWordDocument);
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
      // console.log(SupportingDocument[0]);

      const tempFilesSupportingDocument: IFileDetails[] = [];
      SupportingDocument.forEach((values) => {
        tempFilesSupportingDocument.push(this._getFileObj(values));
      });
      // console.log(tempFilesSupportingDocument);
      this.setState({ supportingDocumentfiles: tempFilesSupportingDocument });


      //Gist documents
      console.log(
        "------------------Supporting Document-----------------------------------"
      );

      console.log(`${this._folderName}/SupportingDocument`);
      const GistDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/GistDocuments`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      console.log(GistDocument);
      // console.log(SupportingDocument[0]);

      const tempFilesGistDocument: IFileDetails[] = [];
      SupportingDocument.forEach((values) => {
        tempFilesSupportingDocument.push(this._getFileObj(values));
      });
      // console.log(tempFilesSupportingDocument);
      this.setState({ secretaryGistDocs: tempFilesGistDocument });
    } catch {
      console.log("failed to fetch");
    }
  };



  private _onToggleSection = (section: string): void => {
    this.setState((prevState) => ({
      expandSections: {
        [section]: !prevState.expandSections[section],
        ...Object.keys(prevState.expandSections)
          .filter((key) => key !== section)
          .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      },
    }));
  };

  private _renderTable = (tableData: any[]): JSX.Element => {
    console.log(tableData);

    // Define columns for the Fluent UI table
    const columns: IColumn[] = [
      {
        key: "column1",
        name: "Column 1",
        fieldName: "column1",
        minWidth: 120,
        maxWidth: 200,
        onRender: (item: any) => <strong>{item.column1}</strong>,
      },
      {
        key: "column2",
        name: "Column 2",
        fieldName: "column2",
        minWidth: 120,
        maxWidth: 200,
        onRender: (item: any) => <span>{item.column2}</span>,
      },
    ];

    return (
      <div
      //  style={{ overflow: "auto" }}
      >
        <DetailsList
          items={tableData.filter((row) => row.column2 !== undefined)} // Filter out rows with undefined column2
          columns={columns}
          setKey="set"
          selectionMode={SelectionMode.none}
          layoutMode={0} // Use detailsListLayoutMode.fixedColumns
          styles={{
            root: { width: "100%",paddingTop: '4px' },
          }}
        />
      </div>
    );
  };

  private _renderPDFView = (): JSX.Element => {
    // const { pdfLink } = this.state;
    return (
      <div className={styles.pdfViewer}>
        {/* <iframe
          src={pdfLink}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
        /> */}
        <AdobePdfViewer
          clientId={"e32773e52b624acba0e9bd777c8dd310"}
          fileUrl={this.state.pdfLink}
          // height={800}
          defaultViewMode={"FIT_PAGE"}
        />
      </div>
    );
  };

  public reOrderData = (reOrderData: any[]): void => {
    this.setState({ peoplePickerData: reOrderData });
  };

  public removeDataFromGrid = (dataItem: any, typeOfTable: string): void => {
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

  private _getAuditTrail = async (status: any) => {
    // console.log(this._currentUserEmail, this._role);
    const profile = await this.props.sp.profiles.myProperties();
    console.log(profile);

    const auditLog = [
      {
        Actioner: this.props.context.pageContext.user.displayName,
        ActionerEmail: this._currentUserEmail,
        ActionTaken:
          this.props.formType === "View"
            ? `ECommittee note is  ${status}`
            : `Board Note is ${status}`,
        Role: profile.Title,
        // Role: this.props.context.pageContext.user.,
        ActionTakenOn:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        Comments: "No Comments",
      },
    ];

    return JSON.stringify([...this.state.auditTrail, ...auditLog]);
  };

  // public async clearFolder(
  //   libraryName: any,
  //   folderRelativeUrl: string
  // ): Promise<void> {
  //   try {
  //     // Get the folder
  //     const folder = await this.props.sp.web.getFolderByServerRelativePath(
  //       folderRelativeUrl
  //     );

  //     // Get all items in the folder
  //     const items = await folder.files();

  //     // Loop through each item and delete it
  //     for (const item of items) {
  //       await this.props.sp.web
  //         .getFileByServerRelativePath(item.ServerRelativeUrl)
  //         .recycle();
  //     }

  //     console.log(
  //       `All files in folder '${folderRelativeUrl}' have been deleted.`
  //     );
  //   } catch (error) {
  //     console.error("Error clearing folder:", error);
  //   }
  // }
  
  private async updateSupportingDocumentFolderItems(
    libraryName: any[],
    folderPath: string,
    type:string,
  ) {

      console.log(libraryName,folderPath,type,"....details attachment")
    // await this.clearFolder(libraryName, folderPath);
    // await this.props.sp.web.rootFolder.folders.addUsingPath(folderPath)
    console.log(
      `Folder -----${type}---- created successfully in list`
    );
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
      console.log(`updated ${type} document successfully`);
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private _handleApproverButton = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {

    let previousApprover:any;
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        // console.log(each);

        if (each.approverEmail === this._currentUserEmail) {
          // console.log("ednter");

          previousApprover = [{ ...each, status: statusFromEvent, actionDate: new Date(),mainStatus:'Approved',statusNumber:'9000' }]

          return { ...each, status: statusFromEvent, actionDate: new Date(),mainStatus:'Approved',statusNumber:'9000' };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }
        // console.log(each.approversOrder);
        // console.log(this.state.ApproverOrder + 1);
        // console.log(each.approverOrder === this.state.ApproverOrder + 1);
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          // console.log("ednter 2");
          return { ...each, status: "pending" ,mainStatus:each.approverType==='Approver'?
            "pending with Approver":
            "pending with Reviewer" ,statusNumber:each.approverType==='Approver'?'3000':'2000'};
           
        }
        return each;
      }
    );
    console.log(modifyApproveDetails);
    console.log(previousApprover)




    const _getCurrentApproverDetails = (): any => {
      const currentApproverdata = modifyApproveDetails.filter((each: any) => {
        console.log(each)
        if (each.status === "pending") {
          return each;
        }
      });
      console.log(currentApproverdata);
      return currentApproverdata[0];
    };
    const currentApproverDetail = _getCurrentApproverDetails()
    console.log(currentApproverDetail)
  //  const _getPreviousApproverId = ():any =>{
  //   const previousApproverId = modifyApproveDetails.filter((each: any) => {
  //     console.log(each)
  //     if (each.approverOrder === this.state.ApproverOrder) {
  //       return each;
  //     }
  //   });
  //   console.log(previousApproverId);
  //   return previousApproverId[0].id;

  //  }

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);
    const updateItems = {
      NoteApproversDTO: JSON.stringify(modifyApproveDetails),
      Status: currentApproverDetail?.mainStatus,
      StatusNumber: currentApproverDetail?.statusNumber,
      AuditTrail: updateAuditTrial,
      NoteApproverCommentsDTO: JSON.stringify(this.state.commentsData),
      // PreviousApproverId:_getPreviousApproverId(),
      CurrentApproverId:
        this.state.ApproverOrder === modifyApproveDetails.length
          ? null
          : currentApproverDetail.id,
      // PreviousApprover:_getPreviousApproverDetails(Note)
    };
    console.log(updateItems);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update(updateItems);

    console.log(itemToUpdate);
    this.updateSupportingDocumentFolderItems(
      this.state.supportingDocumentfiles,
      `${this._folderName}/gistDocument`,"gistDocument"

    );

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };



  private _checkingCurrentUserInSecretaryDTO=():any=>{

    return this.state.noteSecretaryDetails.some(
      (each:any)=>{
        console.log(each)
        console.log(this._currentUserEmail)
        console.log(each.approverEmail === this._currentUserEmail)
        if (each.approverEmail === this._currentUserEmail){
          return true
        }
       
      }
    )

  }

  private _showDialog = (title: string, message: string, buttonText: string) => {
    const dialogContent = {
      title: title,
      message: message,
      buttonText: buttonText,
    };
  
    this.setState({
      isDialogVisible: true,
      dialogContent: dialogContent,
    });
  };


  

  private handleReject = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {

    const currentUserComment = this.state.commentsData.find(
      (comment: any) => comment.commentedByEmail === this._currentUserEmail
    );
  
    if (!currentUserComment || currentUserComment.comment.trim() === "") {
      this._showDialog(
        'Missing Comments',
        'Please provide comments before rejecting the request.',
        'OK'
      );
      return; // Stop further execution
    }



    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return { ...each, status: statusFromEvent, actionDate: new Date() };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }
      
        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        NoteApproversDTO: JSON.stringify(modifyApproveDetails),
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
      });

    console.log(itemToUpdate);

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }

    this._closeDialog();
  };

  private handleRefer = async (
    statusFromEvent: string,
    statusNumber: string,
    commentsObj: any
  ) => {


  

    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        console.log(each);
        console.log(each.approverEmail);
        console.log(this._currentUserEmail);
        console.log(
          (each.approverEmail || each.approverEmailName) ===
            this._currentUserEmail
        );
        if (
          (each.approverEmail || each.approverEmailName) ===
          this._currentUserEmail
        ) {
          console.log("Entered -----", statusFromEvent);
          return { ...each, status: statusFromEvent, actionDate: new Date() };
        }
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          return { ...each, status: "waiting" };
        }

        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    console.log(
      [
        {
          approverEmail: this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          approverEmailName:this.state.referredFromDetails[0].text ||this.state.referredFromDetails[0].approverEmailName,
          approverType: this.state.referredFromDetails[0].approverType,
          createdBy:this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          createdDate: new Date(),
          modifiedBy: this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          modifiedDate:new Date(),
          noteApproverId: this.state.referredFromDetails[0].id,
          noteId:this._itemId,

          noteReferrerCommentDTO: null,
          noteReferrerId: v4(),
          noteSupportingDocumentsDTO: null,
          referrerEmail:this.state.refferredToDetails[0].email ||this.state.refferredToDetails[0].approverEmail,
          referrerEmailName: this.state.refferredToDetails[0].text ||this.state.refferredToDetails[0].approverEmailName,
          referrerStatus: 2,
          referrerStatusType:this.state.refferredToDetails[0].status,
          referredTo:this.state.refferredToDetails,
          referredFrom: this.state.referredFromDetails,
        },
      ]

    )

    const obj = {
      NoteApproversDTO: JSON.stringify(modifyApproveDetails),
      Status: statusFromEvent,
      StatusNumber: statusNumber,
      AuditTrail: updateAuditTrial,
      NoteApproverCommentsDTO: JSON.stringify([
        ...this.state.commentsData,
        commentsObj,
      ]),
      NoteReferrerDTO: JSON.stringify([
        {
          approverEmail: this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          approverEmailName:this.state.referredFromDetails[0].text ||this.state.referredFromDetails[0].approverEmailName,
          approverType: this.state.referredFromDetails[0].approverType,
          createdBy:this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          createdDate: new Date(),
          modifiedBy: this.state.referredFromDetails[0].email ||this.state.referredFromDetails[0].approverEmail,
          modifiedDate:new Date(),
          noteApproverId: this.state.referredFromDetails[0].id,
          noteId:this._itemId,

          noteReferrerCommentDTO: null,
          noteReferrerId: v4(),
          noteSupportingDocumentsDTO: null,
          referrerEmail:this.state.refferredToDetails[0].email ||this.state.refferredToDetails[0].approverEmail,
          referrerEmailName: this.state.refferredToDetails[0].text ||this.state.refferredToDetails[0].approverEmailName,
          referrerStatus: 2,
          referrerStatusType:this.state.refferredToDetails[0].status,
          referredTo:this.state.refferredToDetails,
          referredFrom: this.state.referredFromDetails,
        },
      ]),
      // referredTo: JSON.stringify(this.state.refferredToDetails),
      // referredFrom: JSON.stringify(this.state.referredFromDetails),
    };
    console.log(obj);

    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update(obj)
      .then((resu) => console.log(resu));

    console.log(itemToUpdate);

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };

  private handleReferBack = async (
    statusFromEvent: string,
    statusNumber: string,
    commentsObj: any
  ) => {
    const modifyReferredToDetails = this.state.referredFromDetails.map(
      (each: any, index: number) => {
        console.log(each);
        return { ...each, status: statusFromEvent, actionDate: new Date() };
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);

    const obj = {
      Status: statusFromEvent,
      StatusNumber: statusNumber,
      AuditTrail: updateAuditTrial,
      NoteApproverCommentsDTO: JSON.stringify([...this.state.commentsData, commentsObj]),
      NoteReferrerDTO: JSON.stringify([
        {
          referredTo: modifyReferredToDetails,
          referredFrom: this.state.referredFromDetails,
        },
      ]),
    };
    console.log(obj);

    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update(obj)
      .then((resu) => console.log(resu));

    console.log(itemToUpdate);

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };

  private handleReturn = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {

    // Assuming you want to check for comments before proceeding with return
  const currentUserComment = this.state.commentsData.find(
    (comment: any) => comment.commentedByEmail === this._currentUserEmail
  );

  if (!currentUserComment || currentUserComment.comment.trim() === "") {
    this._showDialog(
      'Missing Comments',
      'Please provide comments before returning the request.',
      'OK'
    );
    return; // Stop further execution
  }


    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return { ...each, status: statusFromEvent, actionDate: new Date() };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          return { ...each, status: "pending" };
        }
        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        NoteApproverCommentsDTO: JSON.stringify(modifyApproveDetails),
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
      });

    console.log(itemToUpdate);

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };

  private handleCallBack = async (
    e: any,
    statusFromEvent: string,
    statusNumber: string
  ) => {
    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
      });

    console.log(itemToUpdate);
    this._closeDialog();
  };

  // private updateCurrentApprover = ()=>{
  //   this.setState(cur)
  // }

  private handleChangeApprover = async (
    statusFromEvent: string,
    statusNumber: string,
    data: any
  ) => {
    // console.log(data)
    // this.setState({currentApprover:data})
    const updateCurrentApprover = (): any => {
      const upatedCurrentApprover = this.state.ApproverDetails.filter(
        (each: any) => {
          // console.log(each);
          // console.log(this.state.currentApprover);
          // // console.log(each.id)
          // // console.log(each.id ===this.state.currentApprover.id)
          // // console.log(each.approverOrder)
          // // console.log(this._getApproverOrder(this.state.ApproverDetails))
          // // console.log(this._getApproverOrder(this.state.ApproverDetails)[0])
          // console.log(each.status);
          // console.log(each.status === "pending");

          // console.log(each.approverOrder ===this._getApproverOrder(this.state.ApproverDetails)[0])
          if (each.status === "pending") {
            return {
              ...this.state.currentApprover,
              status: "pending",
              actionDate: new Date(),
            };
          }
        }
      );
      console.log(upatedCurrentApprover);
      console.log([
        {
          ...this.state.currentApprover[0],
          status: "pending",
          approverOrder: upatedCurrentApprover[0].approverOrder,
          approverStatus: upatedCurrentApprover[0].approverStatus,
          approverType: upatedCurrentApprover[0].approverType,
          approverEmailName: this.state.currentApprover[0].email ||this.state.currentApprover[0].secondaryText,
        },
      ]);
      return [
        {
          ...this.state.currentApprover[0],
          status: "pending",
          approverOrder: upatedCurrentApprover[0].approverOrder,
          approverStatus: upatedCurrentApprover[0].approverStatus,
          approverType: upatedCurrentApprover[0].approverType,
          approverEmailName: this.state.currentApprover[0].email ||this.state.currentApprover[0].secondaryText,
        },
      ];
    };
    console.log(updateCurrentApprover())
    const modifyApproverDetails = this.state.ApproverDetails.map(
      (each: any) => {
        console.log(each);
        console.log(each.status)
        console.log(each.status === "pending")
        if (each.status === "pending") {
          console.log(updateCurrentApprover())
          return { ...updateCurrentApprover()[0] };
        } else {
          return each;
        }
      }
    );
    console.log(modifyApproverDetails);
    const currentApproverId = updateCurrentApprover()[0].id 
    console.log(currentApproverId)
    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        CurrentApproverId: currentApproverId,
        AuditTrail: updateAuditTrial,
        NoteApproversDTO: JSON.stringify(modifyApproverDetails),
      });

    console.log(itemToUpdate);
    this._closeDialog();
  };

  private _checkApproveredStatusIsFound = (): any => {
    const checkApproverdStatusisAvailableInApproverDetails =
      this.state.ApproverDetails.reduce((accu: any, each: any) => {
        console.log(each);
        console.log(each.status);
        return accu.concat(each.status);
      }, []);
    console.log(checkApproverdStatusisAvailableInApproverDetails);
    console.log(
      checkApproverdStatusisAvailableInApproverDetails.includes("Approved")
    );
    return checkApproverdStatusisAvailableInApproverDetails.includes(
      "Approved"
    );
  };

  private _getApproverAndReviewerStageButton = (): any => {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "CheckMark" }} // Icon for Approve
          styles={{
            root: {
              backgroundColor: "#37b400",
              border: "none",
            },
            rootHovered: {
              backgroundColor: "#37b400",
              border: "none",
            },
            rootPressed: {
              backgroundColor: "#37b400",
              border: "none",
            },
          }}
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Approve",
              "Approved",
              "9000",
              "Please check the details filled along with attachment and click on Confirm button to approve request.",
              this._handleApproverButton,
              this._closeDialog
            );
            this.setState({ status: "Approved", statusNumber: "9000" });
          }}
        >
          Approve
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "Remove" }} // Icon for Reject
          styles={{
            root: {
              backgroundColor: "#f31700",
              border: "none",
            },
            rootHovered: {
              backgroundColor: "#f31700",
              border: "none",
            },
            rootPressed: {
              backgroundColor: "#f31700",
              border: "none",
            },
          }}
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Reject",
              "Rejected",
              "8000",
              "click on Confirm button to reject request.",
              this.handleReject,
              this._closeDialog
            );
            this.setState({ status: "Rejected", statusNumber: "8000" });
          }}
        >
          Reject
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "People" }} // Icon for Refer
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Refer",
              "Refered",
              "4000",
              ["Add Referee", "Comments"],
              this.handleRefer,
              this._closeDialog
            );
            this.setState({ status: "Refered", statusNumber: "4000" });
          }}
        >
          Refer
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "Back" }} // Icon for Return
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Return",
              "Returned",
              "5000",
              "click on Confirm button to Return request.",
              this.handleReturn,
              this._closeDialog
            );
            this.setState({ status: "Returned", statusNumber: "5000" });
          }}
        >
          Return
        </PrimaryButton>
      </div>
    );
  };

  private _getPendingStatus = (data: any): any => {
    // console.log(this.state.ApproverDetails);

    const currentStatusOfApproverDetails = data.filter((each: any) => {
      console.log(each);
      console.log(each.status);
      if (each.status === "pending" || each.status === "Refered") {
        // console.log(each.status);
        return each;
      }
      // return each.status === "pending" && each.approverEmailName
    });
    console.log(currentStatusOfApproverDetails);

    if (currentStatusOfApproverDetails.length > 0) {
      // console.log(
      //   currentStatusOfApproverDetails[0].approverEmailName,
      //   currentStatusOfApproverDetails[0].text,"---",
      //   currentStatusOfApproverDetails[0].approverEmailName ||currentStatusOfApproverDetails[0].text,
      //   "currentStatusOfApproverDetails"
      // );

      return (
        currentStatusOfApproverDetails[0].text ||
        currentStatusOfApproverDetails[0].approverEmailName
      );
    } else {
      return "";
    }
  };

  private _closeDialog = () => {
    console.log("close is triggered");
    this.setState({ dialogFluent: true });
  };

  private _hanldeFluentDialog = (
    btnType: string,
    currentStatus: string,
    currentStatusNumber: string,
    message: any,
    functionType: any,
    closeFunction: any
  ) => {
    this.setState({
      dialogFluent: false,
      dialogDetails: {
        type: btnType,
        status: currentStatus,
        statusNumber: currentStatusNumber,
        subText: `Are you sure you want to ${btnType} this request?`,
        message: message,
        functionType: functionType,
        closeFunction: closeFunction,
      },
    });
  };

  public _getCommentData = (
    commentsData: any,
    type: string = "",
    id: string = ""
  ) => {
    console.log(commentsData);
    console.log(id);
    if (type === "add") {
      console.log("entered into Add");
      this.setState((prev) => {
        console.log(commentsData);
        console.log(prev.commentsData);
        return {
          commentsData: [...prev.commentsData, commentsData],
        };
      });
    } else if (type === "delete") {
      console.log("entered into delete");
      const updatingCommentData = this.state.commentsData.filter(
        (each: any) => {
          console.log(each);
          console.log(each.id);
          console.log(id);
          console.log(each.id !== id);
          return each.id !== id;
        }
      );
      console.log(updatingCommentData);
      this.setState({
        commentsData: this.state.commentsData.filter(
          (each: any) => each.id !== id
        ),
      });
    } else {
      console.log("entered into save");
      console.log(id);
      const filterIdforUpdateState = this.state.commentsData.filter(
        (each: any) => each.id === id
      )[0];
      console.log(filterIdforUpdateState);
      const returnValue = (rowData: any): any => {
        console.log(rowData);
        const result = rowData.map((item: any) => {
          console.log(item);
          if (item.id === filterIdforUpdateState.id) {
            return commentsData;
          }
          return item;
        });
        console.log(result);
        return result;
      };
      console.log(returnValue(this.state.commentsData));
      this.setState({ commentsData: returnValue(this.state.commentsData) });
    }
  };

  private handleSupportingFileChangeInViewForm = (
    files: File[],
    typeOfDoc: string
  ) => {
    console.log(typeOfDoc);
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
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
      console.log(files);
      if (files.length > 0) {
        this.setState({
          supportingFilesInViewForm: [...filesArray],
          supportingDocumentfiles: [...filesArray],
        });
      }
    }
  };

  private handleGistDocuments = (
    files: File[],
    typeOfDoc: string
  ) => {
    console.log(typeOfDoc);
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
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
      console.log(files);
      if (files.length > 0) {
        this.setState({
          
          secretaryGistDocs: [...filesArray],
        });
      }
    }
  };

  public _checkCurrentRequestIsReturnedOrRejected = (): boolean => {
    switch (this.state.status) {
      case "Rejected":
      case "Returned":
      case "Call Back":
      case 'Approved':
        return false;
      default:
        return true;
    }
  };

  // private _getNewUpdatedNoteApproverDTO = (re:any,ap:any):any=>{
  //   console.log(re)
  //   console.log(ap)
  //   const newupdate = [...re,...ap].map(
  //     (each:any)=>{
  //       console.log(each)
  //       if (each.approversOrder === 1){
  //         console.log("entered")
  //         if (each.approverType ==="Reviewer"){
  //           return {...each,status:'pending',mainstatus:'pending with Reviewer',
              
  //           }

  //         } else{
  //           return {...each,status:'pending',mainstatus:'pending with Approver'}
  //         }
          
  //       }else{
  //         return {...each, status:'waiting',mainstatus:'waiting'}

  //       }
        
       
  //     }
  //   )

  //   console.log(newupdate)
  //   return newupdate

  // }

  private _checkCurrentUserIsAATRAssignee= ():any=>{
   const checkingATRAvailable =  this.state.atrCreatorsList.some(
      (each:any)=>{
        console.log(each)
        console.log(each.atrCreatorEmail)
        console.log(this._currentUserEmail)
        console.log(each.atrCreatorEmail === this._currentUserEmail)
        if (each.atrCreatorEmail === this._currentUserEmail){
          console.log(each)
          return true
        }
      }
    )
    console.log(checkingATRAvailable)
    return checkingATRAvailable

  }

  public render(): React.ReactElement<IViewFormProps> {
    console.log(this.state);
    // this._checkApproveredStatusIsFound()
    // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest();
    // console.log((this.state.refferredToDetails[0] ))
    //   // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest();
    //   console.log((this.state.refferredToDetails[0].email ))
    // console.log((( this._currentUserEmail)))
    // console.log(((this.state.refferredToDetails?.email === this._currentUserEmail) ))
    // console.log(this.state.statusNumber === '5000')
    
    // console.log(((this.state.refferredToDetails[0]?.email === this._currentUserEmail) &&this.state.statusNumber === '5000'))
    console.log(
      this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest()
    );

    const { expandSections } = this.state;
    // console.log(this._getPendingStatus())
    // const data = [
    //   {
    //     tableData: [
    //       { column1: "Row 1, Cell 1", column2: "Row 1, Cell 2" },
    //       { column1: "Row 2, Cell 1", column2: "Row 2, Cell 2" },
    //     ],
    //     pdfLink:
    //       "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
    //   },
    //   {
    //     tableData: [
    //       { column1: "Row 1, Cell 1", column2: "Row 1, Cell 2" },
    //       { column1: "Row 2, Cell 1", column2: "Row 2, Cell 2" },
    //     ],
    //     pdfLink:
    //       "https://xencia1.sharepoint.com/:b:/s/XenciaDemoApps/uco/EcFS2u_tQFhMmEy0LV6wx5wBEf8gycMjKYn0RIHHvCVzRw?e=de5FmB", // Link to the PDF
    //   },
    // ];

    return (
      <Stack tokens={{ childrenGap: 10 }} className={styles.viewForm}>
        {this.state.isLoading ? (
          <Spinner
            label="Wait, wait..."
            ariaLive="assertive"
            // labelPosition="right"
          />
        ) : (
          <Stack
            tokens={{ childrenGap: 10 }}
            className={styles.viewFormMainContainer}
          > 

            {/* dialog box details */}
             {/* dialog box details */}
            <Dialog
              hidden={!this.state.isDialogVisible}
              onDismiss={() => this.setState({ isDialogVisible: false })}
              dialogContentProps={{
                title: this.state.dialogContent.title,
              }}
            >
              <div>{this.state.dialogContent.message}</div>{" "}
              {/* Display the dialog message */}
              <DialogFooter>
                <PrimaryButton
                  onClick={() => this.setState({ isDialogVisible: false })}
                  text={this.state.dialogContent.buttonText} // Use button name from dialogContent
                />
              </DialogFooter>
            </Dialog>
             {/* dialog box details */}
              {/* dialog box details */}


            {/* Header section */}
            <div
              className={`${styles.generalSectionMainContainer} ${styles.viewFormHeaderSection}`}
              style={{ padding: "10px" }}
            >
              <h1 className={`${styles.generalHeader} `}>
                pending:{" "}
                {this.state.status !== "Rejected" &&
                  this._getPendingStatus(this.state.ApproverDetails)}
              </h1>

              <h1 className={`${styles.generalHeader} `}>
                eCommittee Note - {this.state.title}
              </h1>

              <h1 className={`${styles.generalHeader} `}>
                Status: {this.state.status}
              </h1>
            </div>

            {/* Content Container */}
            <div className={`${styles.viewFormContentContainer}`}>
              {/* Content && Pdf container */}
              <div className={styles.expansionAndPdfContainer}>
                {/* expanding sections */}
                <div className={styles.expandingContainer}>
                  {/* General Section */}
                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`generalSection`)}
                    >
                      <Text className={styles.sectionText}>
                        General Section
                      </Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.generalSection
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.generalSection && (
                      <div className={`${styles.expansionPanelInside}`}>
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          {this._renderTable(
                            this.state.eCommitteData[0].tableData
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Draft Resoultion Section */}
                  {this.props.formType === "BoardNoteView" && (
                    <div className={styles.sectionContainer}>
                      <div
                        className={styles.header}
                        onClick={() => this._onToggleSection(`draftResolution`)}
                      >
                        <Text className={styles.sectionText}>
                          Draft Resolution Section
                        </Text>
                        <IconButton
                          iconProps={{
                            iconName: expandSections.draftResolution
                              ? "ChevronUp"
                              : "ChevronDown",
                          }}
                          title="Expand/Collapse"
                          ariaLabel="Expand/Collapse"
                          className={styles.chevronIcon}
                        />
                      </div>
                      {expandSections.draftResolution && (
                        <div className={`${styles.expansionPanelInside}`}>
                          <div style={{ padding: "15px", paddingTop: "4px" }}>
                            <RichText
                              value={this.state.draftResolutionFieldValue}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Reviewers Section */}
                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`reviewersSection`)}
                    >
                      <Text className={styles.sectionText}>
                        Reviewers Section
                      </Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.reviewersSection
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.reviewersSection && (
                      <div
                        className={`${styles.expansionPanelInside}`}
                        //   style={{ overflowX: "scroll" }}
                      >
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          <ApproverAndReviewerTableInViewForm
                            data={this.state.peoplePickerData}
                            reOrderData={this.reOrderData}
                            removeDataFromGrid={this.removeDataFromGrid}
                            type="Reviewer"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Approvers  Section */}
                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`approversSection`)}
                    >
                      <Text className={styles.sectionText}>
                        Approvers Section
                      </Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.approversSection
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.approversSection && (
                      <div
                        className={`${styles.expansionPanelInside}`}
                        //   style={{ overflowX: "scroll" }}
                      >
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          <ApproverAndReviewerTableInViewForm
                            data={this.state.peoplePickerApproverData}
                            reOrderData={this.reOrderData}
                            removeDataFromGrid={this.removeDataFromGrid}
                            type="Approver"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/*General Comments */}

                  {this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                  this._currentUserEmail !== this.state.createdByEmail ? (
                    <div className={styles.sectionContainer}>
                      <div
                        className={styles.header}
                        onClick={() => this._onToggleSection(`generalComments`)}
                      >
                        <Text className={styles.sectionText}>
                          General Comments
                        </Text>
                        <IconButton
                          iconProps={{
                            iconName: expandSections.generalComments
                              ? "ChevronUp"
                              : "ChevronDown",
                          }}
                          title="Expand/Collapse"
                          ariaLabel="Expand/Collapse"
                          className={styles.chevronIcon}
                        />
                      </div>

                      {expandSections.generalComments && (
                        <div
                          className={`${styles.expansionPanelInside}`}
                          //   style={{ overflowX: "scroll" }}
                        >
                          <div style={{ padding: "15px", paddingTop: "4px" }}>
                            <GeneralCommentsFluentUIGrid
                              handleCommentDataFuntion={this._getCommentData}
                              data={this.state.commentsData}
                              currentUserDetails={
                                this.props.context.pageContext.user
                              }
                              type="generalComments"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* ATR Assignees */}
                  {this._checkCurrentUserIsAATRAssignee() && (
                    <div className={styles.sectionContainer}>
                      <div
                        className={styles.header}
                        onClick={() => this._onToggleSection(`atrAssignees`)}
                      >
                        <Text className={styles.sectionText}>
                          ATR Assignees
                        </Text>
                        <IconButton
                          iconProps={{
                            iconName: expandSections.atrAssignees
                              ? "ChevronUp"
                              : "ChevronDown",
                          }}
                          title="Expand/Collapse"
                          ariaLabel="Expand/Collapse"
                          className={styles.chevronIcon}
                        />
                      </div>
                      {expandSections.atrAssignees && (
                        <div
                          className={`${styles.expansionPanelInside}`}
                          style={{ overflowX: "scroll" }}
                        >
                          <div style={{ padding: "15px" }}>
                            <ATRAssignee
                              sp={this.props.sp}
                              context={this.props.context}
                              atrCreatorsList={this.state.atrCreatorsList}
                              commentsData={this.state.commentsData}
                              updategirdData={(data: any): void => {
                                console.log(data);
                                this.setState({
                                  atrGridData: [
                                    data,
                                    ...this.state.atrGridData,
                                  ],
                                });
                              }}
                              gridData={this.state.atrGridData}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Comments Log */}

                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`commentsLog`)}
                    >
                      <Text className={styles.sectionText}>Comments Log</Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.commentsLog
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.commentsLog && (
                      <div
                        className={`${styles.expansionPanelInside}`}
                        //   style={{ overflowX: "scroll" }}
                      >
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          <CommentsLogTable
                            data={this.state.commentsData} //have change data valu
                            type="commentsLog"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/*Attach Supporting Documents */}
                  {this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                  this._currentUserEmail !== this.state.createdByEmail ? (
                    <div className={styles.sectionContainer}>
                      <div
                        className={styles.header}
                        onClick={() =>
                          this._onToggleSection(`attachSupportingDocuments`)
                        }
                      >
                        <Text className={styles.sectionText}>
                          Attach Supporting Documents
                        </Text>
                        <IconButton
                          iconProps={{
                            iconName: expandSections.attachSupportingDocuments
                              ? "ChevronUp"
                              : "ChevronDown",
                          }}
                          title="Expand/Collapse"
                          ariaLabel="Expand/Collapse"
                          className={styles.chevronIcon}
                        />
                      </div>
                      {expandSections.attachSupportingDocuments && (
                        <div
                          className={`${styles.expansionPanelInside}`}
                          style={{ width: "100%", margin: "0px" }}
                        >
                          <div style={{ padding: "15px", paddingTop: "4px" }}>
                            <UploadFileComponent
                              typeOfDoc="supportingDocument"
                              onChange={
                                this.handleSupportingFileChangeInViewForm
                              }
                              accept=".xlsx,.pdf,.doc,.docx"
                              multiple={true}
                              maxFileSizeMB={25}
                              maxTotalSizeMB={25}
                              data={this.state.supportingFilesInViewForm}

                              // value={this.state.supportingDocumentfiles}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {/*Gist Document Section */}
                  {this._checkingCurrentUserInSecretaryDTO() ? (
                    <div className={styles.sectionContainer}>
                      <div
                        className={styles.header}
                        onClick={() => this._onToggleSection(`gistDocuments`)}
                      >
                        <Text className={styles.sectionText}>
                          Gist Document
                        </Text>
                        <IconButton
                          iconProps={{
                            iconName: expandSections.gistDocuments
                              ? "ChevronUp"
                              : "ChevronDown",
                          }}
                          title="Expand/Collapse"
                          ariaLabel="Expand/Collapse"
                          className={styles.chevronIcon}
                        />
                      </div>
                      {expandSections.gistDocuments && (
                        <div
                          className={`${styles.expansionPanelInside}`}
                          style={{ width: "100%", margin: "0px" }}
                        >
                          <h3>Gist Documents</h3>
                          {/* {this.state.noteSecretaryDetails} */}
                          <div style={{ padding: "15px", paddingTop: "4px" }}>
                            <UploadFileComponent
                              typeOfDoc="gistDocument"
                              onChange={this.handleGistDocuments}
                              accept=".pdf,.doc,.docx "
                              multiple={false}
                              maxFileSizeMB={5}
                              maxTotalSizeMB={5}
                              data={this.state.secretaryGistDocs}

                              // value={this.state.supportingDocumentfiles}
                            />
                            <PrimaryButton
                              onClick={() => {
                                this.updateSupportingDocumentFolderItems(
                                  this.state.secretaryGistDocs,
                                  `${this._folderName}/GistDocuments`,
                                  "gistDocument"
                                );
                              }}
                            >
                              UpLoad
                            </PrimaryButton>
                          </div>
                          {/* <div>
                            {this.state.secretaryGistDocs.length > 0 &&
                              this.state.secretaryGistDocs.map(({ file, error }) => {
                                console.log(file)
                               
                                return (
                                  <li
                                    key={file.name}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                    className={`${styles.basicLi} ${styles.attachementli}`}
                                  >
                                    <div
                                      style={{
                                        padding: "2px",
                                        marginBottom: "4px",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignContent: "center",
                                        flexGrow: "1",
                                      }}
                                    >
                                      
                                      <div>
                                        <p
                                          style={{
                                            paddingBottom: "0px",
                                            marginBottom: "0px",
                                            paddingLeft: "4px",
                                          }}
                                        >
                                          {file.name}
                                        </p>
                                        
                                      </div>
                                    </div>

                                   
                                  </li>
                                );
                              })}
                          </div> */}
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {/* Workflow Log */}
                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`workflowLog`)}
                    >
                      <Text className={styles.sectionText}>Workflow Log</Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.workflowLog
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.workflowLog && (
                      <div
                        className={`${styles.expansionPanelInside}`}
                        //   style={{ overflowX: "scroll" }}
                      >
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          <WorkFlowLogsTable
                            data={this.state.auditTrail}
                            type="Approver"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* File Attachments*/}
                  <div className={styles.sectionContainer}>
                    <div
                      className={styles.header}
                      onClick={() => this._onToggleSection(`fileAttachments`)}
                    >
                      <Text className={styles.sectionText}>
                        File Attachments
                      </Text>
                      <IconButton
                        iconProps={{
                          iconName: expandSections.fileAttachments
                            ? "ChevronUp"
                            : "ChevronDown",
                        }}
                        title="Expand/Collapse"
                        ariaLabel="Expand/Collapse"
                        className={styles.chevronIcon}
                      />
                    </div>
                    {expandSections.fileAttachments && (
                      <div
                        className={`${styles.expansionPanelInside} ${styles.responsiveContainerheaderForFileAttachment}`}
                      >
                        <div style={{ padding: "15px", paddingTop: "4px" }}>
                          <h4 className={styles.responsiveHeading}>
                            Main Note Link:
                            <a
                              href={this.state.noteTofiles[0]?.fileUrl}
                              download
                            >
                              {" "}
                              {this.state.noteTofiles[0]?.name}
                            </a>
                          </h4>
                          {this.state.wordDocumentfiles.length > 0 && (
                            <h4
                              className={styles.responsiveHeading}
                              style={{ minWidth: "150px" }}
                            >
                              Word Documents:
                              <a
                                href={this.state.wordDocumentfiles[0]?.fileUrl}
                                download
                              >
                                {" "}
                                {this.state.wordDocumentfiles[0]?.name}
                              </a>
                            </h4>
                          )}
                          {this.state.supportingDocumentfiles.length > 0 && (
                            <div>
                              <h4 className={styles.responsiveHeading}>
                                Support Documents:
                              </h4>
                              <FileAttatchmentTable
                                data={this.state.supportingDocumentfiles}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* {pdf Viewer} */}
                <div className={styles.pdfContainer}>
                  {this.state.pdfLink && this._renderPDFView()}
                </div>
              </div>
              {/* buttons Sections */}
              <div className={styles.btnsContainer}>
                {this._checkCurrentRequestIsReturnedOrRejected() &&
                  (this._currentUserEmail === this.state.createdByEmail ? (
                    this._checkApproveredStatusIsFound() ? (
                      <PrimaryButton
                        className={`${styles.responsiveButton}`}
                        iconProps={{ iconName: "Edit" }}
                        onClick={(e) => {
                          console.log("Change Approver btn Triggered");
                          this._hanldeFluentDialog(
                            "Change Approver",
                            "changeApprover",
                            "7500",
                            "Change Approver*",
                            this.handleChangeApprover,
                            this._closeDialog
                          );
                          //  this.handleChangeApprover( "ChangedApprover", "7500");
                          this.setState({
                            status: "changedApprover",
                            statusNumber: "7500",
                          });
                        }}
                      >
                        Change Approver
                      </PrimaryButton>
                    ) : (
                      <PrimaryButton
                        className={`${styles.responsiveButton}`}
                        iconProps={{ iconName: "Refresh" }}
                        onClick={(e) => {
                          console.log("Call Back btn Triggered");
                          this.handleCallBack(e, "Call Back", "7000");
                          this.setState({
                            status: "Call Back",
                            statusNumber: "200",
                          });
                        }}
                      >
                        Call Back
                      </PrimaryButton>
                    )
                  ) : this.state.refferredToDetails.length > 0 &&
                    this.state.refferredToDetails[0]?.email ===
                      this._currentUserEmail &&
                    this.state.refferredToDetails[0]?.status === "Refered" ? (
                    <PrimaryButton
                      className={`${styles.responsiveButton}`}
                      iconProps={{ iconName: "Reply" }}
                      styles={{
                        root: {
                          backgroundColor: "#37b400",
                          border: "none",
                        },
                        rootHovered: {
                          backgroundColor: "#37b400", // Set hover background color
                          border: "none",
                        },
                        rootPressed: {
                          backgroundColor: "#37b400", // Set pressed background color
                          border: "none",
                        },
                      }}
                      onClick={(e) => {
                        this._hanldeFluentDialog(
                          "Refer Back",
                          "Refered Back",
                          "6000",
                          "Please check the details filled along with attachment and click on Confirm button to approve request.",
                          this.handleReferBack,
                          this._closeDialog
                        );
                        this.setState({
                          status: "Refered Back",
                          statusNumber: "6000",
                        });
                        // this._handleApproverButton(e,"Approved")
                      }}
                    >
                      Refer Back
                    </PrimaryButton>
                  ) : (
                    this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                    this._getApproverAndReviewerStageButton()
                  ))}
                {/* {this._getApproverAndReviewerStageButton()} */}

                <DefaultButton
                  type="button"
                  // className={`${styles.commonBtn2} ${styles.addBtn}`}
                  className={`${styles.responsiveButton} `}
                  style={{ marginLeft: "10px" }}
                  iconProps={{ iconName: "Cancel" }}
                >
                  Exit
                </DefaultButton>
              </div>
            </div>
          </Stack>
        )}
        {!this.state.dialogFluent && (
          <DialogBlockingExample
            hiddenProp={this.state.dialogFluent}
            dialogDetails={this.state.dialogDetails}
            sp={this.props.sp}
            context={this.props.context}
            fetchAnydata={(data: any, typeOfBtnTriggered: any, status: any) => {
              console.log(data);
              console.log(typeOfBtnTriggered);
              if (typeOfBtnTriggered === "Refer") {
                this.setState({
                  refferredToDetails: [{ ...data[0], status: status }],
                  referredFromDetails: this.state.currentApprover,
                });
              } else {
                this.setState({ currentApprover: data });
              }
            }}
          />
        )}
        {/* <PSPDFKitViewer documentURL={this.state.pdfLink} sp={this.props.sp}/> */}
        {/* <PDFView pdfLink={this.state.pdfLink}/> //working but next page is not working */}
        {/* <PDFViews pdfLink={this.state.pdfLink}/> */}
        {/* <PdfViewer pdfUrl={this.state.pdfLink} /> */}
        {/* //working code throught canvas  */}
        {/* <AdobePdfWebPart/> */}
        {/* <AdobePdfViewer clientId={"825473e9e1184eL459736428fd30f8b99"} fileUrl={this.state.pdfLink} height={800} defaultViewMode={"FIT_WIDTH"}/> */}
      </Stack>
    );
  }
}
