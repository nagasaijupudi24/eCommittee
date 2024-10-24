import * as React from 'react';
import { Modal, PrimaryButton, DefaultButton, IconButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
// import styles from '../../Form.module.scss';

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
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
  },
  headerTitle: {
   margin:'5px',
   marginLeft:'5px'
  },
  headerIcon: {
   paddingRight: '0px', // Reduced space between the icon and the title
   
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '20px 0',
    height:'100%'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between', // Adjusted to space between
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
  },
  button: {
    flex: '1 1 50%', // Ensures each button takes up 50% of the footer width
    margin: '0 5px', // Adds some space between the buttons
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: '4px', // Adjust the space between the icon and text
  },

  removeTopMargin:{
    marginTop: '4px',
    marginBottom: '4px'
  }
  
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
          <IconButton iconProps={{ iconName: 'Info' }} className={styles.headerIcon} />
          <h2 className={styles.headerTitle}>{title}</h2>
        </div>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onCancel} />
      </div>
      <div className={styles.body}>
        <p className={`${styles.removeTopMargin}`}>{subText}</p>
        <p className={`${styles.removeTopMargin}`}>Please check the details filled along with attachment and click on Confirm button to submit request.</p>
      </div>
      <div className={styles.footer}>
        <PrimaryButton
          onClick={onConfirm}
          text="Confirm"
          iconProps={{ iconName: 'SkypeCircleCheck', styles: { root: styles.buttonIcon } }}
          styles={{ root: styles.buttonContent }}
          className={styles.button}
        />
        <DefaultButton
          onClick={onCancel}
          text="Cancel"
          iconProps={{ iconName: 'ErrorBadge', styles: { root: styles.buttonIcon } }}
          styles={{ root: styles.buttonContent }}
          className={styles.button}
        />
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
