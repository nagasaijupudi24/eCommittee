/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Modal, PrimaryButton, IconButton } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const SuccessDialog: React.FC<{existUrl:any; isVisibleAlter: boolean; onCloseAlter: () => void; statusOfReq: any;typeOfNote:any }> = ({ existUrl,isVisibleAlter, onCloseAlter, statusOfReq ,typeOfNote}) => {
  // console.log(typeOfNote)
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
      height:'50px'
    },
    headerTitle: {
      margin:'5px',
      marginLeft:'0px',
      fontSize:'16px',
      fontWeight:'400'
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
      alignItem:'center',
      justifyContent: 'flex-end',
      
      borderTop: '1px solid #ddd', // Added border to the top of the footer
      paddingTop: '12px',
       height:'50px'
      
    //  minHeight:'50px'    
    },
    button: {
     
      maxHeight:'32px',
     
    },
  });

  // console.log(statusOfReq)

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
          <h4 className={styles.headerTitle}>Alert</h4>
        
        </div>
        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onCloseAlter} />
      </div>
      <div className={styles.body}>
        {statusOfReq === 'approver changed'?<p>The current actioner(Approver/Reviewer/Referee) has been updated successfully.</p>:<p>The request for {typeOfNote} note has been {statusOfReq.toLowerCase()} successfully.</p>}
        
      </div>
      <div className={styles.footer}>
        <PrimaryButton className={styles.button}  iconProps={{ iconName: 'ReplyMirrored' }} onClick={()=>{
          onCloseAlter()
          const pageURL: string =existUrl;
          window.location.href = `${pageURL}`;
          
        }} text="OK" />
      </div>
    </Modal>
  );
};

export default SuccessDialog;
