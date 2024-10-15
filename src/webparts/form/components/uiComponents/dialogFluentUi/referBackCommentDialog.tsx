/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal, PrimaryButton, IconButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const ReferBackCommentDialog: React.FC<{ isVisibleAlter: boolean; onCloseAlter: () => void; statusOfReq: any }> = ({ isVisibleAlter, onCloseAlter, statusOfReq }) => {
  const styles = mergeStyleSets({
    modal: {
      padding: '10px',
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
      justifyContent: 'flex-end',
      marginTop: '20px',
      borderTop: '1px solid #ddd', // Added border to the top of the footer
      paddingTop: '10px',
    },
  });

  return (
    <Modal
      isOpen={isVisibleAlter}
      onDismiss={onCloseAlter}
      isBlocking={true}
      containerClassName={styles.modal}
    >
      <div className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton iconProps={{ iconName: 'Info' }} />
          <h2 style={{ marginLeft: '10px' }}>Alert</h2>
        </div>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onCloseAlter} />
      </div>
      <div className={styles.body}>
        <p>Please fill in comments then click on Refer Back.</p>
      </div>
      <div className={styles.footer}>
        <PrimaryButton iconProps={{ iconName: 'ReturnToSession' }} onClick={onCloseAlter} text="OK" />
      </div>
    </Modal>
  );
};

export default ReferBackCommentDialog;
