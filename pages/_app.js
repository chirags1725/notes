import "@/styles/globals.css";
import Navbar from "./Components/Navbar";
import { useRouter } from "next/router";
import { useState } from "react";
import Notepreview from "./Components/Notepreview";
import Newnote from "./Components/Newnote";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [label, setlabel] = useState("");
  const [notepreview, setnotepreview] = useState(false);
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileurl, setFileurl] = useState("");
  const [note, setNote] = useState("");
  const [labels, setLabels] = useState("");
  const [searchq, setsearchq] = useState("");
  const [newnote, setnewnote] = useState("");
  const [newnotedata, setNewnotedata] = useState("");
  const [newnoteloader, setNewnoteloader] = useState("");
  const [newnotealert, setNewnotealert] = useState("");

  return (
    <>
      <Head>
        <title>Notes - notes on the cloud</title>
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="description"
          content="Store, sync, copy-paste, and share your thoughts instantly with Notes on the Cloud – your ideas, always within reach."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {(router.pathname === "/" ||
        router.pathname.toString().includes("note")) && (
        <Navbar setlabel={setlabel} setsearchq={setsearchq} searchq={searchq} />
      )}

      <Component
        {...pageProps}
        setNewnotealert={setNewnotealert}
        newnotealert={newnotealert}
        setNewnoteloader={setNewnoteloader}
        newnoteloader={newnoteloader}
        newnotedata={newnotedata}
        label={label}
        setnotepreview={setnotepreview}
        setTitle={setTitle}
        setNote={setNote}
        setlabels={setLabels}
        searchq={searchq}
        setnewnote={setnewnote}
        setFileName={setFileName}
        setFileurl={setFileurl}
      />
      {newnote && (
        <Newnote
          setNewnotealert={setNewnotealert}
          setNewnoteloader={setNewnoteloader}
          setnewnote={setnewnote}
          setNewnotedata={setNewnotedata}
        />
      )}
      {notepreview && (
        <Notepreview
          setnotepreview={setnotepreview}
          note={note}
          title={title}
          labels={labels}
          fileurl={fileurl}
          fileName={fileName}
        ></Notepreview>
      )}
    </>
  );
}
