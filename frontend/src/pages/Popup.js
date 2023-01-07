import React, { useState, useEffect } from "react";
import Axios from "axios";
import getCookieObject from "../getCookieObject";

export default function Popup() {
  const cookies = getCookieObject();
  const [display, setDisplay] = useState({ div: "none", button: "block" });
  const [carBrands, setCarBrands] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3002/api/getCarBrands").then((data) => {
      setCarBrands(data);
    });


    
  }, []);

  let showHide = () => {
    setDisplay((prevState) => {
      if (prevState.div == "none") {
        return { div: "block", button: "none" };
      } else {
        return { div: "none", button: "block" };
      }
    });
  };

  let submitChange = () => {
    return;
  };

  let style = {
    display: display.div,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      <button
        style={{ display: display.button }}
        className="absolute bottom-2 right-2 float-right w-48 h-8 overflow-hidden text-lg bg-white rounded-lg shadow group"
        onClick={() => showHide()}
      >
        <div className="absolute inset-0 w-3 bg-green-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">
          Change Car Data
        </span>
      </button>
      <div
        style={style}
        className="w-1/2 h-1/2 bg-slate-300 drop-shadow-2xl rounded-lg"
      >
        <div className="form"></div>

        <div className="flex justify-start items-center flex-row-reverse buttons absolute bottom-0 w-full h-12">
          <button
            className="relative mx-2 w-48 h-8 overflow-hidden text-lg bg-white rounded-lg shadow group"
            onClick={() => showHide()}
          >
            <div className="absolute inset-0 w-3 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Submit
            </span>
          </button>
          <button
            className="relative mx-2  w-48 h-8 overflow-hidden text-lg bg-white rounded-lg shadow group"
            onClick={() => showHide()}
          >
            <div className="absolute inset-0 w-3 bg-red-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Cancel
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
