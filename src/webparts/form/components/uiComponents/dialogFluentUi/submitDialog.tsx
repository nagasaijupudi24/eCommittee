// import * as React from "react";
// import { PrimaryButton, DefaultButton, Dialog, DialogType, DialogFooter } from "@fluentui/react";

// interface IConfirmationDialogProps {
//   isConfirmationDialogVisible: boolean;
//   isSuccessDialogVisible: boolean;
//   onConfirm: () => void;
//   onCancel: () => void;
//   onCloseSuccessDialog: () => void;
// }

// export const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({
//   isConfirmationDialogVisible,
//   isSuccessDialogVisible,
//   onConfirm,
//   onCancel,
//   onCloseSuccessDialog
// }) => {
//   return (
//     <>
//       {/* Confirmation Dialog */}
//       <Dialog
//         hidden={!isConfirmationDialogVisible}
//         onDismiss={onCancel}
//         dialogContentProps={{
//           type: DialogType.normal,
//           title: "Confirmation",
//           closeButtonAriaLabel: "Close",
//           subText: "Are you sure you want to submit this request? Please check the details filled along with the attachment and click on Confirm to submit the request."
//         }}
//       >
//         <DialogFooter>
//           <PrimaryButton onClick={onConfirm} text="Confirm" />
//           <DefaultButton onClick={onCancel} text="Cancel" />
//         </DialogFooter>
//       </Dialog>

//       {/* Success Dialog */}
//       <Dialog
//         hidden={!isSuccessDialogVisible}
//         onDismiss={onCloseSuccessDialog}
//         dialogContentProps={{
//           type: DialogType.normal,
//           title: "Alert",
//           closeButtonAriaLabel: "Close",
//           subText: "The request for eCommittee has been submitted successfully."
//         }}
//       >
//         <DialogFooter>
//           <PrimaryButton onClick={onCloseSuccessDialog} text="OK" />
//         </DialogFooter>
//       </Dialog>
//     </>
//   );
// };
