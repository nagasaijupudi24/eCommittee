/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import styles from "../../Form.module.scss";

interface TitleProps {
  itemId: any;
  formType: string;
  statusOfRequest: string;
  propPaneformType: any;
}

const Title: React.FC<TitleProps> = (
  props,
  { formType = "", statusOfRequest = "" }
) => {
  console.log(props);
  const currentDate: Date = new Date();
  const formattedDate: string = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

  return (
    <div  style={{ flexGrow: 1, margin: '10 10px' }}>
      <div
        className={`${styles.noteTitle} ${styles.commonProperties}`}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <p
          className={`${styles.status}`}
          style={{ flex: 1, textAlign: "left" }}
        >
          Status: {props.statusOfRequest}
        </p>

        {props.propPaneformType === "BoardNoteNew" ? (
          <h1
            className={`${styles.title}`}
            style={{ flex: 1, textAlign: "center" }}
          >
            Board Note - {props.itemId ? "Edit" : "New"}
          </h1>
        ) : (
          <h1
            className={`${styles.title}`}
            style={{ flex: 1, textAlign: "center" }}
          >
            eCommittee Note - {props.itemId ? "Edit" : "New"}
          </h1>
        )}

        <p
          className={`${styles.title}`}
          style={{ flex: 1, textAlign: "right" }}
        >
          Date: {formattedDate}
        </p>
      </div>
      <span className={`${styles.field}`}>
        <strong style={{fontSize:'12px'}}>All fields marked "*" are mandatory</strong>
      </span>
    </div>
  );
};

export default Title;
