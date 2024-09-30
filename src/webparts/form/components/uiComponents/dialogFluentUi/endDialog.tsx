/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { PrimaryButton } from '@fluentui/react/lib/Button';

const SuccessDialog: React.FC<{ isVisibleAlter: boolean; onCloseAlter: () => void,statusOfReq:any }> = ({ isVisibleAlter, onCloseAlter,statusOfReq }) => {
  return (
    <Dialog
      hidden={!isVisibleAlter}
      onDismiss={onCloseAlter}
      dialogContentProps={{
        type: DialogType.largeHeader,
        title: 'Alert',
        subText: `The request for committee note has been ${statusOfReq} successfully.`,
      }}
      modalProps={{
        isBlocking: false,
      }}
    >
      <DialogFooter>
        <PrimaryButton iconProps={{iconName:'ReturnToSession'}} onClick={onCloseAlter} text="OK" />
      </DialogFooter>
    </Dialog>
  );
};

export default SuccessDialog;
