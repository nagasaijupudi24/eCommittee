import * as React from 'react';
import { Modal, PrimaryButton, DefaultButton } from '@fluentui/react';
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
      maxWidth: '500px', // Adjust width for medium screens
    },
    '@media (min-width: 1024px)': {
      maxWidth: '700px', // Adjust width for larger screens
    },
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '4px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flex: 1,
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
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
      <div className={styles.body}>
        <h2>{title}</h2>
        <p>{subText}</p>
      </div>
      <div className={styles.footer}>
        <PrimaryButton onClick={onConfirm} text="Yes" />
        <DefaultButton onClick={onCancel} text="No" />
      </div>
    </Modal>
  );
};

export default ConfirmationDialog;
