/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import styles from '../../Form.module.scss';

interface TitleProps {
  formType: string;
  statusOfRequest:string;
}

const Title: React.FC<TitleProps> = ({ formType='',statusOfRequest='' }) => {
  const currentDate: Date = new Date();
  const formattedDate: string = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
  return (
    <div>
      <div
        className={`${styles.noteTitle} 
        ${styles.commonProperties}`}
      >
        <p  className={`${styles.status}`}>Status: {statusOfRequest}</p>
        <h1 className={`${styles.title}`} >
          eCommittee Note - {formType}
        </h1>
        <p  className={`${styles.title}`} style={{ textAlign: 'right' }}>
        Date : {formattedDate}
      </p>
      </div>
      <span className={`${styles.field}`}>All fields marked "*" are mandatory</span>
      
     
    </div>
  );
};

export default Title;
