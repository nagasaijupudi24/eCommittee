/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { Stack, TextField } from "@fluentui/react";
import PnPPeoplePicker from "../peoplePicker/peoplePicker";
import { v4 } from "uuid";
// import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
// import { Toggle } from '@fluentui/react/lib/Toggle';
// import { useBoolean } from '@fluentui/react-hooks';

// const dragOptions = {
//   moveMenuItemText: 'Move',
//   closeMenuItemText: 'Close',
//   menu: ContextualMenu,
// };

interface IDialogProps {
  hiddenProp: any;
  dialogDetails: any;
  sp:any;
  context:any;
  fetchAnydata:any;
}

export const DialogBlockingExample: React.FunctionComponent<IDialogProps> = ({
  hiddenProp,
  dialogDetails,
  context,
  sp,fetchAnydata
}) => {
  console.log(dialogDetails);

  const modalPropsStyles = { main: { maxWidth: 450 } };
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Confirmation",
    subText: dialogDetails.subText,
  };
  const [referredCommentTextBoxValue, setReferredCommentTextBoxValue] = React.useState<any>({});

  //   const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(hiddenProp);
  //   const [isDraggable, { toggle: toggleIsDraggable }] = useBoolean(false);
  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: modalPropsStyles,
      //   dragOptions: isDraggable ? dragOptions : undefined,
    }),
    [
      // isDraggable
    ]
  );

  const handleConfirmBtn = () => {
    console.log("Confirm btn triggered");
    dialogDetails.functionType(
      dialogDetails.status,
      dialogDetails.statusNumber
    );
    
  };


  
  const getGeneralDialogJSX = (): any => {

    console.log("General dialog functionality is triggered")
    return (
      <>
        {/* <Toggle label="Is draggable" onChange={toggleIsDraggable} checked={isDraggable} /> */}
        {/* <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideDialog} text="Open Dialog" /> */}
        <Dialog
          hidden={hiddenProp}
          onDismiss={dialogDetails.closeFunction}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <p>{dialogDetails.message}</p>
          <DialogFooter>
            <PrimaryButton onClick={handleConfirmBtn} text="Confirm" />
            <DefaultButton
              onClick={dialogDetails.closeFunction}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      </>
    );
  };

 
  const _getDetails = (data:any,typeOFButtonTriggererd:any):any=>{
    console.log("Referrer function is Triggered")
    console.log(data,typeOFButtonTriggererd)
    fetchAnydata(data,typeOFButtonTriggererd,dialogDetails.status)
    
  }


  const handleChangeApporver = () => {
    console.log("change approver btn triggered");
    dialogDetails.functionType(
      dialogDetails.status,
      dialogDetails.statusNumber,
      
    );
  };

  const handleReferData = () => {
    console.log("Refer btn triggered");
    dialogDetails.functionType(
      dialogDetails.status,
      dialogDetails.statusNumber,
      referredCommentTextBoxValue
      
    );
  };



  const getChangeApproverJsx = (): any => {
    console.log("Change Approver is triggered")
    return (
      <Stack>
        <Dialog
          hidden={hiddenProp}
          onDismiss={dialogDetails.closeFunction}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <p>{dialogDetails.message}</p>
          <PnPPeoplePicker context={context} spProp={sp} getDetails={_getDetails} typeOFButton="Change Approver"/>
          <DialogFooter>
            <PrimaryButton onClick={handleChangeApporver} text="Submit" />
            <DefaultButton
              onClick={dialogDetails.closeFunction}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      </Stack>
    );
  };

  

  const getReferJSX = (): any => {
    console.log("Refered is triggered")
    return (
      <Stack>
        <Dialog
          hidden={hiddenProp}
          onDismiss={dialogDetails.closeFunction}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <div>
            <p>{dialogDetails.message[0]}</p>
            <PnPPeoplePicker context={context} spProp={sp} getDetails={_getDetails} typeOFButton="Refer"/>
            {/* <p>{dialogDetails.message[1]}</p> */}
            <TextField label={dialogDetails.message[1]} multiline rows={3}  onChange={
               (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string): void => {
                console.log(newText)
                setReferredCommentTextBoxValue(
                  ()=>{
                    console.log(context.pageContext.user)
                    const commentsObj = {
                      id: v4(),
                      pageNum: 'NA',
                      page: 'NA',
                      comment: newText,
                      commentedBy: context.pageContext.user.displayName,
                    };
                    console.log(commentsObj);
                    return commentsObj
                  }
                )
              }
            }/>
            
          </div>
          
          <DialogFooter>
            <PrimaryButton onClick={handleReferData} text="Submit" />
            <DefaultButton
              onClick={dialogDetails.closeFunction}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
      </Stack>
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
