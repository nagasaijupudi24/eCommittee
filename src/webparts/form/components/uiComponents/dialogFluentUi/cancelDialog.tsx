import * as React from 'react';
import { Dialog, DialogFooter, DialogType, DefaultButton } from '@fluentui/react';

interface ICancelConfirmationDialogProps {
  hidden: boolean;
  onConfirm: () => void; // Function to call on confirm
  onCancel: () => void;  // Function to call on cancel
}

const CancelConfirmationDialog: React.FC<ICancelConfirmationDialogProps> = ({
  hidden,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog
      hidden={hidden}
      onDismiss={onCancel}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Confirmation',
        closeButtonAriaLabel: 'Close',
        subText: 'Are you sure you want to cancel this request? Please click on the Confirm button to cancel the request.',
      }}
      modalProps={{
        isBlocking: false,
      }}
    >
      <DialogFooter>
        <DefaultButton
          text="Confirm"
          onClick={onConfirm}
          iconProps={{ iconName: 'SkypeCircleCheck' }} // Icon for Confirm button
        />
        <DefaultButton
          text="Cancel"
          onClick={onCancel}
          iconProps={{ iconName: 'ErrorBadge' }} // Icon for Cancel button
        />
      </DialogFooter>
    </Dialog>
  );
};

export default CancelConfirmationDialog;
