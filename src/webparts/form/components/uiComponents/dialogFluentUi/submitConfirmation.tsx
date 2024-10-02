import * as React from 'react';
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton } from '@fluentui/react';

interface IConfirmationDialogProps {
  hidden: boolean;
  onConfirm: () => void; // Action when "Yes" is clicked
  onCancel: () => void; // Action when "No" is clicked or dialog is dismissed
  title: string;
  subText: string;
}

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({ hidden, onConfirm, onCancel, title, subText }) => {
  return (
    <Dialog
      hidden={hidden}
      onDismiss={onCancel} // Hide the dialog when dismissed
      dialogContentProps={{
        type: DialogType.normal,
        title: title,
        subText: subText,
      }}
    >
      <DialogFooter>
        <PrimaryButton onClick={onConfirm} text="Yes" />
        <DefaultButton onClick={onCancel} text="No" />
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmationDialog;
