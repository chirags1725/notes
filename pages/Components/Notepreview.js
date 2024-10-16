import React, { useState } from "react";
import styles from "@/styles/Notepreview.module.css";

const Notepreview = ({
  setnotepreview,
  note,
  title,
  labels,
  fileName,
  fileurl,
}) => {
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
  const downloadURL =
    "https://firebasestorage.googleapis.com/v0/b/notecloud-a73b3.appspot.com/o/uploads%2FFcs%20a2.pdf?alt=media&token=806b0710-d7ec-4d03-8024-8d535958586b";
  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
        <div className={styles.top}>
          <div
            className={styles.cross}
            onClick={() => {
              setnotepreview(false);
            }}
          >
            +
          </div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.title}>{title}</h2>
          4343
          {/* <img width={"100%"} src={"https://firebasestorage.googleapis.com/v0/b/notecloud-a73b3.appspot.com/o/logo.png?alt=media&token=64c6342b-87bf-4dec-8668-75b59588893a"} alt="Uploaded" />
<embed
          src={"https://firebasestorage.googleapis.com/v0/b/notecloud-a73b3.appspot.com/o/uploads%2FFcs%20a2.pdf?alt=media&token=806b0710-d7ec-4d03-8024-8d535958586b"}
          style={{ width: '100%', height: '600px' }}
          title="PDF Document"
        /> */}
          <div
            style={{
              display: "flex",
              margin: "5px",
              marginBottom: "2px",
              gap: "4px",
            }}
          >
            {labels &&
              labels.map((e) => {
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
        </div>
        <textarea className={styles.text} value={note} readOnly id="text" />
        <div className={styles.body} style={{ marginTop: "20px" }}>
          {fileName &&
          (fileName.endsWith("png") ||
            fileName.endsWith("jpg") ||
            fileName.endsWith("jpeg") ||
            fileName.endsWith("svg") ||
            fileName.endsWith("webp") ||
            fileName.endsWith("gif")) ? (
            <>
              <h4 style={{ marginBottom: "20px" }}>{fileName}</h4>

              <img
                style={{
                  width: "calc(100% - 40px)",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                src={fileurl}
                alt="Uploaded"
              />
            </>
          ) : (fileName && (fileName.endsWith("mp4") ||
          fileName.endsWith("webm") ||
          fileName.endsWith("ogg") ||
          fileName.endsWith("avi") ||
          fileName.endsWith("mov") ||
          fileName.endsWith("mkv")))? (
            <>
            <h4 style={{ marginBottom: "20px" }}>{fileName}</h4>
            <video src={fileurl} autoplay controls style={{
                  width: "calc(100% - 40px)",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}></video>
            </>
          ) : fileName && fileName.endsWith("pdf") ? (
            <>
              <h4 style={{ marginBottom: "20px" }}>{fileName}</h4>

              <embed
                src={fileurl}
                style={{
                  width: "calc(100% - 40px)",
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  height: "600px",
                }}
                title="PDF Document"
              />
            </>
          ) : fileurl && fileurl.length > 10 ? (
            <>
              <a
                href={fileurl}
                download={fileName}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "lightblue" }}
              >
                Download {fileName}
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Notepreview;
