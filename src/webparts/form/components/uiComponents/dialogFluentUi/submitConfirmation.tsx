import * as React from 'react';
import { Modal, PrimaryButton, DefaultButton, IconButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

interface IConfirmationDialogProps {
  hidden: boolean;
  onConfirm: () => void; // Action when "Yes" is clicked
  onCancel: () => void; // Action when "No" is clicked or modal is dismissed
  title: string;
  subText: string;
}

const styles = mergeStyleSets({
  modal: {
    minWidth: '300px',
    maxWidth: '80vw',
    width: '100%',
    '@media (min-width: 768px)': {
      maxWidth: '580px', // Adjust width for medium screens
    },
    '@media (max-width: 767px)': {
      maxWidth: '290px', // Adjust width for smaller screens
    },
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px 0',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    borderTop: '1px solid #ddd', // Added border to the top of the footer
    paddingTop: '10px',
  },
  button: {
    flex: '1 1 50%', // Ensures each button takes up 50% of the footer width
    margin: '0 5px', // Adds some space between the buttons
  },
});

const ConfirmationDialog: React.FC<IConfirmationDialogProps> = ({ hidden, onConfirm, onCancel, title, subText }) => {
  return (
    <Modal
      isOpen={!hidden}
      onDismiss={onCancel}
      isBlocking={true}
      containerClassName={styles.modal}
    >
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton iconProps={{ iconName: 'Info' }} />
          <h2 style={{ marginLeft: '10px' }}>{title}</h2>
        </div>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onCancel} />
      </div>
      <div className={styles.body}>
        <p>{subText}</p>
      </div>
      <div className={styles.footer}>
        <PrimaryButton className={styles.button} onClick={onConfirm} text="Yes" />
        <DefaultButton className={styles.button} onClick={onCancel} text="No" />
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
