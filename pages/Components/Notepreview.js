import React, { useState } from "react";
import styles from "@/styles/Notepreview.module.css";

const Notepreview = ({ setnotepreview, note, title, labels }) => {
  const [copy, setCopy] = useState("Copy to clipboard");

  // const copyToClipboard = ()=>{
  //   var copyText = document.getElementById("text");

  // copyText.select();
  // copyText.setSelectionRange(0, 99999);

  // navigator.clipboard.writeText(copyText.value);
  // copyText.setSelectionRange(0,0)
  // setCopy('Copied!')
  // setTimeout(() => {
  //   setCopy("Copy to clipboard")
  // }, 1000);
  const copyToClipboard = () => {
    var copyText = document.getElementById("text");

    // Ensure the input field is focused
    copyText.focus();

    // Select the text content
    copyText.setSelectionRange(0, copyText.value.length);

    // Check if the Clipboard API is supported
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Use the clipboard API to write text
      navigator.clipboard
        .writeText(copyText.value)
        .then(() => {
          // Update the button text to give feedback
          setCopy("Copied!");
          setTimeout(() => {
            setCopy("Copy to clipboard");
          }, 1000);
        })
        .catch((err) => {
          setCopy("Could not copy text: ");
          setTimeout(() => {
            setCopy("Copy to clipboard");
          }, 1000);
        });
    } else {
      try {
        document.execCommand("copy");
        setCopy("Copied!");
        setTimeout(() => {
          setCopy("Copy to clipboard");
        }, 1000);
      } catch (err) {
        setCopy("Unable to copy!");

        setTimeout(() => {
          setCopy("Copy to clipboard");
        }, 1000);
      }
    }

    copyText.setSelectionRange(0, 0);
  };

  return (
    <>
      <div
        className={styles.bg}
        onClick={() => {
          setnotepreview(false);
        }}
      ></div>

      <div className={styles.note} id="note">
        <div
          className={styles.cross}
          onClick={() => {
            setnotepreview(false);
          }}
        >
          +
        </div>
        <h2 className={styles.title}>{title}</h2>
        <div
          style={{
            display: "flex",
            margin: "5px",
            marginBottom: "20px",
            gap: "4px",
          }}
        >
          {labels && labels.map((e) => {
            if (e !== "important") {
              return (
                <div
                  style={{
                    height: "14px",
                    width: "14px",
                    background: e,
                    borderRadius: "50%",
                  }}
                ></div>
              );
            } else {
              return "important";
            }
          })}
        </div>
        <div
          onClick={copyToClipboard}
          style={{
            cursor: "pointer",
            position: "relative",
            right: "0px",
            display: "flex",
            float: "right",
            marginBottom: "10px",
            fontSize: ".9em",
            userSelect: "none",
          }}
          className={styles.copy}
        >
          {copy}
        </div>

        <textarea className={styles.text} value={note} readOnly id="text" />
      </div>
    </>
  );
};

export default Notepreview;
