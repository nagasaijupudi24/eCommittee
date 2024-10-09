


/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal, PrimaryButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const SuccessDialog: React.FC<{ isVisibleAlter: boolean; onCloseAlter: () => void; statusOfReq: any }> = ({ isVisibleAlter, onCloseAlter, statusOfReq }) => {
  const styles = mergeStyleSets({
    modal: {
      padding: '10px',
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
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      textAlign: 'center',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
  });

  return (
    <Modal
      isOpen={isVisibleAlter}
      onDismiss={onCloseAlter}
      isBlocking={true}
      containerClassName={styles.modal}
    >
      <div className={styles.body}>
        <h2>Alert</h2>
        <p>The request for committee note has been {statusOfReq} successfully.</p>
      </div>
      <div className={styles.footer}>
        <PrimaryButton iconProps={{ iconName: 'ReturnToSession' }} onClick={onCloseAlter} text="OK" />
      </div>
    </Modal>
  );
};

export default SuccessDialog;
