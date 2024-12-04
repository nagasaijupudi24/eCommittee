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
import {
  IDropdownOption,
  Modal,
  Spinner,
  SpinnerSize,
} from "office-ui-fabric-react";
import { PrimaryButton } from "@fluentui/react/lib/Button";

//spinner related
import '../CustomStyles/custom.css'
// import { Spinner } from "@fluentui/react/lib/Spinner";
import UploadFileComponent from "./uploadFile";
import Title from "./titleSectionComponent/title";
import SpanComponent from "./spanComponent/spanComponent";
import MyDialog from "./dialog/dialog";
import ApproverOrReviewerDialog from "./ApproverOrReviewerDialog/approverOrReviewerDialog";
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
import {
  PeoplePicker,
  PrincipalType,
  IPeoplePickerContext,
} from "@pnp/spfx-controls-react/lib/PeoplePicker";
import DraftSuccessDialog from "./dialogFluentUi/draftDialog";
import CancelConfirmationDialog from "./dialogFluentUi/cancelDialog";
import SuccessDialog from "./dialogFluentUi/endDialog";
import { DetailsListDragDropExample } from "./draggableGridKendo/dragAndDropFluent";
import ConfirmationDialog from "./dialogFluentUi/submitConfirmation";
import AutoSaveDialog from "./dialog/autoSaveStopped";
import AutoSaveFailedDialog from "./dialogFluentUi/autoSaveFailedDialog";
import ReviewerExistModal from "./ApproverOrReviewerDialog/reviewerDialogAlreadyExist";
import CummulativeErrorDialog from "./dialogFluentUi/cummulativeDialog";
import SupportingDocumentsUploadFileComponent from "./supportingDocuments";
import CommentsLogTable from "./simpleTable/commentsTable";
// import PageLoader from "../Pageloder";

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
  title:any;
  createdByEmail: any;
  createdByID: any;
  createdByEmailName: any;
  isLoading: boolean;
  isLoadingOnForm: boolean;
  department: string;
  departmentAlias: string;
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
  isWarningOthersField: boolean;
  eCommitteData: any;

  conditionNumber: any;
  conditionNumArray: any;
  eCommitteDataForValidataion: any;
  eCommitteDataForValidataionDialog: any;

  noteTofiles: any[];
  isWarningNoteToFiles: boolean;

  wordDocumentfiles: any[];
  isWarningWordDocumentFiles: boolean;

  supportingDocumentfiles: any[];
  isWarningSupportingDocumentFiles: boolean;

  errorOfDocuments: any;
  errorFilesList: any;
  errorForCummulative: any;
  dialogboxForCummulativeError: any;

  isWarningPeoplePicker: boolean;
  isDialogHidden: boolean;
  isApproverOrReviewerDialogHandel: boolean;

  reviewerKey: any;
  approverKey: any;

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
  isSmallScreen:any;

  /// submit form state dialog box

  isConfirmationDialogVisible: boolean;
  isSuccessDialogVisible: boolean;

  // State for cancel confirmation dialog
  showCancelDialog: boolean;

  //save as draft dialog
  showDialog: boolean;

  //success dialog
  isVisibleAlter: boolean;
  isAutoSaveFailedDialog: boolean;

  // auto save

  itemId: any;
  autoSaveStatus: string;

  successStatus: any;

  autosave: boolean;
  autoSavedialog: boolean;

  isReviewerDialogHandel: boolean;
  commentsLog: any;
}

export const FormContext = React.createContext<any>(null);

const getIdFromUrl = (): any => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("itemId");
  // const Id = params.get("itemId");

  return Id;
};

const getFromType = (): any => {
  const params = new URLSearchParams(window.location.search);
  const formType = params.get("type");
  return formType;
};

export default class Form extends React.Component<IFormProps, IMainFormState> {
  private autoSaveInterval: any;
  private _peopplePicker: IPeoplePickerContext;
  private _noteId: any;
  // private _userName: string;
  // private _role: string;
  private _itemId: number = Number(getIdFromUrl());
  private _formType: string = getFromType();
  private _currentUserEmail = this.props.context.pageContext.user.email;

  private _absUrl: any = this.props.context.pageContext.web.serverRelativeUrl;
  private _committeeType: any =
    this.props.formType === "BoardNoteNew" ||
    this.props.formType === "BoardNoteView"
      ? "Board"
      : "eCommittee";

  private _folderName: any = "";

  // private _folderName:string;

  private title: any;
  private _listname: any;
  private _libraryName: any;

  constructor(props: IFormProps) {
    super(props);
    this.state = {
      // auto save
      title:'',
      createdByEmail: "",
      createdByID: "",
      createdByEmailName: "",
      itemId: null,
      autoSaveStatus: "Drafted",
      isLoading: true,
      isLoadingOnForm: false,
      department: "",
      departmentAlias: "",
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
      isWarningOthersField: false,
      isWarningPeoplePicker: false,

      eCommitteData: {},

      conditionNumber: "",
      conditionNumArray: "",
      eCommitteDataForValidataion: {},
      eCommitteDataForValidataionDialog: {},
      noteTofiles: [],
      isWarningNoteToFiles: false,

      wordDocumentfiles: [],
      isWarningWordDocumentFiles: false,

      supportingDocumentfiles: [],
      isWarningSupportingDocumentFiles: false,

      errorOfDocuments: false,
      errorFilesList: {
        wordDocument: [],
        notePdF: [],
        supportingDocument: [],
      },
      errorForCummulative: false,
      dialogboxForCummulativeError: false,

      isDialogHidden: true,
      isApproverOrReviewerDialogHandel: true,
      isReviewerDialogHandel: true,

      reviewerKey: 0,
      approverKey: 0,
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
      isAutoSaveFailedDialog: false,

      draftResolutionFieldValue: "",
      isSmallScreen: window.innerWidth < 568,
      successStatus: "",
      autosave: true,
      autoSavedialog: true,
      commentsLog: [],
    };
    const listTitle = this.props.listId;

    this._listname = listTitle?.title;
    // console.log(this._listname)

    const libraryTilte = this.props.libraryId;
    this._libraryName = libraryTilte?.title;

    this._generateRequsterNumber = this._generateRequsterNumber.bind(this);
    this._folderNameGenerate = this._folderNameGenerate.bind(this);

    this._peopplePicker = {
      absoluteUrl: this.props.context.pageContext.web.absoluteUrl,
      msGraphClientFactory: this.props.context.msGraphClientFactory,
      spHttpClient: this.props.context.spHttpClient,
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.getfield();

    this._fetchDepartmentAlias()

    this._itemId && this._getItemData(this._itemId, this._folderName).then(async () => {
      // console.log(this.state.departmentAlias);

      this._fetchDepartmentAlias().then(async () => {
        this._folderName = await `${this._absUrl}/${
          this._libraryName
        }/${this._folderNameGenerateEdit(this._itemId)}`;
  
        this._itemId && (await this._getItemDocumentsData());
      });
    });

    

    // this._fetchDepartmentAlias().then(async () => {
    //   this._folderName = await `${this._absUrl}/${
    //     this._libraryName
    //   }/${this._folderNameGenerate(this._itemId)}`;

    //   this._itemId && (await this._getItemDocumentsData());
    // });
  }

  public convertMilliseconds = (
    milliseconds: number
  ): { seconds: number; minutes: number; hours: number } => {
    const seconds = milliseconds / 1000;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    return { seconds, minutes, hours };
  };

  public componentDidMount(): void {
    const milliseconds = 180000;
    window.addEventListener('resize', this.handleResize);

    if (this.state.autosave) {
      this.autoSaveInterval = setInterval(this.autoSave, milliseconds);
      if (this._itemId) {
        clearInterval(this.autoSaveInterval);
      }
    }

    this._fetchApproverDetails();
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize);
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null; // Set to null to prevent accidental re-use
    }
  }

  private handleResize = () => {
    this.setState({ isSmallScreen: window.innerWidth < 768 });
  };

  private autoSave = async (): Promise<void> => {
    try {
      // if (
      //   this.state.errorFilesList.notePdF.length === 0 &&
      //   this.state.errorFilesList.wordDocument.length === 0 &&
      //   this.state.errorFilesList.supportingDocument.length === 0&&
      //   this.state.errorForCummulative ===false
      // ) {
      //   await this.handleSubmit(this.state.autoSaveStatus, false);
      // } else {
      //   if (this.state.errorForCummulative){
      //     this.setState({dialogboxForCummulativeError:true})
      //     return
      //   }

      //   this.setState({ isAutoSaveFailedDialog: true });
      // }
      await this.handleSubmit(this.state.autoSaveStatus, false);
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  private _getUserProperties = async (loginName: any): Promise<any> => {
    let designation = "NA";
    let email = "NA";

    const profile = await this.props.sp.profiles.getPropertiesFor(loginName);

    designation = profile.Title;
    email = profile.Email;

    const props: any = {};
    profile.UserProfileProperties.forEach(
      (prop: { Key: string | number; Value: any }) => {
        props[prop.Key] = prop.Value;
      }
    );

    profile.userProperties = props;

    return [designation, email];
  };

  private _getJsonifyReviewer = (item: any, type: string): any[] => {
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Reviewer") {
        return each;
      }
    });

    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 1,
      ...each,
    }));

    return approverData;
  };

  private _getJsonifyApprover = (item: any, type: string): any[] => {
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Approver") {
        return each;
      }
    });

    const approverData = approverfilterData.map((each: any) => ({
      text: each.approverEmailName,
      srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 2,
      ...each,
    }));

    return approverData;
  };

  private _getFileObj = async (data: any): Promise<File> => {
    const tenantUrl = `${window.location.protocol}//${window.location.host}`;

    const formatDateTime = (date: string | number | Date) => {
      const formattedDate = format(new Date(date), "dd-MMM-yyyy");
      const formattedTime = format(new Date(), "hh:mm a");
      return `${formattedDate} ${formattedTime}`;
    };

    const result = formatDateTime(data.TimeCreated);

    // Fetch file content as an array buffer to avoid corruption
    const fileContent = await this.props.sp.web
      .getFileByServerRelativePath(data.ServerRelativeUrl)
      .getBuffer();

    // Create a new File object using the array buffer
    const fileBlob = new Blob([fileContent], {
      type: `application/${data.Name.split(".").pop()}`,
    });
    const file = new File([fileBlob], data.Name, {
      type: `application/${data.Name.split(".").pop()}`,
      lastModified: new Date(data.TimeLastModified).getTime(),
    });

    // Add additional metadata to the file if needed
    (file as any).metadata = {
      index: 0,
      fileUrl: tenantUrl + data.ServerRelativeUrl,
      ServerRelativeUrl: data.ServerRelativeUrl,
      isExists: true,
      Modified: data.TimeLastModified,
      isSelected: false,
      size: parseInt(data.Length, 10),
      modifiedBy: data.Author.Title,
      createDate: result,
    };

    return file;
  };

  private _getItemDocumentsData = async () => {
    console.log(this._folderName)
    try {
      const tempFilesPdf: File[] = [];
      const tempFilesWordDocument: File[] = [];
      const tempFilesSupportingDocument: File[] = [];

      // PDF Files
      const folderItemsPdf = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/Pdf`)
        .files.select("*")
        .expand("Author", "Editor")();

      console.log(folderItemsPdf)
      for (const file of folderItemsPdf) {
        const fileObj = await this._getFileObj(file);
        tempFilesPdf.push(fileObj);
      }
      this.setState({ noteTofiles: tempFilesPdf });

      // Word Documents
      const folderItemsWordDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/WordDocument`)
        .files.select("*")
        .expand("Author", "Editor")();

      for (const file of folderItemsWordDocument) {
        const fileObj = await this._getFileObj(file);
        tempFilesWordDocument.push(fileObj);
      }
      this.setState({ wordDocumentfiles: tempFilesWordDocument });

      // Supporting Documents
      const SupportingDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/SupportingDocument`)
        .files.select("*")
        .expand("Author", "Editor")();

      for (const file of SupportingDocument) {
        const fileObj = await this._getFileObj(file);
        tempFilesSupportingDocument.push(fileObj);
      }
      this.setState({ supportingDocumentfiles: tempFilesSupportingDocument });
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  private _getCommentsData = (data: any) => {
    // Create a set to store unique ids
    const uniqueIds = new Set<string>();

    // Filter out duplicate entries based on the id property
    const filterdata = data
      .filter((each: any) => each !== null) // Filter out null values first
      .filter((each: any) => {
        if (!uniqueIds.has(each.id)) {
          uniqueIds.add(each.id);
          return true; // Include this object as it's the first occurrence of the id
        }
        return false; // Exclude this object if the id is already in the set
      });

    // console.log(filterdata);
    return filterdata;
  };

  private _getItemData = async (id: any, folderPath: any) => {
    const item: any = await this.props.sp.web.lists
      .getByTitle(this._listname)
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
      .expand("Author","Approvers", "Reviewers", "CurrentApprover")();

    this.title = item.Title;
    console.log(item,"Item..........")

    this.setState({
      title: item.Title,
      createdByEmail: item.Author.EMail,
      createdByEmailName: item.Author.Title,
      createdByID: item.AuthorId,
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
      puroposeFeildValue:
        item.Purpose !== null ? JSON.parse(item.Purpose)[0] : "",
      othersFieldValue:
        item.Purpose !== null ? JSON.parse(item.Purpose)[1] : "",
      isPuroposeVisable: (item.NatureOfNote !== null ) ? true : false,

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
      noteSecretaryDetails: JSON.parse(item.NoteSecretaryDTO),
      commentsLog:
        item.NoteApproverCommentsDTO !== null
          ? this._getCommentsData(JSON.parse(item.NoteApproverCommentsDTO))
          : [],
    });

    return item;
  };

  private getfield = async () => {
    try {
      const fieldDetails = await this.props.sp.web.lists
        .getByTitle(this._listname)
        .fields.filter("Hidden eq false and ReadOnlyField eq false")();

      const profile = await this.props.sp.profiles.myProperties();

      // this._userName = profile.DisplayName;
      // this._role = profile.Title;

      profile.UserProfileProperties.filter((element: any) => {
        if (element.Key === "Department") {
          this.setState({ department: element.Value });
        }
      });

      const filtering = fieldDetails.map((_x) => {
        if (_x.TypeDisplayName === "Choice") {
          return [_x.InternalName, _x.Choices];
        }
      });

      const finalList = filtering?.filter((each) => {
        if (typeof each !== "undefined") {
          return each;
        }
      });

      finalList?.map((each) => {
        if (
          each !== undefined &&
          Array.isArray(each) &&
          each.length > 1 &&
          Array.isArray(each[1])
        ) {
          if (each[0] === "NatureOfNote") {
            const natureOfNoteArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ natureOfNote: natureOfNoteArray });
          } else if (each[0] === "NoteType") {
            const noteTypeArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ noteType: noteTypeArray });
          } else if (each[0] === "NatureOfApprovalOrSanction") {
            const typeOfNatureOfApprovalSancation = each[1].map(
              (item, index) => {
                return { key: item, text: item };
              }
            );

            this.setState({
              natureOfApprovalSancation: typeOfNatureOfApprovalSancation,
            });
          } else if (each[0] === "FinancialType") {
            const typeOfFinancialNoteArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ typeOfFinancialNote: typeOfFinancialNoteArray });
          } else if (each[0] === "CommitteeName") {
            const committenameArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ committename: committenameArray });
          } else if (
            this.props.formType === "BoardNoteNew" &&
            each[0] === "BoardName"
          ) {
            const committenameArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ committename: committenameArray });
          } else if (each[0] === "Purpose") {
            const purposeArray = each[1].map((item, index) => {
              return { key: item, text: item };
            });

            this.setState({ purpose: purposeArray });
          }
        }
      });

      // Assuming fieldDetails is an array of items you want to add
      this.setState((prevState) => ({
        itemsFromSpList: [...prevState.itemsFromSpList, ...finalList],
        isLoading: false,
        isLoadingOnForm: false,
      }));
    } catch (error) {
      console.error("Error fetching field details: ", error);
    }
  };

  private _fetchApproverDetails = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (
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
      ).map(async (each: any) => {
        const user = await this.props.sp.web.siteUsers.getById(
          each.ApproverId
        )();

        const dataRec = await this._getUserProperties(user.LoginName);

        if (each.ApproverType === "Approver") {
          const newObj = {
            text: each.Approver.Title,
            email: each.Approver.EMail,
            ApproversId: each.ApproverId,
            approverType: each.ApproverType,
            // approversOrder: each.ApproverType === "Approver"?2:1,
            Title: each.Title,
            id: each.ApproverId,
            userId: each.ApproverId,
            secretary: each.Secretary.Title,
            secretaryEmail: each.Secretary.EMail,
            srNo: each.Approver.EMail.split("@")[0],
            optionalText: dataRec[0],
            approverTypeNum: 2,
          };
          // console.log(newObj);
          const secretaryObj = {
            noteSecretarieId: each.SecretaryId,
            noteApproverId: each.ApproverId,
            noteId: this._noteId,
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
                  ...secretaryObj,
                },
              ],
            });
          });
          if (
            each.ApproverType === "Approver" &&
            !this._itemId &&
            each.Approver.EMail !== this._currentUserEmail
          ) {
            this.setState({ peoplePickerApproverData: [newObj] });
          }
          // else{
          //   this.setState({ peoplePickerData: [newObj] });

          // }
        } else {
          const user = await this.props.sp.web.siteUsers.getById(
            each.ApproverId
          )();

          const dataRec = await this._getUserProperties(user.LoginName);

          const newObj = {
            text: each.Approver.Title,
            email: each.Approver.EMail,
            ApproversId: each.ApproverId,
            approverType: each.ApproverType,

            Title: each.Title,
            id: each.ApproverId,
            userId: each.ApproverId,
            secretary: "",
            secretaryEmail: "",
            optionalText: dataRec[0],
            srNo: each.Approver.EMail.split("@")[0],

            approverTypeNum: 1,
          };

          if (
            each.ApproverType === "Reviewer" &&
            !this._itemId &&
            each.Approver.EMail !== this._currentUserEmail
          ) {
            this.setState({ peoplePickerData: [newObj] });
          }
        }
      });

      await this.props.sp.web.lists
        .getByTitle("ATRCreators")
        .items.select("*", "ATRCreators/Title", "ATRCreators/EMail")
        .expand("ATRCreators")();
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  };

  private _getPeoplePickerItems = async (items: any[]) => {
    const dataRec = await this._getUserProperties(items[0].loginName);

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map(
        (obj: { [x: string]: any; loginName: any }) => {
          // console.log(obj);
          return {
            ApproversId: obj.id,
            Title: "",

            approverType: "Reviewer",
            email: obj.secondaryText,
            id: obj.id,
            optionalText: "N/A",
            approverTypeNum: 1,
            secretary: "",
            secretaryEmail: "",

            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
            text: obj.text,
          };
        }
      );

      this.setState({ reviewerInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map(
        (obj: { text: any; id: any; secondaryText: any; loginName: any }) => {
          return {
            ApproversId: obj.id,
            Title: "",
            approverType: "Reviewer",
            email: dataRec[1],
            id: obj.id,
            optionalText: dataRec[0],
            approverTypeNum: 1,
            secretary: "",
            secretaryEmail: "",

            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
            text: obj.text,
          };
        }
      );

      this.setState({ reviewerInfo: newItemsData });
    }
  };

  private _getPeoplePickerItemsApporvers = async (items: any[]) => {
    const checkSelectedApproverHasSecretary =
      this.state.approverIdsHavingSecretary.filter(
        (each: any) => each.ApproverId === items[0].id
      );
    // console.log(checkSelectedApproverHasSecretary)

    const secretaryObj = {
      noteSecretarieId: checkSelectedApproverHasSecretary[0]?.noteSecretarieId,
      noteApproverId: checkSelectedApproverHasSecretary[0]?.noteApproverId,
      noteId: this._noteId,
      secretaryEmail: checkSelectedApproverHasSecretary[0]?.secretaryEmail,
      approverEmail: checkSelectedApproverHasSecretary[0]?.approverEmail,
      approverEmailName:
        checkSelectedApproverHasSecretary[0]?.approverEmailName,
      secretaryEmailName:
        checkSelectedApproverHasSecretary[0]?.secretaryEmailName,
      createdBy: "",
      modifiedDate: "",
      modifiedBy: "",
    };

    const dataRec = await this._getUserProperties(items[0].loginName);

    if (typeof dataRec[0]?.toString() === "undefined") {
      const newItemsDataNA = items.map(
        (obj: { [x: string]: any; loginName: any }) => {
          // console.log(obj);
          return {
            ApproversId: obj.id,
            Title: "",

            approverType: "Approver",
            email: obj.secondaryText,
            id: obj.id,
            optionalText: "N/A",
            approverTypeNum: 2,
            secretary:
              checkSelectedApproverHasSecretary.length > 0
                ? checkSelectedApproverHasSecretary[0]?.secretaryEmailName
                : "",
            secretaryEmail:
              checkSelectedApproverHasSecretary[0]?.secretaryEmail,

            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
            text: obj.text,
          };
        }
      );
      // console.log(newItemsDataNA);

      this.setState({ approverInfo: newItemsDataNA });
    } else {
      const newItemsData = items.map(
        (obj: { text: any; id: any; secondaryText: any; loginName: any }) => {
          return {
            ApproversId: obj.id,
            Title: "",
            approverType: "Approver",
            email: dataRec[1],
            id: obj.id,
            optionalText: dataRec[0],
            approverTypeNum: 2,
            secretary:
              checkSelectedApproverHasSecretary.length > 0
                ? checkSelectedApproverHasSecretary[0]?.secretaryEmailName
                : "",
            secretaryEmail:
              checkSelectedApproverHasSecretary[0]?.secretaryEmail,

            srNo: dataRec[1].split("@")[0] || obj.secondaryText.split("@")[0],
            text: obj.text,
          };
        }
      );

      this.setState({ approverInfo: newItemsData });
    }
    checkSelectedApproverHasSecretary.length > 0 &&
      this.setState({
        noteSecretaryDetails: [
          ...this.state.noteSecretaryDetails,
          secretaryObj,
        ],
      });
  };

  public reOrderData = (reOrderData: any[], type: string): void => {
    if (type === "Reviewer") {
      this.setState({ peoplePickerData: reOrderData });
    } else {
      this.setState({ peoplePickerApproverData: reOrderData });
    }
  };

  public removeDataFromGrid = (dataItem: any, typeOfTable: string): void => {
    const filterNoteSecDetails = this.state.noteSecretaryDetails.filter(
      (each: any) => each.noteApproverId !== dataItem.id
    );
    this.setState((prev) => ({
      noteSecretaryDetails: filterNoteSecDetails,
    }));

    if (filterNoteSecDetails.length === 0) {
      this.setState({ wordDocumentfiles: [] });
    }

    if (typeOfTable === "Reviewer") {
      const filterData = this.state.peoplePickerData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerData: filterData });
    } else {
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

    const reviewerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );

    const reviewerInfo = this.state.reviewerInfo[0];
    const reviewerEmail = reviewerInfo.email || reviewerInfo.secondaryText;
    const reviewerName = reviewerInfo.text;

    // Condition checks
    const isReviewerOrApprover =
      reviewerTitles.includes(reviewerName) ||
      approverTitles.includes(reviewerName);

    const isCurrentUserReviewer = this._currentUserEmail === reviewerEmail;

    return isReviewerOrApprover || isCurrentUserReviewer;
  };

  private checkApprover = () => {
    const approverTitles = this.state.peoplePickerApproverData.map(
      (each: any) => each.text
    );

    const reveiwerTitles = this.state.peoplePickerData.map(
      (each: any) => each.text
    );

    const returnBoolean =
      reveiwerTitles.includes(this.state.approverInfo[0].text) ||
      approverTitles.includes(this.state.approverInfo[0].text) ||
      this._currentUserEmail ===
        (this.state.approverInfo[0].email ||
          this.state.approverInfo[0].secondaryText);
    return returnBoolean;
  };

  private _clearReviewerPeoplePicker = () => {
    this.setState({
      reviewerInfo: [],
      reviewerKey: this.state.reviewerKey + 1,
    }); // Update the key to force re-render
  };

  private _clearApproverPeoplePicker = () => {
    this.setState({
      approverInfo: [],
      approverKey: this.state.approverKey + 1,
    }); // Update the key to force re-render
  };

  private handleOnAdd = async (event: any, type: string): Promise<void> => {
    if (type === "reveiwer") {
      if (this.checkReviewer()) {
        this.setState({ isReviewerDialogHandel: false });
      } else {
        const getSecretaryDetails =
          this.state.approverIdsHavingSecretary.filter((each: any) => {
            return each.ApproverId === this.state.reviewerInfo[0].id;
          });

        if (getSecretaryDetails.length > 0) {
          this.setState((prev) => ({
            peoplePickerData: [
              ...prev.peoplePickerData,
              ...this.state.reviewerInfo,
            ],
          }));
        } else {
          this.setState((prev) => ({
            peoplePickerData: [
              ...prev.peoplePickerData,
              ...this.state.reviewerInfo,
            ],
          }));
        }
      }

      this._clearReviewerPeoplePicker();
    } else {
      if (this.checkApprover()) {
        this.setState({ isApproverOrReviewerDialogHandel: false });
      } else {
        const getSecretaryDetails =
          this.state.approverIdsHavingSecretary.filter((each: any) => {
            return each.ApproverId === this.state.approverInfo[0].id;
          });

        if (getSecretaryDetails.length > 0) {
          this.setState((prev) => ({
            peoplePickerApproverData: [
              ...prev.peoplePickerApproverData,
              ...this.state.approverInfo,
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

      this._clearApproverPeoplePicker();
    }
  };

  private handleCommittename = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";

    this.setState({
      committeeNameFeildValue: value,
      isWarningCommitteeName: !value, // Set warning state if value is empty
    });
  };

  private handleSubjectChange = (event: any) => {
    const { value } = event.target;
    const isWarning = !value && this.state.isWarningSubject;
    // console.log(isWarning);

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

    this.setState({
      isPuroposeVisable: true,
      natureOfNoteFeildValue: value,
      isWarningNatureOfNote: !value, // Set warning state if value is empty
    });

    this.setState({
      natureOfApprovalOrSanctionFeildValue: "",
      puroposeFeildValue: "",
      othersFieldValue: "",
    });

    // if (value === "Information" || value === "Ratification") {

    // }
  };

  private handleNatureOfApprovalOrSanctionChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption
  ): void => {
    const value = option ? option.text : "";

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

    this.setState({
      noteTypeFeildValue: value,
      isWarningNoteType: !value, // Set warning state if value is empty
    });

    if (value === "Non-Financial") {
      this.setState({
        typeOfFinancialNoteFeildValue: "",
        amountFeildValue: null,
      });
    }
  };

  public handletextBoxChange = (e: any, fieldName: string) => {
    const { value } = e.target;

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

    // Check if the search text field is empty and the warning state
    const isWarning = !value && this.state.isWarningSearchText;

    this.setState({
      searchTextFeildValue: value.substring(0, 250), // Restrict to 250 characters
      isWarningSearchText: isWarning,
    });
  };

  private handleAmountChange = (event: any) => {
    const { value } = event.target;

    // Regular expression to allow only positive numbers with up to 2 decimal places
    const isValid = /^[0-9]*\.?[0-9]{0,2}$/.test(value);

    if (isValid) {
      // Ensure the value is either empty or a valid positive number
      if (value === "" || parseFloat(value) > 0) {
        const isWarning = !value && this.state.isWarningAmountField;
        this.setState({
          amountFeildValue: value,
          isWarningAmountField: isWarning,
        });
      }
    }
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

    if (selectedKey !== "Others") {
      this.setState({ othersFieldValue: "" });
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
  private autoCreateSubFolder = async (
    parentFolderPath: string
  ): Promise<void> => {
    async function getFileArrayBuffer(file: any): Promise<ArrayBuffer> {
      if (file.arrayBuffer) {
        return await file.arrayBuffer();
      } else {
        let blob: Blob;
        if (file instanceof Blob) {
          blob = file;
        } else {
          blob = new Blob([file]);
        }

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
          errorCondition: this.state.errorFilesList.notePdF.length > 0,
        },
        {
          folderName: "SupportingDocument",
          files: this.state.supportingDocumentfiles,
          errorCondition:
            this.state.errorFilesList.supportingDocument.length > 0,
        },
        {
          folderName: "WordDocument",
          files: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : [],
          errorCondition: this.state.errorFilesList.wordDocument.length > 0,
        },
      ];

      // if (this.state.itemId &&
      //   (this.state.errorFilesList.notePdF.length > 0 ||
      //    this.state.errorFilesList.wordDocument.length > 0 ||
      //    this.state.errorFilesList.supportingDocument.length > 0 ||
      //    this.state.errorForCummulative)) {
      //   console.log("Conditions prevent file upload. Exiting...");
      //   return;
      // }

      const gistFolderPath = `${parentFolderPath}/GistDocuments`;

      let gistFolderExists = false;

      if (!gistFolderExists) {
        await sp.web.rootFolder.folders.addUsingPath(gistFolderPath);
      } else {
        try {
          // Check if folder already exists
          await sp.web.getFolderByServerRelativePath(gistFolderPath)();
          gistFolderExists = true;
        } catch (error) {
          if (error.status === 404) {
            gistFolderExists = false;
          } else {
            throw error;
          }
        }
      }

      for (const { folderName, files, errorCondition } of filesDataArray) {
        const siteUrl = `${parentFolderPath}/${folderName}`;
        let folderExists = false;

        // Create the folder if it doesn't exist
        if (!folderExists) {
          await sp.web.rootFolder.folders.addUsingPath(siteUrl);
          // console.log(`Folder '${folderName}' created successfully`);
        } else {
          try {
            // Check if folder already exists
            await sp.web.getFolderByServerRelativePath(siteUrl)();
            folderExists = true;
          } catch (error) {
            if (error.status === 404) {
              folderExists = false;
            } else {
              throw error;
            }
          }
        }

        // If there's an error, skip file upload and show appropriate dialog
        if (errorCondition) {
          // console.log(`Skipping file upload for '${folderName}' due to error condition`);

          // Show the dialog based on error type
          if (this.state.errorForCummulative) {
            // this.setState({ dialogboxForCummulativeError: true });
            return;
          } else {
            // this.setState({ isAutoSaveFailedDialog: true });

            continue;
          }
        }

        // Proceed with file upload if no error condition
        for (const file of files) {
          // console.log("File Uploading .........")
          const arrayBuffer = await getFileArrayBuffer(file);
          try{
            await sp.web
            .getFolderByServerRelativePath(siteUrl)
            .files.addUsingPath(file.name, arrayBuffer, {
              Overwrite: true,
            });

          }catch(e){
            // console.log(console.log('e',e));
            
          }
         
        }
        !this.state.autosave &&
        this.setState({ isLoadingOnForm: false, isVisibleAlter: true });
      }
      // this.setState({ isLoadingOnForm: false, isVisibleAlter: true });
    } catch (error) {
      console.error(`Error creating folder: ${error}`);
    }
  };

  private createSubFolder = async (parentFolderPath: string): Promise<void> => {
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
          files: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : [],
        },
      ];
      // console.log(this.state.itemId)

      if (this.state.itemId) {
        // console.log("auto save triggered");
        await this.autoCreateSubFolder(parentFolderPath);

        return;
      }

      // if (this._checkSecertaryIsAvailable()) {
      const gistFolderPath = `${parentFolderPath}/GistDocuments`;
      let gistFolderExists = false;

      if (!gistFolderExists) {
        await sp.web.rootFolder.folders.addUsingPath(gistFolderPath);
      } else {
        try {
          // Check if folder already exists
          await sp.web.getFolderByServerRelativePath(gistFolderPath)();
          gistFolderExists = true;
        } catch (error) {
          if (error.status === 404) {
            gistFolderExists = false;
          } else {
            throw error;
          }
        }
      }
      // }

      for (const { folderName, files } of filesDataArray) {
        // console.log(folderName)
        const siteUrl = `${parentFolderPath}/${folderName}`;
        // console.log(siteUrl);

        // Check if the folder already exists
        let folderExists = false;
        if (!folderExists) {
          await sp.web.rootFolder.folders.addUsingPath(siteUrl);
          // console.log(`Folder '${folderName}' created successfully`);
        } else {
          try {
            // Check if folder already exists
            await sp.web.getFolderByServerRelativePath(siteUrl)();
            folderExists = true;
          } catch (error) {
            if (error.status === 404) {
              folderExists = false;
            } else {
              throw error;
            }
          }
        }

        for (const file of files) {
          // console.log(file);

          // Get the ArrayBuffer of the file
          const arrayBuffer = await getFileArrayBuffer(file);
          // console.log(arrayBuffer);

          // Upload the file to the SharePoint Library
          await sp.web
            .getFolderByServerRelativePath(siteUrl)
            .files.addUsingPath(file.name, arrayBuffer, {
              Overwrite: true,
            });
            // console.log(file.name,`update ${file.name}`)
        }

        // console.log(`Folder '${folderName}' created successfully in list`);
      }
      // console.log(this._itemId);
      

     
        this.setState({ isLoadingOnForm: false, isVisibleAlter: true });
    } catch (error) {
      // console.error(`Error creating folder: ${error}`);
    }
  };

  private createFolder = async (req: string): Promise<void> => {
    const folderName = req.replace(/\//g, "-");
    try {
      // console.log(this.props.context.pageContext.web.serverRelativeUrl);
      const absUrl = this.props.context.pageContext.web.serverRelativeUrl;
      this._folderName = `${absUrl}/${this._libraryName}/${folderName}`;

      const siteUrl = `${absUrl}/${this._libraryName}/${folderName}`;
      // console.log(siteUrl);

      // Check if the folder already exists
      let folderExists = false;

      if (!folderExists) {
        // Create the folder if it doesn't exist
        await this.props.sp.web.folders.addUsingPath(siteUrl);
        // console.log(`Folder '${folderName}' created successfully in list`);
      } else {
        // console.log(`Folder '${folderName}' already exists`);
        try {
          await this.props.sp.web.getFolderByServerRelativePath(siteUrl)();
          folderExists = true;
        } catch (error) {
          if (error.status === 404) {
            folderExists = false;
          } else {
            throw error;
          }
        }
      }

      // eslint-disable-next-line no-void
      await this.createSubFolder(siteUrl);
    } catch (error) {
      // console.error(`Error creating folder: ${error}`);
    }
  };

  private _getApproverDetails = (
    reveiwerData: any,
    apporverData: any,
    typeOfParameter: any
  ): any => {
    const dataOfReveiwerAndApprover = [...reveiwerData, ...apporverData];
    // console.log(dataOfReveiwerAndApprover);
    const finalData = dataOfReveiwerAndApprover.map(
      (each: any, index: number) => {
        // console.log(each);

        if (each.approverType === "Reviewer") {
          return {
            ...each,
            approverType: each.approverType,
            approverEmail: each.email,
            approverOrder: index + 1,
            approverStatus: 1,
            id: each.id,
            userId: each.id,
            status: index === 0 ? "Pending" : "Waiting",
            statusNumber: index === 0 ? "2000" : "",
            mainStatus: index === 0 ? "Pending with reviewer" : "Waiting",
            email: each.email,
            designation: each.optionalText,
            approverEmailName: each.text,
            srNo: each.srNo,
            actionDate: "",
          };
        } else {
          return {
            ...each,
            approverType: each.approverType,
            approverEmail: each.email,
            approverOrder: index + 1,
            approverStatus: 1,
            id: each.id,
            userId: each.id,
            statusNumber: index === 0 ? "3000" : "",
            status: index === 0 ? "Pending" : "Waiting",
            mainStatus: index === 0 ? "Pending with approver" : "Waiting",
            email: each.email,
            designation: each.optionalText,
            approverEmailName: each.text,
            srNo: each.srNo,
            actionDate: "",
          };
        }
      }
    );
    // console.log(finalData);

    // console.log(JSON.stringify(finalData));

    if (typeOfParameter === "intialOrderApproverDetails") {
      return JSON.stringify([finalData[0]]);
    } else {
      return JSON.stringify(finalData);
    }
  };

  private _getAuditTrail = (status: any): any => {
    // console.log(this._userName, this._role);
    const auditLog = [
      {
        actionBy: this.props.context.pageContext.user.displayName,

        action:
          this.props.formType === "New"
            ? `ECommittee Note ${status}`
            : `Board Note ${status}`,

        createdDate:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
      },
    ];
    // console.log(this.state.auditTrail);

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
    // console.log(nw);
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
    // console.log(nw);
    return nw;
  };

  private _getCurrentApproverId = (data: any, purpose: any) => {
    // console.log(data, "...data", purpose, "...purpose");
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

    // console.log(nw);

    if (purpose === "intialOrderApproverDetails") {
      return nw[0];
    } else {
      const finalApprover = nw[nw.length - 1];
      return finalApprover;
    }
  };

  private createEcommitteeObject = async (
    status: string,
    statusNumber: any
  ): Promise<INoteObject> => {
    // console.log(status);
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
      Purpose: JSON.stringify([
        this.state.puroposeFeildValue,
        this.state.othersFieldValue,
      ]),

      NoteApproversDTO: this._getApproverDetails(
        this.state.peoplePickerData,
        this.state.peoplePickerApproverData,
        "allDetails"
      ),
      Status: status === "Drafted" ? "Draft" : status,
      StatusNumber: status === "Submitted" ? statusNumber : "100",
      AuditTrail:
        this.state.status === "Call Back"
          ? this._getAuditTrail("Submitted")
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
      startProcessing: true,
      AutoSave: this.state.autosave,
      PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
      CommitteeType:
        this.props.formType === "BoardNoteNew" ? "Board" : "Committee",
    };
    // console.log(ecommitteObject);
    return ecommitteObject;
  };

  // Show the dialog
  private showDialog = () => {
    this.setState({ isConfirmationDialogVisible: true });
  };

  // Hide the dialog
  private handleCancelDialog = () => {
    this.setState({ isConfirmationDialogVisible: false });
  };

  private handleConfirmSubmit = async (): Promise<void> => {
    // this.handleCancelDialog(); // Hide the dialog
    if (this.state.itemId && this.state.statusNumber === "100") {
      await this.handleUpdate(true);
    } else if (
      this._itemId &&
      (this.state.statusNumber === "1000" ||
        this.state.statusNumber === "100" ||
        this.state.statusNumber === "5000")
    ) {
      await this.handleUpdate(true);
    } else {
      // console.log("submit is triggered");
      await this.handleSubmit("Submitted", true);
    }
  };

  private _checkValidation = (): any => {
    // console.log(this.state);
    let fieldValues: any;
    let conditionNumber: any;
    // let subCondition:any;
    if (
      (this.state.natureOfNoteFeildValue === "Approval" ||
        this.state.natureOfNoteFeildValue === "Sanction") &&
      this.state.noteTypeFeildValue === "Financial"
    ) {
      conditionNumber = 1;
      //
      // console.log("Approval", "Sanction", "Financial");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Financial");

        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Financial", "Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,
            typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
            amount: this.state.amountFeildValue,
            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,
            others: this.state.othersFieldValue,

            ////
            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            // supportingDocumentfiles: this.state.supportingDocumentfiles,

            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataion: fieldValues });
        } else {
          // console.log("Approval", "Financial", "non-Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,
            typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
            amount: this.state.amountFeildValue,
            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,

            ////

            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            //  // supportingDocumentfiles: this.state.supportingDocumentfiles,

            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataion: fieldValues });
        }
      } else {
        // console.log("Sanction", "Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,
          natureOfApprovalOrSanction:
            this.state.natureOfApprovalOrSanctionFeildValue,
          noteType: this.state.noteTypeFeildValue,
          typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
          amount: this.state.amountFeildValue,
          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,

          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Approval" ||
        this.state.natureOfNoteFeildValue === "Sanction") &&
      this.state.noteTypeFeildValue === "Non-Financial"
    ) {
      conditionNumber = 2;
      // console.log("Approval", "Sanction", "Non-Financial");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Non-Financial");
        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Non-Financial", "Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,

            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,
            others: this.state.othersFieldValue,

            ////

            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            // supportingDocumentfiles: this.state.supportingDocumentfiles,

            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataion: fieldValues });
        } else {
          // console.log("Approval", "Non-Financial", "non-Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,
            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,

            ////

            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            // supportingDocumentfiles: this.state.supportingDocumentfiles,
            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataion: fieldValues });
        }
      } else {
        // console.log("Sanction", "Non-Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,
          natureOfApprovalOrSanction:
            this.state.natureOfApprovalOrSanctionFeildValue,
          noteType: this.state.noteTypeFeildValue,
          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,

          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Information" ||
        this.state.natureOfNoteFeildValue === "Ratification") &&
      this.state.noteTypeFeildValue === "Financial"
    ) {
      conditionNumber = 3;
      if (this.state.natureOfNoteFeildValue === "Information") {
        // console.log("Information", "Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,

          noteType: this.state.noteTypeFeildValue,
          typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
          amount: this.state.amountFeildValue,
          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,
          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      } else {
        // console.log("Ratification", "Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,

          noteType: this.state.noteTypeFeildValue,
          typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
          amount: this.state.amountFeildValue,
          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,
          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Information" ||
        this.state.natureOfNoteFeildValue === "Ratification") &&
      this.state.noteTypeFeildValue === "Non-Financial"
    ) {
      conditionNumber = 4;
      if (this.state.natureOfNoteFeildValue === "Information") {
        // console.log("Information", "Non-Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,

          noteType: this.state.noteTypeFeildValue,

          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,
          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      } else {
        // console.log("Ratification", "Non-Financial");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,

          noteType: this.state.noteTypeFeildValue,

          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////

          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,

          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      }
    } else if (
      this.state.natureOfNoteFeildValue === "Approval" ||
      this.state.natureOfNoteFeildValue === "Sanction"
    ) {
      conditionNumber = 5;
      // console.log("Approval", "Sanction");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Financial");
        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Financial", "Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,

            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,
            others: this.state.othersFieldValue,

            ////

            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            // supportingDocumentfiles: this.state.supportingDocumentfiles,

            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataion: fieldValues });
        } else {
          // console.log("Approval", "non-Others");
          fieldValues = {
            committeeName: this.state.committeeNameFeildValue,
            subject: this.state.subjectFeildValue,
            natureOfNote: this.state.natureOfNoteFeildValue,
            natureOfApprovalOrSanction:
              this.state.natureOfApprovalOrSanctionFeildValue,
            noteType: this.state.noteTypeFeildValue,

            searchText: this.state.searchTextFeildValue,
            purpose: this.state.puroposeFeildValue,

            ////
            noteTofiles: this.state.noteTofiles,

            wordDocumentfiles: this._checkSecertaryIsAvailable()
              ? this.state.wordDocumentfiles
              : false,

            // supportingDocumentfiles: this.state.supportingDocumentfiles,
            // noteTofiles: this.state.noteTofiles.length ===0,

            // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

            // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
            errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
            errorInWordDocFiles:
              this.state.errorFilesList.wordDocument.length > 0,
            errorInSupportingDocFiles:
              this.state.errorFilesList.supportingDocument.length > 0,

            AppoverData: this.state.peoplePickerApproverData,
            cummulativeErrorDisplay: this.state.errorForCummulative,
          };
          // console.log(fieldValues);/
          this.setState({ eCommitteDataForValidataion: fieldValues });
        }
      } else {
        // console.log("Sanction");
        fieldValues = {
          committeeName: this.state.committeeNameFeildValue,
          subject: this.state.subjectFeildValue,
          natureOfNote: this.state.natureOfNoteFeildValue,
          natureOfApprovalOrSanction:
            this.state.natureOfApprovalOrSanctionFeildValue,
          noteType: this.state.noteTypeFeildValue,

          searchText: this.state.searchTextFeildValue,
          purpose: this.state.puroposeFeildValue,

          ////
          noteTofiles: this.state.noteTofiles,

          wordDocumentfiles: this._checkSecertaryIsAvailable()
            ? this.state.wordDocumentfiles
            : false,

          // supportingDocumentfiles: this.state.supportingDocumentfiles,

          // noteTofiles: this.state.noteTofiles.length ===0,

          // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

          // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
          errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
          errorInWordDocFiles:
            this.state.errorFilesList.wordDocument.length > 0,
          errorInSupportingDocFiles:
            this.state.errorFilesList.supportingDocument.length > 0,

          AppoverData: this.state.peoplePickerApproverData,
          cummulativeErrorDisplay: this.state.errorForCummulative,
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataion: fieldValues });
      }
    } else if (this.state.noteTypeFeildValue === "Financial") {
      // console.log("Financial");
      conditionNumber = 6;
      fieldValues = {
        committeeName: this.state.committeeNameFeildValue,
        subject: this.state.subjectFeildValue,
        natureOfNote: this.state.natureOfNoteFeildValue,

        noteType: this.state.noteTypeFeildValue,
        typeOfFinancialNote: this.state.typeOfFinancialNoteFeildValue,
        amount: this.state.amountFeildValue,
        searchText: this.state.searchTextFeildValue,

        ////

        noteTofiles: this.state.noteTofiles,

        wordDocumentfiles: this._checkSecertaryIsAvailable()
          ? this.state.wordDocumentfiles
          : false,

        // supportingDocumentfiles: this.state.supportingDocumentfiles,
        // noteTofiles: this.state.noteTofiles.length ===0,

        // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

        // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
        errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
        errorInWordDocFiles: this.state.errorFilesList.wordDocument.length > 0,
        errorInSupportingDocFiles:
          this.state.errorFilesList.supportingDocument.length > 0,

        AppoverData: this.state.peoplePickerApproverData,
        cummulativeErrorDisplay: this.state.errorForCummulative,
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataion: fieldValues });
    } else if (this.state.noteTypeFeildValue === "Non-Financial") {
      // console.log("Non-Financial");
      conditionNumber = 7;
      fieldValues = {
        committeeName: this.state.committeeNameFeildValue,
        subject: this.state.subjectFeildValue,
        natureOfNote: this.state.natureOfNoteFeildValue,

        noteType: this.state.noteTypeFeildValue,

        searchText: this.state.searchTextFeildValue,

        ////

        noteTofiles: this.state.noteTofiles,

        wordDocumentfiles: this._checkSecertaryIsAvailable()
          ? this.state.wordDocumentfiles
          : false,

        // supportingDocumentfiles: this.state.supportingDocumentfiles,
        // noteTofiles: this.state.noteTofiles.length ===0,

        // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

        // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
        errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
        errorInWordDocFiles: this.state.errorFilesList.wordDocument.length > 0,
        errorInSupportingDocFiles:
          this.state.errorFilesList.supportingDocument.length > 0,

        AppoverData: this.state.peoplePickerApproverData,
        cummulativeErrorDisplay: this.state.errorForCummulative,
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataion: fieldValues });
    } else {
      conditionNumber = 8;

      fieldValues = {
        committeeName: this.state.committeeNameFeildValue,
        subject: this.state.subjectFeildValue,
        natureOfNote: this.state.natureOfNoteFeildValue,

        noteType: this.state.noteTypeFeildValue,

        searchText: this.state.searchTextFeildValue,
        purpose: this.state.puroposeFeildValue,

        ////

        noteTofiles: this.state.noteTofiles,

        wordDocumentfiles: this._checkSecertaryIsAvailable()
          ? this.state.wordDocumentfiles
          : false,

        // supportingDocumentfiles: this.state.supportingDocumentfiles,
        // noteTofiles: this.state.noteTofiles.length ===0,

        // wordDocumentfiles:this.state.wordDocumentfiles.length ===0,

        // supportingDocumentfiles:this.state.supportingDocumentfiles.length ===0,
        errorInPdfFiles: this.state.errorFilesList.notePdF.length > 0,
        errorInWordDocFiles: this.state.errorFilesList.wordDocument.length > 0,
        errorInSupportingDocFiles:
          this.state.errorFilesList.supportingDocument.length > 0,

        AppoverData: this.state.peoplePickerApproverData,
        cummulativeErrorDisplay: this.state.errorForCummulative,
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataion: fieldValues });
    }
    // console.log(conditionNumber, "Condition Number");

    const warn: any = {
      committeeName: [
        this.state.committeeNameFeildValue,
        "isWarningCommitteeName",
        "committeeName",
      ],
      subject: [this.state.subjectFeildValue, "isWarningSubject", "subject"],
      natureOfNote: [
        this.state.natureOfNoteFeildValue,
        "isWarningNatureOfNote",
        "natureOfNote",
      ],
      natureOfApprovalOrSanction: [
        this.state.natureOfApprovalOrSanctionFeildValue,
        "isWarningNatureOfApporvalOrSanction",
        "natureOfApprovalOrSanction",
      ],
      noteType: [
        this.state.noteTypeFeildValue,
        "isWarningNoteType",
        "noteType",
      ],
      typeOfFinancialNote: [
        this.state.typeOfFinancialNoteFeildValue,
        "isWarningTypeOfFinancialNote",
        "typeOfFinancialNote",
      ],
      amount: [this.state.amountFeildValue, "isWarningAmountField", "amount"],
      searchText: [
        this.state.searchTextFeildValue,
        "isWarningSearchText",
        "searchText",
      ],
      purpose: [
        this.state.puroposeFeildValue,
        "isWarningPurposeField",
        "purpose",
      ],
      others: [this.state.othersFieldValue, "isWarningOthersField", "others"],
    };

    // console.log(warn)
    // console.log(
    //   fieldValues,
    //   "Final FieldValues........................................"
    // );

    const newWarnObj: any = {};
    Object.keys(fieldValues).map((each: keyof typeof fieldValues) => {
      // console.log(each);
      if (fieldValues[each] === "" || fieldValues[each] === null) {
        // console.log("entred", each,fieldValues[each]);
        // console.log(warn[each],"Warning ...........")
        // console.log(warn[each][1],"Warning ...........1111111")

        newWarnObj[warn[each][1]] = true;
      }
    });
    // console.log(newWarnObj,"Warning check")
    this.setState({ ...newWarnObj });

    // console.log(dialogVisableWarn, "Dialog Visable Warn");

    const dialogVisable = Object.keys(fieldValues).every(
      (each: keyof typeof fieldValues) => {
        // console.log(each);
        if (
          fieldValues[each] === "" ||
          fieldValues[each] === null ||
          fieldValues[each].length === 0 ||
          fieldValues[each] === true
        ) {
          // console.log("entred", each,fieldValues[each]);

          return false;
        }
        return true;
      }
    );

    // console.log(dialogVisable, "Dialog Visable");
    this.setState({ conditionNumber: conditionNumber });
    return dialogVisable;
  };

  private _checkValidationArray = (): any => {
    // console.log(this.state);
    let conditionNumArray: any = "";
    // console.log(this.state.noteSecretaryDetails.length > 0 ,"Checking secretary exist or not")
    let fieldValues;
    if (
      (this.state.natureOfNoteFeildValue === "Approval" ||
        this.state.natureOfNoteFeildValue === "Sanction") &&
      this.state.noteTypeFeildValue === "Financial"
    ) {
      conditionNumArray = 1;
      // condition = 1
      // console.log("Approval", "Sanction", "Financial");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Financial");
        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Financial", "Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],
            typeOfFinancialNote: [
              this.state.typeOfFinancialNoteFeildValue,
              "Type of Financial Note",
            ],
            amount: [this.state.amountFeildValue, "Amount"],
            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],
            others: [this.state.othersFieldValue, "others"],
            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],

            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],
            wordDocumentfiles:
            (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
                ? [
                    this.state.wordDocumentfiles,
                    "Please select Valid Word Doc File",
                  ]
                : [false, "Please select Valid Word Doc File"],
            // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        } else {
          // console.log("Approval", "Financial", "non-Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],
            typeOfFinancialNote: [
              this.state.typeOfFinancialNoteFeildValue,
              "Type of Financial Note",
            ],
            amount: [this.state.amountFeildValue, "Amount"],
            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],

            searchTextFeildValue: [
              this.state.searchTextFeildValue,
              "Search Text",
            ],
            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],
            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],

            wordDocumentfiles:
            (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
                ? [
                    this.state.wordDocumentfiles,
                    "Please select Valid Word Doc File",
                  ]
                : [false, "Please select Valid Word Doc File"],
            //  // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        }
      } else {
        // console.log("Sanction", "Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
          natureOfApprovalOrSanction: [
            this.state.natureOfApprovalOrSanctionFeildValue,
            "Nature of Approval Or Sanction",
          ],
          noteType: [this.state.noteTypeFeildValue, "Note Type"],
          typeOfFinancialNote: [
            this.state.typeOfFinancialNoteFeildValue,
            "Type of Financial Note",
          ],
          amount: [this.state.amountFeildValue, "Amount"],
          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],
          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Approval" ||
        this.state.natureOfNoteFeildValue === "Sanction") &&
      this.state.noteTypeFeildValue === "Non-Financial"
    ) {
      conditionNumArray = 2;
      // condition = 2
      // console.log("Approval", "Sanction", "Non-Financial");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Non-Financial");
        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Non-Financial", "Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],

            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],
            others: [this.state.othersFieldValue, "others"],

            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],

            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],
            wordDocumentfiles:
            (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
                ? [
                    this.state.wordDocumentfiles,
                    "Please select Valid Word Doc File",
                  ]
                : [false, "Please select Valid Word Doc File"],
            // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        } else {
          // console.log("Approval", "Non-Financial", "non-Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],

            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],
            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],

            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],
            wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
            // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        }
      } else {
        // console.log("Sanction", "Non-Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
          natureOfApprovalOrSanction: [
            this.state.natureOfApprovalOrSanctionFeildValue,
            "Nature of Approval Or Sanction",
          ],
          noteType: [this.state.noteTypeFeildValue, "Note Type"],

          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],

          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Information" ||
        this.state.natureOfNoteFeildValue === "Ratification") &&
      this.state.noteTypeFeildValue === "Financial"
    ) {
      conditionNumArray = 3;
      // condition = 3
      if (this.state.natureOfNoteFeildValue === "Information") {
        // console.log("Information", "Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

          noteType: [this.state.noteTypeFeildValue, "Note Type"],
          typeOfFinancialNote: [
            this.state.typeOfFinancialNoteFeildValue,
            "Type of Financial Note",
          ],
          amount: [this.state.amountFeildValue, "Amount"],
          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],
          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      } else {
        // console.log("Ratification", "Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

          noteType: [this.state.noteTypeFeildValue, "Note Type"],
          typeOfFinancialNote: [
            this.state.typeOfFinancialNoteFeildValue,
            "Type of Financial Note",
          ],
          amount: [this.state.amountFeildValue, "Amount"],
          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],

          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      }
    } else if (
      (this.state.natureOfNoteFeildValue === "Information" ||
        this.state.natureOfNoteFeildValue === "Ratification") &&
      this.state.noteTypeFeildValue === "Non-Financial"
    ) {
      conditionNumArray = 4;
      // condition = 4
      if (this.state.natureOfNoteFeildValue === "Information") {
        // console.log("Information", "Non-Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

          noteType: [this.state.noteTypeFeildValue, "Note Type"],

          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],
          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      } else {
        // console.log("Ratification", "Non-Financial");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

          noteType: [this.state.noteTypeFeildValue, "Note Type"],

          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],
          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      }
    } else if (
      this.state.natureOfNoteFeildValue === "Approval" ||
      this.state.natureOfNoteFeildValue === "Sanction"
    ) {
      conditionNumArray = 5;
      // console.log("Approval", "Sanction");
      if (this.state.natureOfNoteFeildValue === "Approval") {
        // console.log("Approval", "Financial");
        if (this.state.puroposeFeildValue === "Others") {
          // console.log("Approval", "Financial", "Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],

            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],
            others: [this.state.othersFieldValue, "others"],
            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],

            ////

            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],
            wordDocumentfiles:
            (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
                ? [
                    this.state.wordDocumentfiles,
                    "Please select Valid Word Doc File",
                  ]
                : [false, "Please select Valid Word Doc File"],
            // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        } else {
          // console.log("Approval", "non-Others");
          fieldValues = {
            committeeName: [
              this.state.committeeNameFeildValue,
              "Committe Name",
            ],
            subject: [this.state.subjectFeildValue, "Subject"],
            natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
            natureOfApprovalOrSanction: [
              this.state.natureOfApprovalOrSanctionFeildValue,
              "Nature of Approval Or Sanction",
            ],
            noteType: [this.state.noteTypeFeildValue, "Note Type"],

            searchText: [this.state.searchTextFeildValue, "Search Text"],
            purpose: [this.state.puroposeFeildValue, "Purpose"],
            AppoverData: [
              this.state.peoplePickerApproverData,
              "Please select atleast one Approver to submit request",
            ],

            ////
            noteTofiles: [
              this.state.noteTofiles,
              "Please select Valid Pdf File",
            ],
            wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
            // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
            errorInPdfFiles: [
              this.state.errorFilesList.notePdF.length > 0,
              "Please select Valid Pdf File...",
            ],
            errorInWordDocFiles: [
              this.state.errorFilesList.wordDocument.length > 0,
              "Please select Valid Word File...",
            ],
            errorInSupportingDocFiles: [
              this.state.errorFilesList.supportingDocument.length > 0,
              "Please select Valid Supporting Files...",
            ],

            cummulativeErrorDisplay: [
              this.state.errorForCummulative,
              "Cumulative size of all the supporting documents should not exceed 25 MB.",
            ],
          };
          // console.log(fieldValues);/
          this.setState({ eCommitteDataForValidataionDialog: fieldValues });
        }
      } else {
        // console.log("Sanction");
        fieldValues = {
          committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
          subject: [this.state.subjectFeildValue, "Subject"],
          natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],
          natureOfApprovalOrSanction: [
            this.state.natureOfApprovalOrSanctionFeildValue,
            "Nature of Approval Or Sanction",
          ],
          noteType: [this.state.noteTypeFeildValue, "Note Type"],

          searchText: [this.state.searchTextFeildValue, "Search Text"],
          purpose: [this.state.puroposeFeildValue, "Purpose"],
          AppoverData: [
            this.state.peoplePickerApproverData,
            "Please select atleast one Approver to submit request",
          ],

          noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],

          wordDocumentfiles:
          (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
              ? [
                  this.state.wordDocumentfiles,
                  "Please select Valid Word Doc File",
                ]
              : [false, "Please select Valid Word Doc File"],
          // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
          errorInPdfFiles: [
            this.state.errorFilesList.notePdF.length > 0,
            "Please select Valid Pdf File...",
          ],
          errorInWordDocFiles: [
            this.state.errorFilesList.wordDocument.length > 0,
            "Please select Valid Word File...",
          ],
          errorInSupportingDocFiles: [
            this.state.errorFilesList.supportingDocument.length > 0,
            "Please select Valid Supporting Files...",
          ],

          cummulativeErrorDisplay: [
            this.state.errorForCummulative,
            "Cumulative size of all the supporting documents should not exceed 25 MB.",
          ],
        };
        // console.log(fieldValues);
        this.setState({ eCommitteDataForValidataionDialog: fieldValues });
      }
    } else if (this.state.noteTypeFeildValue === "Financial") {
      conditionNumArray = 6;
      // condition = 6
      // console.log("Financial");
      fieldValues = {
        committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
        subject: [this.state.subjectFeildValue, "Subject"],
        natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

        noteType: [this.state.noteTypeFeildValue, "Note Type"],
        typeOfFinancialNote: [
          this.state.typeOfFinancialNoteFeildValue,
          "Type of Financial Note",
        ],
        amount: [this.state.amountFeildValue, "Amount"],
        searchText: [this.state.searchTextFeildValue, "Search Text"],
        AppoverData: [
          this.state.peoplePickerApproverData,
          "Please select atleast one Approver to submit request",
        ],

        noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
        wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
        // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
        errorInPdfFiles: [
          this.state.errorFilesList.notePdF.length > 0,
          "Please select Valid Pdf File...",
        ],
        errorInWordDocFiles: [
          this.state.errorFilesList.wordDocument.length > 0,
          "Please select Valid Word File...",
        ],
        errorInSupportingDocFiles: [
          this.state.errorFilesList.supportingDocument.length > 0,
          "Please select Valid Supporting Files...",
        ],

        cummulativeErrorDisplay: [
          this.state.errorForCummulative,
          "Cumulative size of all the supporting documents should not exceed 25 MB.",
        ],
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataionDialog: fieldValues });
    } else if (this.state.noteTypeFeildValue === "Non-Financial") {
      conditionNumArray = 7;
      // condition = 7
      // console.log("Non-Financial");
      fieldValues = {
        committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
        subject: [this.state.subjectFeildValue, "Subject"],
        natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

        noteType: [this.state.noteTypeFeildValue, "Note Type"],

        searchText: [this.state.searchTextFeildValue, "Search Text"],
        AppoverData: [
          this.state.peoplePickerApproverData,
          "Please select atleast one Approver to submit request",
        ],

        noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
        wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
        // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
        errorInPdfFiles: [
          this.state.errorFilesList.notePdF.length > 0,
          "Please select Valid Pdf File...",
        ],
        errorInWordDocFiles: [
          this.state.errorFilesList.wordDocument.length > 0,
          "Please select Valid Word File...",
        ],
        errorInSupportingDocFiles: [
          this.state.errorFilesList.supportingDocument.length > 0,
          "Please select Valid Supporting Files...",
        ],

        cummulativeErrorDisplay: [
          this.state.errorForCummulative,
          "Cumulative size of all the supporting documents should not exceed 25 MB.",
        ],
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataionDialog: fieldValues });
    } else {
      conditionNumArray = 8;
      // condition =8
      fieldValues = {
        committeeName: [this.state.committeeNameFeildValue, "Committe Name"],
        subject: [this.state.subjectFeildValue, "Subject"],
        natureOfNote: [this.state.natureOfNoteFeildValue, "Nature of Note"],

        noteType: [this.state.noteTypeFeildValue, "Note Type"],

        searchText: [this.state.searchTextFeildValue, "Search Text"],
        purpose: [this.state.puroposeFeildValue, "Purpose"],
        AppoverData: [
          this.state.peoplePickerApproverData,
          "Please select atleast one Approver to submit request",
        ],
        noteTofiles: [this.state.noteTofiles, "Please select Valid Pdf File"],
      
       
        wordDocumentfiles:
        (this._checkSecertaryIsAvailable() && this.state.wordDocumentfiles.length ===0)
            ? [
                this.state.wordDocumentfiles,
                "Please select Valid Word Doc File",
              ]
            : [false, "Please select Valid Word Doc File"],
        // supportingDocumentfiles: [this.state.supportingDocumentfiles, ""],
        errorInPdfFiles: [
          this.state.errorFilesList.notePdF.length > 0,
          "Please select Valid Pdf File...",
        ],
        errorInWordDocFiles: [
          this.state.errorFilesList.wordDocument.length > 0,
          "Please select Valid Word File...",
        ],
        errorInSupportingDocFiles: [
          this.state.errorFilesList.supportingDocument.length > 0,
          "Please select Valid Supporting Files...",
        ],

        cummulativeErrorDisplay: [
          this.state.errorForCummulative,
          "Cumulative size of all the supporting documents should not exceed 25 MB.",
        ],
      };
      // console.log(fieldValues);
      this.setState({ eCommitteDataForValidataionDialog: fieldValues });
    }
    this.setState({ conditionNumArray: conditionNumArray });

    // console.log(
    //   fieldValues,
    //   "Dialog FieldValues........................................"
    // );
    // console.log(conditionNumArray, "condition Num Array");
  };

  private handleSubmit = async (
    // event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    statusOfForm: string,
    showAlert: boolean = true
  ): Promise<void> => {
    if (statusOfForm === "Drafted" && this.state.successStatus === "") {
      let id;

      if (this.state.itemId || this._itemId) {
        // Update existing item
        // console.log( !this.state.autosave)
        !this.state.autosave &&
        this.setState({
          isLoadingOnForm: true,
        });
        await this.handleUpdate(showAlert);
        // console.log(this.state.itemId, "id updated");
        // this.setState({autosave:false})
      } else {
        // Create new item
        // console.log("save as draft triggered");
        // console.log(this._itemId);
        // console.log( !this.state.autosave)
        !this.state.autosave &&
          this.setState({
            isLoadingOnForm: true,
          });
        const response = await this.props.sp.web.lists
          .getByTitle(this._listname)
          .items.add(await this.createEcommitteeObject(statusOfForm, "100"));
        id = response.Id;
        this._noteId = id;
        this.setState({ itemId: id });
        // console.log(id, "id created");

        await this._generateRequsterNumber(this.state.itemId || id);

        // if (id){
        //   this.setState({isVisibleAlter:true})
        // }
      }

      // console.log("Item Drafted successfully");
      this.setState({ isConfirmationDialogVisible: false });

      // if (showAlert) {
      //   this.setState({ isVisibleAlter: true });
      // }
    } else {
      try {
        if (
          this.state.statusNumber === "100" ||
          this.state.statusNumber === "200" ||
          this.state.statusNumber === "5000"
        ) {
          // console.log("Draft ,Call back, Returned Submission");
          this.setState({
            isLoadingOnForm: true,
            isConfirmationDialogVisible: false,
          });
          await this.handleUpdate();
        } else if (statusOfForm === "update") {
          // console.log("entered into updatee else if block");
          // console.log("update submission");
          await this.handleUpdate();
        } else {
          // console.log('save as draft, submit',statusOfForm)
          this.setState({
            isLoadingOnForm: true,
            isConfirmationDialogVisible: false,
          });
          const id = await this.props.sp.web.lists
            .getByTitle(this._listname)
            .items.add(await this.createEcommitteeObject(statusOfForm, "1000"));
          // console.log(id.Id, "id");
          // console.log(id.Id, "id -----", status, "Status");

           await this._generateRequsterNumber(id.Id);
          // console.log(createFolder);
          this.setState({ autosave: false });
          clearInterval(this.autoSaveInterval);

          // console.log(id)
          // console.log("Item added successfully");
          // console.log(
          //   `Form with ${id.Id} is Successfully Created in SP List - ********* ${statusOfForm} ********`
          // );
        }

        this.setState({
          committeeNameFeildValue: "",
          subjectFeildValue: "",
          natureOfNoteFeildValue: "",
          noteTypeFeildValue: "",
          typeOfFinancialNoteFeildValue: "",
          draftResolutionFieldValue:'',
          amountFeildValue: null,
          searchTextFeildValue: "",
          noteTofiles: [],
          wordDocumentfiles: [],
          supportingDocumentfiles: [],
          peoplePickerData: [],
          peoplePickerApproverData: [],
          puroposeFeildValue: "",
          othersFieldValue: "",
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

        // this.setState({
        //   isVisibleAlter: true,
        //   isConfirmationDialogVisible: false,
        // });
      } catch (error) {
        // console.error("Error adding item: ", error);
      }
    }
  };

  private getObject = async (status: any, statusNumber: any): Promise<any> => ({
    Department: this.state.department,
    CommitteeName: this.state.committeeNameFeildValue,
    Subject: this.state.subjectFeildValue,
    NatureOfNote: this.state.natureOfNoteFeildValue,
    NatureOfApprovalOrSanction: this.state.natureOfApprovalOrSanctionFeildValue,
    NoteType: this.state.noteTypeFeildValue,
    FinancialType: this.state.typeOfFinancialNoteFeildValue,
    Amount: this.state.amountFeildValue,
    SearchKeyword: this.state.searchTextFeildValue,
    Purpose: JSON.stringify([
      this.state.puroposeFeildValue,
      this.state.othersFieldValue,
    ]),
    NoteApproversDTO: this._getApproverDetails(
      this.state.peoplePickerData,
      this.state.peoplePickerApproverData,
      "allDetails"
    ),
    Status: status,
    StatusNumber: statusNumber,
    AuditTrail: this.state.itemId
      ? this.state.successStatus === "submitted"
        ? this._getAuditTrail("Submitted")
        : this._getAuditTrail("Drafted")
      :this._itemId?(this.state.statusNumber==='200' || this.state.statusNumber ==='5000' ?this._getAuditTrail("Submitted"):this._getAuditTrail("Drafted")): this._getAuditTrail("Submitted"), // ReSubmitted
    // Reviewer:{result:this._getReviewerId()}
    ReviewersId: this._getReviewerId(),
    ApproversId: this._getApproverId(),
    CurrentApproverId: this._getCurrentApproverId(
      [...this.state.peoplePickerData, ...this.state.peoplePickerApproverData],
      "intialOrderApproverDetails"
    ),
    DraftResolution: this.state.draftResolutionFieldValue,
    NoteSecretaryDTO: JSON.stringify(this.state.noteSecretaryDetails),
    AutoSave: this.state.autosave,
    FinalApproverId: this._getCurrentApproverId(
      [...this.state.peoplePickerData, ...this.state.peoplePickerApproverData],
      "FinalOrderApproverDetails"
    ),
    CommitteeType:
      this.props.formType === "BoardNoteNew" ? "Board" : "Committee",
    PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
    startProcessing: this.state.itemId ? false : true,
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

      // console.log(
      //   `All files in folder '${folderRelativeUrl}' have been deleted.`
      // );
    } catch (error) {
      // console.error("Error clearing folder:", error);
    }
  }

  private async updatePdfFolderItems(libraryName: any[], folderPath: string) {
    await this.clearFolder(libraryName, folderPath);
    // console.log(libraryName);
    // console.log(folderPath)

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


    // const siteUrl = folderPath;
    // // console.log(siteUrl);

    // // Check if the folder already exists
    // let folderExists = false;
    // if (!folderExists) {
    //   await this.props.sp.web.rootFolder.folders.addUsingPath(siteUrl);
    //   // console.log(`Folder '${folderName}' created successfully`);
    // } else {
    //   await this.props.sp.web.getFolderByServerRelativePath(siteUrl)();
    //   folderExists = true;
    // }

    try {
      for (const file of libraryName) {
        // console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        // console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      // console.log("updated PDF document successfully");
    } catch (error) {
      // console.error(`Error updating folder items: ${error}`);
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

    // const siteUrl = folderPath;
    // // console.log(siteUrl);

    // // Check if the folder already exists
    // let folderExists = false;
    // if (!folderExists) {
    //   await this.props.sp.web.rootFolder.folders.addUsingPath(siteUrl);
    //   // console.log(`Folder '${folderName}' created successfully`);
    // } else {
    //   try {
    //     // Check if folder already exists
    //     await this.props.sp.web.getFolderByServerRelativePath(siteUrl)();
    //     folderExists = true;
    //   } catch (error) {
    //     if (error.status === 404) {
    //       folderExists = false;
    //     } else {
    //       throw error;
    //     }
    //   }
    // }

    try {
      for (const file of libraryName) {
        // console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        // console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      // console.log("updated Supporting document successfully");
    } catch (error) {
      // console.error(`Error updating folder items: ${error}`);
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

    // const siteUrl = folderPath;
    // // console.log(siteUrl);

    // // Check if the folder already exists
    // let folderExists = false;
    // if (!folderExists) {
    //   await this.props.sp.web.rootFolder.folders.addUsingPath(siteUrl);
    //   // console.log(`Folder '${folderName}' created successfully`);
    // } else {
    //   try {
    //     // Check if folder already exists
    //     await this.props.sp.web.getFolderByServerRelativePath(siteUrl)();
    //     folderExists = true;
    //   } catch (error) {
    //     if (error.status === 404) {
    //       folderExists = false;
    //     } else {
    //       throw error;
    //     }
    //   }
    // }

    try {
      for (const file of libraryName) {
        // console.log(file);

        // Get the ArrayBuffer of the file
        const arrayBuffer = await getFileArrayBuffer(file);
        // console.log(arrayBuffer);

        // Upload the file to the SharePoint Library
        await this.props.sp.web
          .getFolderByServerRelativePath(folderPath)
          .files.addUsingPath(file.name, arrayBuffer, {
            Overwrite: true,
          });
      }
      // console.log("updated Word document successfully");
    } catch (error) {
      // console.error(`Error updating folder items: ${error}`);
    }
  }

  private handleUpdate = async (showAlert: boolean = true): Promise<void> => {
    // console.log("Update Event Triggered");

    // const {
    //   committeeNameFeildValue,
    //   subjectFeildValue,
    //   natureOfNoteFeildValue,
    //   noteTypeFeildValue,
    //   natureOfApprovalOrSanctionFeildValue,
    //   typeOfFinancialNoteFeildValue,
    //   searchTextFeildValue,
    //   amountFeildValue,
    //   puroposeFeildValue,
    // } = this.state;

    // console.log(committeeNameFeildValue, "-----------committeeNameFeildValue");
    // console.log(subjectFeildValue, "-----------subjectFeildValue");
    // console.log(natureOfNoteFeildValue, "-----------natureOfNoteFeildValue");
    // console.log(
    //   natureOfApprovalOrSanctionFeildValue,
    //   "--------------natureOfApprovalOrSanctionFeildValue"
    // );
    // console.log(noteTypeFeildValue, "-----------noteTypeFeildValue");
    // console.log(
    //   typeOfFinancialNoteFeildValue,
    //   "-----------typeOfFinancialNoteFeildValue"
    // );
    // console.log(searchTextFeildValue, "-----------searchTextFeildValue");
    // console.log(amountFeildValue, "-----------amountFeildValue");
    // console.log(puroposeFeildValue, "-----------puroposeFeildValue");

    try {
      !this.state.autosave &&
        this.setState({
          isConfirmationDialogVisible: false,
          isLoadingOnForm: true,
        });
      // this.setState({ status: "Updated", statusNumber: "1000" });

      // Update SharePoint item
      // console.log(
      //   this.getObject(),
      //   "*********************Edited passed Object*********************"
      // );
      // console.log(this.state.successStatus)

      this._itemId
        ?( this.state.successStatus === "submitted"
          ? await this.props.sp.web.lists
              .getByTitle(this._listname)
              .items.getById(this._itemId)
              .update(await this.getObject("Submitted", "1000"))
          : await this.props.sp.web.lists
              .getByTitle(this._listname)
              .items.getById(this._itemId)
              .update(await this.getObject("Draft", "100")))
        : (this.state.successStatus === "submitted"
        ? await this.props.sp.web.lists
            .getByTitle(this._listname)
            .items.getById(this.state.itemId)
            .update(await this.getObject("Submitted", "1000"))
        : await this.props.sp.web.lists
            .getByTitle(this._listname)
            .items.getById(this.state.itemId)
            .update(await this.getObject("Draft", "100")));

      // errorInPdfFiles:this.state.errorFilesList.notePdF.length > 0,
      // errorInWordDocFiles:this.state.errorFilesList.wordDocument.length > 0,
      // errorInSupportingDocFiles:this.state.errorFilesList.supportingDocument.length > 0,
      // Usage example
      this.state.errorFilesList.notePdF.length === 0 &&
        (await this.updatePdfFolderItems(
          this.state.noteTofiles,
          `${this._folderName}/Pdf`
        ));
      this.state.errorFilesList.supportingDocument.length === 0 &&
        (await this.updateSupportingDocumentFolderItems(
          this.state.supportingDocumentfiles,
          `${this._folderName}/SupportingDocument`
        ));
      this.state.errorFilesList.wordDocument.length === 0 &&
        (await this.updateWordDocumentFolderItems(
          this.state.wordDocumentfiles,
          `${this._folderName}/WordDocument`
        ));

      // console.log(itemToUpdate, "item updated");
      !this.state.autosave &&
        this.setState({
          isConfirmationDialogVisible: false,
          isLoadingOnForm: false,
          isVisibleAlter: true,
        });

      // if (showAlert) {
      //   this.setState({ isVisibleAlter: true });
      // }
    } catch (error) {
      // console.log(error);
    }
  };

  private _fetchDepartmentAlias = async (): Promise<void> => {
    try {
      // console.log("Starting to fetch department alias...");

      // Step 1: Fetch items from the Departments list
      const items: any[] = await this.props.sp.web.lists
        .getByTitle("Departments")
        .items.select(
          "Department",
          "DepartmentAlias",
          "Admin/EMail",
          "Admin/Title"
        ) // Fetching relevant fields
        .expand("Admin")();

      // console.log("Fetched items from Departments:", items);

      // let deparement = '';

      const profile = await this.props.sp.profiles.myProperties();

      // this._userName = profile.DisplayName;
      // this._role = profile.Title;

      profile.UserProfileProperties.filter((element: any) => {
        if (element.Key === "Department") {
          // department: element.Value

          const specificDepartment = items.find(
            (each: any) =>
              each.Department.includes(element.Value) ||
              each.Title?.includes(element.Value)
          );

          if (specificDepartment) {
            const departmentAlias = specificDepartment.DepartmentAlias;
            // console.log(
            //   "Department alias for department with 'Development' in title:",
            //   departmentAlias
            // );

            // Step 3: Update state with the department alias
            this.setState({
              departmentAlias: departmentAlias, // Store the department alias
            });
          }
        }
      });

      // Step 2: Find the department entry where the Title or Department contains "Development"
    } catch (error) {
      // console.error("Error fetching department alias: ", error);
    }
  };

  // Generate Request Number
  private async _generateRequsterNumber(id: number) {
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);
    const requesterNo =
      this.props.formType === "BoardNoteNew"
        ? `${this.state.departmentAlias}/${currentyear}-${nextYear}/B${id}`
        : `${this.state.departmentAlias}/${currentyear}-${nextYear}/C${id}`;
    // const requesterNo=`AD1/${currentyear}-${nextYear}/C${id}`

    const currentItem = await this._getItemData(id, "");
    // console.log(currentItem);

    const getUpdatedNoteSecretaryDTO = (): any => {
      const updatedSecretaryDTO = JSON.parse(currentItem.NoteSecretaryDTO).map(
        (each: any) => {
          return { ...each, noteId: id, createdBy: each.Author };
        }
      );
      // console.log(updatedSecretaryDTO);
      return updatedSecretaryDTO;
    };
    this.title = requesterNo;
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(id)
      .update({
        Title: requesterNo,
        NoteSecretaryDTO: JSON.stringify(getUpdatedNoteSecretaryDTO()),

        // NoteApproversDTO:JSON.stringify(this._getNewUpdatedNoteApproverDTO(this.state.peoplePickerData,this.state.peoplePickerApproverData))
      });
    // .then((data) => console.log(data, "data"));
    // console.log(requesterNo);
    // eslint-disable-next-line no-void
    await this.createFolder(requesterNo);
  }

  public _folderNameGenerate(id: any): any {
    // console.log(this.state.departmentAlias);
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);

    // const requesterNo = this.props.formType==="BoardNoteView"? `DEP/${currentyear}-${nextYear}/B${id}`:`DEP/${currentyear}-${nextYear}/C${id}`;
    // console.log(requesterNo)

    const requesterNo =
      this.props.formType === "BoardNoteNew"
        ? `${this.state.departmentAlias}/${currentyear}-${nextYear}/B${id}`
        : `${this.state.departmentAlias}/${currentyear}-${nextYear}/C${id}`;
    // console.log(requesterNo);
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }

  public _folderNameGenerateEdit(id: any): any {
    // console.log(this.state.departmentAlias);
    const currentyear = new Date().getFullYear();
    const nextYear = (currentyear + 1).toString().slice(-2);

    // const requesterNo = this.props.formType==="BoardNoteView"? `DEP/${currentyear}-${nextYear}/B${id}`:`DEP/${currentyear}-${nextYear}/C${id}`;
    // console.log(requesterNo)

    // console.log(this.state.title.split('/'))
    // console.log(this.state.title.split('/')[0])

    const requesterNo =
      this.props.formType === "BoardNoteView"
        ? `${this.state.title.split('/')[0]}/${currentyear}-${nextYear}/B${id}`
        : `${this.state.title.split('/')[0]}/${currentyear}-${nextYear}/C${id}`;
    // console.log(requesterNo);
    const folderName = requesterNo.replace(/\//g, "-");
    return folderName;
  }


  private handleNoteToFileChange = (files: File[], typeOfDoc: string) => {
    // console.log(typeOfDoc, files);

    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
    }

    if (this.state.isWarningNoteToFiles) {
      this.setState({ isWarningNoteToFiles: false });
    }

    if (files) {
      // console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   noteTofiles: [...prev.noteTofiles, ...filesArray],
      // }));
      this.setState({ noteTofiles: [...filesArray] });
    }
  };

  private handleSupportingFileChange = (files: File[], typeOfDoc: string) => {
    // console.log(typeOfDoc);
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
    }

    if (this.state.isWarningSupportingDocumentFiles) {
      this.setState({ isWarningSupportingDocumentFiles: false });
    }

    if (files) {
      // console.log(files);
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

  // private _udpateFileWithError = (dataDeleted:any)=>{
  //   console.log(dataDeleted)
  // }

  private _getCummulativeError = (data: any): any => {
    // console.log(data)
    data !== null
      ? this.setState({
          errorForCummulative: true,
          // dialogboxForCummulativeError:true
        })
      : this.setState({
          errorForCummulative: false,
          // dialogboxForCummulativeError:false
        });
  };

  private _getFileWithError = (data: any): any => {
    // console.log(data);
    // const itemIds = data[0].map(
    //   (each:any)=>{
    //     console.log(each)
    //     return each.id
    //   }
    // )
    // console.log(itemIds)

    // const updateErrorFileList  = this.state.errorFilesList.map(
    //   (each:any)=>{
    //     console.log(each)
    //     return each[0].filter(
    //       (item:any)=>{

    //         console.log(item)
    //        if( !itemIds.includes(item.id)) {
    //           return each
    //        }
    //       }
    //     )

    //   }
    // )
    // console.log(updateErrorFileList)
    // console.log(data)

    // if (data[1] === "supportingDocument"){
    //   const cummmErroFound = data[0].map((each:any)=>each.cumulativeError)
    //   // console.log(cummmErroFound)
    //   // if (cummmErroFound.length >0){
    //   //   cummErrorFoundBoolean = true
    //   // }
    //   if (cummmErroFound.length > 0){
    //     const newObj = this.state.errorFilesList;
    //     newObj.cummlativeError = data[0];

    //   }

    //   // newObj.supportingDocument=[]
    // }
    const newObj = this.state.errorFilesList;
    newObj[data[1]] = data[0];

    this.setState({ errorFilesList: newObj });
    // const updateErrorInObj = data[0].map(
    //   (each:any)=>{
    //     return {...each,typeOfDoc:data[1]}
    //   }
    // )

    // const checkError = updateErrorInObj.map(
    //   (each:any)=>{
    //     if (each.error !== null){
    //       return {fileType:each.typeOfDoc,error:each.error}
    //     }
    //   }
    // )

    // this.setState({errorOfDocuments:checkError.length>0?true:false})

    if (
      newObj.wordDocument.length > 0 ||
      newObj.notePdF.length > 0 ||
      newObj.supportingDocument.length > 0
    ) {
      this.setState({ errorOfDocuments: true });
    } else {
      this.setState({ errorOfDocuments: false });
    }
  };

  private handleWordDocumentFileChange = (files: File[], typeOfDoc: string) => {
    // console.log(typeOfDoc, files);

    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
    }

    if (this.state.isWarningWordDocumentFiles) {
      this.setState({ isWarningWordDocumentFiles: false });
    }

    if (files) {
      // console.log(files);
      // Convert FileList to an array of File objects
      const filesArray = Array.from(files);
      // this.setState((prev) => ({
      //   wordDocumentfiles: [...prev.wordDocumentfiles, ...filesArray],
      // }));
      this.setState({ wordDocumentfiles: [...filesArray] });
    }
  };

  public handleDialogBox = (): void => {
    // console.log("Dialog handling");
    this.setState({ isDialogHidden: true, errorOfDocuments: false });
  };

  public handleApproverOrReviewerDialogBox = (): void => {
    // console.log("Dialog handling");
    this.setState({
      isApproverOrReviewerDialogHandel: true,
      isReviewerDialogHandel: true,
    });
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
    // console.log(newText);
    this.setState({ draftResolutionFieldValue: newText });
    return newText;
  };

  // Method to show the cancel confirmation dialog
  private handleShowCancelDialog = () => {
    this.setState({ successStatus: "cancelled" });
    this.setState({ showCancelDialog: true });
  };

  // Existing handleCancel logic
  private handleCancel = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    this.setState({ showCancelDialog: false, isLoadingOnForm: true });
    try {
      const updateAuditTrail = await this._getAuditTrail(statusFromEvent);
      // console.log(updateAuditTrail);

      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
          AuditTrail: updateAuditTrail,
          startProcessing: true,
          PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
        });

      // console.log(itemToUpdate);
      // Close the dialog after successful cancellation
      this.setState({ isLoadingOnForm: false });
      this.setState({ isVisibleAlter: true });
    } catch (error) {
      // console.error("Error updating the item:", error);
      // Handle error, possibly show notification
    }
  };

  // Method to handle confirmation of cancellation
  private handleConfirmCancel = async () => {
    await this.handleCancel("Cancelled", "300"); // Call with appropriate parameters
  };

  public _closeDialogAlter = () => {
    const pageURL: string = this.props.existPageUrl;
    window.location.href = `${pageURL}`;
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

  private onRenderCaretDowNatureOfApprovalOrSanctionFeildValue =
    (): JSX.Element => {
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

  private _checkSecertaryIsAvailable = (): any => {
    const checkSecertaryIsAvailable = [
      ...this.state.peoplePickerData,
      ...this.state.peoplePickerApproverData,
    ].some((each: any) => {
      if (each.secretary !== "" && each.approverType === "Approver") {
        return true;
      }
    });
    // console.log(checkSecertaryIsAvailable)
    // if (checkSecertaryIsAvailable === false){
    //   this.setState({wordDocumentfiles:[]})
    // }
    return checkSecertaryIsAvailable;
  };

  public render(): React.ReactElement<IFormProps> {
    console.log(this.state);

    //   }
    // console.log(this._committeeType)
    // console.log(this._checkValidation())
    // console.log(this.props.formType, "Type of Form");
    // console.log(this._formType === "view");
    // console.log(this.state.statusNumber !== "100");

    // console.log(this.state.statusNumber !== "5000");

    // console.log(this.state.statusNumber !== "200");

    // console.log(
    //   this.state.statusNumber === "100" ||
    //     this.state.statusNumber === "5000" ||
    //     this.state.statusNumber === "200"
    // );
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
          // <div>
          //   <Spinner
          //     label="Wait, wait..."
          //     ariaLive="assertive"
          //     // labelPosition="right"
          //   />
          // </div>
          // <PageLoader/>
          <div>
            <Modal
              isOpen={this.state.isLoading}
              containerClassName={styles.spinnerModalTranparency}
              styles={{
                main: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent", // Removes background color
                  boxShadow: "none", // Removes box shadow
                }, // Removes box shadow
              }}
            >
              <div className="spinner">
                <Spinner
                  label="still loading..."
                  ariaLive="assertive"
                  size={SpinnerSize.large}
                />
              </div>
            </Modal>
          </div>
        ) : (
          // </Stack>
          <div className={styles.form}>
            <AutoSaveDialog
              hidden={this.state.autoSavedialog}
              onDismiss={() => {
                this.setState({ autoSavedialog: true });
              }}
            />
            <CummulativeErrorDialog
              isVisibleAlter={this.state.dialogboxForCummulativeError}
              onCloseAlter={() => {
                this.setState({ dialogboxForCummulativeError: false });
              }}
              statusOfReq={undefined}
            />

            {this.state.isLoadingOnForm && (
              <div>
                <Modal
                  isOpen={this.state.isLoadingOnForm}
                  containerClassName={styles.spinnerModalTranparency}
                  styles={{
                    main: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "transparent", // Removes background color
                      boxShadow: "none", // Removes box shadow
                    }, // Removes box shadow
                  }}
                >
                  <div className="spinner">
                    <Spinner
                      label="still loading..."
                      ariaLive="assertive"
                      size={SpinnerSize.large}
                    />
                  </div>
                </Modal>
              </div>
            )}
            {/* <Header /> */}
            <Title
              itemId={this._itemId}
              formType={this._formType}
              propPaneformType={this.props.formType}
              statusOfRequest={this.state.status}
              title={this.title}
            />
            {/* {this.state.isDialogHidden&&<MyDialog  />} */}

            {/* success  dialog */}
            <SuccessDialog
              existUrl={this.props.existPageUrl}
              typeOfNote={this._committeeType}
              statusOfReq={this.state.successStatus}
              isVisibleAlter={this.state.isVisibleAlter}
              onCloseAlter={this._closeDialogAlter}
            />
            {/* success  dialog */}

            {/* auto save failed  dialog */}
            {this.state.isAutoSaveFailedDialog && (
              <AutoSaveFailedDialog
                statusOfReq={this.state.successStatus}
                isVisibleAlter={this.state.isAutoSaveFailedDialog}
                onCloseAlter={() => {
                  this.setState({ isAutoSaveFailedDialog: false });
                }}
              />
            )}
            {/* auto save failed  dialog*/}
            <MyDialog
              hidden={this.state.isDialogHidden}
              data={this.state.eCommitteDataForValidataionDialog}
              handleDialogBox={this.handleDialogBox}
            />

            <ApproverOrReviewerDialog
              hidden={this.state.isApproverOrReviewerDialogHandel}
              handleDialogBox={this.handleApproverOrReviewerDialogBox}
            />
            <ReviewerExistModal
              hidden={this.state.isReviewerDialogHandel}
              handleDialogBox={this.handleApproverOrReviewerDialogBox}
            />

            <ConfirmationDialog
              hidden={!this.state.isConfirmationDialogVisible}
              onConfirm={this.handleConfirmSubmit} // Action when "Yes" is clicked
              onCancel={this.handleCancelDialog} // Action when "No" is clicked
              title="Confirmation"
              subText="Are you sure you want to submit the form?"
            />

            {/* Use the DraftSuccessDialog component */}
            <DraftSuccessDialog
              hidden={!this.state.showDialog}
              onClose={() => this.setState({ showDialog: false })} // Close the dialog
            />

            {/* Use the CancelConfirmationDialog component */}
            <CancelConfirmationDialog
              hidden={this.state.showCancelDialog}
              onConfirm={this.handleConfirmCancel} // Call handleConfirmCancel on confirm
              onCancel={() => this.setState({ showCancelDialog: false })} // Close the cancel dialog
            />

            {/* General Section */}
            <Stack>
              {/* <button
                type="button"
                onClick={() => {
                  this._checkValidation();
                  this._checkValidationArray();
                }}
              >
                Check
              </button> */}
              <div
                className={`${styles.generalSectionMainContainer}`}
                style={{ flexGrow: 1, margin: "10 10px" }}
              >
                <h1 className={styles.viewFormHeaderSectionContainer}>
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
                <p style={{ margin: "5px", marginLeft: "20px" }}>
                  {this.state.department}
                </p>
              </div>
              {/* Committee Name Sub Section */}
              <div className={styles.halfWidth} style={{ margin: "4px" }}>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  {this.props.formType === "BoardNoteNew"
                    ? "Board Committee Name"
                    : "Committee Name"}
                  <SpanComponent />
                </label>
                <Dropdown
                 onFocus="this.style.borderColor='transparent';" 
                  placeholder=
                  {this.props.formType === "BoardNoteNew"
                    ? "Select an Board Committee Name"
                    : "Select an Committee Name"}
                  options={this.state.committename}
                  selectedKey={this.state.committeeNameFeildValue}
                  onChange={this.handleCommittename}
                  onRenderCaretDown={() =>
                    this.onRenderCaretDowncommitteeNameFeildValue()
                  }
                  styles={{
                    root:{

                    },
                    
                    dropdown: {
                      // width: 300,
                      borderRadius: "2px",
                      // fontSize: "16px",
                      // fontFamily: 'Poppins',
                    //   outline:
                    //     this.state.committeeNameFeildValue === "" &&
                    //     this.state.isWarningCommitteeName
                    //       ? "2px solid red"
                    //       : "1px solid transparent",
                    },
                    title: {
                      borderColor: (this.state.committeeNameFeildValue === "" && this.state.isWarningCommitteeName) ? 'transparent' : undefined
                    }
                    
                  }}
                />
              </div>

              {this._committeeType === "Board" ? "" : ""}
              {/* Subject Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "10px" }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Subject <SpanComponent />
                </label>
                <textarea
                placeholder="Enter Subject"
                  className={styles.textAreaWithOutline}
                  style={{
                    display: "block",
                    paddingLeft: "12px",
                    paddingTop: "5px",
                    borderRadius: "2px",
                    height: "32px",
                    marginTop: "9px",
                    // boxSizing: "border-box",
                    width: "100%",
                    border:
                      this.state.subjectFeildValue === "" &&
                      this.state.isWarningSubject
                        ? "2px solid red"
                        : "",
                  }}
                  value={this.state.subjectFeildValue}
                  onChange={this.handleSubjectChange}
                  maxLength={250}
                ></textarea>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "12px",
                    marginTop: "5px",
                    fontStyle: "italic",
                    color:
                      this.state.subjectFeildValue.length === 250
                        ? "red"
                        : "gray",
                  }}
                >
                  {this.state.subjectFeildValue.length}/250
                </div>
              </div>
              {/* Nature of Note Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "10px" }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Nature of Note
                  <SpanComponent />
                </label>
                <Dropdown
                  placeholder="Select Nature of Note"
                  // label="Nature of Note"

                  options={this.state.natureOfNote}
                  selectedKey={this.state.natureOfNoteFeildValue}
                  onChange={this.handleNatureOfNoteChange}
                  onRenderCaretDown={() =>
                    this.onRenderCaretDownnatureOfNoteFeildValue()
                  }
                  styles={{
                    dropdown: {
                      borderRadius: "2px",
                      // fontSize: "16px",
                      // fontFamily: 'Poppins',
                      marginTop: "9px",
                      border:
                        this.state.natureOfNoteFeildValue === "" &&
                        this.state.isWarningNatureOfNote
                          ? "2px solid red"
                          : "1px solid transparent",
                    },
                    title: {
                      borderColor: (this.state.natureOfNoteFeildValue === "" && this.state.isWarningNatureOfNote) ? 'transparent' : undefined
                    }
                  }}
                />

                {/* <div
    style={{
      textAlign: "right",
      fontSize: "12px",
      marginTop: "5px",
      color: this.state.subjectFeildValue.length === 250 ? "red" : "gray",
    }}
  >
    <p>{" "}</p>
  </div> */}
              </div>

              {/* Nature of Approval/Sanction Sub Section */}
              {this.state.natureOfNoteFeildValue === "Approval" ||
              this.state.natureOfNoteFeildValue === "Sanction" ? (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "10px" }}
                >
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Nature of Approval/Sanction
                    <SpanComponent />
                  </label>
                  <Dropdown
                    placeholder="Select Nature of Approval/Sanction"
                    // label="Nature of Approval or Sanction"

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
                        marginTop: "9px",
                        border:
                          this.state.natureOfApprovalOrSanctionFeildValue ===
                            "" && this.state.isWarningNatureOfApporvalOrSanction
                            ? "2px solid red"
                            : "1px solid transparent",
                        borderRadius: "2px",
                        // fontSize: "16px",
                        // fontFamily: 'Poppins',
                      },
                      title: {
                        borderColor: (this.state.natureOfApprovalOrSanctionFeildValue === "" && this.state.isWarningNatureOfApporvalOrSanction) ? 'transparent' : undefined
                      }
                    }}
                  />
                </div>
              ) : (
                ""
              )}
              {/*  Note Type Sub Section */}
              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "10px" }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Note Type
                  <SpanComponent />
                </label>
                <Dropdown
                  placeholder="Select Note Type"
                  options={this.state.noteType}
                  selectedKey={this.state.noteTypeFeildValue}
                  onChange={this.handleNoteTypeChange}
                  onRenderCaretDown={() =>
                    this.onRenderCaretDowNoteTypeFeildValue()
                  }
                  styles={{
                    dropdown: {
                      marginTop: "9px",
                      border:
                        this.state.noteTypeFeildValue === "" &&
                        this.state.isWarningNoteType
                          ? "2px solid red"
                          : "1px solid transparent",
                      borderRadius: "2px",
                      // fontSize: "16px",
                      // fontFamily: 'Poppins',
                    },
                    title: {
                      borderColor: (this.state.noteTypeFeildValue === "" && this.state.isWarningNoteType) ? 'transparent' : undefined
                    }
                  }}
                />
              </div>
              {/*  Type of Financial Note Sub Section */}
              {this.state.noteTypeFeildValue === "Financial" && (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "10px" }}
                >
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Type of Financial Note
                    <SpanComponent />
                  </label>
                  <Dropdown
                    placeholder="Select Type of Financial Note"
                    options={this.state.typeOfFinancialNote}
                    selectedKey={this.state.typeOfFinancialNoteFeildValue}
                    onRenderCaretDown={() =>
                      this.onRenderCaretDownTypeOfFinancialNoteFeildValue()
                    }
                    onChange={this.handleTypeOfFinancialNote}
                    styles={{
                      dropdown: {
                        marginTop: "9px",
                        border: `2px solid ${
                          !this.state.typeOfFinancialNoteFeildValue &&
                          this.state.isWarningTypeOfFinancialNote
                            ? "red"
                            : "transparent"
                        }`,
                        // selectors: {
                        //   ":hover": {
                        //     border: "1px solid transparent",
                        //   },
                        // },
                        borderRadius: "2px",
                      },
                      title: {
                        borderColor: (this.state.typeOfFinancialNoteFeildValue === "" && this.state.isWarningTypeOfFinancialNote) ? 'transparent' : undefined,
                        selectors: {
                          ":hover": {
                            borderColor:
                              this.state.typeOfFinancialNoteFeildValue === "" &&
                              this.state.isWarningTypeOfFinancialNote
                                ? "transparent"
                                : undefined,
                          },
                        },
                      }
                    }}
                  />
                </div>
              )}

              {/*  Search Text Sub Section */}

              <div
                className={styles.halfWidth}
                style={{ margin: "4px", marginTop: "10px" }}
              >
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "5px",
                  }}
                >
                  Search Text
                  <SpanComponent />
                </label>
                <textarea
                 placeholder="Enter Search Text"
                  className={styles.textAreaWithOutline}
                  style={{
                    display: "block",
                    paddingLeft: "12px",
                    paddingTop: "5px",
                    borderRadius: "2px",
                    height: "32px",
                    marginTop: "9px",
                    // boxSizing: "border-box",
                    width: "100%",
                    border:
                      this.state.searchTextFeildValue === "" &&
                      this.state.isWarningSearchText
                        ? "2px solid red"
                        : "",
                  }}
                  rows={!this.state.searchTextFeildValue ? 3 : 1} // Adjust rows based on warning state
                  value={this.state.searchTextFeildValue}
                  onChange={this.handleSearchTextChange}
                  maxLength={250} // Enforce max character limit
                />
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "12px",
                    marginTop: "5px",
                    fontStyle: "italic",
                    color:
                      this.state.searchTextFeildValue.length === 250
                        ? "red"
                        : "gray",
                  }}
                >
                  {this.state.searchTextFeildValue.length}/250
                </div>
              </div>

                {/* Amount Sub Section */}
                {this.state.noteTypeFeildValue === "Financial" && (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "10px" }}
                >
                  <label
                    style={{
                      display: "block",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    Amount
                    <SpanComponent />
                  </label>
                  <TextField
                  placeholder="Enter Amount"
                    type="text"
                    styles={{
                      fieldGroup: {
                        display: "block",
                        // paddingLeft: "12px",
                        marginTop: "9px",
                        paddingTop: "5px",
                        height: "32px",
                        // boxSizing: "border-box",
                        width: "100%",
                        border:
                          !this.state.amountFeildValue &&
                          this.state.isWarningAmountField
                            ? "2px solid red"
                            : undefined,
                      },
                    }}
                    onChange={this.handleAmountChange}
                    value={this.state.amountFeildValue}
                  />
                </div>
              )}

            

              {/* Purpose Sub Section */}

              {this.state.isPuroposeVisable &&
                (this.state.natureOfNoteFeildValue === "Approval" ||
                this.state.natureOfNoteFeildValue === "Information" ? (
                  this.state.natureOfNoteFeildValue === "Approval" ? (
                    <div
                      className={styles.halfWidth}
                      style={{ margin: "4px", marginTop: "10px" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        Purpose
                        <SpanComponent />
                      </label>
                      <Dropdown
                        placeholder="Select Purpose"
                        options={this.state.purpose.slice(0, 4)}
                        selectedKey={this.state.puroposeFeildValue}
                        onChange={this.handlePurposeDropDown}
                        onRenderCaretDown={() =>
                          this.onRenderCaretDownPurpoesFeildValue()
                        }
                        styles={{
                          dropdown: {
                            borderRadius: "2px",
                            marginTop: "7px",

                            // fontSize: "16px",
                            // height:'32px',

                            border: `2px solid ${
                              !this.state.puroposeFeildValue &&
                              this.state.isWarningPurposeField
                                ? "red"
                                : "transparent"
                            }`,
                          },
                          title: {
                            borderColor: (this.state.puroposeFeildValue === "" && this.state.isWarningPurposeField) ? 'transparent' : undefined
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className={styles.halfWidth}
                      style={{ margin: "4px", marginTop: "10px" }}
                    >
                      <label
                        style={{
                          display: "block",
                          fontWeight: "600",
                          marginBottom: "5px",
                        }}
                      >
                        Purpose
                        <SpanComponent />
                      </label>
                      <Dropdown
                         placeholder="Select Purpose"
                        options={this.state.purpose.slice(4)} // Slice starting from index 4 to get remaining items
                        selectedKey={this.state.puroposeFeildValue}
                        onChange={this.handlePurposeDropDown}
                        onRenderCaretDown={() =>
                          this.onRenderCaretDownPurpoesFeildValue()
                        }
                        styles={{
                          dropdown: {
                            border: `2px solid ${
                              !this.state.puroposeFeildValue &&
                              this.state.isWarningPurposeField
                                ? "red"
                                : "transparent"
                            }`,
                            borderRadius: "2px",
                            marginTop: "7px",

                            // fontSize: "16px",
                          },
                          title: {
                            borderColor: (this.state.puroposeFeildValue === "" && this.state.isWarningPurposeField) ? 'transparent' : undefined
                          }
                        }}
                      />
                    </div>
                  )
                ) : (
                  <div
                    className={styles.halfWidth}
                    style={{ margin: "4px", marginTop: "10px" }}
                  >
                    <label
                      style={{
                        display: "block",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}
                    >
                      Purpose
                      <SpanComponent />
                    </label>
                    <textarea
                     placeholder="Enter Purpose"
                      className={styles.textAreaWithOutline}
                      style={{
                        display: "block",
                        paddingLeft: "12px",
                        paddingTop: "5px",
                        borderRadius: "2px",
                        height: "32px",
                        marginTop: "8px",
                        // boxSizing: "border-box",
                        width: "100%",
                        border:
                          this.state.puroposeFeildValue === "" &&
                          this.state.isWarningPurposeField
                            ? "2px solid red"
                            : "",
                      }}
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
                ))}
              {this.state.natureOfNoteFeildValue === "Approval" &&
              this.state.puroposeFeildValue === "Others" ? (
                <div
                  className={styles.halfWidth}
                  style={{ margin: "4px", marginTop: "10px" }}
                >
                  <label  style={{
                        display: "block",
                        fontWeight: "600",
                        marginBottom: "5px",
                      }}>
                    Others
                    <SpanComponent />
                  </label>
                  <textarea
                   placeholder="Enter Others"
                    className={styles.textAreaWithOutline}
                    style={{
                      borderRadius: "2px",
                      display: "block",
                      paddingLeft: "12px",
                      paddingTop: "5px",
                      height: "32px",
                      // boxSizing: "border-box",
                      width: "100%",
                      border:
                      this.state.othersFieldValue === "" &&
                      this.state.isWarningOthersField
                        ? "2px solid red"
                        : "",
                     
                    }}
                    rows={!this.state.othersFieldValue ? 3 : 1}
                    value={this.state.othersFieldValue}
                    onChange={this.handleOthersChange}
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
              <h1 className={styles.viewFormHeaderSectionContainer}>
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
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <PeoplePicker
                      key={this.state.reviewerKey}
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
                  <span className={`${styles.spanForPeoplePicker}`}>
                    (Please enter minimum 3 character to search)
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
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <PeoplePicker
                      key={this.state.approverKey}
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
                  <span className={`${styles.spanForPeoplePicker}`}>
                    (Please enter minimum 3 character to search)
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
                  <h1 className={styles.viewFormHeaderSectionContainer}>
                    Draft Resoultion
                  </h1>
                </div>
                <div className={`${styles.generalSectionApproverDetails}`} style={{ minHeight:'140px' }}  >
                  <div className={styles.richTextContainer}>
                    <RichText
                     styleOptions={this.state.isSmallScreen?{showBold: true,
                      showItalic:true,showUnderline:true,showList:true,
                      showMore:true}:{
                        showBold: true,
  
                      showItalic:true,showUnderline:true,showList:true,
                      showAlign:true,
                      showImage:true,
                      showLink:true,
                      showStyles:true,
  
                      showMore:true
  
                      }}
                      value={this.state.draftResolutionFieldValue}
                      onChange={(text) => this.onTextChange(text)}
                    />
                  </div>


{/* <div className={styles.richTextContainer}
              //  className={` ${styles.richTextContainer}`}
              >
                <RichText
                  value={this.state.draftResolutionFieldValue}
                  styleOptions={this.state.isSmallScreen?{showBold: true,
                    showItalic:true,showUnderline:true,showList:true,
                    showMore:true}:{
                      showBold: true,

                    showItalic:true,showUnderline:true,showList:true,
                    showAlign:true,
                    showImage:true,
                    showLink:true,
                    showStyles:true,

                    showMore:true

                    }}
                  onChange={(text: string) =>
                    this.onTextChange(text)
                  }

                  

                 
                />
              </div> */}

                </div>
              </div>
            )}

            {/*  Comments Section */}

            {this.state.statusNumber === "5000" && (
              <div
                className={`${styles.generalSectionMainContainer}`}
                style={{ flexGrow: 1, margin: "10 10px" }}
              >
                <h1 className={styles.viewFormHeaderSectionContainer}>
                  Comments
                </h1>
              </div>
            )}
            {this.state.statusNumber === "5000" && (
              <div className={`${styles.tableContainer}`}>
                <CommentsLogTable
                  data={this.state.commentsLog} //have change data valu
                  type="commentsLog"
                  formType="new"
                />
              </div>
            )}

            {/*  File Attachments Section */}
            <div
              className={`${styles.generalSectionMainContainer}`}
              style={{ flexGrow: 1, margin: "10 10px" }}
            >
              <h1 className={styles.viewFormHeaderSectionContainer}>
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
                <div style={{ width: "100%", margin: "0px" }}>
                  <UploadFileComponent
                    cummulativeError={undefined}
                    errorData={this._getFileWithError}
                    typeOfDoc="notePdF"
                    onChange={this.handleNoteToFileChange}
                    accept=".pdf"
                    multiple={false}
                    maxFileSizeMB={10}
                    maxTotalSizeMB={10}
                    data={this.state.noteTofiles}
                    addtionalData={[]} // value={this.state.noteTofiles}
                  />
                </div>
                <p
                  className={styles.message}
                  style={{ textAlign: "right", margin: "0px" }}
                >
                  Allowed only one PDF. Up to 10MB max.
                </p>
              </div>

              {this._checkSecertaryIsAvailable() ? (
                <div className={`${styles.fileInputContainers}`}>
                  <p className={styles.label} style={{ margin: "0px" }}>
                    Word Document <span className={styles.warning}>*</span>
                  </p>
                  <div style={{ width: "100%", margin: "0px" }}>
                    <UploadFileComponent
                      errorData={this._getFileWithError}
                      typeOfDoc="wordDocument"
                      onChange={this.handleWordDocumentFileChange}
                      accept=".doc,.docx"
                      multiple={false}
                      maxFileSizeMB={10}
                      maxTotalSizeMB={10}
                      data={this.state.wordDocumentfiles}
                      addtionalData={[]} // value={this.state.wordDocumentfiles}
                      cummulativeError={undefined}
                    />
                  </div>
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
                <div style={{ width: "100%", margin: "0px" }}>
                  <SupportingDocumentsUploadFileComponent
                    errorData={this._getFileWithError}
                    typeOfDoc="supportingDocument"
                    onChange={this.handleSupportingFileChange}
                    accept=".xlsx,.pdf,.doc,.docx"
                    multiple={true}
                    maxFileSizeMB={25}
                    maxTotalSizeMB={25}
                    data={this.state.supportingDocumentfiles}
                    addtionalData={[]} // value={this.state.supportingDocumentfiles}
                    cummulativeError={this._getCummulativeError}
                  />
                </div>

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
              {this.state.statusNumber !== "8000" &&
                this.state.statusNumber !== "1000" &&
                this.state.statusNumber !== "2000" &&
                this.state.statusNumber !== "3000" &&
                this.state.statusNumber !== "4000" &&
                this.state.statusNumber !== "4900" &&
                this.state.statusNumber !== "9000" &&
                this.state.statusNumber !== "300" && (
                  <div
                    style={{
                      // margin: "10px 0px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    {this._itemId && this.state.status !== "Returned" ? (
                !(
                  // this.state.statusNumber === "100" ||
                  this.state.statusNumber === "1000" ||
                  this.state.statusNumber === "5000" ||
                  this.state.statusNumber === "200"
                ) && (
                        <PrimaryButton
                          type="button"
                          className={`${styles.responsiveButton}`}
                          iconProps={{ iconName: "Save" }}
                          onClick={(
                            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                          ) => {
                            if (this.state.errorForCummulative) {
                              this.setState({
                                dialogboxForCummulativeError: true,
                              });
                              return;
                            }

                            if (
                              this.state.errorFilesList.wordDocument.length >
                                0 ||
                              this.state.errorFilesList.notePdF.length > 0 ||
                              this.state.errorFilesList.supportingDocument
                                .length > 0
                            ) {
                              this.setState({ isAutoSaveFailedDialog: true });
                            } else {
                              e.preventDefault();
                              this.setState(
                                {
                                  successStatus: "drafted",
                                  autosave: false,
                                },
                                () => {
                                  // Callback to ensure the state is updated before this function executes
                                  this.handleSubmit("Draft");
                                }
                              );

                              clearInterval(this.autoSaveInterval);
                            }
                          }}
                        >
                          Save as Draft
                        </PrimaryButton>
                      )
                    ) : this.state.status === "Returned" ? (
                      <PrimaryButton
                        hidden={this.state.createdByEmail !==this._currentUserEmail}
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
                          if (this.state.errorForCummulative) {
                            this.setState({
                              dialogboxForCummulativeError: true,
                            });
                            return;
                          }

                          if (
                            this.state.errorFilesList.wordDocument.length > 0 ||
                            this.state.errorFilesList.notePdF.length > 0 ||
                            this.state.errorFilesList.supportingDocument
                              .length > 0
                          ) {
                            this.setState({ isAutoSaveFailedDialog: true });
                          } else {
                            e.preventDefault();
                            this.setState(
                              {
                                successStatus: "drafted",
                                autosave: false,
                              },
                              () => {
                                // Callback to ensure the state is updated before this function executes
                                this.handleSubmit("Draft");
                              }
                            );

                            clearInterval(this.autoSaveInterval);
                          }
                        }}
                      >
                        Save as Draft
                      </PrimaryButton>
                    )}
                    {this._itemId ? (
                      <PrimaryButton
                      hidden={this.state.createdByEmail !==this._currentUserEmail}
                        type="button"
                        className={`${styles.responsiveButton}`}
                        onClick={(e: any) => {
                          this.setState({
                            successStatus: "submitted",
                            autosave: false,
                          });
                          e.preventDefault();

                          // if (this._checkValidationArray()){
                          //   this.setState({})
                          // }
                          if (this._checkValidation()) {
                            this.showDialog();
                          } else {
                            this._checkValidationArray();
                            this.setState({ isDialogHidden: false });
                          }
                          clearInterval(this.autoSaveInterval);
                        }}
                        iconProps={{ iconName: "Send" }}
                      >
                        Submit
                      </PrimaryButton>
                    ) : (
                      // Edit submit is above
                      <PrimaryButton
                        type="button"
                        className={`${styles.responsiveButton}`}
                        onClick={async (
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                          this.setState({
                            successStatus: "submitted",
                            autosave: false,
                          });
                          // this.setState({status:'Submitted',statusNumber:'1000'})
                          e.preventDefault();
                          // this.showDialog()
                          if (this._checkValidation()) {
                            this.showDialog();
                          } else {
                            this._checkValidationArray();
                            this.setState({ isDialogHidden: false });
                          }
                          clearInterval(this.autoSaveInterval);
                          // this.handleSubmit( "Submitted");
                        }}
                        iconProps={{ iconName: "Send" }}
                      >
                        Submit
                      </PrimaryButton>
                    )}
                  </div>
                )}

              <DefaultButton
                // type="button"
                onClick={() => {
                  const pageURL: string = this.props.existPageUrl;
                  window.location.href = `${pageURL}`;
                }}
                className={`${styles.responsiveButton} `}
                iconProps={{ iconName: "Cancel" }}
              >
                Exit
              </DefaultButton>
            </div>
          </div>
        )}
        {/* {this.state.isLoadingOnForm && <PageLoader/>} */}
      </div>
    );
  }
}
