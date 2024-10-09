/* eslint-disable react/self-closing-comp */
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
    <div style={{ flexGrow: 1, margin: "10 10px" }}>
      <div
        className={`${styles.noteTitle} ${styles.commonProperties}`}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div></div> {/* Empty div to take up space on the left */}
        <h1 className={`${styles.title}`} style={{ textAlign: "center" }}>
          {props.propPaneformType === "BoardNoteNew"
            ? `Board Note - ${props.itemId ? "Edit" : "New"}`
            : `eCommittee Note - ${props.itemId ? "Edit" : "New"}`}
        </h1>
        <p className={`${styles.title}`} style={{ textAlign: "right" }}>
          Date: {formattedDate}
        </p>
      </div>

      <span className={`${styles.field}`}>
        All fields marked "*" are mandatory
      </span>
    </div>
  );
};

export default Title;
