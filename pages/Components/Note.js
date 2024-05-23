import React, { useState } from "react";
import styles from "@/styles/Note.module.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loader from "./Loader";
import { useMemo } from "react";

const Note = ({
  setnotepreview,
  onClick,
  note,
  data,
  setData,
  index,
  setalert,
}) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const gradient = useMemo(() => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const angle = Math.floor(Math.random() * 360);
    return `linear-gradient(${angle}deg, ${color1}20, ${color2}20)`;
  }, []);

  // const color1 = getRandomColor();
  //     const color2 = getRandomColor();
  //     const angle = Math.floor(Math.random() * 360);

  //     const gradient = `linear-gradient(${angle}deg, ${color1}20, ${color2}20)`;

  const deletenote = async (id) => {
    fetch("/api/deletenote", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then((a) => {
      setData((prevItems) => prevItems.filter((_, i) => i !== index));
      setload(false);
      setalert("Note deleted successfully");
      setTimeout(() => {
        setalert("");
      }, 1000);
    });
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setload(true);
    deletenote(note._id);
    setnotepreview(false);
  };

  const [hovernote, sethovernote] = useState(false);
  const [load, setload] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => {
        sethovernote(true);
      }}
      onMouseLeave={() => {
        sethovernote(false);
      }}
      className={styles.note}
      style={{ background: gradient }}
    >
      {hovernote && (
        <RiDeleteBin5Line
          style={{
            position: "absolute",
            right: "20px",
            zIndex: "1000",
            top: "10px",
          }}
          className={styles.bin}
          onClick={handleDeleteClick}
        />
      )}

      {load ? (
        <Loader></Loader>
      ) : (
        <div>
          {note && (<>{" "}
          <h4>
            {note && note.title.toString().slice(0, 15)}
            {note && note.title.toString().length > 18
              ? "..."
              : note.title.toString().slice(15, 18)}
          </h4>
          <h5>
            {note && note.note.toString().slice(0, 37)}
            {note && note.note.toString().length > 40
              ? "..."
              : note.note.toString().slice(37, 40)}
          </h5></>)}
        </div>
      )}
    </div>
  );
};

export default Note;
