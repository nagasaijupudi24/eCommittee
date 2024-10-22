/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Modal } from "@fluentui/react/lib/Modal";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { FontIcon, Icon, IIconProps, mergeStyleSets, Stack, TextField } from "@fluentui/react";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";
import { IconButton, Text, TooltipHost } from "@fluentui/react";
import { v4 } from "uuid";
import ReferCommentsMandatoryDialog from "./referCommentsMandiatory";

interface IDialogProps {
  dialogUserCheck:any;
  hiddenProp: any;
  dialogDetails: any;
  sp: any;
  context: any;
  fetchAnydata: any;
  fetchReferData:any
}

const Header = (props: any) => (
  <Stack
    horizontal
    horizontalAlign="space-between"
    verticalAlign="center"
    styles={{ root: { padding: "10px", borderBottom: "1px solid #ccc" } }}
  >
    <Stack horizontal verticalAlign="center">
      <TooltipHost content="Information about adding a referee">
        <IconButton iconProps={{ iconName: "Info" }} />
      </TooltipHost>
      <Text variant="large" styles={{ root: { marginLeft: "10px" } }}>
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
  } = props
  console.log(props)
  console.log(props.dialogDetails);

  // CSS for responsive design
  const modalPropsStyles = {
    main: {
      padding:'10px',
      '@media (min-width: 768px)': {
        width: '580px',
      },
      '@media (max-width: 768px)': {
        width: '290px',
      },
    },
  };
  const [data, setData] = React.useState<any>('');
  const [isUserExistsModalVisible, setIsUserExistsModalVisible] = React.useState(false); // Modal visibility state  const [data, setData] =
    React.useState<any>('');
    const [isVisibleAlter, setIsVisableAlter] =
    React.useState<any>(false);
  const [referredCommentTextBoxValue, setReferredCommentTextBoxValue] =
    React.useState<any>('');

    const [type, setType] =
    React.useState<any>('');

  const handleConfirmBtn = () => {
    console.log("Confirm btn triggered");
    dialogDetails.functionType(
      dialogDetails.status,
      dialogDetails.statusNumber
    );
  };

  const closeIcon: IIconProps = { iconName: "Cancel" };

  const getGeneralDialogJSX = (): any => {
    console.log("General dialog functionality is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        styles={modalPropsStyles}
       
      >
        <div style={{ borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Icon iconName="CheckMark" style={{ marginRight: '10px' }} />
            <h2>Confirmation</h2>
          </div>
          <IconButton iconProps={closeIcon} onClick={dialogDetails.closeFunction} />
        </div>
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', marginTop: '20px' }}>
          <p >{dialogDetails.subText}</p>
          <p style={{textAlign:'center'}}>{dialogDetails.message}</p>
        </div>
        <div style={{ borderTop: '1px solid #ccc', marginTop: '20px',paddingTop:'10px', display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <PrimaryButton iconProps={{ iconName: "SkypeCircleCheck" }} onClick={handleConfirmBtn} text="Confirm"  />
          <DefaultButton iconProps={{ iconName: "Cancel" }} onClick={dialogDetails.closeFunction} text="Cancel" />
        </div>
      </Modal>
    );
  };


  const checkReviewer = (data:any): boolean => {
    const approverTitles = dialogUserCheck.peoplePickerApproverData.map(
      (each: any) => each.text
    );
    console.log(approverTitles)
    const reviewerTitles = dialogUserCheck.peoplePickerData.map(
      (each: any) => each.text
    );
    console.log(reviewerTitles)
    console.log(data)
  
    const reviewerInfo = data[0];
    console.log(reviewerInfo)
    const reviewerEmail = reviewerInfo.email || reviewerInfo.secondaryText;
    console.log(reviewerEmail)
    const reviewerName = reviewerInfo.text;
    console.log(reviewerName)
  
    const isReviewerOrApprover =
      reviewerTitles.includes(reviewerName) ||
      approverTitles.includes(reviewerName);

      console.log(isReviewerOrApprover)
    
    const isCurrentUserReviewer = context.pageContext.user.email === reviewerEmail;
    console.log(isCurrentUserReviewer)

    console.log(isReviewerOrApprover || isCurrentUserReviewer)
  
    return isReviewerOrApprover || isCurrentUserReviewer;
    
  };
  
  
  

  const _getDetails = (data: any, typeOFButtonTriggererd: any): any => {
    console.log("Referrer function is Triggered");
    console.log(data, typeOFButtonTriggererd);
    
    setData(data);
  
    // Call checkReviewer function and display modal if user exists
    if (checkReviewer(data)) {
      console.log('enter dialog box')
      setIsUserExistsModalVisible(true);  // Show the modal
      return; // Stop execution if user exists
    }
    
    fetchAnydata(data, typeOFButtonTriggererd, dialogDetails.status);
  };

  const handleChangeApporver = () => {

    if (dialogDetails.referPassFuntion !==''){
      dialogDetails.referPassFuntion()

    }

    


    if (dialogDetails.functionType !==''){
      console.log("change approver btn triggered");
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
    console.log("Refer btn triggered");

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
    console.log('enter dialog box');
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
            <FontIcon iconName="Info" style={{ fontSize: 20 }} />
            <Text variant="large">Alert</Text>
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
            text="Close"
            onClick={closeUserExistsModal}
            ariaLabel="Close modal"
          />
        </div>
      </Modal>
    );
  };
  

  const getChangeApproverJsx = (): any => {
    console.log("Change Approver is triggered");
  
    const styles = mergeStyleSets({
      modal: {
        padding: "10px",
        minWidth: "300px",
        maxWidth: "80vw",
        width: "100%",
        "@media (min-width: 768px)": {
          maxWidth: "580px",
        },
        "@media (max-width: 767px)": {
          maxWidth: "290px",
        },
        margin: "auto",
        backgroundColor: "white",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
      },
      body: {
        display: "flex",
        flexDirection: "column",
        padding: "20px 0",
      },
      footer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
      },
      button: {
        flex: "1 1 50%",
        margin: "0 5px",
      },
    });
  
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        containerClassName={styles.modal}
      >
        <Header heading={'Change Approver'} onClose={dialogDetails.closeFunction} />
        <div className={styles.body}>
          <p>{dialogDetails.message}</p>
          <PnPPeoplePicker
            context={context}
            spProp={sp}
            getDetails={_getDetails}
            typeOFButton="Change Approver"
          />
          <div className={styles.footer}>
          <PrimaryButton iconProps={{ iconName: "SkypeCircleCheck" }} className={styles.button} onClick={handleChangeApporver} text="Submit" />
          <DefaultButton iconProps={{ iconName: "Cancel" }} className={styles.button} onClick={dialogDetails.closeFunction} text="Cancel" />
          </div>
        </div>
      </Modal>
    );
  };
  const getReferJSX = (): any => {
    console.log("Refered is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        styles={modalPropsStyles}
      >
          <ReferCommentsMandatoryDialog isVisibleAlter={isVisibleAlter} onCloseAlter={()=>setIsVisableAlter(false) } statusOfReq={type}/>
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
              padding: "0 20px",
            }}
          >
            <div style={{ width: "90%" }}>
              <h5 style={{ width: "95%" }}>{dialogDetails.message[0]}</h5>
              <PnPPeoplePicker
                context={context}
                spProp={sp}
                getDetails={_getDetails}
                typeOFButton="Refer"
                // styles={{ root: { width: '95%' } }}
              />
            </div>
            <TextField
              label={dialogDetails.message[1]}
              multiline
              rows={3}
              onChange={(
                _: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
                newText: string
              ): void => {
                console.log(newText);
                setReferredCommentTextBoxValue(() => {
                  console.log(context.pageContext.user);
                  const commentsObj = {
                    id: v4(),
                    pageNum: "NA",
                    page: "NA",
                    comment: newText,
                    commentedBy: context.pageContext.user.displayName,
                    commentsFrom: dialogDetails.status,
                    commentedEmail: context.pageContext.user.email,
                  };
                  console.log(commentsObj);
                  return commentsObj;
                });
              }}
              styles={{ root: { width: "90%" } }}
            />
          </div>
          <Stack
            horizontal
            tokens={{ childrenGap: 10 }}
            styles={{
              root: {
                borderTop: "1px solid #ccc",
                marginTop: "10px",
                padding: "10px",
                width: "100%",
              },
            }}
          >
            <PrimaryButton
              onClick={()=>{
                if (data ===''){

                  setType("data")
                  setIsVisableAlter(true)
                }else if(referredCommentTextBoxValue===''){
                  setType("comments")
                  setIsVisableAlter(true)
                  
                }else{


                  
                  handleReferData()
                }

              }}
              text="Submit"
              iconProps={{ iconName: "SkypeCircleCheck" }}
              styles={{ root: { flex: 1 } }}
            />
            <DefaultButton
              onClick={dialogDetails.closeFunction}
              text="Cancel"
              iconProps={{ iconName: "Cancel" }}
              styles={{ root: { flex: 1 } }}
            />
          </Stack>
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
