/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// MyDialog.tsx
import * as React from "react";
import {
  Modal,
  PrimaryButton,
  Stack,
  IStackStyles,
  Icon,

} from "@fluentui/react";
import { Info16Regular } from "@fluentui/react-icons";




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
  const stackStyles: IStackStyles = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: 2,
      borderBottom: '1px solid #ddd',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  const buttonStyles: IStackStyles = {
    root: {
      // background: 'red'
    }
  };

  const modalStyles = {
    main: {
      width: '90%',
      maxWidth: '520px',
      padding: '20px', // Added padding
      '@media (max-width: 768px)': {
        width: '270px',
      },
    },
  };

  const undefinedData = Object.keys(data).map((each: string) => {
    if (data[each][0] === "" || data[each][0].length === 0) {
      return data[each][1];
    }
  }).filter((each: any) => each);

  return (
    <Modal
      isOpen={!hidden}
      onDismiss={handleDialogBox}
      isBlocking={true}
      styles={modalStyles}
    >
      <Stack>
        <Stack styles={stackStyles}>
          <p style={{fontSize:'16px'}}> <Info16Regular style={{marginTop:'6px'}}/>{" "}Alert!</p>
          <Icon iconName="Cancel" onClick={handleDialogBox} />
        </Stack>
      </Stack>
      <h4>Please fill up all the mandatory fields</h4>
      <ul>
        {undefinedData.map((each) => (
          <li key={each}>{each}</li>
        ))}
      </ul>
      <p><strong>Note: </strong>Invalid files are not allowed</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <PrimaryButton text="OK" iconProps={{ iconName: 'ReplyMirrored' }} onClick={handleDialogBox} styles={buttonStyles} />
      </div>
    </Modal>
  );
};

export default MyDialog;
