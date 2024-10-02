/* eslint-disable @typescript-eslint/no-unused-vars */
// MyDialog.tsx
import * as React from "react";
import {
  Dialog,
  DialogFooter,
  PrimaryButton,
  
 
  DialogType,
} from "@fluentui/react";

interface MyDialogProps {
  hidden: boolean;
  handleDialogBox: () => void;
}

const ApproverOrReviewerDialog: React.FC<MyDialogProps> = ({
  hidden,
  handleDialogBox,
}) => {
  // Styles for the header stack
  // const stackStyles: IStackStyles = {
  //   root: {
  //     display: "flex",
  //     flexDirection: "row",
  //     padding: "8px 12px", // Reduced padding for compactness
  //     borderBottom: "1px solid #ddd",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     width: "100%",
  //   },
  // };

  // Responsive dialog styles
  const dialogStyles = {
    main: {
      minWidth: "300px",
      maxWidth: "80vw",
      width: "100%",
      "@media (min-width: 768px)": {
        maxWidth: "500px", // Adjust width for medium screens
      },
      "@media (min-width: 1024px)": {
        maxWidth: "700px", // Adjust width for larger screens
      },
    },
  };

  return (
    <Dialog
      hidden={hidden}
      modalProps={{
        isBlocking: true,
        styles: dialogStyles, // Applying custom responsive styles
      }}
      dialogContentProps={{
        type: DialogType.normal,
        title: "Alert",
        closeButtonAriaLabel: "Close",
      }}
    >
      {/* Dialog content */}
      <p style={{ margin: "16px 0",fontSize: "14px "}}>
        The selected approver cannot be the same as existing Reviewers, Requester, or Current Actioner.
      </p>

      {/* Footer with only the OK button */}
      <DialogFooter>
        <PrimaryButton
          text="OK"
          onClick={handleDialogBox}
          ariaLabel="Confirm action"
        />
      </DialogFooter>
    </Dialog>
  );
};

export default ApproverOrReviewerDialog;
