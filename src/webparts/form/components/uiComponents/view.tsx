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
}

const getIdFromUrl = (): any => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("id");
  // console.log(Id);
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
    };
    console.log(this._itemId);
    console.log(this._formType);
    console.log(this.props.context.pageContext.user);
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

  public _folderNameGenerate(id: any): any {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo = `AD1/${currentyear}-${nextYear}/C${id}`;
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }

  private _getJsonifyReviewer = (item: any, type: string): any[] => {
    // console.log(item);
    // console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === 1) {
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
    // console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => {
      // console.log(each);
      return {
        text: each.approverEmailName,
        srNo: each.approverEmailName.split("@")[0],
        optionalText: each.designation,
        id: each.id,
        approverType: 1,
        ...each,
      };
    });
    // console.log(approverData);
    // this.setState(()=>{
    //   console.log("State updated")
    //   return {peoplePickerApproverData:approverData}
    // })
    // if ()
    return approverData;
  };

  private _getJsonifyApprover = (item: any, type: string): any[] => {
    // console.log(item);
    // console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === 2) {
        // console.log(each, "Approver data.................parsed item");
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
    // console.log(approverfilterData);
    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      // srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 2,
      ...each,
    }));
    // console.log(approverData);
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
      .select(`*,Author/Title,Author/EMail`)
      .expand("Author")()
      .then((res) => res);
    console.log(`${id} ------Details`, item);
    console.log(folderPath);
    // const folderItem =  await this.props.sp.web.getFolderByServerRelativePath(`${folderPath}/Pdf`)
    // .files().then(res => res);
    // console.log(folderItem)
    console.log(this._getJsonifyReviewer(item.ApproverDetails, "Reviewer"));
    console.log(this._getJsonifyApprover(item.ApproverDetails, "Approver"));

    this.setState({
      eCommitteData: [
        {
          tableData: [
            item.CommitteeName !== null && {
              column1: "CommitteeName",
              column2: `${item.CommitteeName}`,
            },
            item.Subject !== null && {
              column1: "Subject",
              column2: `${item.Subject}`,
            },
            item.natureOfNote !== null && {
              column1: "NatureOfNote",
              column2: `${item.natureOfNote}`,
            },
            item.NoteType !== null && {
              column1: "NoteType",
              column2: `${item.NoteType}`,
            },
            item.NatuerOfApprovalSanction !== null && {
              column1: "NatuerOfApprovalSanction",
              column2: `${item.NatuerOfApprovalSanction}`,
            },

            item.TypeOfFinancialNote !== null && {
              column1: "TypeOfFinancialNote",
              column2: `${item.TypeOfFinancialNote}`,
            },
            item.Search_x0020_Keyword !== null && {
              column1: "Search Keyword",
              column2: `${this._extractValueFromHtml(
                item.Search_x0020_Keyword
              )}`,
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
    const dataApproverInfo =
      item.Author.EMail !== this._currentUserEmail &&
      this._getApproverOrder(JSON.parse(item.ApproverDetails));
    // console.log(dataApproverInfo);
    // console.log(item.CommentsLog);
    // console.log(typeof item.CommentsLog);

    this.setState({
      committeeNameFeildValue:
        item.CommitteeName !== null ? item.CommitteeName : "",
      subjectFeildValue: item.Subject !== null ? item.Subject : "",
      natureOfNoteFeildValue:
        item.natureOfNote !== null ? item.natureOfNote : "",
      noteTypeFeildValue: item.NoteType !== null ? item.NoteType : "",
      natureOfApprovalOrSanctionFeildValue:
        item.NatuerOfApprovalSanction !== null
          ? item.NatuerOfApprovalSanction
          : "",
      typeOfFinancialNoteFeildValue:
        item.TypeOfFinancialNote !== null ? item.TypeOfFinancialNote : "",
      searchTextFeildValue:
        item.Search_x0020_Keyword !== null
          ? this._extractValueFromHtml(item.Search_x0020_Keyword)
          : "",
      amountFeildValue: item.Amount !== null ? item.Amount : null,
      puroposeFeildValue: item.Purpose !== null ? item.Purpose : "",
      // peoplePickerData:this._getUserDetailsById(item.ReviewerId,"Reviewer"),
      peoplePickerData: this._getJsonifyReviewer(
        item.ApproverDetails,
        "Reviewer"
      ),
      peoplePickerApproverData: this._getJsonifyApprover(
        item.ApproverDetails,
        "Approver"
      ),
      auditTrail: JSON.parse(item.AuditTrail),
      isLoading: false,
      createdByEmail: item.Author.EMail,
      status: item.Status,
      statusNumber: item.statusNumber,
      ApproverDetails: JSON.parse(item.ApproverDetails),
      currentApprover: JSON.parse(item.currentApprover),
      ApproverOrder:
        item.Author.EMail === this._currentUserEmail ? "" : dataApproverInfo[0],
      ApproverType:
        item.Author.EMail === this._currentUserEmail ? "" : dataApproverInfo[1],

      title: item.Title,
      commentsData:
        item.CommentsLog !== null ? JSON.parse(item.CommentsLog) : [],
      referredFromDetails:item.referredFrom!==null? JSON.parse(item.referredFrom):[],
      refferredToDetails:item.referredTo!==null? JSON.parse(item.referredTo):[] 
      //   item.CommentsLog && typeof item.CommentsLog === "object"|| "string"
      // ?  []
      // : JSON.parse(item.CommentsLog),

      //don't use this commentsData:item.CommentsLog !== typeof null||'null' ? JSON.parse(item.CommentsLog):[],
    });
  };

  private _checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest =
    (): any => {


      
      return this.state.ApproverDetails.filter(
        
       
        (each:any)=>{
          console.log(each)
          if ((each.approverEmail || each.approverEmailName||each.email) ===      (this._currentUserEmail)){
            if (each.status==='Refered' && this.state.refferredToDetails[0]?.status ==='Referred Back'){
              switch(each.status ){
                case 'Approved':
                  console.log(each.status)
                  return false
                case 'Rejected':
                  console.log(each.status)
                  return false
                case 'Refered':
                  console.log(each.status)
                  return true 
                case 'pending':
                  console.log(each.status)
                  return true 
                case 'Referred Back':
                  console.log(each.status)
                  return true
                default:
                  console.log("default")
                  return false
              }
            }else{
             
                switch(each.status ){
                  case 'Approved':
                    console.log(each.status)
                    return false
                  case 'Rejected':
                    console.log(each.status)
                    return false
                  case 'Refered':
                    console.log(each.status)
                    return false 
                  case 'pending':
                    console.log(each.status)
                    return true 
                  case 'Referred Back':
                    console.log(each.status)
                    return true
                  default:
                    console.log("default")
                    return false
               
              }
  
            }

          }
        
        
      
        
        }

        
      )[0]




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

  private _getApproverOrder = (data: any): any => {
    const order = data.filter((each: any) => {
      // console.log(each);
      // console.log(each.approverEmail);
      // console.log(this._currentUserEmail);
      // console.log(each.approverEmail ||each.email)

      // console.log(each.approverEmail === this._currentUserEmail);

      if (each.approverEmail || each.email === this._currentUserEmail) {
        // console.log(each.approverOrder);
        return each;
      }
    });
    // console.log(order);
    return [order[0].approverOrder, order[0].approverType];
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
      // console.log(folderItemsPdf);
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
      // console.log(folderItemsWordDocument);
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
      // console.log(SupportingDocument);
      // console.log(SupportingDocument[0]);

      const tempFilesSupportingDocument: IFileDetails[] = [];
      SupportingDocument.forEach((values) => {
        tempFilesSupportingDocument.push(this._getFileObj(values));
      });
      // console.log(tempFilesSupportingDocument);
      this.setState({ supportingDocumentfiles: tempFilesSupportingDocument });
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
    return (
      <div style={{ overflow: "auto" }}>
        <table className={styles.table}>
          <tbody>
            {tableData.map((row, index) => {
              // console.log("-------------------------");
              // console.log(row.column1);
              // console.log(row.column2 !== null);
              // console.log("-------------------------");
              return (
                row.column2 !== undefined && (
                  <tr key={index}>
                    <td>
                      <strong>{row.column1}</strong>
                    </td>
                    <td>{row.column2}</td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
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
        ActionTaken: status,
        Role: profile.Title,
        // Role: this.props.context.pageContext.user.,
        ActionTakenOn:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        Comments: "No Comments",
      },
    ];

    return JSON.stringify([...this.state.auditTrail, ...auditLog]);
  };

  private async updateSupportingDocumentFolderItems(
    libraryName: any[],
    folderPath: string
  ) {
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

  private _handleApproverButton = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        // console.log(each);

        if (each.approverEmail === this._currentUserEmail) {
          // console.log("ednter");

          return { ...each, status: statusFromEvent };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }
        // console.log(each.approversOrder);
        // console.log(this.state.ApproverOrder + 1);
        // console.log(each.approverOrder === this.state.ApproverOrder + 1);
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          // console.log("ednter 2");
          return { ...each, status: "pending" };
        }
        return each;
      }
    );
    // console.log(modifyApproveDetails);

    const _getCurrentApproverDetails = (): any => {
      const currentApproverdata = modifyApproveDetails.filter((each: any) => {
        if (each.status === "pending") {
          return each;
        }
      });
      // console.log(currentApproverdata);
      return currentApproverdata[0];
    };

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        ApproverDetails: JSON.stringify(modifyApproveDetails),
        Status: "pending",
        statusNumber: "1500",
        AuditTrail: updateAuditTrial,
        CommentsLog: JSON.stringify(this.state.commentsData),
        currentApprover: JSON.stringify([_getCurrentApproverDetails()]),
      });

    console.log(itemToUpdate);
    this.updateSupportingDocumentFolderItems(
      this.state.supportingDocumentfiles,
      `${this._folderName}/SupportingDocument`
    );

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      const itemToUpdateStatusToApproved = await this.props.sp.web.lists
        .getByTitle(this.props.listId)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          statusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };

  private handleReject = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return { ...each, status: statusFromEvent };
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
        ApproverDetails: JSON.stringify(modifyApproveDetails),
        Status: statusFromEvent,
        statusNumber: statusNumber,
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
          statusNumber: statusNumber,
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
          return { ...each, status: statusFromEvent };
        }
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          return { ...each, status: "waiting" };
        }

        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);

    const obj = {
      ApproverDetails: JSON.stringify(modifyApproveDetails),
      Status: statusFromEvent,
      statusNumber: statusNumber,
      AuditTrail: updateAuditTrial,
      CommentsLog: JSON.stringify([...this.state.commentsData, commentsObj]),
      referredTo: JSON.stringify(this.state.refferredToDetails),
      referredFrom: JSON.stringify(this.state.referredFromDetails),
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
          statusNumber: statusNumber,
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
        return { ...each, status: statusFromEvent };
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);

    const obj = {
      Status: statusFromEvent,
      statusNumber: statusNumber,
      AuditTrail: updateAuditTrial,
      CommentsLog: JSON.stringify([...this.state.commentsData, commentsObj]),
      referredTo: JSON.stringify(modifyReferredToDetails),
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
          statusNumber: statusNumber,
        });

      console.log(itemToUpdateStatusToApproved);
    }
    this._closeDialog();
  };

  private handleReturn = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return { ...each, status: statusFromEvent };
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
        ApproverDetails: JSON.stringify(modifyApproveDetails),
        Status: statusFromEvent,
        statusNumber: statusNumber,
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
          statusNumber: statusNumber,
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
        statusNumber: statusNumber,
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
            return { ...this.state.currentApprover, status: "pending" };
          }
        }
      );
      // console.log(upatedCurrentApprover);
      console.log([
        {
          ...this.state.currentApprover[0],
          status: "pending",
          approverOrder: upatedCurrentApprover[0].approverOrder,
          approverStatus: upatedCurrentApprover[0].approverStatus,
          approverType: upatedCurrentApprover[0].approverType,
          approverEmailName: this.state.currentApprover[0].email,
        },
      ]);
      return [
        {
          ...this.state.currentApprover[0],
          status: "pending",
          approverOrder: upatedCurrentApprover[0].approverOrder,
          approverStatus: upatedCurrentApprover[0].approverStatus,
          approverType: upatedCurrentApprover[0].approverType,
          approverEmailName: upatedCurrentApprover[0].email,
        },
      ];
    };
    const modifyApproverDetails = this.state.ApproverDetails.map(
      (each: any) => {
        console.log(each);
        if (each.status === "pending") {
          return { ...updateCurrentApprover()[0] };
        } else {
          return each;
        }
      }
    );
    console.log(modifyApproverDetails);
    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    console.log(updateAuditTrial);
    const itemToUpdate = await this.props.sp.web.lists
      .getByTitle(this.props.listId)
      .items.getById(this._itemId)
      .update({
        currentApprover: JSON.stringify(updateCurrentApprover()),
        AuditTrail: updateAuditTrial,
        ApproverDetails: JSON.stringify(modifyApproverDetails),
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
              "Approve",
              "Approved",
              "2000",
              "Please check the details filled along with attachment and click on Confirm button to approve request.",
              this._handleApproverButton,
              this._closeDialog
            );
            this.setState({ status: "Approve", statusNumber: "2000" });
            // this._handleApproverButton(e,"Approved")
          }}
        >
          Approve
        </PrimaryButton>
        <PrimaryButton
          styles={{
            root: {
              backgroundColor: "#f31700",
              border: "none",
            },
            rootHovered: {
              backgroundColor: "#f31700", // Set hover background color
              border: "none",
            },
            rootPressed: {
              backgroundColor: "#f31700", // Set pressed background color
              border: "none",
            },
          }}
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Reject",
              "Rejected",
              "4000",
              "click on Confirm button to reject request.",
              this.handleReject,
              this._closeDialog
            );
            this.setState({ status: "Reject", statusNumber: "4000" });
            // this.handleReject(e,"Rejected","4000")
          }}
        >
          Reject
        </PrimaryButton>
        <PrimaryButton
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Refer",
              "Refered",
              "5000",
              ["Add Referee", "Comments"],
              this.handleRefer,
              this._closeDialog
            );
            this.setState({ status: "Refer", statusNumber: "5000" });
            // this.handleRefer(e,"Refered","5000")
          }}
        >
          Refer
        </PrimaryButton>
        <PrimaryButton
          onClick={(e) => {
            this._hanldeFluentDialog(
              "Return",
              "Returned",
              "3000",
              "click on Confirm button to Return request.",
              this.handleReturn,
              this._closeDialog
            );
            this.setState({ status: "Return", statusNumber: "3000" });
            // this.handleReturn(e,"Returned","3000")
          }}
        >
          Return
        </PrimaryButton>
      </div>
    );
  };

  private _getPendingStatus = (): any => {
    // console.log(this.state.ApproverDetails);
    const currentStatusOfApproverDetails = this.state.ApproverDetails.filter(
      (each: any) => {
        // console.log(each);
        // console.log(each.status);
        if (each.status === "pending" || each.status === "Refered") {
          // console.log(each.status);
          return each;
        }
        // return each.status === "pending" && each.approverEmailName
      }
    );

    if (currentStatusOfApproverDetails.length > 0) {
      // console.log(
      //   currentStatusOfApproverDetails[0].approverEmailName,
      //   currentStatusOfApproverDetails[0].text,"---",
      //   currentStatusOfApproverDetails[0].approverEmailName ||currentStatusOfApproverDetails[0].text,
      //   "currentStatusOfApproverDetails"
      // );

      return currentStatusOfApproverDetails[0].text;
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
    if (type === "add") {
      this.setState((prev) => {
        console.log(commentsData);
        console.log(prev.commentsData);
        return {
          commentsData: [...prev.commentsData, commentsData],
        };
      });
    } else {
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

  public render(): React.ReactElement<IViewFormProps> {
    console.log(this.state);
    // this._checkApproveredStatusIsFound()
    // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest();
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
          <Stack tokens={{ childrenGap: 10 }} className={styles.viewFormMainContainer}>
            {/* Header section */}
            <div
              className={`${styles.generalSectionMainContainer}`}
              style={{
                justifyContent: "space-between",
                paddingLeft: "5px",
                paddingRight: "5px",
              }}
            >
              {/* {!this.state.ApproverOrder === this.state.ApproverDetails.length &&<h1 style={{ alignSelf: "left", fontSize: "16px" }}>
                pending:{this._getPendingStatus()}
              </h1>} */}
              {
                <h1 style={{ alignSelf: "left", fontSize: "16px" }}>
                  pending:
                  {this._getPendingStatus()}
                </h1>
              }

              <h1
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                eCommittee Note - {this.state.title}
              </h1>
              <h1 style={{ alignSelf: "right", fontSize: "16px" }}>
                Status:{this.state.status}
              </h1>
            </div>
            {/* Content Container */}
            <div className={`${styles.viewFormContentContainer}`}>
                      {/* Content && Pdf container */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "10px",
                        // height: "100%",
                        border: "1px solid yellow",
                      }}
                    >
                      {/* expanding sections */}
                      <div
                        style={{
                          width: "40%",
                          height: "100%",
                          //   border: "1px solid red",
                          gap: "0px",
                        }}
                      >
                        {/* General Section */}
                        <div className={styles.sectionContainer}>
                          <div
                            className={styles.header}
                            onClick={() => this._onToggleSection(`generalSection`)}
                          >
                            <Text className={styles.sectionText}>General Section</Text>
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
                              <div style={{ padding: "15px" }}>
                                {this._renderTable(
                                  this.state.eCommitteData[0].tableData
                                )}
                              </div>
                            </div>
                          )}
                        </div>
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
                                iconName: expandSections.generalSection
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
                              <div style={{ padding: "15px" }}>
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
                                iconName: expandSections.generalSection
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
                              <div style={{ padding: "15px" }}>
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
                                <div style={{ padding: "15px" }}>
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

                        {/*ATR Assignees */}
                        {this.state.ApproverType.toString() === "2" ? (
                          <div className={styles.sectionContainer}>
                            <div
                              className={styles.header}
                              onClick={() => this._onToggleSection(`atrAssignees`)}
                            >
                              <Text className={styles.sectionText}>ATR Assignees</Text>
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
                                //   style={{ overflowX: "scroll" }}
                              >
                                {" "}
                              </div>
                            )}
                          </div>
                        ) : (
                          ""
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
                              <div style={{ padding: "15px" }}>
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
                                <div style={{ padding: "15px" }}>
                                  <UploadFileComponent
                                    typeOfDoc="supportingDocument"
                                    onChange={this.handleSupportingFileChangeInViewForm}
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
                              <div style={{ padding: "15px" }}>
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
                            <Text className={styles.sectionText}>File Attachments</Text>
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
                              className={`${styles.expansionPanelInside}`}

                              //   style={{ overflowX: "scroll" }}
                            >
                              {/* Note Files */}
                              <div style={{ padding: "15px" }}>
                                <h4>
                                  Main Note Link:
                                  <a href={this.state.noteTofiles[0].fileUrl} download>
                                    {" "}
                                    {this.state.noteTofiles[0].name}
                                  </a>
                                </h4>
                                {/* Word Documents */}
                                {this.state.wordDocumentfiles.length > 0 && (
                                  <h4 style={{ minWidth: "150px" }}>
                                    Word Documents :
                                    <a
                                      href={this.state.wordDocumentfiles[0].fileUrl}
                                      download
                                    >
                                      {" "}
                                      {this.state.wordDocumentfiles[0].name}
                                    </a>
                                  </h4>
                                )}

                                {/* Support Documents */}
                                <h4>Support Documents :</h4>
                                <FileAttatchmentTable
                                  data={this.state.supportingDocumentfiles}
                                />

                                {/* <h4>Word Documents :</h4>
                              <FileAttatchmentTable
                                data={this.state.wordDocumentfiles}
                              /> */}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* {pdf Viewer} */}
                      <div
                        style={{
                          
                          width: "60%",
                          border: "1px solid pink",
                        }}
                      >
                        {this.state.pdfLink && this._renderPDFView()}
                      </div>
                    </div>
                    {/* buttons Sections */}
                    <div className={styles.btnsContainer}
                      
                    >
                      {this._currentUserEmail === this.state.createdByEmail ? (
                        this._checkApproveredStatusIsFound() ? (
                          <PrimaryButton
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
                            onClick={(e) => {
                              console.log("Call Back btn Triggered");
                              this.handleCallBack(e, "Call Back", "7000");
                              this.setState({
                                status: "Call Back",
                                statusNumber: "7000",
                              });
                            }}
                          >
                            Call Back
                          </PrimaryButton>
                        )
                      ) : ((this.state.refferredToDetails.length> 0 &&((this.state.refferredToDetails[0]?.email ===
                        this._currentUserEmail) && (this.state.refferredToDetails[0]?.status==="Refered"))))? (
                        <PrimaryButton
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
                              "Referred Back",
                              "6000",
                              "Please check the details filled along with attachment and click on Confirm button to approve request.",
                              this.handleReferBack,
                              this._closeDialog
                            );
                            this.setState({ status: "Approve", statusNumber: "2000" });
                            // this._handleApproverButton(e,"Approved")
                          }}
                        >
                          Refer Back
                        </PrimaryButton>
                      ) : (
                        this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                        this._getApproverAndReviewerStageButton()
                      )}
                      {/* {this._getApproverAndReviewerStageButton()} */}

                      <DefaultButton
                        type="button"
                        // className={`${styles.commonBtn2} ${styles.addBtn}`}
                        // style={{ marginTop: "6px" }}
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
