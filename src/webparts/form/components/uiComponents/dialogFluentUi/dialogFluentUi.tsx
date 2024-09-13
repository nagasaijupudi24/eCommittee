import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton,
     DefaultButton
     } from '@fluentui/react/lib/Button';
// import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
// import { Toggle } from '@fluentui/react/lib/Toggle';
// import { useBoolean } from '@fluentui/react-hooks';

// const dragOptions = {
//   moveMenuItemText: 'Move',
//   closeMenuItemText: 'Close',
//   menu: ContextualMenu,
// };

interface IDialogProps{
    hiddenProp:any;
    dialogDetails:any,
   

}

export const DialogBlockingExample: React.FunctionComponent<IDialogProps> = ({hiddenProp,dialogDetails}) => {
    console.log(dialogDetails)

    const modalPropsStyles = { main: { maxWidth: 450 } };
    const dialogContentProps = {
    type: DialogType.normal,
    title: "Confirmation",
    subText: dialogDetails.subText,
    };

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
    ],
  );

  const handleConfirmBtn = ()=>{
    console.log("Confirm btn triggered")
    dialogDetails.functionType("Approved")
  }

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
          <DefaultButton onClick={dialogDetails.closeFunction} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
