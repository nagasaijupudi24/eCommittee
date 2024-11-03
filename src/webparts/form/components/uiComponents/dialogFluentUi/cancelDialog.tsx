import * as React from 'react';
import { Modal, PrimaryButton, DefaultButton, IconButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
// import styles from '../../Form.module.scss';

interface IConfirmationDialogProps {
  hidden: boolean;
  onConfirm: () => void; // Action when "Yes" is clicked
  onCancel: () => void; // Action when "No" is clicked or modal is dismissed

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
    // height:'260px',
    // display:'flex',
    // flexDirection:'column',
    // alignItem:'center',
    // justifyContent:'center',
    
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
   minHeigth:'50px',
   padding:'5px'
  },
  headerTitle: {
   margin:'5px',
   marginLeft:'5px',
   fontSize:'16px',
   fontWeight:'400'
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
    height:'100%',
    '@media (min-width: 768px)': {
      marginLeft: '20px', // Adjust width for smaller screens
      marginRight: '20px', // Adjust width for medium screens
    },
    '@media (max-width: 767px)': {
      marginLeft: '20px', // Adjust width for smaller screens
      marginRight: '20px',
    } 
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between', // Adjusted to space between
   
    borderTop: '1px solid #ddd',
    paddingTop: '10px',
     minHeight:'50px'
  },
  button: {
    maxHeight:'32px',
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
    marginBottom: '14px',
    fontWeight:'400'
  },
  
});

const CancelConfirmationDialog: React.FC<IConfirmationDialogProps> = ({ hidden, onConfirm, onCancel, }) => {
  return (
    <Modal
      isOpen={hidden}
      onDismiss={onCancel}
      isBlocking={true}
      containerClassName={styles.modal}
    >
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton iconProps={{ iconName: 'WaitlistConfirm' }} className={styles.headerIcon} />
          <h4 className={styles.headerTitle}>Confirmation</h4>
        </div>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onCancel} />
      </div>
      <div className={styles.body}>
        <p className={`${styles.removeTopMargin}`}>Are you sure you want to cancel this request?</p>
        <p className={`${styles.removeTopMargin}`}>Please click on the Confirm button to cancel the request.</p>
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

export default CancelConfirmationDialog;
