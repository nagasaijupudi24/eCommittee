/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Modal } from "@fluentui/react/lib/Modal";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import {  IIconProps, mergeStyleSets, Stack, TextField } from "@fluentui/react";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";
import { IconButton, Text } from "@fluentui/react";
import { v4 } from "uuid";
// import ReferCommentsMandatoryDialog from "./referCommentsMandiatory";
import SpanComponent from "../spanComponent/spanComponent";
// import ChangeApproverMandatoryDialog from "./changeApproverMandiatory";

interface IDialogProps {
  changeApproverDataMandatory:any;
  referCommentsAndDataMandatory:any;
  statusNumberForChangeApprover:any;
  referDto:any;
  requesterEmail:any;
  dialogUserCheck:any;
  hiddenProp: any;
  dialogDetails: any;
  sp: any;
  context: any;
  fetchReferComments:any;
  fetchAnydata: any;
  fetchReferData:any;
  isUserExistingDialog:any;
  approverIdsHavingSecretary:any;
}

const Header = (props: any) => (
  <Stack
    horizontal
    horizontalAlign="space-between"
    verticalAlign="center"
    styles={{ root: { padding: "10px", borderBottom: "1px solid #ccc" } }}
  >
    <Stack horizontal verticalAlign="center">
      {/* <TooltipHost content="Information about adding a referee"> */}
        <IconButton iconProps={{ iconName: "Info" }} />
      {/* </TooltipHost> */}
      <Text variant="large" styles={{ root: { marginLeft: "3px",fontSize:'16px' } }}>
        {props.heading}
      </Text>
    </Stack>
    <IconButton iconProps={{ iconName: "Cancel" }} onClick={props.onClose} />
  </Stack>
);




export const DialogBlockingExample: React.FunctionComponent<IDialogProps> = (props,) => {
  const {
    dialogUserCheck,
    hiddenProp,
    dialogDetails,
    context,
    sp,
    fetchAnydata,
    isUserExistingDialog,
    requesterEmail
    
  } = props
  // console.log(props)
  // console.log(props.dialogDetails);

  // CSS for responsive design
  const styles = mergeStyleSets({
    modal: {
      minWidth: '300px',
      maxWidth: '80vw',
      width: '100%',
      '@media (min-width: 768px)': {
        maxWidth: '580px', // Adjust width for medium screens
      },
      '@media (max-width: 767px)': {
        maxWidth: '290px', // Adjust width for smaller screens
      },
      margin: 'auto',
      padding: '10px',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #ddd',
        height:'50px'
    },
    headerTitle: {
     margin:'5px',
     marginLeft:'5px',
     fontSize:'16px',
   fontWeight:'400'
    },
    headerIcon: {
     paddingRight: '0px', // Reduced space between the icon and the title
     
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px 0',
      height:'100%',
      '@media (min-width: 768px)': {
        marginLeft: '20px', // Adjust width for smaller screens
        marginRight: '20px', // Adjust width for medium screens
      },
      '@media (max-width: 767px)': {
        marginLeft: '20px', // Adjust width for smaller screens
        marginRight: '20px',
      } 
    },
    contentContainer:{
      width:'70%',
      display:'flex',
      flexDirection:'column',
      justifyContent: 'flex-start',
      alignItems:'flex-start'

    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between', // Adjusted to space between
      
      borderTop: '1px solid #ddd',
      paddingTop: '10px',
      minHeight:'50px'
    },
    button: {
      maxHeight:'32px',
      flex: '1 1 50%', // Ensures each button takes up 50% of the footer width
      margin: '0 5px', // Adds some space between the buttons
    },
    buttonContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonIcon: {
      marginRight: '4px', // Adjust the space between the icon and text
    },
  
    removeTopMargin:{
      marginTop: '4px',
      marginBottom: '4px'
    }
    
  });
  const [data, setData] = React.useState<any>('');
  const [isUserExistsModalVisible, setIsUserExistsModalVisible] = React.useState(false); // Modal visibility state  const [data, setData] =
    React.useState<any>('');
    // const [isVisibleAlter, setIsVisableAlter] =
    // React.useState<any>(false);
  const [referredCommentTextBoxValue, setReferredCommentTextBoxValue] =
    React.useState<any>('');

    // const [type, setType] =
    // React.useState<any>('');

  const handleConfirmBtn = () => {
    // console.log("Confirm btn triggered");
    dialogDetails.functionType(
      dialogDetails.status === "Noted"?"Approved":dialogDetails.status,
      dialogDetails.statusNumber
    );
  };

  const closeIcon: IIconProps = { iconName: "Cancel" };

  const getGeneralDialogJSX = (): any => {
    // console.log("General dialog functionality is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        containerClassName={styles.modal}
       
      >
        <div  className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* <Icon iconName="WaitlistConfirm" style={{ marginRight: '10px' }} /> */}
            <IconButton iconProps={{ iconName: "WaitlistConfirm" }} />
            <h4 className={styles.headerTitle}>Confirmation</h4>
          </div>
          <IconButton iconProps={closeIcon} onClick={dialogDetails.closeFunction} />
        </div>
        <div
        className={styles.body}
        //  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', marginTop: '20px' }}
        >
          <p >{dialogDetails.subText}</p>
          <p style={{textAlign:'center'}}>{dialogDetails.message}</p>
        </div>

        
        <div className={styles.footer}>
          <PrimaryButton
          styles={{ root: styles.buttonContent }}
          className={styles.button}
          
          iconProps={{ iconName: "SkypeCircleCheck" }} onClick={handleConfirmBtn} text="Confirm"  />
          <DefaultButton
          styles={{ root: styles.buttonContent }}
          className={styles.button}
          iconProps={{ iconName: "ErrorBadge" }} onClick={dialogDetails.closeFunction} text="Cancel" />
        </div>
      </Modal>
    );
  };


  const checkReviewer = (data:any): boolean => {
    const approverTitles = dialogUserCheck.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    // console.log(approverTitles)
    const reviewerTitles = dialogUserCheck.peoplePickerData.map(
      (each: any) => each.text
    );
    // console.log(reviewerTitles)
    // console.log(data)
  
    const reviewerInfo = data[0];
    // console.log(reviewerInfo)
    const reviewerEmail = reviewerInfo.email || reviewerInfo.secondaryText;
    // console.log(reviewerEmail)
    const reviewerName = reviewerInfo.text;
    // console.log(reviewerName)
  
    const isReviewerOrApprover =
      reviewerTitles.includes(reviewerName) ||
      approverTitles.includes(reviewerName);

      // console.log(isReviewerOrApprover)
    
    const isCurrentUserReviewer = context.pageContext.user.email === reviewerEmail;
    // console.log(isCurrentUserReviewer)
    const isRequester = reviewerInfo.email === requesterEmail

    // console.log(isReviewerOrApprover || isCurrentUserReviewer)
    console.log(props.referDto)

   

    if (props.dialogDetails.type === 'Refer'){
      return isReviewerOrApprover || isCurrentUserReviewer ||isRequester 

    }else{
      if (props.statusNumberForChangeApprover === '4000'){
        const isSelectedUserIsAnReferee =(Object.keys(props.referDto).length > 0) ? props.referDto.referrerEmail ===  reviewerInfo.email :false
        console.log(isSelectedUserIsAnReferee)
        console.log(props.dialogDetails)
        return isReviewerOrApprover || isCurrentUserReviewer ||isRequester ||isSelectedUserIsAnReferee;

      }
      return isReviewerOrApprover || isCurrentUserReviewer ||isRequester 
      
      

    }
    
  
   
    
  };
  
  
  

  const _getDetails = (data: any, typeOFButtonTriggererd: any): any => {
    // console.log("Referrer function is Triggered");
    // console.log(data, typeOFButtonTriggererd);
    
    setData(data);
  
    // Call checkReviewer function and display modal if user exists
  
    
    fetchAnydata(data, typeOFButtonTriggererd, dialogDetails.status);
  };

  const handleChangeApporver = () => {

    if (dialogDetails.referPassFuntion !==''){
      dialogDetails.referPassFuntion()

    }

    


    if (dialogDetails.functionType !==''){
      // console.log("change approver btn triggered");
      dialogDetails.functionType(
        dialogDetails.status,
        dialogDetails.statusNumber
      );
    }
    // console.log("change approver btn triggered");
    // dialogDetails.functionType(
    //   dialogDetails.status,
    //   dialogDetails.statusNumber
    // );
  };

  const handleReferData = () => {
    // console.log("Refer btn triggered");

    if (dialogDetails.referPassFuntion !==''){
      dialogDetails.referPassFuntion()

    }

    


    if (dialogDetails.functionType !==''){
      dialogDetails.functionType(
        dialogDetails.status,
        dialogDetails.statusNumber,
        referredCommentTextBoxValue
      );

    }


   

    props.fetchReferData(referredCommentTextBoxValue)
   
  };

  const closeUserExistsModal = () => {
    setIsUserExistsModalVisible(false);
  };

  const getUserExistsModalJSX = (): any => {
    // console.log('enter dialog box');
    return (
      <Modal
        isOpen={isUserExistsModalVisible}
        onDismiss={closeUserExistsModal}
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
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 12px",
          borderBottom: "1px solid #ddd",
        }}>
          {/* Info icon and alert text next to each other */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <IconButton iconProps={{ iconName: "Info" }} />
           
            <h4 className={styles.headerTitle}>Alert</h4>
          </div>
  
          {/* Right-side close icon */}
          <IconButton
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close modal"
            onClick={closeUserExistsModal}
          />
        </div>
  
        {/* Modal content, centered in the body */}
        <Stack tokens={{ padding: "16px" }} horizontalAlign="center" verticalAlign="center">
          <Text style={{ margin: "16px 0", fontSize: "14px", textAlign: "center" }}>
          The selected approver cannont be same as existing Reviewers/Requester/referee/CurrentActioner
          </Text>
        </Stack>
  
        {/* Footer with the Close button aligned to the left */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px 16px",
          borderTop: "1px solid #ddd",
        }}>
          <PrimaryButton
          iconProps={{ iconName: 'ReturnToSession', styles: { root: styles.buttonIcon } }}
           
            text="ok"
            onClick={closeUserExistsModal}
            ariaLabel="Close modal"
          />
        </div>
      </Modal>
    );
  };
  

  const getChangeApproverJsx = (): any => {
    // console.log("Change Approver is triggered");
  
  
  
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        containerClassName={styles.modal}
      >
        {/* <ChangeApproverMandatoryDialog isVisibleAlter={isVisibleAlter} onCloseAlter={()=>setIsVisableAlter(false) } statusOfReq={type}/> */}
        <Header heading={'Change Approver'} onClose={dialogDetails.closeFunction} />
        <div className={styles.body} style={{paddingTop:'10px'}}>
          {/* <div className={styles.contentContainer} style={{ width: "90%" }}>
            <p>{dialogDetails.message}<SpanComponent/></p>
            <PnPPeoplePicker
              context={context}
              spProp={sp}
              getDetails={_getDetails}
              typeOFButton="Change Approver" clearPeoplePicker={undefined} disabled={true}   />

          </div> */}

          <div style={{ width: "90%" }}>
            <div style={{width:'100%'}}>
            <p style={{textAlign:'left'}}>{dialogDetails.message}<SpanComponent/></p>
            <PnPPeoplePicker
              context={context}
              spProp={sp}
              getDetails={_getDetails}
              typeOFButton="Change Approver" clearPeoplePicker={undefined} disabled={true}   />

            </div>
             
            </div>
          
         
        </div>
        <div className={styles.footer}>
          <PrimaryButton  styles={{ root: styles.buttonContent }} iconProps={{ iconName: "SkypeCircleCheck" }} className={styles.button} onClick={
            
           
            ()=>{
              console.log(data)
              if (data ===''){

                // setType("data")
               
                // setIsVisableAlter(true)
                props.changeApproverDataMandatory()
                return
              }
              if (checkReviewer(data)) {
                dialogDetails.closeFunction()
                isUserExistingDialog()
              // console.log('enter dialog box')
              // setIsUserExistsModalVisible(true);  // Show the modal
              return;
            }
            
            
            handleChangeApporver()
            } }
            text="Submit" />
          <DefaultButton  styles={{ root: styles.buttonContent }} iconProps={{ iconName: "ErrorBadge" }} className={styles.button} onClick={dialogDetails.closeFunction} text="Cancel" />
          </div>
      </Modal>
    );
  };
  const getReferJSX = (): any => {
    // console.log("Refered is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        containerClassName={styles.modal}
      >
          {/* <ReferCommentsMandatoryDialog isVisibleAlter={isVisibleAlter} onCloseAlter={()=>setIsVisableAlter(false) } statusOfReq={type}/> */}
        <div>
          <Header heading={'Add Refree'} onClose={dialogDetails.closeFunction} />
          <div
            style={{
              // border: '1px solid red',
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              padding: "20px",
              paddingTop:'5px'
            }}
          >
            <div style={{ width: "90%" }}>
            <h4 className={styles.headerTitle}>{dialogDetails.message[0]}</h4>
             
              <PnPPeoplePicker
                context={context}
                spProp={sp}
                getDetails={_getDetails}
                typeOFButton="Refer" clearPeoplePicker={undefined} // styles={{ root: { width: '95%' } }}
                disabled={true}              />
            </div>
            <div style={{width:'90%'}}>
            <h4 className={styles.headerTitle} style={{alignSelf:'flex-start'}}>{dialogDetails.message[1]}</h4>
            <TextField
             
              multiline
              rows={3}
              onChange={(
                _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newText: string
              ): void => {
                // console.log(newText);
                setReferredCommentTextBoxValue(() => {
                  // console.log(context.pageContext.user);
                  const commentsObj = {
                    id: v4(),
                    pageNum: "N/A",
                    page: "N/A",
                    comment: newText,
                    commentedBy: context.pageContext.user.displayName,
                    commentsFrom: dialogDetails.status,
                    commentedEmail: context.pageContext.user.email,
                  };
                  // console.log(commentsObj);
                  return commentsObj;
                });
              }}
              styles={{ root: { width: "100%" } }}
            />

            </div>
           
          </div>
          <div className={styles.footer}
          >
            <PrimaryButton
              onClick={()=>{
                if (data ===''){

                  // setType("data")
                  // setIsVisableAlter(true)
                  props.referCommentsAndDataMandatory()
                }else if(referredCommentTextBoxValue===''){
                  // setType("comments")
                  // setIsVisableAlter(true)
                  props.referCommentsAndDataMandatory()
                  
                }else{
                // if(data !== ''){
                  if (checkReviewer(data)) {
                    dialogDetails.closeFunction()
                    isUserExistingDialog()
                  // console.log('enter dialog box')
                  // setIsUserExistsModalVisible(true);  // Show the modal
                  return; // Stop execution if user exists
                }

                // }

                 


                  
                  handleReferData()
                }


              }}
              className={styles.button}
              text="Confirm"
              iconProps={{ iconName: "SkypeCircleCheck" }}
              styles={{ root: styles.buttonContent }}
              
            />
            <DefaultButton
            className={styles.button}
              onClick={dialogDetails.closeFunction}
              text="Cancel"
              iconProps={{ iconName: "ErrorBadge" }}
              styles={{ root: styles.buttonContent }}
             
            />
          </div>
        </div>
      </Modal>
    );
  };

  switch (props.dialogDetails.type) {
   
    case "Change Approver":
      return  <>
      {getChangeApproverJsx()}
      {getUserExistsModalJSX()} {/* Render the User Exists Modal */}
    </>
    case "Refer":
      return  <>
      {getReferJSX()}
      {getUserExistsModalJSX()} {/* Render the User Exists Modal */}
    </>
      default:
        return (
          <>
            {getGeneralDialogJSX()}
            {getUserExistsModalJSX()} {/* Render the User Exists Modal */}
          </>
        );
  }
};
