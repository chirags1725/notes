import React from "react";

const AlertMessage = ({ color, bgclr, message }) => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          background: bgclr,
          top: "calc(1.4em + 45px)",
          width: "calc(100% - 60px)",
          textAlign: "center",
          left: "60px",
          zIndex: "1",
          color: color,
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default AlertMessage;
