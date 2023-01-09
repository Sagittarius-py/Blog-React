import React, { useState } from "react";
import Axios from "axios";
import getCookieObject from "../getCookieObject";

export default function Popup(props) {
  const cookies = getCookieObject();
  const [display, setDisplay] = useState({ div: "none", button: "block" });
  const [carBrands, setCarBrands] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [carEngines, setCarEngines] = useState([]);

  const [carCombined, setCarCombined] = useState({
    userId: props.userId,
    carBrand_id: 0,
    carModel_id: 0,
    carEngine_id: 0,
    rocznik: 0,
  });

  let formSubmit = () => {
    console.log(carCombined);
    Axios.post(`http://localhost:3002/api/addCarCombined`, carCombined).then(
      (response) => {
        console.log(response);
      }
    );
    window.location.reload(false);
  };

  let showHide = () => {
    Axios.get("http://localhost:3002/api/getCarBrands").then((data) => {
      setCarBrands(data.data);
    });

    Axios.get("http://localhost:3002/api/getEngines").then((data) => {
      setCarEngines(data.data);
    });

    setDisplay((prevState) => {
      if (prevState.div == "none") {
        return { div: "block", button: "none" };
      } else {
        return { div: "none", button: "block" };
      }
    });
  };

  let getCarModels = (brandId) => {
    console.log(brandId);
    Axios.get(`http://localhost:3002/api/getCarModels/${brandId}`).then(
      (data) => {
        setCarModels(data.data);
        console.log(data);
      }
    );
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
        className="absolute float-right w-48 h-8 overflow-hidden text-lg bg-white rounded-lg shadow bottom-2 right-2 group"
        onClick={() => showHide()}
      >
        <div className="absolute inset-0 w-3 bg-green-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
        <span className="relative text-black group-hover:text-white">
          Change Car Data
        </span>
      </button>
      <div
        style={style}
        className="w-1/2 pb-20 rounded-lg h-11/12 bg-slate-300 drop-shadow-2xl"
      >
        <div className="form">
          <h1 className="mt-4 ml-4 text-lg ">My Car's Brand:</h1>
          <div className="flex mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <select
              className="w-full"
              onChange={(e) => {
                getCarModels(e.target.value);
                setCarCombined((prevState) => ({
                  ...prevState,
                  carBrand_id: e.target.value,
                }));
              }}
            >
              <option value={0}>Choose from list</option>
              {carBrands.map((carBrand, key) => {
                return (
                  <option value={carBrand.brand_id} key={key}>
                    {carBrand.brandName}
                  </option>
                );
              })}
            </select>
          </div>
          <h1 className="mt-4 ml-4 text-lg ">My Car's Model:</h1>
          <div className="flex mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <select
              className="w-full"
              onChange={(e) =>
                setCarCombined((prevState) => ({
                  ...prevState,
                  carModel_id: e.target.value,
                }))
              }
            >
              <option value={0}>Choose from list</option>
              {carModels.length > 1 ? (
                carModels.map((carModel, key) => {
                  return (
                    <option value={carModel.model_id} key={key}>
                      {carModel.modelName}
                    </option>
                  );
                })
              ) : carModels.length == 1 ? (
                <option value={carModels[0].model_id}>
                  {carModels[0].modelName}
                </option>
              ) : (
                <option value={null}>No models for this brand yet</option>
              )}
            </select>
          </div>
          <h1 className="mt-4 ml-4 text-lg ">My Car's Engine:</h1>
          <div className="flex mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            <select
              className="w-full"
              onChange={(e) =>
                setCarCombined((prevState) => ({
                  ...prevState,
                  carEngine_id: e.target.value,
                }))
              }
            >
              <option value={0}>Choose from list</option>
              {carEngines.map((engine, key) => {
                return (
                  <option value={engine.engine_id} key={key}>
                    {engine.pojemnosc}L | {engine.uklad} | {engine.moc}KM |{" "}
                    {engine.momentObrotowy}NM | {engine.nrSilnika}
                  </option>
                );
              })}
            </select>
          </div>
          <h1 className="mt-4 ml-4 text-lg ">My Car's Production Year:</h1>
          <div className="flex w-4/5 mx-auto mt-4 ">
            <input
              className=" w-full mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              type="number"
              name="rocznik"
              id="rocznik"
              placeholder="1999"
              onChange={(e) =>
                setCarCombined((prevState) => ({
                  ...prevState,
                  rocznik: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="absolute bottom-0 flex flex-row-reverse items-center justify-start w-full h-12 buttons">
          <button
            className="relative w-48 h-8 mx-2 overflow-hidden text-lg bg-white rounded-lg shadow group"
            onClick={() => formSubmit()}
          >
            <div className="absolute inset-0 w-3 bg-blue-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span className="relative text-black group-hover:text-white">
              Submit
            </span>
          </button>
          <button
            className="relative w-48 h-8 mx-2 overflow-hidden text-lg bg-white rounded-lg shadow group"
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
