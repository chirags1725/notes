import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Navbar.module.css";
import { RiMenu2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { CiLight, CiDark, CiCircleCheck } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { MdLabelImportantOutline } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = ({ setlabel, searchq, setsearchq }) => {
  const [opened, setopened] = useState(false);
  const [searchBar, setsearchBar] = useState(false);
  const [mode, setMode] = useState(true); // Initial state, it will be set properly in useEffect
  const [isInitialized, setIsInitialized] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0); // Initial state as null

  const router = useRouter();

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  // Sidebar Handling
  const handleStyle = () => {
    setopened(!opened);
  };

  const sidebar = {
    width: opened ? "200px" : "60px",
  };

  useEffect(() => {
    const side = document.querySelector("#side");
    const icons = document.querySelectorAll("#icon");
    const hides = document.querySelectorAll("#hide");

    if (side && icons.length && hides.length) {
      document.body.style.width = opened
        ? "calc(100vw - 240px)"
        : "calc(100vw - 100px)";
      document.body.style.left = opened ? "200px" : "60px";

      side.style.boxShadow = opened ? "2px 0px 10px -6px black" : "none";

      hides.forEach((hide) => {
        hide.style.display = opened ? "flex" : "none";
      });

      icons.forEach((icon) => {
        icon.style.width = opened ? "100%" : "38px";
        icon.style.borderTopLeftRadius = opened ? "0px" : "100px";
        icon.style.borderBottomLeftRadius = opened ? "0px" : "100px";
      });

      side.style.paddingLeft = opened ? "0px" : "20px";
    }
    // side.style.alignItems = opened ? 'left':'center'
  }, [opened]);

  const handleStylein = () => {
    setopened(true);
  };
  const handleStyleout = () => {
    setopened(false);
  };

  // Search query
  const handleSearch = (e) => {
    let input = document.querySelector("input");
    let searchicon = document.querySelector(".search");
    if (!searchBar) {
      input.style.width = "100%";
      input.style.border = "2px solid gray";
      input.style.padding = "0px 2em";
      setsearchBar(!searchBar);
    } else {
      input.style.width = "0px";

      input.style.border = "none";
      input.style.padding = "0px 0em";
      setsearchBar(!searchBar);
    }
  };

  const handlesearchq = (e) => {
    setsearchq(e.target.value);
  };

  // Toggle dark mode light mode
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedMode = localStorage.getItem("mode");
      if (savedMode !== null) {
        setMode(savedMode === "true");
      } else {
        setMode(window.matchMedia("(prefers-color-scheme: light)").matches);
      }
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute(
        "data-color-scheme",
        mode ? "light" : "dark"
      );
      localStorage.setItem("mode", mode);
    }
  }, [mode, isInitialized]);

  const changeMode = () => {
    setMode((prevMode) => !prevMode);
  };

  const focusInput = () => {
    const id = document.querySelector("#search");
    id.focus();
  };

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.left}>
          <RiMenu2Fill style={{ fontSize: "1.6em" }} onClick={handleStyle} />
          <Link
            style={{ textDecoration: "none", color: "var(--fontcolor)" }}
            href="/"
          >
            <h1>Notes</h1>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.search}>
            {searchBar ? (
              <IoCloseOutline
                className="search"
                style={{
                  position: "relative",
                  left: "0px",
                  fontSize: "2em",
                  left: "1.2em",
                }}
                onClick={() => {
                  handleSearch();
                  setsearchq("");
                }}
              ></IoCloseOutline>
            ) : (
              <FiSearch
                className="search"
                style={{
                  position: "relative",
                  left: "0px",
                  fontSize: "1.6em",
                  left: "-10px",
                }}
                onClick={() => {
                  handleSearch();
                  focusInput();
                }}
              />
            )}
            <input
              type="text"
              value={searchq}
              onChange={handlesearchq}
              placeholder="Search"
              id="search"
            />
          </div>
          <div className={styles.avatar}>C</div>
        </div>
      </div>
      <div
        className={styles.sidebar}
        id="side"
        style={sidebar}
        onMouseEnter={handleStylein}
        onMouseLeave={handleStyleout}
      >
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 0 ? styles.active : ""}`}
          onClick={() => {
            handleClick(0);
            setlabel("");
            setopened(false);
            router.push("/");
          }}
        >
          <FaCheck className={styles.ico} /> <span id="hide">All</span>
        </div>
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 1 ? styles.active : ""}`}
          onClick={() => {
            handleClick(1);
            setlabel("important");
            setopened(false);
            router.push("/");
          }}
        >
          <MdLabelImportantOutline className={styles.ico} />
          <span id="hide">Important</span>
        </div>
        <span id="hide" style={{ marginLeft: "20px", fontSize: ".9em" }}>
          Labels
        </span>
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 2 ? styles.active : ""}`}
          onClick={() => {
            handleClick(2);
            setlabel("blue");
            setopened(false);
            router.push("/");
          }}
        >
          <div
            className={styles.ico}
            style={{
              height: "20px",
              width: "20px",
              background: "linear-gradient(to left, #0575e6, #021b79)",
              borderRadius: "50%",
            }}
          ></div>
          <span id="hide">Blue</span>
        </div>
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 3 ? styles.active : ""}`}
          onClick={() => {
            handleClick(3);
            setlabel("red");
            setopened(false);
            router.push("/");
          }}
        >
          <div
            className={styles.ico}
            style={{
              height: "20px",
              width: "20px",
              background: "linear-gradient(to right, #ee0979, #ff6a00)",
              borderRadius: "50%",
            }}
          ></div>
          <span id="hide">Red</span>
        </div>
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 4 ? styles.active : ""}`}
          onClick={() => {
            handleClick(4);
            setlabel("green");
            setopened(false);
            router.push("/");
          }}
        >
          <div
            className={styles.ico}
            style={{
              height: "20px",
              width: "20px",
              background: "linear-gradient(to right, #11998e, #38ef7d)",
              borderRadius: "50%",
            }}
          ></div>
          <span id="hide">Green</span>
        </div>
        <div
          id="icon"
          className={`${styles.icon} ${activeIndex === 5 ? styles.active : ""}`}
          onClick={() => {
            handleClick(5);
            setlabel("orange");
            setopened(false);
            router.push("/");
          }}
        >
          <div
            className={styles.ico}
            style={{
              height: "20px",
              width: "20px",
              background: "linear-gradient(to right, #ff4b1f, #ff9068)",
              borderRadius: "50%",
            }}
          ></div>
          <span id="hide">Orange</span>
        </div>

        <div
          onClick={() => {
            changeMode();
            setopened(false);
          }}
          style={{
            display: "flex",
            position: "fixed",
            bottom: "20px",
            left: "20px",
            fontSize: "2em",
          }}
        >
          {mode ? (
            <CiDark
              onClick={() => {
                setopened(false);
              }}
            />
          ) : (
            <CiLight />
          )}
          {mode ? (
            <div
              onClick={() => {
                setopened(false);
              }}
              style={{
                fontSize: ".5em",
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
              id="hide"
            >
              Dark mode
            </div>
          ) : (
            <div
              id="hide"
              style={{
                fontSize: ".5em",
                marginLeft: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Light mode
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
