/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Modal } from "@fluentui/react/lib/Modal";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Stack, TextField } from "@fluentui/react";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";
import { IconButton, Text, TooltipHost } from '@fluentui/react';
import { v4 } from "uuid";

interface IDialogProps {
  hiddenProp: any;
  dialogDetails: any;
  sp: any;
  context: any;
  fetchAnydata: any;
}


const Header = (props:any) => (
  <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={{ root: { padding: '10px', borderBottom: '1px solid #ccc' } }}>
    <Stack horizontal verticalAlign="center">
      <TooltipHost content="Information about adding a referee">
        <IconButton iconProps={{ iconName: 'Info' }} />
      </TooltipHost>
      <Text variant="large" styles={{ root: { marginLeft: '10px' } }}>Add Referee</Text>
    </Stack>
    <IconButton iconProps={{ iconName: 'Cancel' }} onClick={props.onClose} />
  </Stack>
);

export const DialogBlockingExample: React.FunctionComponent<IDialogProps> = ({
  hiddenProp,
  dialogDetails,
  context,
  sp,
  fetchAnydata,
}) => {
  console.log(dialogDetails);

  const modalPropsStyles = {
    main: {
      padding:'10px',
      maxWidth: "90%",
      width: "580px",
      "@media (max-width: 768px)": {
        width: "290px",
      },
    },
  };
  const [referredCommentTextBoxValue, setReferredCommentTextBoxValue] = React.useState<any>({});

  const handleConfirmBtn = () => {
    console.log("Confirm btn triggered");
    dialogDetails.functionType(dialogDetails.status, dialogDetails.statusNumber);
  };

  const getGeneralDialogJSX = (): any => {
    console.log("General dialog functionality is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        styles={modalPropsStyles}
      >
        <div>
          <h2>Confirmation</h2>
          <p>{dialogDetails.subText}</p>
          <p>{dialogDetails.message}</p>
          <Stack style={{marginTop:'10px'}} horizontal tokens={{ childrenGap: 10 }}>
            <PrimaryButton onClick={handleConfirmBtn} text="Confirm" />
            <DefaultButton onClick={dialogDetails.closeFunction} text="Cancel" />
          </Stack>
        </div>
      </Modal>
    );
  };

  const _getDetails = (data: any, typeOFButtonTriggererd: any): any => {
    console.log("Referrer function is Triggered");
    console.log(data, typeOFButtonTriggererd);
    fetchAnydata(data, typeOFButtonTriggererd, dialogDetails.status);
  };

  const handleChangeApporver = () => {
    console.log("change approver btn triggered");
    dialogDetails.functionType(dialogDetails.status, dialogDetails.statusNumber);
  };

  const handleReferData = () => {
    console.log("Refer btn triggered");
    dialogDetails.functionType(dialogDetails.status, dialogDetails.statusNumber, referredCommentTextBoxValue);
  };

  const getChangeApproverJsx = (): any => {
    console.log("Change Approver is triggered");
    return (
      <Modal
        isOpen={!hiddenProp}
        onDismiss={dialogDetails.closeFunction}
        isBlocking={true}
        styles={modalPropsStyles}
      >
        <div>
          <h2>Change Approver</h2>
          <p>{dialogDetails.message}</p>
          <PnPPeoplePicker context={context} spProp={sp} getDetails={_getDetails} typeOFButton="Change Approver" />
          <Stack horizontal style={{marginTop:'10px'}} tokens={{ childrenGap: 10 }}>
            <PrimaryButton onClick={handleChangeApporver} text="Submit" />
            <DefaultButton onClick={dialogDetails.closeFunction} text="Cancel" />
          </Stack>
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
      <div>
        <Header onClose={dialogDetails.closeFunction} />
        <div style={{ 
          // border: '1px solid red',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 20px' }}>
        <div style={{ width: '90%' }}>
  <h5 style={{ width: '95%' }}>{dialogDetails.message[0]}</h5>
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
  onChange={(_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
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
  styles={{ root: { width: '90%' } }}
/>
        </div>
        <Stack horizontal tokens={{ childrenGap: 10 }} styles={{ root: { borderTop: '1px solid #ccc',marginTop:'10px', padding: '10px', width: '100%' } }}>
          <PrimaryButton onClick={handleReferData} text="Submit" styles={{ root: { flex: 1 } }} />
          <DefaultButton onClick={dialogDetails.closeFunction} text="Cancel" styles={{ root: { flex: 1 } }} />
        </Stack>
      </div>
    </Modal>
    );
  };

  switch (dialogDetails.type) {
    case "Change Approver":
      return getChangeApproverJsx();
    case "Refer":
      return getReferJSX();
    default:
      return getGeneralDialogJSX();
  }
};
