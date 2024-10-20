/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Modal } from "@fluentui/react/lib/Modal";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Icon, IIconProps, mergeStyleSets, Stack, TextField } from "@fluentui/react";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";
import { IconButton, Text, TooltipHost } from "@fluentui/react";
import { v4 } from "uuid";
import ReferCommentsMandatoryDialog from "./referCommentsMandiatory";

interface IDialogProps {
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
  const [data, setData] =
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
          <PrimaryButton onClick={handleConfirmBtn} text="Confirm" style={{ flex: '1' }} />
          <DefaultButton onClick={dialogDetails.closeFunction} text="Cancel" style={{ flex: '1' }} />
        </div>
      </Modal>
    );
  };
  
  

  const _getDetails = (data: any, typeOFButtonTriggererd: any): any => {
    console.log("Referrer function is Triggered");
    console.log(data, typeOFButtonTriggererd);
    setData(data)
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
          <PrimaryButton className={styles.button} onClick={handleChangeApporver} text="Submit" />
          <DefaultButton className={styles.button} onClick={dialogDetails.closeFunction} text="Cancel" />
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
              styles={{ root: { flex: 1 } }}
            />
            <DefaultButton
              onClick={dialogDetails.closeFunction}
              text="Cancel"
              styles={{ root: { flex: 1 } }}
            />
          </Stack>
        </div>
      </Modal>
    );
  };

  switch (props.dialogDetails.type) {
   
    case "Change Approver":
      return getChangeApproverJsx();
    case "Refer":
      return getReferJSX();
    default:
      return getGeneralDialogJSX();
  }
};
