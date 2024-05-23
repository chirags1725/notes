import React, { useState } from "react";
import styles from "@/styles/Notepreview.module.css";
import AlertMessage from "./AlertMessage";
import { FaCheck } from "react-icons/fa6";

const Newnote = ({
  setNewnotealert,
  setNewnoteloader,
  setnewnote,
  setNewnotedata,
}) => {
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [paste, setPaste] = useState("Paste from clipboard");

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const tags = {
    important: "linear-gradient(to right, #ffb347, #ffcc33)",
    blue: "linear-gradient(#0575e6, #021b79)",
    red: "linear-gradient(to right, #ee0979, #ff6a00)",
    green: "linear-gradient(to right, #11998e, #38ef7d)",
    orange: "linear-gradient(to right, #ff4b1f, #ff9068)",
  };

  const submitnote = (e) => {
    // e.preventDefault()
  };
  const submit = (e) => {
    e.preventDefault();
    setnewnote(false);
    setNewnoteloader(true);
    insertnote();
  };

  const handletitle = (e) => {
    settitle(e.target.value);
  };
  const handlenote = (e) => {
    setnote(e.target.value);
  };

  const insertnote = async () => {
    fetch("/api/createnote", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        note: note,
        label: selectedTags.join(","),
      }),
    }).then((a) => {
      setNewnotedata(a);
      setNewnotealert(true);
    });
  };

  const pasteFromClipboard = () => {
    var pasteText = document.getElementById("text");

    if (navigator.clipboard && navigator.clipboard.readText) {
      navigator.clipboard
        .readText()
        .then((text) => {
          setnote(note + text);
          setPaste("Pasted!");
          setTimeout(() => {
            setPaste("Paste from clipboard");
          }, 1000);
        })
        .catch((err) => {
          console.error("Could not paste text: ", err);
        });
    } else {
      try {
        pasteText.focus();
        document.execCommand("paste");
        setPaste("Pasted!");
        setTimeout(() => {
          setPaste("Paste from clipboard");
        }, 1000);
      } catch (err) {
        setPaste(JSON.stringify(err));
      }
    }
  };

  return (
    <>
      <div
        className={styles.bg}
        onClick={() => {
          setnewnote(false);
        }}
      ></div>

      <div className={styles.note} id="note">
        <div
          className={styles.cross}
          onClick={() => {
            setnewnote(false);
          }}
        >
          +
        </div>

        <h2 className={styles.title}>New note</h2>

        <form onSubmit={submit}>
          <div className={styles.double}>
            <div className={styles.input}>
              <input
                type="text"
                value={title}
                onChange={handletitle}
                required
              />
              <span>Title</span>
            </div>
          </div>
          <div
            onClick={pasteFromClipboard}
            style={{
              cursor: "pointer",
              position: "relative",
              right: "0px",
              display: "flex",
              float: "right",
              marginTop: "10px",
              marginBottom: "4px",
              fontSize: ".9em",
              userSelect: "none",
            }}
            className={styles.copy}
          >
            {paste}
          </div>

          <div className={styles.double}>
            <div className={styles.input}>
              <textarea
                type="text"
                value={note}
                onChange={handlenote}
                required
                rows={"6"}
              />
              <span>Note</span>
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              columnGap: "6px",
              rowGap: "4px",
            }}
          >
            {Object.keys(tags).map((tag) => (
              <div
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  background: selectedTags.includes(tag) ? tags[tag] : "gray",
                  color: "white",
                  userSelect: "none",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  textTransform: "capitalize",
                  // margin:"10px 0px"
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          <button onClick={submitnote} type="submit">
            <FaCheck />
          </button>
        </form>
      </div>
    </>
  );
};

export default Newnote;
