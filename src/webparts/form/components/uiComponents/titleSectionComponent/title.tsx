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
        <h1 className={`${styles.responsiveTitle}`}>
          eCommittee Note - {formType}
        </h1>
      </div>
      <p>Status: {statusOfRequest}</p>
      <p className={`${styles.responsiveTitle}`} style={{ textAlign: 'right' }}>
        Date : {formattedDate}
      </p>
    </div>
  );
};

export default Title;
