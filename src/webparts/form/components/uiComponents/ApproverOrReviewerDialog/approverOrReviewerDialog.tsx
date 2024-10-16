/* eslint-disable @typescript-eslint/no-unused-vars */
// MyModal.tsx
import * as React from "react";
import {
  Modal,
  PrimaryButton,
  IconButton,
  IIconProps,
  IModalStyles,
  Stack,
  Text,
  FontIcon,
} from "@fluentui/react";

// Define the interface for the component props
interface MyModalProps {
  hidden: boolean;
  handleDialogBox: () => void;
}

// Close and info icons
const closeIcon: IIconProps = { iconName: 'Cancel' };
const okIcon: IIconProps = { iconName: 'CheckMark' }; // Icon for the OK button

const ApproverOrReviewerModal: React.FC<MyModalProps> = ({
  hidden,
  handleDialogBox,
}) => {
  // Styles for the header stack
  const headerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    borderBottom: "1px solid #ddd", // Bottom border for the header
  };

  // Styles for aligning the icon and alert text
  const alertStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px", // Space between the icon and the alert text
  };

  // Styles for the footer stack (align OK button to the left)
  const footerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end", // Align button to the left
    padding: "12px 16px",
    borderTop: "1px solid #ddd", // Top border for the footer
  };

  // Responsive modal styles
  const modalStyles: IModalStyles = {
    main: {
      width: "100%", // Takes 100% width of the container
      maxWidth: "290px", // Default width below 768px
      "@media (min-width: 768px)": {
        maxWidth: "580px", // Width for screens 768px and above
      },
    },
    root: "",
    scrollableContent: "",
    layer: "",
    keyboardMoveIconContainer: "",
    keyboardMoveIcon: ""
  };

  return (
    <Modal
      isOpen={!hidden}
      isBlocking={true}
      onDismiss={handleDialogBox}
      styles={modalStyles} // Applying custom responsive styles
    >
      {/* Modal header with alert and close icons */}
      <div style={headerStyles}>
        {/* Info icon and alert text next to each other */}
        <div style={alertStyles}>
          <FontIcon iconName="Info" style={{ fontSize: 20, }} />
          <Text variant="large">Alert</Text>
        </div>

        {/* Right-side close icon */}
        <IconButton
          iconProps={closeIcon}
          ariaLabel="Close modal"
          onClick={handleDialogBox}
        />
      </div>

      {/* Modal content, centered in the body */}
      <Stack tokens={{ padding: "16px" }} horizontalAlign="center" verticalAlign="center">
        <Text style={{ margin: "16px 0", fontSize: "14px", textAlign: "center" }}>
          The selected approver cannot be the same as existing Reviewers/ Approver/ Requester/ Current Actioner.
        </Text>
      </Stack>

      {/* Footer with the OK button aligned to the left */}
      <div style={footerStyles}>
        <PrimaryButton
          text="OK"
          iconProps={okIcon} // Adding icon to the OK button
          onClick={handleDialogBox}
          ariaLabel="Confirm action"
        />
      </div>
    </Modal>
  );
};

export default ApproverOrReviewerModal;
