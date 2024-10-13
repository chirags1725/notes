import React, { useState } from "react";
import styles from "@/styles/Notepreview.module.css";
import AlertMessage from "./AlertMessage";
import { FaCheck } from "react-icons/fa6";
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/firebase'
import { getDownloadURL } from 'firebase/storage';
import { MdOutlineFileUpload } from "react-icons/md";



const Newnote = ({
  setNewnotealert,
  setNewnoteloader,
  setnewnote,
  setNewnotedata,
}) => {
  const [title, settitle] = useState("");
  const [note, setnote] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [downloadURL, setdownloadurl] = useState(null);
  const [filename, setFilename] = useState(null);
  const [loader, setLoader] = useState(null);
  const [indicator, setIndicator] = useState(null);

  const [paste, setPaste] = useState("Paste from clipboard");

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async (e)=>{
    e.preventDefault()
    setFilename(file.name)
    setLoader(true)

    const storageRef = ref(storage, `uploads/${file.name + " " + Date.now()}`);

    try {
      await uploadBytes(storageRef, file);
       // Upload the file
       setIndicator(true)
       setLoader(false)
       
      console.log('File uploaded successfully!');
      const downloadURL = await getDownloadURL(storageRef);

      setdownloadurl(downloadURL)
      // Optionally, save the file URL to your MongoDB database here
    } catch (error) {
    setIndicator(false)
      console.error('Error uploading file:', error);
    }
  }

  
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
        file:downloadURL,
        filename:downloadURL ? filename : null
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
        <form onSubmit={submit}>
          <div className={styles.top}>
            <button className={styles.tickbutton} type="submit">
              Done
            </button>
            <div
              className={styles.cross}
              onClick={() => {
                setnewnote(false);
              }}
            >
              +
            </div>
          </div>

          <div className={styles.body}>
            <h2 className={styles.title}>New note</h2>
            <div className={styles.double}>
              <div className={styles.input}>
                <input type="text" value={title} onChange={handletitle} required />
                <span>Title</span>
              </div>
            </div>

            <div onClick={pasteFromClipboard} style={{marginTop:"15px"}} className={styles.copy}>
              {paste}
            </div>

            <div className={styles.double}>
              <div className={styles.input}>
                <textarea value={note} onChange={handlenote} required rows="6" />
                <span>Note</span>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {Object.keys(tags).map((tag) => (
                <div
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    background: selectedTags.includes(tag) ? tags[tag] : "gray",
                    color: "white",
                    borderRadius: "6px",
                    padding: "4px 10px",
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px", marginBottom:"20px"}}>

              <h2 style={{marginBottom:"10px"}}>Upload File</h2>
              <input disabled={indicator} type="file" onChange={handleFileChange} />
              <div style={{marginTop:"10px",display:"flex",alignItems:"center",gap:"10px",textAlign:"center"}}>
              <button style={{padding:"6px 8px",backgroundColor:"transparent", color:"var(--textcolor)",opacity:!file || indicator ? ".6":"1",border:"1px solid var(--fontclr)",display:"flex",gap:"4px",alignItems:"center"}} onClick={handleFileUpload} disabled={!file || indicator} >Upload file <MdOutlineFileUpload style={{fontSize:"1.4em",alignSelf:"center"}} /></button>
              {loader &&<div className={styles.loader}></div>}
              {indicator && <div style={{width:"10px",height:"10px",borderRadius:"50%",background:indicator ? "green":"red"}}></div>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Newnote;