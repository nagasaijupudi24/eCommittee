/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import styles from '../../Form.module.scss';

interface TitleProps {
  itemId:any
  formType: string;
  statusOfRequest:string;
  propPaneformType:any;
}

const Title: React.FC<TitleProps> = (props,{ formType='',statusOfRequest='' }) => {
  const currentDate: Date = new Date();
  const formattedDate: string = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
  return (
    <div>
      <div
        className={`${styles.noteTitle} 
        ${styles.commonProperties}`}
      >
        <p  className={`${styles.status}`}>Status: {statusOfRequest}</p>
        {props.propPaneformType === 'BoardNoteNew'?<h1 className={`${styles.title}`} >
          Board Note - {props.itemId?"Edit":'New'}
        </h1>:<h1 className={`${styles.title}`} >
          eCommittee Note - {props.itemId?"Edit":'New'}
        </h1>}
        
        <p  className={`${styles.title}`} style={{ textAlign: 'right' }}>
        Date : {formattedDate}
      </p>
      </div>
      <span className={`${styles.field}`}><strong>All fields marked "*" are mandatory</strong></span>
      
     
    </div>
  );
};

export default Title;
