/* eslint-disable no-unused-expressions */
/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-void */
import * as React from "react";
import { IViewFormProps } from "../IViewFormProps"; // Ensure this file exists
import { IDropdownOption, Modal, Stack } from "office-ui-fabric-react";
import {
  IconButton,
  Text,
  PrimaryButton,
  DefaultButton,
  IColumn,
  DetailsList,
  SelectionMode,
  Dialog,
  DialogFooter,
  // Icon,
} from "@fluentui/react";
import styles from "../Form.module.scss";
import ApproverAndReviewerTableInViewForm from "./simpleTable/reviewerAndApproverTableInViewForm";
import CommentsLogTable from "./simpleTable/commentsTable";
import WorkFlowLogsTable from "./simpleTable/workFlowLogsTable";
import FileAttatchmentTable from "./simpleTable/fileAttatchmentsTable";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { DialogBlockingExample } from "./dialogFluentUi/dialogFluentUi";
import { format } from "date-fns";
import GeneralCommentsFluentUIGrid from "./simpleTable/generalComment";
import UploadFileComponent from "./uploadFile";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { v4 } from "uuid";
import { ATRAssignee } from "./ATR/atr";
import SuccessDialog from "./dialogFluentUi/endDialog";
import ReferBackCommentDialog from "./dialogFluentUi/referBackCommentDialog";
import RejectBtnCommentCheckDialog from "./dialogFluentUi/rejectCommentsCheckDialog";
import ReturnBtnCommentCheckDialog from "./dialogFluentUi/returnCommentsCheck";
import PDFViewer from "./pdfviewPdfDist/pdfDist";
import PasscodeModal from "./passCode/passCode";
import GistDocsConfirmation from "./dialogFluentUi/gistDocsConfirmationDialog";

import { MarkInfo } from "./markInfo/markInfo";

import "@pnp/sp/profiles";
import GistDocSubmitted from "./dialogFluentUi/gistDocs";
import GistDocEmptyModal from "./dialogFluentUi/gistDocEmptyModal";
import AutoSaveFailedDialog from "./dialogFluentUi/autoSaveFailedDialog";
import NotedCommentDialog from "./dialogFluentUi/notedCommentsDialog";
import SupportingDocumentsUploadFileComponent from "./supportingDocuments";
import CummulativeErrorDialog from "./dialogFluentUi/cummulativeDialog";
import ReferCommentsMandatoryDialog from "./dialogFluentUi/referCommentsMandiatory";
import ChangeApproverMandatoryDialog from "./dialogFluentUi/changeApproverMandiatory";

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
  isDataLoading: boolean;
  department: string;
  departmentAlias: string;
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
  othersFieldValue: any;
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

  errorOfDocuments: any;
  errorFilesList: any;
  errorForCummulative: any;
  dialogboxForCummulativeError: any;

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
  createdByID: any;
  createdByEmailName: any;
  ApproverDetails: any;
  ApproverOrder: any;
  ApproverType: any;

  dialogFluent: any;
  dialogDetails: any;

  commentsData: any;
  generalComments: any;
  commentsLog: any;

  currentApprover: any;
  pastApprover: any;
  referredFromDetails: any;
  refferredToDetails: any;
  noteReferrerDTO: any;

  noteSecretaryDetails: any;
  secretaryGistDocs: any[];
  secretaryGistDocsList: any[];

  atrCreatorsList: any;
  atrGridData: any;
  noteATRAssigneeDetails: any;
  noteATRAssigneeDetailsAllUser:any;
  atrJoinedComments: any;
  atrType: any;

  // reject and return dialog box
  isDialogVisible: any;
  dialogContent: any;

  // success alert
  isVisibleAlter: boolean;
  successStatus: any;
  isGistSuccessVisibleAlter: boolean;

  //refer data and comments needed dailog
  isReferDataAndCommentsNeeded: boolean;

  //change Approver data  dialog \
  isChangeApproverNeeded: boolean;

  // referback dialog
  noteReferrerCommentsDTO: any;
  isReferBackAlterDialog: boolean;

  //reject comments check dialog
  isRejectCommentsCheckAlterDialog: boolean;

  //return comments check dialog
  isReturnCommentsCheckAlterDialog: boolean;

  //noted comments check dialog
  isNotedCommentsManidatoryAlterDialog: boolean;

  draftResolutionFieldValue: any;

  // pass code
  isPasscodeModalOpen: boolean;
  isPasscodeValidated: boolean;

  passCodeValidationFrom: any;

  // gist document dialog
  isGistDocCnrf: boolean;
  isGistDocEmpty: boolean;

  //Mark Info
  noteMarkedInfoDTOState: any;

  // auto save
  isAutoSaveFailedDialog: any;

  //refer exist user dailog box
  isUserExistsModalVisible: any;

  approverIdsHavingSecretary: any;

  peoplePickerSelectedDataWhileReferOrChangeApprover: any;
}

const getIdFromUrl = (): any => {
  const params = new URLSearchParams(window.location.search);
  const Id = params.get("itemId");
  // const Id = params.get("itemId");
  // console.log(Id);
  return Id;
};

export default class ViewForm extends React.Component<
  IViewFormProps,
  IViewFormState
> {
  // private _userName: string = _getUserDetails();
  private _itemId: number = Number(getIdFromUrl());
  private _currentUserEmail = this.props.context.pageContext.user.email;

  private _absUrl: any = this.props.context.pageContext.web.serverRelativeUrl;
  private _folderName: any = "";
  private _committeeType: any =
    this.props.formType === "BoardNoteView" ? "Board" : "eCommittee";

  private _committeeTypeForATR: any =
    this.props.formType === "BoardNoteView" ? "boardnote" : "committeenote";

  private _listname: any;
  private _libraryName: any;
  // private _currentApprover:any;

  constructor(props: IViewFormProps) {
    super(props);
    this.state = {
      title: "",
      isLoading: false,
      isDataLoading: true,
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
      othersFieldValue: "",
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

      errorOfDocuments: false,
      errorFilesList: {
        wordDocument: [],
        notePdF: [],
        supportingDocument: [],
        gistDocument: [],
        cummlativeError: [],
      },

      errorForCummulative: false,
      dialogboxForCummulativeError: false,

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
      expandSections: { generalSection: true }, // Keeps track of expanded sections
      pdfLink: "",

      createdByEmail: "",
      createdByID: "",
      createdByEmailName: "",
      ApproverOrder: "",
      dialogFluent: true,
      dialogDetails: {},
      commentsData: [],
      generalComments: [],
      commentsLog: [],

      currentApprover: [],
      pastApprover: [],
      referredFromDetails: [],
      refferredToDetails: [],
      noteReferrerDTO: [],

      noteSecretaryDetails: [],
      secretaryGistDocs: [],
      secretaryGistDocsList: [],

      atrCreatorsList: [],
      atrGridData: [],
      noteATRAssigneeDetails: [],
      noteATRAssigneeDetailsAllUser: [],
      atrJoinedComments: [],
      atrType: "Default",

      // reject dialog box
      isDialogVisible: false,
      dialogContent: {},

      // success alert
      isVisibleAlter: false,
      isGistSuccessVisibleAlter: false,
      successStatus: "",

      //refer data and comments dialog \
      isReferDataAndCommentsNeeded: false,

      //change Approver data  dialog \
      isChangeApproverNeeded: false,

      // referback dialog
      noteReferrerCommentsDTO: [],
      isReferBackAlterDialog: false,

      //reject comments check dialog
      isRejectCommentsCheckAlterDialog: false,

      //return comments check dialog
      isReturnCommentsCheckAlterDialog: false,

      //noted comments check dialog
      isNotedCommentsManidatoryAlterDialog: false,

      draftResolutionFieldValue: "",

      // pass code
      isPasscodeModalOpen: false,
      isPasscodeValidated: false, // New state to check if passcode is validated
      passCodeValidationFrom: "",
      // / gist document dialog
      isGistDocCnrf: false,
      isGistDocEmpty: false,

      //Mark Info
      noteMarkedInfoDTOState: [],

      // auto save
      isAutoSaveFailedDialog: false,

      isUserExistsModalVisible: false,
      approverIdsHavingSecretary: [],

      peoplePickerSelectedDataWhileReferOrChangeApprover: [],
    };

    const listTitle = this.props.listId;

    this._listname = listTitle?.title;
    // console.log(this._listname)

    const libraryTilte = this.props.libraryId;
    this._libraryName = libraryTilte?.title;

    // console.log(this._libraryName)

    // console.log(this._itemId);
    // console.log(this._formType);
    // console.log(this._folderName);
    // console.log(this.props.context.pageContext.user);
    this._fetchApproverDetails();
    this._fetchATRCreatorDetails();
    this._getItemData(this._itemId, this._folderName).then(async () => {
      // console.log(this.state.departmentAlias);

      this._folderName = await `${this._absUrl}/${
        this._libraryName
      }/${this._folderNameGenerate(this._itemId)}`;

      await this._getItemDocumentsData();
    });
    // this._fetchDepartmentAlias()
  }

  // private _fetchDepartmentAlias = async (): Promise<void> => {
  //   try {
  //     // console.log("Starting to fetch department alias...");

  //     // Step 1: Fetch items from the Departments list
  //     const items: any[] = await this.props.sp.web.lists
  //       .getByTitle("Departments")
  //       .items.select(
  //         "Department",
  //         "DepartmentAlias",
  //         "Admin/EMail",
  //         "Admin/Title"
  //       ) // Fetching relevant fields
  //       .expand("Admin")();

  //     // console.log("Fetched items from Departments:", items);

  //     // Step 2: Find the department entry where the Title or Department contains "Development"
  //     const specificDepartment = items.find(
  //       (each: any) =>
  //         each.Department.includes("Development") ||
  //         each.Title?.includes("Development")
  //     );

  //     if (specificDepartment) {
  //       const departmentAlias = specificDepartment.DepartmentAlias;
  //       // console.log(
  //       //   "Department alias for department with 'Development' in title:",
  //       //   departmentAlias
  //       // );

  //       // Step 3: Update state with the department alias
  //       this.setState(
  //         {
  //           departmentAlias: departmentAlias, // Store the department alias
  //         },
  //         () => {
  //           // console.log(
  //           //   "Updated state with department alias:",
  //           //   this.state.departmentAlias
  //           // );
  //         }
  //       );
  //     } else {
  //       // console.log("No department found with 'Development' in title.");
  //     }
  //   } catch (error) {
  //     // console.error("Error fetching department alias: ", error);
  //   }
  // };

  private _getUserProperties = async (loginName: any): Promise<any> => {
    // console.log(loginName)
    let designation = "NA";
    let email = "NA";
    // const loginName = this.state.peoplePickerData[0]
    const profile = await this.props.sp.profiles.getPropertiesFor(loginName);
    // console.log(profile);
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

  private _fetchApproverDetails = async (): Promise<void> => {
    // const user = await this.props.sp?.web.currentUser();
    // console.log(user)
    // const dataRec = await this._getUserProperties(user.LoginName);
    // console.log(dataRec[0])
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
        // console.log(each);
        // console.log(this._getUserProperties(each.email))
        const user = await this.props.sp.web.siteUsers.getById(
          each.ApproverId
        )();
        // console.log(user);
        const dataRec = await this._getUserProperties(user.LoginName);
        // console.log(dataRec);
        // console.log(dataRec[0]);
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
            optionalText: dataRec[0],
            approverTypeNum: 2,
          };
          // console.log(newObj);
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
              // noteSecretaryDetails: [
              //   ...prev.noteSecretaryDetails,
              //   secretaryObj,
              // ],
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
          if (each.ApproverType === "Approver" && !this._itemId) {
            this.setState({ peoplePickerApproverData: [newObj] });
          }
        } else {
          const user = await this.props.sp.web.siteUsers.getById(
            each.ApproverId
          )();
          // console.log(user);
          const dataRec = await this._getUserProperties(user.LoginName);
          // console.log(dataRec);
          // console.log(dataRec[0]);

          const newObj = {
            text: each.Approver.Title,
            email: each.Approver.EMail,
            ApproversId: each.ApproverId,
            approverType: each.ApproverType,
            // approversOrder: each.ApproverType === "Approver"?2:1,
            Title: each.Title,
            id: each.ApproverId,
            secretary: each.Secretary.Title,
            optionalText: dataRec[0],
            srNo: each.Approver.EMail.split("@")[0],

            approverTypeNum: 1,
          };
          // console.log(newObj);
          if (!this._itemId) {
            this.setState({ peoplePickerData: [newObj] });
          }
          // this.setState({ peoplePickerData: [newObj] });
        }
      });

      // console.log(items);

      // console.log(atrItems, "Atr Items fetched");

      // this.setState({ itemsFromSpList:items });
      // this.setState(prevState => ({
      //   itemsFromSpList: [...prevState.itemsFromSpList, ...items]
      // }));
    } catch (error) {
      console.error("Error fetching list items: ", error);
    }
  };

  private _fetchATRCreatorDetails = async (): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any

      // await this.props.sp.web.lists
      // .getByTitle("ATRCreators")
      // .items()
      // console.log(
      //   await this.props.sp.web.lists.getByTitle("ATRCreators").items()
      // );

      (
        await this.props.sp.web.lists
          .getByTitle("ATRCreators")
          .items
          // .filter(`ATRCreatorsId eq ${this.curre}`)
          .select(
            "*",
            "Author/Title",
            "Author/EMail",
            "Editor/Title",
            "Editor/EMail",
            "ATRCreators/Title",
            "ATRCreators/EMail"
          )
          .expand("Author", "ATRCreators", "Editor")()
      ).map((each: any) => {
        // console.log(each);
        // console.log(this._getUserProperties(each.email))

        this.setState({
          atrCreatorsList: [
            ...this.state.atrCreatorsList,
            {
              atrCreatorId: each.ATRCreatorsId,
              atrCreatorEmail: each.ATRCreators.EMail,
              atrCreatorEmailName: each.ATRCreators.Title,
              createdDate: each.Created,
              createdBy: each.Author.EMail,
              modifiedDate: each.Modified,
              modifiedBy: each.Author.EMail,
              statusMessage: null,
            },
          ],
        });
        return each;
      });

      // console.log(atrItems, "Atr Items fetched");
    } catch (error) {
      // console.error("Error fetching list items: ", error);
    }
  };

  public _folderNameGenerate(id: any): any {
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

  private _getJsonifyReviewer = (item: any, type: string): any[] => {
    // console.log(item);
    // console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Reviewer") {
        // console.log(each, "Reviewer data.................parsed item");
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
      srNo: each.approverEmailName.split("@")[0],
      optionalText: each.designation,
      id: each.id,
      approverType: 1,
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

  private _getJsonifyApprover = (item: any, type: string): any[] => {
    // console.log(item);
    // console.log(JSON.parse(item));
    const parseItem = JSON.parse(item);
    const approverfilterData = parseItem.filter((each: any) => {
      if (each.approverType === "Approver") {
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
      srNo: each.approverEmailName.split("@")[0],
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
    // console.log(extractedValue);
    return extractedValue;
  };

  private _getdataofMarkedInfo = async (
    data: any,
    idData: any
  ): Promise<any> => {
    // console.log(
    //   "*********************************************************************************************************"
    // );
    // console.log(data);

    // Ensure data is not undefined/null and is an array
    if (!Array.isArray(data)) {
      // console.error("Invalid data: Expected an array but got", data);
      return []; // Return an empty array or handle this case as per your needs
    }

    // Create an array of promises using Promise.all
    const ids = await Promise.all(
      data.map(async (each: any) => {
        // console.log(each);
        // Create a new object with text and email
        const userInfo = { text: each.Title, email: each.EMail };
        try {
          // Fetch the user by email
          const users = await this.props.sp.web.siteUsers.getByEmail(
            userInfo.email
          )();
          // console.log(users);
          // Get the user ID
          const id = users.Id;
          // console.log(id);
          // Return the new object with the ID
          return { ...userInfo, id };
        } catch (error) {
          console.error(
            `Failed to fetch user with email ${userInfo.email}:`,
            error
          );
          return { ...userInfo, id: null }; // Handle error and return null or appropriate value
        }
      })
    );

    // console.log(ids); // Log the resolved array of user information

    return ids; // Return the array of resolved objects
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


  private _getATRGridData= (data:any)=>{
    const newATRGridData = JSON.parse(data).map(
      (each:any)=>{
        // console.log(each)
        if (each.atrCreatorEmail === this._currentUserEmail){

          return {
            comments:each.noteApproverComments,
            assignedTo:each.atrAssigneeEmailName,
            status:'Submitted',
  
  
  
          }
        }
        
     
      }
    ).filter((each:any)=>each!==undefined)
    // console.log(newATRGridData,"newATRGridData")
    return newATRGridData

  }

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
        "NoteMarkedInfoDTO/Title",
        "NoteMarkedInfoDTO/EMail",
        "CurrentApprover/Title",
        "CurrentApprover/EMail"
      )
      .expand(
        "Author",
        "Approvers",
        "Reviewers",
        "CurrentApprover",
        "NoteMarkedInfoDTO"
      )();

    // console.log(`${id} ------Details`, item);
    // console.log(folderPath);
    // const folderItem =  await this.props.sp.web.getFolderByServerRelativePath(`${folderPath}/Pdf`)
    // .files().then(res => res);
    // console.log(folderItem)
    // console.log(this._getJsonifyReviewer(item.NoteApproversDTO, "Reviewer"));
    // console.log(this._getJsonifyApprover(item.NoteApproversDTO, "Approver"));
    const purposeData =
      item.Purpose !== null ? JSON.parse(item.Purpose) : ["", ""];
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
            {
              column1: "Current Approver",
              column2: item?.CurrentApprover?.Title,
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
              column2:  `₹ ${item.Amount}`,
            },
            purposeData[0] !== "" && {
              column1: "Purpose",
              column2: `${purposeData[0]}`,
            },
            purposeData[1] !== "" && {
              column1: "Others",
              column2: `${purposeData[1]}`,
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
    // console.log(item.DraftResolution);

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
      puroposeFeildValue:
        item.Purpose !== null ? JSON.parse(item.Purpose)[0] : "",
      othersFieldValue:
        item.Purpose !== null ? JSON.parse(item.Purpose)[1] : "",
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
      isDataLoading: false,
      createdByEmail: item.Author.EMail,
      createdByEmailName: item.Author.Title,
      createdByID: item.AuthorId,
      status:
        item.Status === "Submitted"
          ? this._getStatus(item.NoteApproversDTO)
          : item.Status,
      statusNumber: item.StatusNumber,
      ApproverDetails: JSON.parse(item.NoteApproversDTO),
      currentApprover: await this._getCurrentApproverDetails(
        item.CurrentApprover,
        item.NoteApproversDTO,
        item.StatusNumber,
        item.CurrentApproverId
      ),
      ApproverOrder:
        item.CurrentApprover &&
        item.StatusNumber !== "4000" &&
        this._getCurrentApproverDetails(
          item.CurrentApprover,
          item.NoteApproversDTO,
          item.StatusNumber,
          item.CurrentApproverId
        )[0].approverOrder,

      ApproverType:
        item.CurrentApprover &&
        item.StatusNumber !== "4000" &&
        this._getCurrentApproverDetails(
          item.CurrentApprover,
          item.NoteApproversDTO,
          item.StatusNumber,
          item.CurrentApproverId
        )[0].approverType,
      department: item.Department,

      title: item.Title,
      commentsLog:
        item.NoteApproverCommentsDTO !== null
          ? this._getCommentsData(JSON.parse(item.NoteApproverCommentsDTO))
          : [],
      referredFromDetails:
        item.NoteReferrerDTO !== null
          ? this._getReferedFromAndToDetails(item.NoteReferrerDTO, "from")
          : [],
      refferredToDetails:
        item.NoteReferrerDTO !== null
          ? this._getReferedFromAndToDetails(item.NoteReferrerDTO, "to")
          : [],

      draftResolutionFieldValue: item.DraftResolution,
      noteSecretaryDetails:
        item.NoteSecretaryDTO !== null ? JSON.parse(item.NoteSecretaryDTO) : [],
      noteReferrerDTO:
        item.NoteReferrerDTO !== null ? JSON.parse(item.NoteReferrerDTO) : [],
      noteReferrerCommentsDTO:
        item.NoteReferrerCommentsDTO !== null
          ? JSON.parse(item.NoteReferrerCommentsDTO)
          : [],
      noteATRAssigneeDetails:
        item.NoteATRAssigneeDTO !== null
          ? JSON.parse(item.NoteATRAssigneeDTO)
          : [],
          atrGridData:item.NoteATRAssigneeDTO !== null
          ?this._getATRGridData(item.NoteATRAssigneeDTO) : [],
          noteATRAssigneeDetailsAllUser:  item.NoteATRAssigneeDTO !== null
          ? JSON.parse(item.NoteATRAssigneeDTO)
          : [],
      noteMarkedInfoDTOState:
        item.NoteMarkedInfoDTO !== null
          ? await this._getdataofMarkedInfo(
              item.NoteMarkedInfoDTO,
              item.NoteMarkedInfoDTOStringId
            )
          : [],

      //   item.CommentsLog && typeof item.CommentsLog === "object"|| "string"
      // ?  []
      // : JSON.parse(item.CommentsLog),

      //don't use this commentsData:item.CommentsLog !== typeof null||'null' ? JSON.parse(item.CommentsLog):[],
    });
  };

  private _getStatus = (e: any): any => {
    // console.log(e);
    e = JSON.parse(e);
    return e[0].mainStatus;
  };

  private _getReferedFromAndToDetails = (
    commentsData: any,
    typeOfReferee: any
  ): any => {
    commentsData = JSON.parse(commentsData);
    // console.log(commentsData);
    const lenOfCommentData = commentsData.length;
    if (typeOfReferee === "to") {
      return commentsData[lenOfCommentData - 1].referredTo;
    }
    return commentsData[lenOfCommentData - 1].referredFrom;
  };

  private _getCurrentApproverDetails = (
    currentApproverData: any,
    ApproverDetails: any,
    statusNumber: any,
    id: any
  ): any => {
    ApproverDetails = JSON.parse(ApproverDetails);
    // console.log(currentApproverData,"currentApproverData")
    // console.log(currentApproverData);

    if (statusNumber === "4000") {
      return [
        {
          email: currentApproverData.EMail,
          text: currentApproverData.Title,
          id: id,
        },
      ];
    }

    if (currentApproverData) {
      const filterApproverData = ApproverDetails.filter((each: any) => {
        // console.log(each);
        if ((each.email || each.approverEmail) === currentApproverData.EMail) {
          return { ...each, ...currentApproverData };
        }
      });
      // console.log(filterApproverData);

      return filterApproverData;
    }
    return null;
  };

  private _formatDateTime = (date: string | number | Date) => {
    const formattedDate = format(new Date(date), "dd-MMM-yyyy");
    const formattedTime = format(new Date(date), "hh:mm a");
    return `${formattedDate} ${formattedTime}`;
  };

  private _checkRefereeAvailable = (): any => {
    if (this.state.noteReferrerDTO.length > 0) {
      const currrentReferee =
        this.state.noteReferrerDTO[this.state.noteReferrerDTO.length - 1];
      // console.log(currrentReferee);
      // console.log(currrentReferee.referrerEmail);
      // console.log(this._currentUserEmail);

      // console.log(currrentReferee.referrerEmail === this._currentUserEmail);

      return (
        currrentReferee.referrerEmail === this._currentUserEmail &&
        this.state.statusNumber !== "4900"
      );
    } else {
      return undefined;
    }
  };

  // private _checkCurrentUserIsInSectDTO = ():any=>{
  //   const currentUserIsFromSecDTOAndHeIsSECOrApp = this.state.noteSecretaryDetails.some((each: any) => {
  //     // console.log(each);
  //     // console.log(this._currentUserEmail);
  //     // console.log(
  //     //   each.secretaryEmail === this._currentUserEmail ||
  //     //     each.approverEmail === this._currentUserEmail
  //     // );
  //     if (
  //      ( each.secretaryEmail === this._currentUserEmail)
  //     ) {
  //       return true;
  //     }
  //   });

  //   return currentUserIsFromSecDTOAndHeIsSECOrApp
  // }

  private _checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest = ():
    | boolean
    | null => {
    let result: boolean | null = null; // Declare result variable
    // console.log("btn visablity", this.state.statusNumber, this.state.status);
    // console.log();
    this.state.ApproverDetails.forEach((each: any) => {
      if (
        (each.approverEmail || each.approverEmailName || each.email) ===
          this._currentUserEmail &&
        each.approverOrder === this.state.ApproverOrder
      ) {
        //                 Draft -  100
        // Call back - 200
        // Cancel - 300
        // Submit - 1000
        // Pending Reviewer - 2000
        // Pending Approver - 3000
        // Refer - 4000
        // Return - 5000
        // Reject - 8000
        // Approved - 9000
        switch (this.state.statusNumber) {
          case "9000": //Approved
            // console.log(this.state.statusNumber, this.state.status);
            result = false;
            break;
          case "1000": //submitted
          case "2000": //pending reviewer
          case "3000": //pending approver
          case "6000": //referback
          case "4900": //referback
            // console.log(this.state.statusNumber, this.state.status);
            result = true;
            break;
          case "4000": //refer
          case "5000": //return
          case "8000": //reject
            // console.log(this.state.statusNumber, this.state.status);
            result = false;
            break;
          default:
            // console.log("default");
            result = false;
            break;
        }
      }
    });

    return result; // Return the final result
  };

  private _getFileObj = (data: any): any => {
    const tenantUrl = window.location.protocol + "//" + window.location.host;
    // console.log(tenantUrl);

    const formatDateTime = (date: string | number | Date) => {
      const formattedDate = format(new Date(date), "dd-MMM-yyyy");
      const formattedTime = format(new Date(), "hh:mm a");
      return `${formattedDate} ${formattedTime}`;
    };

    const result = formatDateTime(data.TimeCreated);
    // console.log(data)
    const filesObj = {
      name: data.Name,
      content: data,
      index: 0,
      LinkingUri:data.LinkingUri || data.LinkingUrl,
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
    // console.log(filesObj);
    return filesObj;
  };

  private _getItemDocumentsData = async () => {
    try {
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

      console.log(tempFilesPdf);
      this.setState({ noteTofiles: tempFilesPdf });

      //Word Documents
      // console.log(
      //   "------------------Word Document-----------------------------------"
      // );
      // console.log(`${this._folderName}/WordDocument`);
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
      // console.log(
      //   "------------------Supporting Document-----------------------------------"
      // );

      // console.log(`${this._folderName}/SupportingDocument`);
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

      //Gist documents
      // console.log(
      //   "------------------Gist Document-----------------------------------"
      // );

      // console.log(`${this._folderName}/GistDocuments`);
      const GistDocument = await this.props.sp.web
        .getFolderByServerRelativePath(`${this._folderName}/GistDocuments`)
        .files.select("*")
        .expand("Author", "Editor")()
        .then((res) => res);
      // console.log(GistDocument);
      // console.log(SupportingDocument[0]);

      const tempFilesGistDocument: IFileDetails[] = [];
      GistDocument.forEach((values) => {
        tempFilesGistDocument.push(this._getFileObj(values));
      });
      // console.log(tempFilesGistDocument);
      this.setState({ secretaryGistDocsList: tempFilesGistDocument ,secretaryGistDocs:tempFilesGistDocument});
    } catch {
      // console.log("failed to fetch");
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
    // console.log(tableData);

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
          onRenderDetailsHeader={() => null}
          styles={{
            root: { width: "100%", paddingTop: "4px" },
          }}
        />
      </div>
    );
  };

  private _renderPDFView = (): JSX.Element => {
    // const { pdfLink } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <PDFViewer pdfPath={this.state.pdfLink} noteNumber={this.state.title} />

        {/* <PDFViewer pdfLink={this.state.pdfLink} noteNumber={this.state.title} itemId={this._itemId} /> */}
      </div>
    );
  };

  public reOrderData = (reOrderData: any[]): void => {
    this.setState({ peoplePickerData: reOrderData });
  };

  public removeDataFromGrid = (dataItem: any, typeOfTable: string): void => {
    if (typeOfTable === "Reviewer") {
      // console.log("Remove triggered from Reviewer Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerData: filterData });
    } else {
      // console.log("Remove triggered Approver Table");
      // console.log(dataItem);
      const filterData = this.state.peoplePickerApproverData.filter(
        (item: any) => item.id !== dataItem.id
      );
      this.setState({ peoplePickerApproverData: filterData });
    }
  };

  private _getAuditTrail = async (status: any) => {
    // console.log(this._currentUserEmail, this._role);

    // console.log(profile);
    // console.log(status)
    // console.log(status ==="gistDocuments")

    if (status === "gistDocuments") {
      const auditLog = [
        {
          actionBy: this.props.context.pageContext.user.displayName,
          action:
            this.props.formType === "View"
              ? `Gist Documents are updated for Ecommittee Note`
              : `Gist Documents are updated for Board Note`,

          createdDate:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        },
      ];

      return JSON.stringify([...this.state.auditTrail, ...auditLog]);
    } else {
      const auditLog = [
        {
          actionBy: this.props.context.pageContext.user.displayName,

          action:
            this.props.formType === "View"
              ? `ECommittee Note ${status}`
              : `Board Note ${status}`,

          createdDate:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        },
      ];

      return JSON.stringify([...this.state.auditTrail, ...auditLog]);
    }
  };

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
      console.error("Error clearing folder:", error);
    }
  }

  private async updateGistDocumentFolderItems(
    libraryName: any[],
    folderPath: string,
    type: string
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
      // console.log("updated Gist document successfully");
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private async updateSupportingDocumentFolderItems(
    libraryName: any[],
    folderPath: string,
    type: string
  ) {
    // console.log(libraryName, folderPath, type, "....details attachment");
    // await this.clearFolder(libraryName, folderPath);
    // await this.props.sp.web.rootFolder.folders.addUsingPath(folderPath)
    // console.log(`Folder -----${type}---- created successfully in list`);
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
      // console.log(`updated ${type} document successfully`);
    } catch (error) {
      console.error(`Error updating folder items: ${error}`);
    }
  }

  private _updateDefaultNoteATRAssigneeDetails = async (): Promise<any> => {
    const currentAtrCreator = this.state.atrCreatorsList.filter(
      (each: any) =>
        each.atrCreatorEmail === this.props.context.pageContext.user.email
    );
    // console.log(currentAtrCreator);
    // const assigneeDetails =
    //  {
    //   id: this.state.createdByID,
    //   email: this.state.createdByEmail,
    //   text: this.state.createdByEmailName,
    // };
    // console.log(assigneeDetails);
    this._atrJoinedCommentsToDTO()

    

    const defaultNoteATRAssigneeDetails = [
      {
        atrAssigneeId: this.state.createdByID,
        atrCreatorId: currentAtrCreator[0].atrCreatorId,
        atrCreatorEmail: currentAtrCreator[0].atrCreatorEmail,
        // "atrAssignerEmail": "ib.test4@xencia.com",  from data
        atrAssigneeEmailName: this.state.createdByEmailName,
        atrAssigneeEmail: this.state.createdByEmail,
        approverEmailName: this.state.currentApprover[0].text,
        atrCreatorEmailName: currentAtrCreator[0].atrCreatorEmailName,

        createdDate:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        createdBy: this.props.context.pageContext.user.email,
        modifiedDate:
          new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        modifiedBy: this.props.context.pageContext.user.email,
        statusMessage: null,
        atrId: "",
        noteApproverId: this.state.currentApprover[0].ApproversId,
        approverType: this.state.currentApprover[0].approverType,
        approverOrder: this.state.currentApprover[0].approverOrder,
        approverStatus: 1,
        approverEmail: this.state.currentApprover[0].approverEmail,
        noteApproverComments: this._atrJoinedCommentsToDTO(),
        strATRStatus: "Submitted",
        atrStatus: 1,
        noteId: this._itemId,
      
      },
    ];
    this.setState({
      //  [
      //   data.comments,
      //   ...this.state.atrGridData,
      // ],

      noteATRAssigneeDetails: defaultNoteATRAssigneeDetails,
    });

    // console.log(defaultNoteATRAssigneeDetails);
    return [...this.state.noteATRAssigneeDetailsAllUser,...defaultNoteATRAssigneeDetails];
  };

  private _updateATRRequest = async (currentApproverId: any): Promise<void> => {
    this.state.noteATRAssigneeDetails.map(async (each: any) => {
      // console.log(each);
      // console.log(
      //   JSON.stringify(
      //     this.state.atrGridData
      //       .map((item: any) => {
      //         console.log(each);
      //         item.comments;
      //       })
      //       .filter((comment: any) => comment)
      //   )
      // );
      try {
        const auditLog = [
          {
            actionBy: this.props.context.pageContext.user.displayName,

            action: `ATR Created`,
            createdDate:
              new Date().toDateString() + " " + new Date().toLocaleTimeString(),
          },
        ];

        // console.log(this.state.commentsData)
        const joinedCommentsData = this.state.generalComments
          .filter((each: any) => !!each)
          .map(
            (each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`
          );
        // console.log(joinedCommentsData)
        // console.log(joinedCommentsData.join(', '))
        // const itemAddResult =
        await this.props.sp.web.lists.getByTitle("ATRRequests").items.add({
          Title: this.state.title,
          NoteTo: "",
          Status: "Submitted",
          ATRNoteID: this.state.title,
          Department: this.state.department,
          Subject: this.state.subjectFeildValue,
          AssignedById: each.atrCreatorId,
          // Remarks: "Sample Remarks",

          Remarks: joinedCommentsData.join(", "),
          // Comments: JSON.stringify(this.state.atrGridData.map((item:any) =>{
          //   console.log(each)
          //   item.comments

          // }) .filter((comment:any) => comment)),
          // ActionTaken: "Sample ActionTaken",
          // ActionTakenDate: new Date(),
          AuditTrail: JSON.stringify(auditLog),
          AssigneeId: each.atrAssigneeId,
          StatusNumber: "1000",
          NoteID: `${this._itemId}`,
          CurrentApproverId: each.atrAssigneeId,
          NoteType: this._committeeTypeForATR,
          CommitteeName: this.state.committeeNameFeildValue,
          NoteApproversDTO: JSON.stringify(this.state.ApproverDetails),
          startProcessing: true,
          ATRType: this.state.atrType,
         
        });
        // console.log(itemAddResult);
        // console.log(`Item added with ID: ${itemAddResult.Id}`);
        // await this.updateNoteID(itemAddResult.Id);
      } catch (error) {
        console.error("Error adding item: ", error);
      }
    });
  };

  private _defaultUserAsATR = async (currentApproverId: any): Promise<any> => {
    let defaultAtrObj = {};

    try {
      // console.log(this.state.commentsData)
      const joinedCommentsData = this.state.generalComments
        .filter((each: any) => !!each)
        .map((each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`);
      // console.log(joinedCommentsData)
      // console.log(joinedCommentsData.join(', '))
      const auditLog = [
        {
          actionBy: this.props.context.pageContext.user.displayName,

          action: `ATR Submitted`,
          createdDate:
            new Date().toDateString() + " " + new Date().toLocaleTimeString(),
        },
      ];

      defaultAtrObj = {
        Title: this.state.title,
        NoteTo: "",
        Status: "Submitted",
        ATRNoteID: this.state.title,
        Department: this.state.department,
        Subject: this.state.subjectFeildValue,
        AssignedById: [(await this.props.sp?.web.currentUser())?.Id][0],
        // Remarks: "Sample Remarks",
        Remarks: joinedCommentsData.join(", "),
        AuditTrail: JSON.stringify(auditLog),
        AssigneeId: this.state.createdByID,
        StatusNumber: "1000",
        NoteID: `${this._itemId}`,
        CurrentApproverId: this.state.createdByID,
        NoteType: this._committeeTypeForATR,
        
        CommitteeName: this.state.committeeNameFeildValue,
        NoteApproversDTO: JSON.stringify(this.state.ApproverDetails),
        startProcessing: true,
        ATRType: this.state.atrType,
      };

      // console.log(defaultAtrObj)

      // const itemAddResult =
      await this.props.sp.web.lists
        .getByTitle("ATRRequests")
        .items.add(defaultAtrObj);

      // console.log(`Item added with ID: ${itemAddResult.Id}`);
      // await this.updateNoteID(itemAddResult.Id);
    } catch (error) {
      console.error("Error adding item: ", error);
    }

    return defaultAtrObj;
  };

  private _handleApproverButton = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    let previousApprover: any;
    // console.log(await this._defaultUserAsATR())
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        // console.log(each);

        if (
          each.approverEmail === this._currentUserEmail ||
          each.email === this._currentUserEmail
        ) {
          // console.log("ednter");

          previousApprover = [
            {
              ...each,
              status: statusFromEvent,
              actionDate: new Date(),
              mainStatus: "Approved",
              statusNumber: "9000",
            },
          ];

          return {
            ...each,
            status: statusFromEvent,
            actionDate: new Date(),
            mainStatus: "Approved",
            statusNumber: "9000",
          };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }
        // console.log(each.approversOrder);
        // console.log(this.state.ApproverOrder + 1);
        // console.log(each.approverOrder === this.state.ApproverOrder + 1);
        if (each.approverOrder === this.state.ApproverOrder + 1) {
          // console.log("ednter 2");
          return {
            ...each,
            status: "pending",
            mainStatus:
              each.approverType === "Approver"
                ? "Pending with approver"
                : "Pending With reviewer",
            statusNumber: each.approverType === "Approver" ? "3000" : "2000",
          };
        }
        return each;
      }
    );
    // console.log(modifyApproveDetails);
    // console.log(previousApprover);

    const _getCurrentApproverDetails = (): any => {
      const currentApproverdata = modifyApproveDetails.filter((each: any) => {
        // console.log(each);
        if (each.status === "pending") {
          return each;
        }
      });
      // console.log(currentApproverdata);
      return currentApproverdata[0];
    };
    const currentApproverDetail = _getCurrentApproverDetails();
    // console.log(currentApproverDetail);
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
    const currentApproverId =
      this.state.ApproverOrder === modifyApproveDetails.length
        ? null
        : currentApproverDetail.id;

    this._closeDialog();
    this.setState({ isLoading: true });

    const updateNoteATRAssigneeDTO = this.state.noteATRAssigneeDetails.map(
      (each:any) =>{
        return {...each,noteApproverComments:this._atrJoinedCommentsToDTO()}

      }
    )

    try {
      const updateAuditTrial = await this._getAuditTrail(
        this._checkCurrentUserIsAATRAssignee() ? "Noted" : "Approved"
      );
      // console.log(updateAuditTrial);
      const updateItems = {
        NoteApproversDTO: JSON.stringify(modifyApproveDetails),
        Status: currentApproverDetail?.mainStatus,
        StatusNumber: currentApproverDetail?.statusNumber,
        AuditTrail: updateAuditTrial,
        NoteApproverCommentsDTO: JSON.stringify(this.state.commentsLog),
        // PreviousApproverId:_getPreviousApproverId(),
        CurrentApproverId:
          this.state.ApproverOrder === modifyApproveDetails.length
            ? null
            : currentApproverDetail.id,
        PreviousApproverId: previousApprover[0].id,
        // NoteATRAssigneeDTO: this._checkCurrentUserIsAATRAssignee()
        //   ? JSON.stringify(this.state.atrGridData.length > 0?this.state.noteATRAssigneeDetails:this._updateDefaultNoteATRAssigneeDetails())
        //   : "",

        NoteATRAssigneeDTO: this._checkCurrentUserIsAATRAssignee()
          ? this.state.atrGridData.length > 0
            ? JSON.stringify([...this.state.noteATRAssigneeDetailsAllUser,...updateNoteATRAssigneeDTO])
            : JSON.stringify(await this._updateDefaultNoteATRAssigneeDetails())
          : JSON.stringify([...this.state.noteATRAssigneeDetailsAllUser,...updateNoteATRAssigneeDTO]),

        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
        startProcessing: true,
      };
      // console.log(updateItems);
      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update(updateItems);

      // console.log(itemToUpdate);

      this._checkCurrentUserIsAATRAssignee() &&
        (this.state.atrGridData.length > 0
          ? await this._updateATRRequest(currentApproverId)
          : await this._defaultUserAsATR(currentApproverId));

      await this.updateSupportingDocumentFolderItems(
        this.state.supportingFilesInViewForm,
        `${this._folderName}/SupportingDocument`,
        "Supporting documents"
      );

      if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
        this.setState({ status: statusFromEvent });
        await this.props.sp.web.lists
          .getByTitle(this._listname)
          .items.getById(this._itemId)
          .update({
            Status: statusFromEvent,
            StatusNumber: statusNumber,
          });

        // console.log(itemToUpdateStatusToApproved);
      }

      this.setState({ isLoading: false, isVisibleAlter: true });
    } catch (error) {
      console.error("Error in _handleApproverButton:", error);
    }
  };

  // private _checkCurrentApproverIsInSecretaryDTO = (): any => {
  //   const currentApproverIsInSecreDTO = this.state.noteSecretaryDetails.filter(
  //     (each: any) => {
  //       // console.log(each);
  //       // console.log(this._currentUserEmail);
  //       // console.log(each.approverEmail === this._currentUserEmail);
  //       if (each.approverEmail === this._currentUserEmail) {
  //         return true;
  //       }
  //     }
  //   );
  //   // console.log(currentApproverIsInSecreDTO);
  //   // console.log(currentApproverIsInSecreDTO[0]?.approverEmail);
  //   // console.log(this._currentUserEmail);
  //   // console.log(
  //   //   currentApproverIsInSecreDTO[0]?.approverEmail === this._currentUserEmail
  //   // );
  //   return (
  //     currentApproverIsInSecreDTO[0]?.approverEmail === this._currentUserEmail
  //   );
  // };

  private _checkingCurrentUserInSecretaryDTO = 
  
  (): any => {
    // const currrentUserSect = this.state.noteSecretaryDetails.filter((each: any) => {
    //   console.log(each);
    //   // console.log(this._currentUserEmail);
    //   // console.log(
    //   //   each.secretaryEmail === this._currentUserEmail ||
    //   //     each.approverEmail === this._currentUserEmail
    //   // );
    //   if (
    //    ( each.secretaryEmail === this._currentUserEmail)
    //   ) {
    //     return each;
    //   }
    // });

    // console.log(currrentUserSect)

    // const currentUserIsAnSec =currrentUserSect.length>0 && currrentUserSect.some((each:any)=>each.secretaryEmail ===this._currentUserEmail)
    // console.log(currentUserIsAnSec,"currentUserIsAnSec")
    const checkCurrentUserIsAnApprover = this.state.ApproverDetails.filter(
      (each: any) => each.secretaryEmail && each.approverType === "Approver"
    );
    // console.log(
    //   checkCurrentUserIsAnApprover,
    //   "checkCurrentUserIsAnApprover having Secretary"
    // );

    // const currentUserHavingSecratoryAndHeIsAnApprover = checkCurrentUserIsAnApprover.some((each:any)=>each.approverEmail===this._currentUserEmail)
    // console.log(currentUserHavingSecratoryAndHeIsAnApprover,"currentUserHavingSecratoryAndHeIsAnApprover")

    // return currentUserIsAnSec && checkCurrentUserIsAnApprover.length > 0
    // const checkCurrentApproverIsAnApproverOrNot =
    //   this.state.currentApprover?.[0]?.approverType === "Approver";
    // // console.log(checkCurrentApproverIsAnApproverOrNot)

    const currentUserIsFromSecDTOAndHeIsSECOrApp =
      this.state.noteSecretaryDetails.some((each: any) => {
        // console.log(each);
        // console.log(this._currentUserEmail);
        // console.log(
        //   each.secretaryEmail === this._currentUserEmail ||
        //     each.approverEmail === this._currentUserEmail
        // );
        // const currentApproverEmail =
        //   this.state.currentApprover?.[0]?.approverEmail;
          // console.log( ( each.secretaryEmail === this._currentUserEmail 
          //   )
          // )
          //   console.log( ( 
          //     each.approverEmail === this._currentUserEmail )
          //   )
          //     console.log( (
          //       each.approverEmail === currentApproverEmail))

          //       console.log( ( each.secretaryEmail === this._currentUserEmail ||
          //         each.approverEmail === this._currentUserEmail )
          //        )
          
          // console.log( ( each.secretaryEmail === this._currentUserEmail ||
          //   each.approverEmail === this._currentUserEmail )
          //   &&
          //   each.approverEmail === currentApproverEmail)
        if (
         ( each.secretaryEmail === this._currentUserEmail ||
          each.approverEmail === this._currentUserEmail )
          // &&
          // each.approverEmail === currentApproverEmail
        ) {
          return true;
        }
      });
    // console.log(currentUserIsFromSecDTOAndHeIsSECOrApp);
    // console.log(
    //   checkCurrentUserIsAnApprover && currentUserIsFromSecDTOAndHeIsSECOrApp
    // );
    return (
      checkCurrentUserIsAnApprover && currentUserIsFromSecDTOAndHeIsSECOrApp
    );
  };

  // _checkingCurrentUserInSecretaryDTOAfterApproved

  private _checkingCurrentUserInSecretaryDTOAfterApproved = 
  
  (): any => {
    
   
   

    const currentUserIsFromSecDTOAndHeIsSECOrApp =
      this.state.noteSecretaryDetails.some((each: any) => {
        // console.log(each);
        // console.log(this._currentUserEmail);
        // console.log(
        //   each.secretaryEmail === this._currentUserEmail ||
        //     each.approverEmail === this._currentUserEmail
        // );
       
          
        if (
         ( each.secretaryEmail === this._currentUserEmail)
          // &&
          // each.approverEmail === currentApproverEmail
        ) {
          return true;
        }
      });
    // console.log(currentUserIsFromSecDTOAndHeIsSECOrApp);
    // console.log(
    //   checkCurrentUserIsAnApprover && currentUserIsFromSecDTOAndHeIsSECOrApp
    // );
    return (
       currentUserIsFromSecDTOAndHeIsSECOrApp
    );
  };

 

  private _checkingCurrentUserAsApproverDTOInSecretaryDTO = (): any => {
    // const currrentUserSect = this.state.noteSecretaryDetails.filter((each: any) => {
    //   console.log(each);
    //   // console.log(this._currentUserEmail);
    //   // console.log(
    //   //   each.secretaryEmail === this._currentUserEmail ||
    //   //     each.approverEmail === this._currentUserEmail
    //   // );
    //   if (
    //    ( each.secretaryEmail === this._currentUserEmail)
    //   ) {
    //     return each;
    //   }
    // });

    // console.log(currrentUserSect)

    // const currentUserIsAnSec =currrentUserSect.length>0 && currrentUserSect.some((each:any)=>each.secretaryEmail ===this._currentUserEmail)
    // console.log(currentUserIsAnSec,"currentUserIsAnSec")
    const checkCurrentUserIsAnApprover = this.state.ApproverDetails.filter(
      (each: any) => each.secretaryEmail && each.approverType === "Approver"
    );
    // console.log(
    //   checkCurrentUserIsAnApprover,
    //   "checkCurrentUserIsAnApprover having Secretary"
    // );

    // const currentUserHavingSecratoryAndHeIsAnApprover = checkCurrentUserIsAnApprover.some((each:any)=>each.approverEmail===this._currentUserEmail)
    // console.log(currentUserHavingSecratoryAndHeIsAnApprover,"currentUserHavingSecratoryAndHeIsAnApprover")

    // return currentUserIsAnSec && checkCurrentUserIsAnApprover.length > 0
    // const checkCurrentApproverIsAnApproverOrNot =
    //   this.state.currentApprover?.[0]?.approverType === "Approver";
    // // console.log(checkCurrentApproverIsAnApproverOrNot)

    const currentUserIsFromSecDTOAndHeIsSECOrApp =
      this.state.noteSecretaryDetails.some((each: any) => {
        // console.log(each);
        // console.log(this._currentUserEmail);
        // console.log(
        //   each.secretaryEmail === this._currentUserEmail ||
        //     each.approverEmail === this._currentUserEmail
        // );
        // const currentApproverEmail =
        //   this.state.currentApprover?.[0]?.approverEmail;
        if (
         
          each.approverEmail === this._currentUserEmail||
          each.approverEmail === this._currentUserEmail 
        ) {
          return true;
        }
      });
    // console.log(currentUserIsFromSecDTOAndHeIsSECOrApp);
    // console.log(checkCurrentUserIsAnApprover);
    // console.log(
    //   checkCurrentUserIsAnApprover && currentUserIsFromSecDTOAndHeIsSECOrApp
    // );
    return (
      checkCurrentUserIsAnApprover && currentUserIsFromSecDTOAndHeIsSECOrApp
    );
  };


  // private _checkingCurrentUserInSecretaryDTOOrApprover = (): any => {
  //   return this.state.noteSecretaryDetails.fi((each: any) => {
  //     // console.log(each);
  //     // console.log(this._currentUserEmail);
  //     // console.log(
  //     //   each.secretaryEmail === this._currentUserEmail ||
  //     //     each.approverEmail === this._currentUserEmail
  //     // );
  //     if (
  //       each.secretaryEmail === this._currentUserEmail ||
  //       each.approverEmail === this._currentUserEmail
  //     ) {
  //       return true;
  //     }
  //   });
  // };

  private _checkingCurrentUserIsSecretaryDTO = (): any => {
    const currentUserHavingSecretaryisApproved =
      this.state.ApproverDetails.filter((each: any) => {
        // console.log(each);
        if (
          each.secretary === this.props.context.pageContext.user.displayName &&
          each.statusNumber !== "9000" &&
          each.approverType === "Approver"
        ) {
          return each;
        }
      });
    // console.log(currentUserHavingSecretaryisApproved);

    const filterAllApproverMailHavingSec =
      currentUserHavingSecretaryisApproved.map(
        (each: any) => each.approverEmail
      );

    const checkCurrentUserISanApprover =
      this.state.currentApprover?.length > 0 &&
      filterAllApproverMailHavingSec.includes(
        this.state.currentApprover[0]?.approverEmail
      );
    // console.log(checkCurrentUserISanApprover)

    // const checkCurrentUserISanApprover = currentUserHavingSecretaryisApproved[0].approverEmail === this.state.currentApprover[0].approverEmail
    // console.log(checkCurrentUserISanApprover)
    const userIsSec = this.state.noteSecretaryDetails.some((each: any) => {
      // console.log(each);
      // console.log(this._currentUserEmail);
      // console.log(each.secretaryEmail === this._currentUserEmail);
      if (each.secretaryEmail === this._currentUserEmail) {
        return true;
      }
    });
    // console.log(userIsSec);

    // console.log(userIsSec && currentUserHavingSecretaryisApproved.length > 0);
    return (
      userIsSec &&
      currentUserHavingSecretaryisApproved.length > 0 &&
      checkCurrentUserISanApprover
    );
  };

  private _checkLastCommentByCurrentUser = () => {
    const { commentsData } = this.state;
    const filteredComments = commentsData.filter(
      (comment: any) => comment !== null
    );
    if (filteredComments.length === 0) {
      return true;
    }

    const lastComment = filteredComments[filteredComments.length - 1];
    // console.log(lastComment);
    return !(lastComment.commentedByEmail === this._currentUserEmail);
  };

  private handleReject = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return {
            ...each,
            status: statusFromEvent,
            actionDate: new Date(),
            mainStatus: statusFromEvent,
            statusNumber: statusNumber,
          };
        }
        // if (each.approverOrder===currentApproverOrder+1){

        //   return {...each,status:"pending"}

        // }

        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update({
        NoteApproversDTO: JSON.stringify(modifyApproveDetails),
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
        NoteApproverCommentsDTO: JSON.stringify(this.state.commentsLog),

        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
        startProcessing: true,
      });

    // console.log(itemToUpdate);
    await this.updateSupportingDocumentFolderItems(
      this.state.supportingFilesInViewForm,
      `${this._folderName}/SupportingDocument`,
      "Supporting documents"
    );

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      // console.log(itemToUpdateStatusToApproved);
      // this.state.atrGridData.length > 0 && (await this._updateATRRequest());
      await this.updateSupportingDocumentFolderItems(
        this.state.supportingFilesInViewForm,
        `${this._folderName}/SupportingDocument`,
        "Supporting documents"
      );
    }

    this.setState({ isVisibleAlter: true, isLoading: false });
  };

  private referPassCodeTrigger = (): any => {
    if (!this.state.isPasscodeValidated) {
      this.setState({
        isPasscodeModalOpen: true,
        passCodeValidationFrom: "4000",
        dialogFluent: true,
      }); // Open the modal
      return; // Prevent the method from proceeding until passcode is validated
    }
  };

  private changeApproverPassCodeTrigger = (): any => {
    if (!this.state.isPasscodeValidated) {
      this.setState({
        isPasscodeModalOpen: true,
        passCodeValidationFrom: "7500",
        dialogFluent: true,
      }); // Open the modal
      return; // Prevent the method from proceeding until passcode is validated
    }
  };

  private _referCommentsAndDataMandatory = (): any => {
    if (
      this.state.peoplePickerSelectedDataWhileReferOrChangeApprover.length === 0
    ) {
      this.setState({ dialogFluent: true, isReferDataAndCommentsNeeded: true });
    } else {
      this.setState({ dialogFluent: true, isReferDataAndCommentsNeeded: true });
    }
  };

  private handleRefer = async (
    statusFromEvent: string,
    statusNumber: string,
    commentsObj: any
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        // console.log(each);
        // console.log(each.approverEmail);
        // console.log(this._currentUserEmail);
        // console.log(
        //   (each.approverEmail || each.approverEmailName) ===
        //     this._currentUserEmail
        // );
        if (
          (each.approverEmail || each.approverEmailName) ===
          this._currentUserEmail
        ) {
          // console.log("Entered -----", statusFromEvent);

          return {
            ...each,
            status: statusFromEvent,
            statusNumber,
            actionDate: new Date(),
          };
        }
        // if (each.approverOrder === this.state.ApproverOrder + 1) {
        //   return { ...each, status: "waiting" };
        // }

        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    const referedId = v4();

    // console.log(updateAuditTrial);
    // console.log([
    //   {
    //     approverEmail:
    //       this.state.referredFromDetails[0].email ||
    //       this.state.referredFromDetails[0].approverEmail,
    //     approverEmailName:
    //       this.state.referredFromDetails[0].text ||
    //       this.state.referredFromDetails[0].approverEmailName,
    //     approverType: this.state.referredFromDetails[0].approverType,
    //     createdBy:
    //       this.state.referredFromDetails[0].email ||
    //       this.state.referredFromDetails[0].approverEmail,
    //     createdDate: new Date(),
    //     modifiedBy:
    //       this.state.referredFromDetails[0].email ||
    //       this.state.referredFromDetails[0].approverEmail,
    //     modifiedDate: new Date(),
    //     noteApproverId: this.state.referredFromDetails[0].id,
    //     noteId: this._itemId,

    //     noteReferrerCommentDTO: null,
    //     noteReferrerId: referedId,
    //     noteSupportingDocumentsDTO: null,
    //     referrerEmail:
    //       this.state.refferredToDetails[0].email ||
    //       this.state.refferredToDetails[0].approverEmail,
    //     referrerEmailName:
    //       this.state.refferredToDetails[0].text ||
    //       this.state.refferredToDetails[0].approverEmailName,
    //     referrerStatus: 1,
    //     referrerStatusType: this.state.refferredToDetails[0].status,
    //     referredTo: [
    //       { ...this.state.refferredToDetails[0], noteReferrerId: referedId },
    //     ],
    //     referredFrom: [
    //       { ...this.state.referredFromDetails[0], noteReferrerId: referedId },
    //     ],
    //   },
    // ]);

    const obj = {
      NoteApproversDTO: JSON.stringify(modifyApproveDetails),
      Status: statusFromEvent,
      StatusNumber: statusNumber,
      AuditTrail: updateAuditTrial,
      NoteApproverCommentsDTO: JSON.stringify([
        ...this.state.commentsLog,
        commentsObj,
      ]),

      CurrentApproverId: this.state.refferredToDetails[0].id,
      PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],

      startProcessing: true,
      NoteReferrerDTO: JSON.stringify([
        ...this.state.noteReferrerDTO,
        {
          approverEmail:
            this.state.referredFromDetails[0].email ||
            this.state.referredFromDetails[0].approverEmail,
          approverEmailName:
            this.state.referredFromDetails[0].text ||
            this.state.referredFromDetails[0].approverEmailName,
          approverType: this.state.referredFromDetails[0].approverType,
          createdBy:
            this.state.referredFromDetails[0].email ||
            this.state.referredFromDetails[0].approverEmail,
          createdDate: new Date(),
          modifiedBy:
            this.state.referredFromDetails[0].email ||
            this.state.referredFromDetails[0].approverEmail,
          modifiedDate: new Date(),
          noteApproverId: this.state.referredFromDetails[0].id,
          noteId: this._itemId,

          noteReferrerCommentDTO: [...this.state.generalComments, commentsObj],
          noteReferrerId: referedId,
          noteSupportingDocumentsDTO: null,
          referrerEmail:
            this.state.refferredToDetails[0].email ||
            this.state.refferredToDetails[0].approverEmail,
          referrerEmailName:
            this.state.refferredToDetails[0].text ||
            this.state.refferredToDetails[0].approverEmailName,
          referrerStatus: 1,
          referrerStatusType: this.state.refferredToDetails[0].status,
          referredTo: [
            { ...this.state.refferredToDetails[0], noteReferrerId: referedId },
          ],
          referredFrom: [
            { ...this.state.referredFromDetails[0], noteReferrerId: referedId },
          ],
        },
      ]),
      // referredTo: JSON.stringify(this.state.refferredToDetails),
      // referredFrom: JSON.stringify(this.state.referredFromDetails),
    };
    // console.log(obj);

    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update(obj);
    // .then((resu) => console.log(resu));

    // console.log(itemToUpdate);

    await this.updateSupportingDocumentFolderItems(
      this.state.supportingFilesInViewForm,
      `${this._folderName}/SupportingDocument`,
      "Supporting documents"
    );

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      // console.log(itemToUpdateStatusToApproved);
    }
    this.setState({ isVisibleAlter: true, isLoading: false });
  };

  private handleReferBack = async (
    statusFromEvent: string,
    statusNumber: string,
    commentsObj: any
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    let currentApproverId = "";
    // if (this._checkNoteReferIdHavingComments()){
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        // console.log(each);
        // console.log(each.approverEmail);
        // console.log(this._currentUserEmail);
        // console.log(
        //   (each.approverEmail || each.approverEmailName) ===
        //     this._currentUserEmail
        // );
        if (each.status === "Refered") {
          if (each.approverType === "Reviewer") {
            currentApproverId = each.id;
            // console.log("Entered -----", statusFromEvent);
            return {
              ...each,
              status: "pending",
              statusNumber: "2000",
              actionDate: new Date(),
            };
          } else {
            currentApproverId = each.id;
            // console.log("Entered -----", statusFromEvent);
            return {
              ...each,
              status: "pending",
              statusNumber: "3000",
              actionDate: new Date(),
            };
          }
        }
        // if (each.approverOrder === this.state.ApproverOrder + 1) {
        //   return { ...each, status: "waiting" };
        // }

        return each;
      }
    );

    // console.log(modifyApproveDetails)

    const modifyReferredToDetails = this.state.referredFromDetails.map(
      (each: any, _index: number) => {
        // console.log(each);
        return { ...each, status: statusFromEvent, actionDate: new Date() };
      }
    );

    const updateCurrentReferDTO = this.state.noteReferrerDTO.map(
      (each: any) => {
        // console.log(each);
        if (each !== null) {
          if (
            each.noteReferrerId ===
            this.state.refferredToDetails[0].noteReferrerId
          ) {
            return {
              ...each,
              referredTo: modifyReferredToDetails,
              referredFrom: this.state.referredFromDetails,
              referrerStatus: 2,
              referrerStatusType: statusFromEvent,
            };
          }
        }
        return each;
      }
    );

    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);

    const obj = {
      NoteApproversDTO: JSON.stringify(modifyApproveDetails),
      Status: statusFromEvent,
      StatusNumber: statusNumber,
      CurrentApproverId: currentApproverId,
      AuditTrail: updateAuditTrial,
      NoteApproverCommentsDTO: JSON.stringify([...this.state.commentsLog]),
      NoteReferrerCommentsDTO: JSON.stringify(
        this.state.noteReferrerCommentsDTO
      ),
      NoteReferrerDTO: JSON.stringify(updateCurrentReferDTO),

      startProcessing: true,
      PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
    };
    // console.log(obj);

    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update(obj);
    // .then((resu) => console.log(resu));

    // console.log(itemToUpdate);

    await this.updateSupportingDocumentFolderItems(
      this.state.supportingFilesInViewForm,
      `${this._folderName}/SupportingDocument`,
      "Supporting documents"
    );

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      // console.log(itemToUpdateStatusToApproved);
    }
    this.setState({ isVisibleAlter: true, isLoading: false });

    // }else{
    //   this.setState({isReferBackAlterDialog:true})

    // }
  };

  private handleReturn = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    const modifyApproveDetails = this.state.ApproverDetails.map(
      (each: any, index: number) => {
        if (each.approverEmail === this._currentUserEmail) {
          return { ...each, status: statusFromEvent,statusNumber:'5000', actionDate: new Date() };
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
    // console.log(updateAuditTrial);
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update({
        NoteApproversDTO: JSON.stringify(modifyApproveDetails),
        
        NoteATRAssigneeDTO:JSON.stringify([]),
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
        NoteApproverCommentsDTO: JSON.stringify(this.state.commentsLog),

        startProcessing: true,
        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
      });

    await this.updateSupportingDocumentFolderItems(
      this.state.supportingFilesInViewForm,
      `${this._folderName}/SupportingDocument`,
      "Supporting documents"
    );

    // console.log(itemToUpdate);

    if (this.state.ApproverDetails.length === this.state.ApproverOrder) {
      this.setState({ status: statusFromEvent });
      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          Status: statusFromEvent,
          StatusNumber: statusNumber,
        });

      // console.log(itemToUpdateStatusToApproved);
    }
    this.setState({ isVisibleAlter: true, isLoading: false });
  };

  private handleCallBack = async (
    statusFromEvent: string,
    statusNumber: string
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update({
        startProcessing: true,
        Status: statusFromEvent,
        StatusNumber: statusNumber,
        AuditTrail: updateAuditTrial,
        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
      });

    // console.log(itemToUpdate);

    // await this.updateSupportingDocumentFolderItems(
    //   this.state.supportingFilesInViewForm,
    //   `${this._folderName}/SupportingDocument`,
    //   "Supporting documents"
    // );
    this.setState({ isVisibleAlter: true, isLoading: false });
  };

  // private updateCurrentApprover = ()=>{
  //   this.setState(cur)
  // }

  private _getNoteMarkedId = (): any => {
    const ids = this.state.noteMarkedInfoDTOState.map((each: any) => {
      // console.log(each);
      // console.log(each.id);
      return each.id;
    });

    // console.log(ids);
    return ids;
  };

  private _handleMarkInfoSubmit = async (): Promise<any> => {
    this.setState({isLoading:true})
    const updateAuditTrial = await this._getAuditTrail("Mark Info Added");
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update({
        NoteMarkedInfoDTOId: this._getNoteMarkedId(),
        AuditTrail: updateAuditTrial,
        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
      });

      this.setState({isLoading:false})

    // console.log(itemToUpdate);
  };

  private _changeApproverDataMandatory = (): any => {
    if (
      this.state.peoplePickerSelectedDataWhileReferOrChangeApprover.length === 0
    ) {
      this.setState({ dialogFluent: true, isChangeApproverNeeded: true });
    }
  };

  private handleChangeApprover = async (
    statusFromEvent: string,
    statusNumber: string,
    data: any
  ) => {
    this._closeDialog();
    this.setState({ isLoading: true });
    if (this.state.statusNumber === "4000") {
      const updateAuditTrial = await this._getAuditTrail(statusFromEvent);

      const updateLastNoteReferDTO = {
        ...this.state.noteReferrerDTO[this.state.noteReferrerDTO.length - 1],
        referrerEmail:
          this.state.peoplePickerSelectedDataWhileReferOrChangeApprover[0]
            .email,
        referrerEmailName:
          this.state.peoplePickerSelectedDataWhileReferOrChangeApprover[0].text,
      };
      // console.log(updateLastNoteReferDTO)

      const updateNoteReferDTO = this.state.noteReferrerDTO.map(
        (each: any, index: any) => {
          if (each.noteReferrerId === updateLastNoteReferDTO.noteReferrerId) {
            return {
              ...each,
              referrerEmail:
                this.state.peoplePickerSelectedDataWhileReferOrChangeApprover[0]
                  .email,
              referrerEmailName:
                this.state.peoplePickerSelectedDataWhileReferOrChangeApprover[0]
                  .text,
            };
          }
          return each;
        }
      );

      // console.log(updateNoteReferDTO)

      await this.props.sp.web.lists
        .getByTitle(this._listname)
        .items.getById(this._itemId)
        .update({
          startProcessing: true,
          CurrentApproverId:
            this.state.peoplePickerSelectedDataWhileReferOrChangeApprover[0].id,
          AuditTrail: updateAuditTrial,
          NoteReferrerDTO: JSON.stringify(updateNoteReferDTO),
          PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
        });

        this.setState({ isVisibleAlter: true, isLoading: false },()=>console.log('set during refer change StateCalled'));

      return;
    }

    const checkSelectedApproverHasSecretary =
      this.state.approverIdsHavingSecretary.filter(
        (each: any) => each.ApproverId === this.state.currentApprover[0].id
      );
    // console.log(checkSelectedApproverHasSecretary)

    const secretaryObj = {
      noteSecretarieId: checkSelectedApproverHasSecretary[0]?.noteSecretarieId,
      noteApproverId: checkSelectedApproverHasSecretary[0]?.noteApproverId,
      noteId: this._itemId,
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

    const updateCurrentApprover = (): any => {
      const upatedCurrentApprover = this.state.ApproverDetails.filter(
        (each: any) => {
          // console.log(each);
          // console.log(this.state.currentApprover);
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
            // currentApprover = each.id
            return {
              ...this.state.currentApprover,
              status: "pending",
              actionDate: new Date(),
              mainStatus: each.mainStatus,
              secretary:
                checkSelectedApproverHasSecretary.length > 0
                  ? checkSelectedApproverHasSecretary[0].secretaryEmailName
                  : "",
              secretaryEmail:
                checkSelectedApproverHasSecretary.length > 0
                  ? checkSelectedApproverHasSecretary[0].secretaryEmail
                  : "",
            };
          }
        }
      );
      // console.log(upatedCurrentApprover);
      // console.log([
      //   {
      //     ...this.state.currentApprover[0],
      //     status: "pending",
      //     approverOrder: upatedCurrentApprover[0].approverOrder,
      //     approverStatus: upatedCurrentApprover[0].approverStatus,
      //     approverType: upatedCurrentApprover[0].approverType,
      //     approverEmailName:
      //       this.state.currentApprover[0].email ||
      //       this.state.currentApprover[0].secondaryText,
      //     mainStatus: upatedCurrentApprover[0].mainStatus,
      //   },
      // ]);
      return [
        {
          ...this.state.currentApprover[0],
          status: "pending",
          userId: this.state.currentApprover[0].id,
          approverOrder: upatedCurrentApprover[0].approverOrder,
          approverStatus: upatedCurrentApprover[0].approverStatus,
          approverType: upatedCurrentApprover[0].approverType,
          approverEmail:
            this.state.currentApprover[0].email ||
            this.state.currentApprover[0].secondaryText,
          approverEmailName: this.state.currentApprover[0].text,
          mainStatus: upatedCurrentApprover[0].mainStatus,
          statusNumber: upatedCurrentApprover[0].statusNumber,
          secretary:
            checkSelectedApproverHasSecretary.length > 0
              ? checkSelectedApproverHasSecretary[0].secretaryEmailName
              : "",
        },
      ];
    };
    // console.log(updateCurrentApprover());
    const modifyApproverDetails = this.state.ApproverDetails.map(
      (each: any) => {
        // console.log(each);
        // console.log(each.status);
        // console.log(each.status === "pending");
        if (each.status === "pending") {
          // console.log(updateCurrentApprover());
          return { ...updateCurrentApprover()[0] };
        } else {
          return each;
        }
      }
    );
    // console.log(modifyApproverDetails);
    // console.log(modifyApproverDetails[modifyApproverDetails.length-1].id)

    const reviewerIds = modifyApproverDetails
      .filter((each: any) => each.approverType === "Reviewer")
      .map((each: any) => each.userId);
    const approverId = modifyApproverDetails
      .filter((each: any) => each.approverType === "Approver")
      .map((each: any) => each.userId);
    const currentApproverId = updateCurrentApprover()[0].id;
    // console.log(currentApproverId);
    const updateAuditTrial = await this._getAuditTrail(statusFromEvent);
    // console.log(updateAuditTrial);
    await this.props.sp.web.lists
      .getByTitle(this._listname)
      .items.getById(this._itemId)
      .update({
        startProcessing: true,
        CurrentApproverId: currentApproverId,
        AuditTrail: updateAuditTrial,
        NoteApproversDTO: JSON.stringify(modifyApproverDetails),
        PreviousActionerId: [(await this.props.sp?.web.currentUser())?.Id],
        FinalApproverId:
          modifyApproverDetails[modifyApproverDetails.length - 1].id,
        NoteSecretaryDTO:
          checkSelectedApproverHasSecretary.length > 0
            ? JSON.stringify([...this.state.noteSecretaryDetails, secretaryObj])
            : JSON.stringify([...this.state.noteSecretaryDetails]),
        ReviewersId: reviewerIds,
        ApproversId: approverId,
      });

    // console.log("itemToUpdate in change Approver");
    
    this.setState({ isVisibleAlter: true, isLoading: false },()=>console.log('set during Approver Change StateCalled'));

    checkSelectedApproverHasSecretary.length > 0 &&
      this.setState({
        noteSecretaryDetails: [
          ...this.state.noteSecretaryDetails,
          secretaryObj,
        ],
      });
  };

  private _checkApproveredStatusIsFound = (): any => {
    const checkApproverdStatusisAvailableInApproverDetails =
      this.state.ApproverDetails.reduce((accu: any, each: any) => {
        // console.log(each);
        // console.log(each.status);
        return accu.concat(each.statusNumber);
      }, []);
    // console.log(checkApproverdStatusisAvailableInApproverDetails);
    // console.log(
    //   checkApproverdStatusisAvailableInApproverDetails.includes("Approved")
    // );
    return (
      checkApproverdStatusisAvailableInApproverDetails.includes("9000") ||
      this.state.statusNumber === "4000"
    );
    // if (this.state.statusNumber ==='9000'){
    //   return false
    // }
    // return true
  };

  private _getApproverAndReviewerStageButton = (): any => {
    return (
      <div className={styles.approveEtcBtns}>
        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "EditNote" }} // Icon for Approve
          styles={{
            root: {
              // backgroundColor: "#37b400",
              border: "none",
            },
            rootHovered: {
              // backgroundColor: "#37b400",
              border: "none",
            },
            rootPressed: {
              // backgroundColor: "#37b400",
              border: "none",
            },
          }}
          onClick={
            this._checkCurrentUserIsAATRAssignee() &&
            this._checkCurrentUserIsApproverType()
              ? (e) => {
                  this.setState({ successStatus: "noted" });

                  if (this.state.errorForCummulative) {
                    this.setState({ dialogboxForCummulativeError: true });
                    return;
                  }

                  if (this.state.errorOfDocuments) {
                    this.setState({ isAutoSaveFailedDialog: true });
                  } else if (this._checkLastCommentByCurrentUser()) {
                    this.setState({
                      isNotedCommentsManidatoryAlterDialog: true,
                    });
                  } else {
                    this.setState({
                      isPasscodeModalOpen: true,
                      passCodeValidationFrom: "9000",
                    });

                    // _handleApproverButton

                    // this.setState({ status: "Approved", statusNumber: "9000" });
                  }
                }
              : (e) => {
                  if (this.state.errorForCummulative) {
                    this.setState({ dialogboxForCummulativeError: true });
                    return;
                  }
                  if (this.state.errorOfDocuments) {
                    this.setState({ isAutoSaveFailedDialog: true });
                  } else {
                    this.setState({ successStatus: "approved" });

                    this.setState({
                      isPasscodeModalOpen: true,
                      passCodeValidationFrom: "9000",
                    });

                    // _handleApproverButton

                    // this.setState({ status: "Approved", statusNumber: "9000" });
                  }
                }
          }
        >
          {this._checkCurrentUserIsAATRAssignee() &&
          this._checkCurrentUserIsApproverType()
            ? "Noted"
            : "Approve"}
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "PageRemove" }} // Icon for Reject
          styles={{
            root: {
              // backgroundColor: "#f31700",
              border: "none",
            },
            rootHovered: {
              // backgroundColor: "#f31700",
              border: "none",
            },
            rootPressed: {
              // backgroundColor: "#f31700",
              border: "none",
            },
          }}
          onClick={(e) => {
            if (this.state.errorForCummulative) {
              this.setState({ dialogboxForCummulativeError: true });
              return;
            }

            if (this.state.errorOfDocuments) {
              this.setState({ isAutoSaveFailedDialog: true });
            } else if (this._checkLastCommentByCurrentUser()) {
              this.setState({ isRejectCommentsCheckAlterDialog: true });
            } else {
              this.setState({ successStatus: "rejected" });

              this.setState({
                isPasscodeModalOpen: true,
                passCodeValidationFrom: "8000",
              }); // Open the modal
            }

            // this.setState({ status: "Rejected", statusNumber: "8000" });
          }}
        >
          Reject
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "Share" }} // Icon for Refer
          onClick={(e) => {
            if (this.state.errorForCummulative) {
              this.setState({ dialogboxForCummulativeError: true });
              return;
            }

            this.setState({ successStatus: "referred" });
            if (this.state.errorOfDocuments) {
              this.setState({ isAutoSaveFailedDialog: true });
              return;
            }

            this._hanldeFluentDialog(
              "Refer",
              "Refered",
              "4000",
              ["Add Referee", "Comments"],
              "",
              this._closeDialog,
              this.referPassCodeTrigger
            );

            // this.setState({ status: "Refered", statusNumber: "4000" });
          }}
        >
          Refer
        </PrimaryButton>

        <PrimaryButton
          className={`${styles.responsiveButton}`}
          iconProps={{ iconName: "Undo" }} // Icon for Return
          onClick={(e) => {
            if (this.state.errorForCummulative) {
              this.setState({ dialogboxForCummulativeError: true });
              return;
            }

            if (this.state.errorOfDocuments) {
              this.setState({ isAutoSaveFailedDialog: true });
              return;
            }
            if (this._checkLastCommentByCurrentUser()) {
              this.setState({ isReturnCommentsCheckAlterDialog: true });
            } else {
              this.setState({ successStatus: "returned" });

              this.setState({
                isPasscodeModalOpen: true,
                passCodeValidationFrom: "5000",
              });
            }

            // this.setState({ status: "Returned", statusNumber: "5000" });
          }}
        >
          Return
        </PrimaryButton>
      </div>
    );
  };

  private _getPendingStatus = (data: any): any => {
    // console.log(this.state.ApproverDetails);

    if (this.state.statusNumber === "4000") {
      const lastRefereeDetails =
        this.state.noteReferrerDTO[this.state.noteReferrerDTO.length - 1];
      return lastRefereeDetails.referrerEmailName;
    } else {
      const currentApp = this.state.currentApprover
        ? this.state.currentApprover[0]?.text
        : [];
      // console.log(currentApp)
      return currentApp;
    }
  };

  private _closeDialog = () => {
    // console.log("close is triggered");
    this.setState({ dialogFluent: true });
  };

  private _hanldeFluentDialog = (
    btnType: string,
    currentStatus: string,
    currentStatusNumber: string,
    message: any,
    functionType: any,
    closeFunction: any,
    referPassFuntion: any
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
        referPassFuntion: referPassFuntion,
      },
    });
  };

  public _getCommentData = (
    commentsData: any,
    type: string = "",
    id: string = ""
  ) => {
    // console.log(commentsData);
    // console.log(id);
    if (type === "add") {
      // console.log("entered into Add");
    
      this.setState((prev) => {
        // console.log(commentsData);
        // console.log(prev.commentsData);
        if (this.state.statusNumber === "4000") {
          this.setState({
            noteReferrerCommentsDTO: [
              ...this.state.noteReferrerCommentsDTO,
              {
                ...commentsData,
                ...this.state.noteReferrerDTO[
                  this.state.noteReferrerDTO.length - 1
                ],
              },
            ],
          });
        }

       

        return {
          commentsLog: [...prev.commentsLog, commentsData],
          commentsData: [...prev.commentsData, commentsData],
          generalComments: [...prev.generalComments, commentsData],
        };
      });
    } else if (type === "delete") {
      // console.log("entered into delete");
      const filteredComments = this.state.generalComments.filter(
        (comment: any) => comment !== null
      );

      const updatingCommentData = filteredComments.filter((each: any) => {
        // console.log(each);
        // console.log(each.id);
        // console.log(id);
        // console.log(each.id !== id);
        return each.id !== id;
      });
      // console.log(updatingCommentData);

      const filterCommentLogOFNotCurrentUser = this.state.commentsLog.filter(
        (each:any)=>each.commentedByEmail!==this._currentUserEmail
      )
      this.setState({
        commentsData: updatingCommentData,
        generalComments: updatingCommentData,
        commentsLog:[...filterCommentLogOFNotCurrentUser,... updatingCommentData],
      });
    } else {
      // console.log("entered into save");
      // console.log(id);
      const filterNullData = this.state.commentsLog.filter(
        (each: any) => each !== null
      );
      // console.log(filterNullData)
      const filterIdforUpdateState = filterNullData.filter(
        (each: any) => each?.id === id
      )[0];
      // console.log(filterIdforUpdateState);
      const returnValue = (rowData: any): any => {
        // console.log(rowData);

        const result = rowData
          .filter((each: any) => each !== null)
          .map((item: any) => {
            // console.log(item);
            if (item.id === filterIdforUpdateState.id) {
              return commentsData;
            }
            return item;
          });
        // console.log(result);
        return result;
      };

      const filterNullGeneral = this.state.generalComments.filter(
        (each: any) => each !== null
      );
      // console.log(filterNullGeneral)
      const filterIdforUpdateStateGen = filterNullGeneral.filter(
        (each: any) => each.id === id
      )[0];
      // console.log(filterIdforUpdateStateGen);
      const returnValueGen = (rowData: any): any => {
        // console.log(rowData);
        const result = rowData
          .filter((each: any) => each !== null)
          .map((item: any) => {
            // console.log(item);
            if (item.id === filterIdforUpdateStateGen.id) {
              return commentsData;
            }
            return item;
          });
        // console.log(result);
        return result;
      };

      // console.log(returnValue(this.state.commentsData));
      // console.log(returnValue(this.state.commentsLog))
      this.setState({
        commentsData: returnValue(this.state.commentsData),
        commentsLog: returnValue(this.state.commentsLog),
        generalComments: returnValueGen(this.state.generalComments),
      });
    }
  };


  public _atrJoinedCommentsToDTO = ():void =>{
    const joinedCommentsData =this.state.generalComments
    .filter((each: any) => !!each)
    .map((each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`).join(", ");
    // console.log(joinedCommentsData,"Joined Comments Data....")


    // const updateAtrAssigneeDTO = this.state.noteATRAssigneeDetails.map(
    //   (each:any)=>{
    //     return {...each,noteApproverComments:joinedCommentsData}
    //   }
    // )

    // console.log(updateAtrAssigneeDTO)
    return joinedCommentsData
  }

  private handleSupportingFileChangeInViewForm = (
    files: File[],
    typeOfDoc: string
  ) => {
    // console.log(typeOfDoc);
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
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
      // console.log(files);
      if (files.length > 0) {
        this.setState({
          supportingFilesInViewForm: [...filesArray],
          // supportingDocumentfiles: [...filesArray],
        });
      } else {
        this.setState({
          supportingFilesInViewForm: filesArray,
        });
      }
    }
  };

  private handleGistDocuments = (files: File[], typeOfDoc: string) => {
    // console.log(typeOfDoc);
    // console.log(files);
    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);
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
      // console.log(filesArray);
      if (files.length > 0) {
        this.setState({
          secretaryGistDocs: filesArray,secretaryGistDocsList:filesArray
        });
      } else {
        this.setState({
          secretaryGistDocs: filesArray,secretaryGistDocsList:filesArray
        });
      }
    }
  };

  public _checkCurrentRequestIsReturnedOrRejected = (): boolean => {
    switch (this.state.statusNumber) {
      case "8000": //"Rejected":
      case "5000": //"Returned":
      case "200": //"Call Back":
      case "9000": //"Approved":
      case "300": //"Cancelled":
        return false;
      default:
        return true;
    }
  };

  private _checkCurrentUserIsAATRAssignee = (): any => {
    const checkingATRAvailable = this.state.atrCreatorsList.some(
      (each: any) => {
        // console.log(each);
        // console.log(each.atrCreatorEmail);
        // console.log(this._currentUserEmail);
        // console.log(each.atrCreatorEmail === this._currentUserEmail);
        if (each.atrCreatorEmail === this._currentUserEmail) {
          // console.log(each);
          return true;
        }
      }
    );
    // console.log(checkingATRAvailable,"_checkCurrentUserIsAATRAssignee");
    return checkingATRAvailable;
  };

  private _checkCurrentUserIsApproverType = (): any => {
    const checkingATRAvailable = this.state.ApproverDetails.some(
      (each: any) => {
        // console.log(each);
        // console.log(each.atrCreatorEmail);
        // console.log(this._currentUserEmail);
        // console.log(each.atrCreatorEmail === this._currentUserEmail);
        if (
          each.approverEmail === this._currentUserEmail &&
          each.approverType === "Approver"
        ) {
          // console.log(each);
          return true;
        }
      }
    );
    // console.log(checkingATRAvailable,"_checkCurrentUserIsApproverType");
    return checkingATRAvailable;
  };

  private _checkingCurrentATRCreatorisCurrentApproverOrNot = (): any => {
    // console.log(this._currentUserEmail)
    const checkingCurrentATRCreatorisCurrentApproverOrNot =
      this.state.currentApprover?.length > 0 &&
      this.state.currentApprover[0]?.email === this._currentUserEmail;
    // console.log(each);

    // console.log(checkingCurrentATRCreatorisCurrentApproverOrNot,"_checkingCurrentATRCreatorisCurrentApproverOrNot");
    return (
      checkingCurrentATRCreatorisCurrentApproverOrNot &&
      this.state.statusNumber !== "4000" &&
      this.state.statusNumber !== "5000" &&
      this.state.statusNumber !== "8000"
    );
  };

  public _closeDialogAlter = (type: string) => {
    if (type === "success") {
      const pageURL: string = this.props.homePageUrl;
      // console.log(pageURL);
      window.location.href = `${pageURL}`;
    } else if (type === "commentsNeeded") {
      this.setState({
        expandSections: { generalComments: true, generalSection: false },
      });
    }

    this.setState({
      isVisibleAlter: false,
      isGistSuccessVisibleAlter: false,
      isReferBackAlterDialog: false,
      isRejectCommentsCheckAlterDialog: false,
      isReturnCommentsCheckAlterDialog: false,
      isNotedCommentsManidatoryAlterDialog: false,
    });
  };

  private getMainStatus = (): any => {
    const approver = this.state.ApproverDetails.find(
      (detail: any) =>
        (detail.approverEmail || detail.email || detail.secondaryText) ===
        (this.state.currentApprover[0].approverEmail ||
          this.state.currentApprover[0].email ||
          this.state.currentApprover[0].secondaryText)
    );
    // console.log(approver);
    return approver ? approver.mainStatus : undefined;
  };

  public handlePasscodeSuccess = () => {
    this.setState(
      { isPasscodeValidated: true, isPasscodeModalOpen: false },
      () => {
        // Re-run the _handleApproverButton function now that the passcode is validated

        switch (this.state.passCodeValidationFrom) {
          case "9000": //Approved
            this._hanldeFluentDialog(
              this.state.successStatus === "approved" ? "approve" : "note",
              this.state.successStatus === "approved" ? "Noted" : "Approved",
              "9000",
              this.state.successStatus === "approved"
                ? "Please check the details filled along with attachment and click on Confirm button to approve the request."
                : "Please check the details filled along with attachment and click on Confirm button to note the request.",
              this._handleApproverButton,
              this._closeDialog,
              ""
            );
            break;
          case "1000": //submitted
          case "2000": //pending reviewer
          case "3000": //pending approver
          case "6000": //referback
          case "4900": //referback
            // this.handleReferBack('Referred Back', '4900',this.state.commentsData[this.state.commentsData.length-1]);

            this._hanldeFluentDialog(
              "refer back",
              "Refered Back",
              "4900",
              "Please check the details filled along with attachment and click on Confirm button to refer back the request.",
              this.handleReferBack,
              this._closeDialog,
              ""
            );
            break;
          case "4000": //refer
            // this.handleRefer('Refered', '4000',this.state.commentsData[this.state.commentsData.length-1]);
            this._hanldeFluentDialog(
              "refer",
              "Refered",
              "4000",
              "Please check the details filled along with attachment and click on Confirm button to refer the request.",
              this.handleRefer,
              this._closeDialog,
              ""
            );
            break;
          case "5000": //return
            this._hanldeFluentDialog(
              "return",
              "Returned",
              "5000",
              "Please check the details filled along with attachment and click on Confirm button to return the request.",
              this.handleReturn,
              this._closeDialog,
              ""
            );
            break;
          case "8000": //reject
            this._hanldeFluentDialog(
              "reject",
              "Rejected",
              "8000",
              "Please check the details filled along with attachment and click on Confirm button to reject the request.",
              this.handleReject,
              this._closeDialog,
              ""
            );
            // console.log(this.state.statusNumber, this.state.status);
            // result = false;
            break;
          case "200": //call back
            this.handleCallBack("Call Back", "200");
            break;
          case "7500":
            this.setState({ dialogFluent: true });
            this._hanldeFluentDialog(
              "change approver",
              "Approver Changed",
              "7500",
              "Please click on Confirm button to change approver.",
              this.handleChangeApprover,
              this._closeDialog,
              ""
            );
            break;

          default:
            // console.log("default");
            // result = false;
            break;
        }
      }
    );
  };

  private _randomFileIcon = (docType: string): any => {
    // const FILE_ICONS: { name: string }[] = [
    //   { name: 'accdb' },
    //   { name: 'audio' },
    //   { name: 'code' },
    //   { name: 'csv' },
    //   { name: 'docx' },
    //   { name: 'dotx' },
    //   { name: 'mpp' },
    //   { name: 'mpt' },
    //   { name: 'model' },
    //   { name: 'one' },
    //   { name: 'onetoc' },
    //   { name: 'potx' },
    //   { name: 'ppsx' },
    //   { name: 'pdf' },
    //   { name: 'photo' },
    //   { name: 'pptx' },
    //   { name: 'presentation' },
    //   { name: 'potx' },
    //   { name: 'pub' },
    //   { name: 'rtf' },
    //   { name: 'spreadsheet' },
    //   { name: 'txt' },
    //   { name: 'vector' },
    //   { name: 'vsdx' },
    //   { name: 'vssx' },
    //   { name: 'vstx' },
    //   { name: 'xlsx' },
    //   { name: 'xltx' },
    //   { name: 'xsn' },
    // ];
    const docExtension = docType.split(".");
    const fileExtession = docExtension[docExtension.length - 1];

    let doctype = "txt"; // Default value

    switch (fileExtession.toLocaleLowerCase()) {
      case "accdb":
        doctype = "accdb";
        break;
      case "audio":
        doctype = "audio";
        break;
      case "code":
        doctype = "code";
        break;
      case "csv":
        doctype = "csv";
        break;
      case "docx":
        doctype = "docx";
        break;
      case "doc":
        doctype = "docx";
        break;
      case "dotx":
        doctype = "dotx";
        break;
      case "mpp":
        doctype = "mpp";
        break;
      case "mpt":
        doctype = "mpt";
        break;
      case "model":
        doctype = "model";
        break;
      case "one":
        doctype = "one";
        break;
      case "onetoc":
        doctype = "onetoc";
        break;
      case "potx":
        doctype = "potx";
        break;
      case "ppsx":
        doctype = "ppsx";
        break;
      case "pdf":
        doctype = "pdf";
        break;
      case "photo":
        doctype = "photo";
        break;
      case "pptx":
        doctype = "pptx";
        break;
      case "presentation":
        doctype = "presentation";
        break;
      case "pub":
        doctype = "pub";
        break;
      case "rtf":
        doctype = "rtf";
        break;
      case "spreadsheet":
        doctype = "spreadsheet";
        break;
      case "txt":
        doctype = "txt";
        break;
      case "vector":
        doctype = "vector";
        break;
      case "vsdx":
        doctype = "vsdx";
        break;
      case "vssx":
        doctype = "vssx";
        break;
      case "vstx":
        doctype = "vstx";
        break;
      case "xlsx":
        doctype = "xlsx";
        break;
      case "xltx":
        doctype = "xltx";
        break;
      case "xsn":
        doctype = "xsn";
        break;
      case "png":
        doctype = "photo";
        break;
      case "jpeg":
        doctype = "photo";
        break;
      case "jpg":
        doctype = "photo";
        break;
      case "img":
        doctype = "photo";
        break;
      default:
        doctype = "txt";
      // console.log("Unknown file type.");
    }

    // console.log(`Document type is: ${doctype}`);

    const url = `https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/16/${doctype}.svg`;
    return url;
  };

  // private getFileTypeIcon = (
  //   fileName: string
  // ): { iconName: string; color: string } => {
  //   const extension = fileName.split(".").pop()?.toLowerCase();
  //   switch (extension) {
  //     case "pdf":
  //       return { iconName: "PDF", color: "#FF0000" }; // Red for PDF
  //     case "doc":
  //     case "docx":
  //       return { iconName: "WordDocument", color: "#2B579A" }; // Blue for Word
  //     case "xlsx":
  //     case "xls":
  //       return { iconName: "ExcelDocument", color: "#217346" }; // Green for Excel
  //     default:
  //       return { iconName: "Page", color: "#605E5C" }; // Gray for other files
  //   }
  // };

  // private _getFileWithError = (data:any):any=>{
  //   console.log(data)

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
    // console.log(data)

    // let cummErrorFoundBoolean = false

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

    // if (cummErrorFoundBoolean){
    //   newObj.supportingDocument=[]

    // }

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
      newObj.supportingDocument.length > 0 ||
      newObj.gistDocument.length > 0
    ) {
      this.setState({
        errorOfDocuments: true,
        // isAutoSaveFailedDialog:true
      });
    } else {
      this.setState({
        errorOfDocuments: false,
        // isAutoSaveFailedDialog:false
      });
    }
  };

  private _getAtrCommentsGrid = (data: any): any => {
    // console.log(data)/

    if (this.state.currentApprover !== null && this.state.currentApprover[0].approverEmail === this._currentUserEmail){
      const joinedCommentsData = this.state.generalComments
      .filter((each: any) => !!each)
      .map((each: any) => `${each?.pageNum} ${each?.page} ${each?.comment}`);
    // console.log(joinedCommentsData.join(', '))
    return data.map((each: any) => {
      return { ...each, comments: joinedCommentsData.join(", ") };
    });

    }else{
      return  this.state.atrGridData
    }

   
  };

  private closeUserExistsModal = () => {
    this.setState({ isUserExistsModalVisible: false });
  };

  private getUserExistsModalJSX = (): any => {
    // console.log('enter dialog box');
    return (
      <Modal
        isOpen={this.state.isUserExistsModalVisible}
        onDismiss={this.closeUserExistsModal}
        isBlocking={true}
        styles={{
          main: {
            width: "100%",
            maxWidth: "290px",
            "@media (min-width: 768px)": {
              maxWidth: "580px",
            },
          },
        }}
      >
        {/* Modal header with alert and close icons */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* Info icon and alert text next to each other */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconButton iconProps={{ iconName: "Info" }} />

            <h4 className={styles.headerTitle}>Alert</h4>
          </div>

          {/* Right-side close icon */}
          <IconButton
            iconProps={{ iconName: "Cancel" }}
            ariaLabel="Close modal"
            onClick={this.closeUserExistsModal}
          />
        </div>

        {/* Modal content, centered in the body */}
        <Stack
          tokens={{ padding: "16px" }}
          horizontalAlign="center"
          verticalAlign="center"
        >
          <Text
            style={{ margin: "16px 0", fontSize: "14px", textAlign: "center" }}
          >
            The selected approver cannont be same as existing
            Reviewers/Requester/referee/CurrentActioner
          </Text>
        </Stack>

        {/* Footer with the Close button aligned to the left */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "12px 16px",
            borderTop: "1px solid #ddd",
          }}
        >
          <PrimaryButton
            iconProps={{ iconName: "ReturnToSession" }}
            text="ok"
            onClick={this.closeUserExistsModal}
            ariaLabel="Close modal"
          />
        </div>
      </Modal>
    );
  };

  private _makeIsPassCodeValidateFalse = (): void => {
    this.setState({ isPasscodeValidated: false });
  };

  public render(): React.ReactElement<IViewFormProps> {
    // console.log(this.state);
    // console.log(this.props)
    // console.log(this.state.currentApprover?.[0]?.approverEmail || this.state.currentApprover?.[0]?.email)
    // console.log(this._currentUserEmail)
    // console.log((this.state.currentApprover?.[0]?.approverEmail|| this.state.currentApprover?.[0]?.email) ===this._currentUserEmail)
    // console.log(this._committeeType)
    // this._checkApproveredStatusIsFound()
    // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest();
    // console.log((this.state.refferredToDetails[0] ))
    //   // this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest();
    //   console.log((this.state.refferredToDetails[0].email ))
    // console.log((( this._currentUserEmail)))
    // console.log(((this.state.refferredToDetails?.email === this._currentUserEmail) ))
    // console.log(this.state.statusNumber === '5000')

    // console.log(((this.state.refferredToDetails[0]?.email === this._currentUserEmail) &&this.state.statusNumber === '5000'))
    // console.log(
    //   this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest()
    // );

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
      <div className={styles.viewForm}>
        {this.state.isDataLoading ? (
          <div>
            <Modal
              isOpen={this.state.isDataLoading}
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
          <div className={styles.viewFormMainContainer}>
            {/* Passcode Modal */}

            <form>
              <PasscodeModal
                createPasscodeUrl={this.props.passCodeUrl}
                isOpen={this.state.isPasscodeModalOpen}
                onClose={() =>
                  this.setState({
                    isPasscodeModalOpen: false,
                    isPasscodeValidated: false,
                  })
                }
                onSuccess={this.handlePasscodeSuccess} // Pass this function as the success handler
                sp={this.props.sp}
                user={this.props.context.pageContext.user}
                _makeIsPassCodeValidateFalse={this._makeIsPassCodeValidateFalse}
              />
            </form>

            {this.getUserExistsModalJSX()}

            {/* success  dialog */}
            <SuccessDialog
              existUrl={this.props.existPageUrl}
              // homePageUrl = {this.props.homePageUrl}
              statusOfReq={this.state.successStatus}
              isVisibleAlter={this.state.isVisibleAlter}
              onCloseAlter={() => {
                this._closeDialogAlter("success");
              }}
              typeOfNote={this._committeeType}
            />
            {/* success  dialog */}

            {/* changeApprover data mandiatory  dialog */}

            <ChangeApproverMandatoryDialog
              isVisibleAlter={this.state.isChangeApproverNeeded}
              onCloseAlter={() => {
                this.setState({ isChangeApproverNeeded: false });
              }}
            />

            {this.state.isLoading && (
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
                    },
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

            {/* changeApprover data mandiatory  dialog */}
            {/* refer  comment  dialog */}
            <ReferCommentsMandatoryDialog
              isVisibleAlter={this.state.isReferDataAndCommentsNeeded}
              onCloseAlter={() => {
                this.setState({ isReferDataAndCommentsNeeded: false });
              }}
              statusOfReq={
                this.state.peoplePickerSelectedDataWhileReferOrChangeApprover
              }
            />
            {/* refer  comment  dialog */}
            {/* refer back comment  dialog */}
            <ReferBackCommentDialog
              statusOfReq={this.state.status}
              isVisibleAlter={this.state.isReferBackAlterDialog}
              onCloseAlter={() => {
                this._closeDialogAlter("commentsNeeded");
              }}
            />

            {/* refer back comment  dialog */}
            {/* NOted comment  dialog */}
            <NotedCommentDialog
              statusOfReq={this.state.status}
              isVisibleAlter={this.state.isNotedCommentsManidatoryAlterDialog}
              onCloseAlter={() => {
                this._closeDialogAlter("commentsNeeded");
              }}
            />

            {/* NOted comment  dialog */}

            {/* <PasscodeModal sp={this.props.sp} 
             isOpen={this.state.isPasscodeModalOpen}
             onClose={() => this.setState({ isPasscodeModalOpen: false })}
             onSuccess={this.handlePasscodeSuccess} 
            
            /> */}

            <GistDocEmptyModal
              isVisibleAlter={this.state.isGistDocEmpty}
              onCloseAlter={() => {
                this.setState({ isGistDocEmpty: false });
              }}
              statusOfReq={undefined}
            />

            <GistDocsConfirmation
              isVisibleAlter={this.state.isGistDocCnrf}
              onCloseAlter={() => {
                this.setState({ isGistDocCnrf: false });
              }}
              handleConfirmatBtn={async () => {
                this.setState({ isGistDocCnrf: false, isLoading: true });

                try {
                  await this.updateGistDocumentFolderItems(
                    this.state.secretaryGistDocs,
                    `${this._folderName}/GistDocuments`,
                    "gistDocument"
                  ).then(async () => {
                    const updateAuditTrial = await this._getAuditTrail(
                      "gistDocuments"
                    );
                    await this.props.sp.web.lists
                      .getByTitle(this._listname)
                      .items.getById(this._itemId)
                      .update({
                        AuditTrail: updateAuditTrial,
                      });
                  });

                  this.setState({
                    isLoading: false,
                    isGistSuccessVisibleAlter: true,
                  });
                } catch (e) {
                  // console.log('Error while updating gist documents',e)
                }

                // .then(

                //   async ()=>{
                //     const updateAuditTrial = await this._getAuditTrail("Gist Document");
                //     await this.props.sp.web.lists
                //       .getByTitle(this._listname)
                //       .items.getById(this._itemId)
                //       .update(
                //         {
                //           AuditTrail: updateAuditTrial,
                //         }
                //       )
                //   }
                // );
              }}
              statusOfReq={undefined}
            />

            <GistDocSubmitted
              existUrl={this.props.existPageUrl}
              isVisibleAlter={this.state.isGistSuccessVisibleAlter}
              onCloseAlter={() => {
                this._closeDialogAlter("success");
              }}
              statusOfReq={undefined}
            />

            {/* reject back comment  dialog */}

            <RejectBtnCommentCheckDialog
              statusOfReq={this.state.status}
              isVisibleAlter={this.state.isRejectCommentsCheckAlterDialog}
              onCloseAlter={() => {
                this._closeDialogAlter("commentsNeeded");
              }}
            />

            {/* reject back comment  dialog */}

            {/* return back comment  dialog */}

            <ReturnBtnCommentCheckDialog
              statusOfReq={this.state.status}
              isVisibleAlter={this.state.isReturnCommentsCheckAlterDialog}
              onCloseAlter={() => {
                this._closeDialogAlter("commentsNeeded");
              }}
            />

            {/* return back comment  dialog */}

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

            {/*CummulativeErrorDialog dialog box details */}
            <CummulativeErrorDialog
              isVisibleAlter={this.state.dialogboxForCummulativeError}
              onCloseAlter={() => {
                this.setState({ dialogboxForCummulativeError: false });
              }}
              statusOfReq={undefined}
            />

            {/*CummulativeErrorDialog dialog box details */}
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

            {/* Header section */}
            <div
              className={`${styles.generalSectionMainContainer} ${styles.viewFormHeaderSection}`}
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              <h1
                className={`${styles.generalHeader} ${styles.viewFormHeaderSectionContainer}`}
              >
                pending with:{" "}
                {this.state.status !== "Rejected" &&
                  this._getPendingStatus(this.state.ApproverDetails)}
              </h1>

              <h1
                className={`${styles.generalHeader} ${styles.viewFormHeaderSectionContainer} `}
              >
                eCommittee Note - {this.state.title}
              </h1>

              <h1
                className={`${styles.generalHeader} ${styles.viewFormHeaderSectionContainer}`}
              >
                Status:{" "}
                {this.state.statusNumber === "4900" //refered back
                  ? this.getMainStatus()
                  : this.state.status}
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
                              isEditMode={false}
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

                  {(this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                    this._currentUserEmail !== this.state.createdByEmail) ||
                  this._checkRefereeAvailable() ? (
                    //   ||
                    //  this._checkCurrentUserIsInSectDTO()
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
                              data={this.state.generalComments}
                              currentUserDetails={
                                this.props.context.pageContext.user
                              }
                              _atrJoinedCommentsToDTO = {this._atrJoinedCommentsToDTO}

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
                  {this._checkCurrentUserIsAATRAssignee() &&
                    this._checkCurrentUserIsApproverType() && (
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
                                atrType={this.state.atrType}
                                getATRTypeOnChange={(type: any) => {
                                  this.setState({ atrType: type });
                                }}
                                clearAtrGridDataOnSelectionOFATRType={() => {
                                  this.setState({
                                    atrGridData: [],
                                    noteATRAssigneeDetails: [],
                                  });
                                }}
                                _atrJoinedCommentsToDTO = {this._atrJoinedCommentsToDTO}
                                checkingCurrentATRCreatorisCurrentApproverOrNot={this._checkingCurrentATRCreatorisCurrentApproverOrNot()}
                                getATRJoinedComments={(data: any) => {
                                  // console.log(data,'joined data comments')
                                  this.setState({ atrJoinedComments: data });
                                }}
                                approverDetails={this.state.ApproverDetails}
                                currentATRCreatorDetails={
                                  this._currentUserEmail
                                }
                                sp={this.props.sp}
                                context={this.props.context}
                                atrCreatorsList={this.state.atrCreatorsList}
                                commentsData={this.state.generalComments}
                                artCommnetsGridData={this._getAtrCommentsGrid(
                                  this.state.atrGridData
                                )}
                                deletedGridData={(data: any) => {
                                  this.setState({ atrGridData: data });
                                }}
                                updategirdData={(data: any): void => {
                                  // console.log(data);
                                  this.setState({ atrType: data.atrType });

                                   // console.log(this.state.commentsData)
        

                                  const currentAtrCreator =
                                    this.state.atrCreatorsList.filter(
                                      (each: any) =>
                                        each.atrCreatorEmail ===
                                        this.props.context.pageContext.user
                                          .email
                                    );
                                  // console.log(currentAtrCreator);
                                  const { assigneeDetails } = data;
                                  // console.log(assigneeDetails)
                                  // console.log(data.comments)
                                  this.setState({
                                    atrGridData: data.comments,
                                    
                                    //  [
                                    //   data.comments,
                                    //   ...this.state.atrGridData,
                                    // ],
                                    noteATRAssigneeDetails: [
                                      ...this.state.noteATRAssigneeDetails,
                                      {
                                        atrAssigneeId: assigneeDetails.id,
                                        atrCreatorId:
                                          currentAtrCreator[0].atrCreatorId,
                                        atrCreatorEmail:
                                          currentAtrCreator[0].atrCreatorEmail,
                                        // "atrAssignerEmail": "ib.test4@xencia.com",  from data
                                        atrAssigneeEmailName:
                                          assigneeDetails.text,
                                        atrAssigneeEmail: assigneeDetails.email,
                                        approverEmailName:
                                          this.state.currentApprover[0].text,
                                        atrCreatorEmailName:
                                          currentAtrCreator[0]
                                            .atrCreatorEmailName,

                                        createdDate: new Date(),
                                        createdBy:
                                          this.props.context.pageContext.user
                                            .email,
                                        modifiedDate: new Date(),
                                        modifiedBy:
                                          this.props.context.pageContext.user
                                            .email,
                                        statusMessage: null,
                                        atrId: "",
                                        noteApproverId:
                                          this.state.currentApprover[0]
                                            .ApproversId,
                                        approverType:
                                          this.state.currentApprover[0]
                                            .approverType,
                                        approverOrder:
                                          this.state.currentApprover[0]
                                            .approverOrder,
                                        approverStatus: 1,
                                        approverEmail:
                                          this.state.currentApprover[0]
                                            .approverEmail,
                                        noteApproverComments: "",
                                        strATRStatus: "Pending",
                                        atrStatus: 1,
                                        noteId: this._itemId,
                                      },
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
                            data={this.state.commentsLog} //have change data valu
                            type="commentsLog"
                            formType="view"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/*Attach Supporting Documents */}
                  {
                  // (this._checkCurrentUserIs_Approved_Refered_Reject_TheCurrentRequest() &&
                  //   this._currentUserEmail !== this.state.createdByEmail) ||
                  // this._checkRefereeAvailable()
                  
                  (this.state.currentApprover?.[0]?.approverEmail|| this.state.currentApprover?.[0]?.email) ===this._currentUserEmail? (
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
                            <SupportingDocumentsUploadFileComponent
                              errorData={this._getFileWithError}
                              typeOfDoc="supportingDocument"
                              onChange={
                                this.handleSupportingFileChangeInViewForm
                              }
                              accept=".xlsx,.pdf,.doc,.docx"
                              multiple={true}
                              maxFileSizeMB={25}
                              maxTotalSizeMB={25}
                              data={this.state.supportingFilesInViewForm}
                              addtionalData={this.state.supportingDocumentfiles}
                              cummulativeError={this._getCummulativeError}
                              // value={this.state.supportingDocumentfiles}
                            />
                            <p
                              className={styles.message}
                              style={{ margin: "0px", textAlign: "right" }}
                            >
                              Allowed Formats (pdf,doc,docx,xlsx only) Upto 25MB
                              max.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  {/*Gist Document Section */}
                  {this._checkingCurrentUserInSecretaryDTO() &&
                  this.state.statusNumber !== "5000" &&
                  this.state.statusNumber !== "8000" &&
                  this.state.statusNumber !== "4000" ? (
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
                          <div style={{ padding: "6px", paddingTop: "4px" }}>
                            {/* {this.state.noteSecretaryDetails} */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                padding: "15px",
                                paddingTop: "4px",
                              }}
                            >
                              {/* <h5 style={{marginTop:'5px',marginBottom:'5px'}}>Gist Documents</h5> */}

                              {this._checkingCurrentUserIsSecretaryDTO()?(
                                <UploadFileComponent
                                  errorData={this._getFileWithError}
                                  typeOfDoc="gistDocument"
                                  onChange={this.handleGistDocuments}
                                  accept=".pdf,.doc,.docx "
                                  multiple={false}
                                  maxFileSizeMB={5}
                                  maxTotalSizeMB={5}
                                  data={this.state.secretaryGistDocs}
                                  addtionalData={
                                    this.state.secretaryGistDocsList
                                  }
                                  cummulativeError={undefined} // value={this.state.supportingDocumentfiles}
                                />
                              ):
                              (this._checkingCurrentUserInSecretaryDTOAfterApproved() &&<div
                              style={{
                                padding: "6px",
                                border: "1px solid rgb(211, 211, 211)",
                                width: "100%",
                              }}
                            >
                              <p>Gist Document</p>
                              {this._checkingCurrentUserInSecretaryDTO() &&
                              this.state.secretaryGistDocsList.length > 0 ? (
                                this.state.secretaryGistDocsList.map(
                                  (file, index) => {
                                    // Check if file exists and has the expected properties
                                    if (!file || !file.name) {
                                      return null; // Skip this iteration if the file is invalid
                                    }

                                    // console.log(file);
                                    // console.log(file.fileUrl);
                                    // const { iconName, color } =
                                    //   this.getFileTypeIcon(file.name);
                                    return (
                                      <li
                                        key={index} // Use index as the key here, assuming files are unique
                                        style={{
                                          width: "100%",
                                          marginTop: "5px",
                                        }}
                                        className={`${styles.basicLi} ${styles.attachementli}`}
                                      >
                                        <div
                                          className={`${styles.fileIconAndNameWithErrorContainer}`}
                                        >
                                          {/* <div> */}

                                          <img
                                            // className={ `${styles.fileImgIcon} `}
                                            src={this._randomFileIcon(
                                              file.name
                                            )}
                                            width={32}
                                            height={32}
                                          />
                                          {/* <Icon
                                          iconName={iconName}
                                          style={{
                                            fontSize: "24px",
                                            marginTop: "8px",
                                            color: color,
                                          }}
                                        /> */}

                                          <a
                                           data-interception="off"
                                           className={styles.notePdfCustom}
                                            // href={file.fileUrl}/
                                            href={file.name.toLowerCase().endsWith('.pdf') ? file.fileUrl : file.LinkingUri} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                              // paddingBottom: "8px",
                                              // marginBottom: "12px",
                                              marginTop: "9px",
                                              paddingLeft: "4px",
                                              textDecoration: "none", // Optional: removes underline
                                              // color: "#0078d4", // Optional: sets Fluent UI link color
                                            }}
                                          >
                                            <span
                                              style={{
                                                paddingBottom: "0px",
                                                marginBottom: "0px",
                                                paddingLeft: "4px",
                                              }}
                                            >
                                              {file.name.length > 30
                                                ? `${file.name.slice(
                                                    0,
                                                    20
                                                  )}...`
                                                : file.name}
                                            </span>
                                          </a>
                                          {/* </div> */}
                                        </div>

                                        {/* <IconButton
                                          iconProps={{ iconName: "Cancel" }}
                                          title="Delete File"
                                          ariaLabel="Delete File"
                                          onClick={() => {
                                            this.setState({
                                              secretaryGistDocsList: [],
                                            });
                                          }}
                                        /> */}
                                      </li>
                                    );
                                  }
                                )
                              ) : (
                                <h4>No File Found</h4>
                              )}
                            </div>)}
                              {this._checkingCurrentUserIsSecretaryDTO() && (
                                <p
                                  className={styles.message}
                                  style={{ margin: "0px", textAlign: "right" }}
                                >
                                  Allowed Formats (pdf,doc,docx,only) Upto 5MB
                                  max.
                                </p>
                              )}
                              {this._checkingCurrentUserAsApproverDTOInSecretaryDTO() && <div
                                style={{
                                  padding: "6px",
                                  border: "1px solid rgb(211, 211, 211)",
                                  width: "100%",
                                }}
                              >
                                <p>Gist Document</p>
                                {
                                this.state.secretaryGistDocsList.length > 0 ? (
                                  this.state.secretaryGistDocsList.map(
                                    (file, index) => {
                                      // Check if file exists and has the expected properties
                                      if (!file || !file.name) {
                                        return null; // Skip this iteration if the file is invalid
                                      }

                                      // console.log(file);
                                      // console.log(file.fileUrl);
                                      // const { iconName, color } =
                                      //   this.getFileTypeIcon(file.name);
                                      return (
                                        <li
                                          key={index} // Use index as the key here, assuming files are unique
                                          style={{
                                            width: "100%",
                                            marginTop: "5px",
                                          }}
                                          className={`${styles.basicLi} ${styles.attachementli}`}
                                        >
                                          <div
                                            className={`${styles.fileIconAndNameWithErrorContainer}`}
                                          >
                                            {/* <div> */}

                                            <img
                                              // className={ `${styles.fileImgIcon} `}
                                              src={this._randomFileIcon(
                                                file.name
                                              )}
                                              width={32}
                                              height={32}
                                            />
                                            {/* <Icon
                                            iconName={iconName}
                                            style={{
                                              fontSize: "24px",
                                              marginTop: "8px",
                                              color: color,
                                            }}
                                          /> */}

                                            <a
                                             data-interception="off"
                                             className={styles.notePdfCustom}
                                              // href={file.fileUrl}/
                                              href={file.name.toLowerCase().endsWith('.pdf') ? file.fileUrl : file.LinkingUri} 
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style={{
                                                // paddingBottom: "8px",
                                                // marginBottom: "12px",
                                                marginTop: "9px",
                                                paddingLeft: "4px",
                                                textDecoration: "none", // Optional: removes underline
                                                // color: "#0078d4", // Optional: sets Fluent UI link color
                                              }}
                                            >
                                              <span
                                                style={{
                                                  paddingBottom: "0px",
                                                  marginBottom: "0px",
                                                  paddingLeft: "4px",
                                                }}
                                              >
                                                {file.name.length > 30
                                                  ? `${file.name.slice(
                                                      0,
                                                      20
                                                    )}...`
                                                  : file.name}
                                              </span>
                                            </a>
                                            {/* </div> */}
                                          </div>

                                          {/* <IconButton
                                            iconProps={{ iconName: "Cancel" }}
                                            title="Delete File"
                                            ariaLabel="Delete File"
                                            onClick={() => {
                                              this.setState({
                                                secretaryGistDocsList: [],
                                              });
                                            }}
                                          /> */}
                                        </li>
                                      );
                                    }
                                  )
                                ) : (
                                  <h4>No File Found</h4>
                                )}
                              </div>}
                              
                            </div>
                          </div>
                          {""}
                          <div />
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
                        <div
                          style={{
                            padding: "15px",
                            paddingTop: "4px",
                            width: "100%",
                          }}
                        >
                          <p className={styles.responsiveHeading}>
                            Main Note Link:
                            <a
                              href={this.state.noteTofiles[0]?.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-interception="off"
                              className={styles.notePdfCustom}
                            >
                              {" "}
                              {this.state.noteTofiles[0]?.name}
                            </a>
                          </p>
                          {this._checkingCurrentUserInSecretaryDTO() &&
                            this.state.wordDocumentfiles.length > 0 && (
                              <p
                                className={styles.responsiveHeading}
                                style={{ minWidth: "150px" }}
                              >
                                Word Documents:
                                <a
                                  href={
                                    this.state.wordDocumentfiles[0]?.LinkingUri
                                  }
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-interception="off"
                                  className={styles.notePdfCustom}
                                >
                                  {" "}
                                  {this.state.wordDocumentfiles[0]?.name}
                                </a>
                              </p>
                            )}
                          {/* {this.state.supportingDocumentfiles.length > 0 && ( */}
                          <div style={{ width: "100%", overflow: "auto" }}>
                            <p
                              className={styles.responsiveHeading}
                              style={{ marginTop: "5px", marginBottom: "5px" }}
                            >
                              Support Documents:
                            </p>
                            <FileAttatchmentTable
                              data={this.state.supportingDocumentfiles}
                            />
                          </div>
                          {/* // )} */}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mark for Information Section */}
                  {this.state.statusNumber === "9000" &&
                    this.state.createdByEmail ===
                      this.props.context.pageContext.user.email && (
                      <div className={styles.sectionContainer}>
                        <div
                          className={styles.header}
                          onClick={() => this._onToggleSection(`markInfo`)}
                        >
                          <Text className={styles.sectionText}>
                            Mark for Information Section
                          </Text>
                          <IconButton
                            iconProps={{
                              iconName: expandSections.markInfo
                                ? "ChevronUp"
                                : "ChevronDown",
                            }}
                            title="Expand/Collapse"
                            ariaLabel="Expand/Collapse"
                            className={styles.chevronIcon}
                          />
                        </div>
                        {expandSections.markInfo && (
                          <div
                            className={`${styles.expansionPanelInside}`}
                            style={{ overflowX: "scroll" }}
                          >
                            <div style={{ padding: "15px" }}>
                              <MarkInfo
                                homePageUrl={this.props.homePageUrl}
                                sp={this.props.sp}
                                context={this.props.context}
                                submitFunctionForMarkInfo={
                                  this._handleMarkInfoSubmit
                                }
                                artCommnetsGridData={
                                  this.state.noteMarkedInfoDTOState
                                }
                                deletedGridData={(data: any) => {
                                  this.setState({
                                    noteMarkedInfoDTOState: data,
                                  });
                                }}
                                updategirdData={(data: any): void => {
                                  // console.log(data);

                                  const { markInfoassigneeDetails } = data;
                                  this.setState({
                                    noteMarkedInfoDTOState: [
                                      ...this.state.noteMarkedInfoDTOState,
                                      markInfoassigneeDetails,
                                    ],

                                    // noteMarkedInfoDTOState: [
                                    //   ...this.state.noteMarkedInfoDTOState,
                                    //   {

                                    //     "markedEmail": markInfoassigneeDetails.email,
                                    //     "markedEmailName": markInfoassigneeDetails.text,

                                    //     "createdDate": new Date(),
                                    //     "createdBy": this.props.context.pageContext.user.email,
                                    //     "modifiedDate": new Date(),
                                    //     "modifiedBy": this.props.context.pageContext.user.email,
                                    //     "statusMessage": null,
                                    //     "noteMarkedInformationId": '',
                                    //     'noteId':this._itemId,

                                    //   },
                                    // ],
                                  });
                                }}
                                gridData={this.state.atrGridData}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
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
                        iconProps={{ iconName: "Contact" }}
                        onClick={(e) => {
                          // console.log("Change Approver btn Triggered");
                          this.setState({ successStatus: "approver changed" });
                          this._hanldeFluentDialog(
                            "Change Approver",
                            "changeApprover",
                            "7500",
                            "Change Approver",
                            "",
                            this._closeDialog,
                            this.changeApproverPassCodeTrigger
                          );
                          //  this.handleChangeApprover( "ChangedApprover", "7500");
                          // this.setState({
                          //   status: "changedApprover",
                          //   statusNumber: "7500",
                          // });
                        }}
                      >
                        Change Approver
                      </PrimaryButton>
                    ) : (
                      
                     this.state.statusNumber!=='100' && <PrimaryButton
                        className={`${styles.responsiveButton}`}
                        iconProps={{ iconName: "Previous" }}
                        onClick={(e) => {
                          // console.log("Call Back btn Triggered");
                          this.setState({ successStatus: "call back" });

                          if (!this.state.isPasscodeValidated) {
                            this.setState({
                              isPasscodeModalOpen: true,
                              passCodeValidationFrom: "200",
                            }); // Open the modal
                            return; // Prevent the method from proceeding until passcode is validated
                          }
                          // this.setState({
                          //   status: "Call Back",
                          //   statusNumber: "200",
                          // });
                        }}
                      >
                        Call Back
                      </PrimaryButton>
                    )
                  ) : this.state.noteReferrerDTO.length > 0 &&
                    this.state.noteReferrerDTO[
                      this.state.noteReferrerDTO.length - 1
                    ]?.referrerEmail === this._currentUserEmail &&
                    this.state.statusNumber === "4000" ? (
                    <PrimaryButton
                      className={`${styles.responsiveButton}`}
                      iconProps={{ iconName: "Reply" }}
                      styles={{
                        root: {
                          // backgroundColor: "#37b400",
                          border: "none",
                        },
                        rootHovered: {
                          // backgroundColor: "#37b400", // Set hover background color
                          border: "none",
                        },
                        rootPressed: {
                          // backgroundColor: "#37b400", // Set pressed background color
                          border: "none",
                        },
                      }}
                      onClick={(e) => {
                        // console.log(this._checkNoteReferIdHavingComments())
                        this.setState({ successStatus: "refered back" });

                        if (this.state.errorForCummulative) {
                          this.setState({ dialogboxForCummulativeError: true });
                          return;
                        }

                        if (this.state.errorOfDocuments) {
                          this.setState({ isAutoSaveFailedDialog: true });
                          return;
                        }
                        if (this._checkLastCommentByCurrentUser()) {
                          this.setState({ isReferBackAlterDialog: true });
                        } else {
                          if (!this.state.isPasscodeValidated) {
                            this.setState({
                              isPasscodeModalOpen: true,
                              passCodeValidationFrom: "4900",
                            }); // Open the modal
                            return; // Prevent the method from proceeding until passcode is validated
                          }
                        }

                        // this.setState({
                        //   status: "Refered Back",
                        //   statusNumber: "6000",
                        // });
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

                {this._checkingCurrentUserIsSecretaryDTO() &&
                  this.state.statusNumber !== "5000" &&
                  this.state.statusNumber !== "8000" &&
                  this.state.statusNumber !== "9000" &&
                  this.state.statusNumber !== "4000" && (
                    <PrimaryButton
                      iconProps={{ iconName: "Send" }}
                      style={{
                        alignSelf: "flex-end",
                        marginRight: "8px",
                        marginLeft: "8px",
                      }}
                      onClick={async () => {
                        // if (this.state.isGistDocEmpty){

                        //   this.setState({ isGistVisibleAlter: true });
                        // }else{
                        //   this.setState({isGistDocEmpty:true})

                        // }

                        if (this.state.errorOfDocuments) {
                          this.setState({ isAutoSaveFailedDialog: true });
                        } else {
                          this.state.secretaryGistDocs.length === 0
                            ? this.setState({ isGistDocEmpty: true })
                            : this.setState({ isGistDocCnrf: true });
                        }
                      }}
                    >
                      Submit
                    </PrimaryButton>
                  )}

                <DefaultButton
                  // type="button"
                  onClick={() => {
                    const pageURL: string = this.props.existPageUrl;
                    window.location.href = `${pageURL}`;
                  }}
                  className={`${styles.responsiveButton} `}
                  style={{ marginLeft: "10px" }}
                  iconProps={{ iconName: "Cancel" }}
                >
                  Exit
                </DefaultButton>

                {/* <DefaultButton
                  type="button"
                  // className={`${styles.commonBtn2} ${styles.addBtn}`}
                  className={`${styles.responsiveButton} `}
                  style={{ marginLeft: "10px" }}
                  iconProps={{ iconName: "Cancel" }}
                  onClick={async() => {

                    console.log(this._checkCurrentUserIsAATRAssignee(),"Atr check")
                    console.log(this.state.atrGridData.length > 0,"grid")
                    console.log(JSON.stringify(this.state.noteATRAssigneeDetails),"condition 1")
                    console.log( JSON.stringify(await this._updateDefaultNoteATRAssigneeDetails()),"condition 2")
                    console.log(JSON.stringify(this.state.noteATRAssigneeDetails),"condition 3")
                    this._checkCurrentUserIsAATRAssignee()
                    ? (this.state.atrGridData.length > 0 ? console.log(JSON.stringify(this.state.noteATRAssigneeDetails),"condition 1"):console.log(JSON.stringify(await this._updateDefaultNoteATRAssigneeDetails()),"condition 2")):console.log(JSON.stringify(this.state.noteATRAssigneeDetails),"condition 3")
                  }}
                >
                  test
                </DefaultButton> */}
              </div>
            </div>
          </div>
        )}
        {!this.state.dialogFluent && (
          <DialogBlockingExample
            changeApproverDataMandatory={this._changeApproverDataMandatory}
            referCommentsAndDataMandatory={this._referCommentsAndDataMandatory}
            statusNumberForChangeApprover={this.state.statusNumber}
            referDto={
              this.state.noteReferrerDTO[this.state.noteReferrerDTO.length - 1]
            }
            requesterEmail={this.state.createdByEmail}
            approverIdsHavingSecretary={this.state.approverIdsHavingSecretary}
            isUserExistingDialog={() =>
              this.setState({ isUserExistsModalVisible: true })
            }
            dialogUserCheck={{
              peoplePickerApproverData: this.state.peoplePickerApproverData,
              peoplePickerData: this.state.peoplePickerData,
            }}
            hiddenProp={this.state.dialogFluent}
            dialogDetails={this.state.dialogDetails}
            sp={this.props.sp}
            context={this.props.context}
            fetchReferData={(data: any) => {
              // console.log(data);
              this.setState({
                commentsData: [...this.state.commentsData, data],
                commentsLog: [...this.state.commentsLog, data],
              });
            }}
            fetchReferComments={(data: any) => {
              // console.log(data)
            }}
            fetchAnydata={(data: any, typeOfBtnTriggered: any, status: any) => {
              // console.log(data);
              // console.log(this.state.currentApprover);
              //   const currentRefferedDetails =  {
              //     "noteReferrerId": 0,
              //     "noteApproverId": 4740,
              //     "noteId": 0,
              //     "approverType": 0,
              //     "referrerEmail": data[0].email || data[0].secondaryText,
              //     "approverEmail": this.state.currentApprover[0].approverEmail || this.state.currentApprover[0].email || this.state.currentApprover[0].secondaryText,
              //     "approverEmailName": this.state.currentApprover[0].approverEmailName || this.state.currentApprover[0].text,
              //     "referrerEmailName": data[0].text,
              //     "referrerStatus": 2,
              //     "createdDate": new Date(),
              //     "createdBy":  this.state.currentApprover[0].approverEmail || this.state.currentApprover[0].email || this.state.currentApprover[0].secondaryText,
              //     "modifiedDate": "2024-10-11T10:31:00",
              //     "modifiedBy": new Date(),
              //     "noteReferrerCommentDTO": null,
              //     // "noteSupportingDocumentsDTO": null,
              //     // "statusMessage": null
              // }
              // console.log(typeOfBtnTriggered);
              this.setState({
                peoplePickerSelectedDataWhileReferOrChangeApprover: data,
              });
              if (typeOfBtnTriggered === "Refer") {
                this.setState({
                  refferredToDetails: [{ ...data[0], status: status }],
                  referredFromDetails: this.state.currentApprover,
                  // noteReferrerDTO:[...this.state.noteReferrerDTO,currentRefferedDetails]
                });
              } else {
                this.setState({ currentApprover: data });
              }
            }}
          />
        )}
      </div>
    );
  }
}
