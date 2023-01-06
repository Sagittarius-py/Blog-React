import React, { useState } from "react";

export default function Popup(props) {
  const [display, setDisplay] = useState("none");

  let showHide = () => {
    setDisplay((prevState) => {
      if (prevState == "none") {
        return "block";
      } else {
        return "none";
      }
    });
  };

  let style = {
    display: display,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <button onClick={() => showHide()}>Pokaż</button>
      <div
        style={style}
        className="w-1/2 h-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-2xl rounded-lg"
      >
        {props.children}
      </div>
    </>
  );
}
