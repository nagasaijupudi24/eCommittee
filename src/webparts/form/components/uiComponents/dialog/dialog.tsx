/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MyDialog.tsx
import * as React from "react";
import {
  Modal,
  PrimaryButton,
  IStackStyles,
  Icon,
  mergeStyleSets,
  IconButton,
} from "@fluentui/react";

interface MyDialogProps {
  hidden: boolean;
  handleDialogBox: () => void;
  data: any;
}

const MyDialog: React.FC<MyDialogProps> = ({
  hidden,
  data,
  handleDialogBox,
}) => {
  // console.log(data)

  const buttonStyles: IStackStyles = {
    root: {
      // background: 'red'
    },
  };

  const styles = mergeStyleSets({
    modal: {
      minWidth: "300px",
      maxWidth: "80vw",
      width: "100%",
      "@media (min-width: 768px)": {
        maxWidth: "580px", // Adjust width for medium screens
      },
      "@media (max-width: 767px)": {
        maxWidth: "290px", // Adjust width for smaller screens
      },
      margin: "auto",
      padding: "10px",
      backgroundColor: "white",
      borderRadius: "4px",
      // height:'260px',
      // display:'flex',
      // flexDirection:'column',
      // alignItem:'center',
      // justifyContent:'center',

      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.26)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      minHeigth: "50px",
      padding: "5px",
    },
    headerTitle: {
      margin: "5px",
      marginLeft: "5px",
      fontSize: "16px",
      fontWeight: "400",
    },
    headerIcon: {
      paddingRight: "0px", // Reduced space between the icon and the title
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      textAlign: "center",
      padding: "20px 0",
      height: "100%",
      "@media (min-width: 768px)": {
        marginLeft: "20px", // Adjust width for smaller screens
        marginRight: "20px", // Adjust width for medium screens
      },
      "@media (max-width: 767px)": {
        marginLeft: "20px", // Adjust width for smaller screens
        marginRight: "20px",
      },
    },
    footer: {
      display: "flex",
      justifyContent: "flex-end", // Adjusted to space between

      borderTop: "1px solid #ddd",
      paddingTop: "10px",
      minHeight: "50px",
    },
    button: {
      maxHeight: "32px",
      flex: "1 1 50%", // Ensures each button takes up 50% of the footer width
      margin: "0 5px", // Adds some space between the buttons
    },
    buttonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    buttonIcon: {
      marginRight: "4px", // Adjust the space between the icon and text
    },

    removeTopMargin: {
      marginTop: "4px",
      marginBottom: "14px",
      fontWeight: "400",
    },
  });

  const undefinedData = Object.keys(data)
    .map((each: string) => {
      // console.log(data)

      if (
        data[each][0] === "" ||
        data[each][0] === null ||
        data[each][0].length === 0 ||
        data[each][0] === true
      ) {
        // console.log(data[each][1], data[each][0]);
        return data[each][1];
      }
    })
    .filter((each: any) => each);

  // console.log(undefinedData);

  return (
    <Modal
      isOpen={!hidden}
      onDismiss={handleDialogBox}
      isBlocking={true}
      containerClassName={styles.modal}
    >
      <div className={styles.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton iconProps={{ iconName: 'Info' }} />
          <h4 className={styles.headerTitle}>Alert</h4>
        </div>
        <Icon iconName="Cancel" onClick={handleDialogBox} />
      </div>
      <div className={styles.body}  >
        <h4>Please fill up all the mandatory fields</h4>
        <ul>
          {undefinedData.length > 0 &&
            undefinedData.map((each) => <li style={{textAlign:'left'}} key={each}>{each}</li>)}
        </ul>
        <p>
          <strong>Note: </strong>Invalid files are not allowed
        </p>
      </div>

      <div className={styles.footer}>
        <PrimaryButton
          text="OK"
          iconProps={{ iconName: "ReplyMirrored" }}
          onClick={handleDialogBox}
          styles={buttonStyles}
        />
      </div>
    </Modal>
  );
};

export default MyDialog;
