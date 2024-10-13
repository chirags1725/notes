import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Note from "./Components/Note";
import Loader from "./Components/Loader";
import AlertMessage from "./Components/AlertMessage";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  setNewnotealert,
  newnotealert,
  newnotedata,
  setNewnoteloader,
  newnoteloader,
  label,
  setnotepreview,
  setTitle,
  setNote,
  setlabels,
  searchq,
  setnewnote,
  setFileName,
  setFileurl,
}) {
  const [data, setData] = useState("");
  const [filterdata, setfilterdata] = useState("");
  const [alert, setalert] = useState("");

  useEffect(() => {
    fetch("/api/getnotes")
      .then((a) => {
        return a.json();
      })
      .then((a) => {
        setData(a);
        setNewnoteloader(false);
        setTimeout(() => {
          setNewnotealert(false);
        }, 2000);
      });
  }, [newnotedata]);

  return (
    <div>
      {alert && (
        <AlertMessage
          color="white"
          bgclr="red"
          message="Note deleted successfully!"
        ></AlertMessage>
      )}
      {newnotealert && (
        <AlertMessage
          color="black"
          bgclr="lightgreen"
          message="Note added successfully!"
        ></AlertMessage>
      )}

      <h3 className={styles.h3}>Hi Chirag!</h3>

      <div
        className={styles.fab}
        onClick={() => {
          setnewnote(true);
        }}
      >
        +
      </div>

      {newnoteloader && (
        <center>
          <Loader></Loader>
        </center>
      )}
      <div className={styles.notes}>
        {data ? (
          data.filter(
            (e) =>
              e.label.includes(label) &&
              (e.title.toLowerCase().includes(searchq.toLowerCase()) ||
                e.note.toLowerCase().includes(searchq.toLowerCase()) ||
                e.label.toLowerCase().includes(searchq.toLowerCase()))
          ).length !== 0 ? (
            data
              .filter(
                (e) =>
                  e.label.toLowerCase().includes(label.toLowerCase()) &&
                  (e.title.toLowerCase().includes(searchq.toLowerCase()) ||
                    e.note.toLowerCase().includes(searchq.toLowerCase()) ||
                    e.label.toLowerCase().includes(searchq.toLowerCase()))
              )
              .map((e, index) => {
                return (
                  <Note
                    key={e._id}
                    index={index}
                    setalert={setalert}
                    setnotepreview={setnotepreview}
                    data={data}
                    setData={setData}
                    note={e}
                    onClick={() => {
                      setnotepreview(true);
                      setTitle(e.title);
                      setNote(e.note);
                      setlabels(e.label.split(","));
                      setFileName(e.filename);
                      setFileurl(e.file);
                    }}
                  />
                );
              })
          ) : (
            <h4
              style={{
                textAlign: "center",
                fontSize: "1.2em",
                fontFamily: "roboto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              No notes available
            </h4>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
