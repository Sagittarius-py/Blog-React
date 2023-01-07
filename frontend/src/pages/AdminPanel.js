import React, { useState, useEffect } from "react";
import getCookieObject from "../getCookieObject";
import Axios from "axios";

export default function AdminPanel() {
  const [carBrandList, setCarBrandList] = useState();

  useEffect(() => {
    Axios.get("http://localhost:3002/api/getCarBrands").then((data) => {
      setCarBrandList(data.data);
      console.log(carBrandList);
    });
  }, []);

  const [insertSelect, setInsertSelect] = useState(1);
  const cookies = getCookieObject();

  const [carBrand, setCarBrand] = useState("");

  const [carModel, setCarModel] = useState({ carModel: "", brandId: 0 });

  const [engine, setEngine] = useState({
    pojemnosc: "",
    uklad: "",
    moc: 0,
    momentObrotowy: 0,
    nrSilnika: "",
  });

  const carBrandSubmit = () => {
    const carbrand = { carBrand: carBrand };

    Axios.post(`http://localhost:3002/api/addCarBrand`, carbrand).then(
      (response) => {
        console.log(response);
      }
    );
  };

  const carModelSubmit = () => {
    console.log(carModel);

    Axios.post(`http://localhost:3002/api/addCarModel`, carModel).then(
      (response) => {
        console.log(response);
      }
    );
  };

  const EngineSubmit = () => {
    Axios.post(`http://localhost:3002/api/addCarEngine`, engine).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
        className="main flex flex-row"
      >
        <div
          //   style={{ height: "85vh" }}
          className="container flex-col mt-24 h-4/5 m-12 w-96 rounded-2xl drop-shadow-2xl bg-slate-700"
        >
          <h1 className="text-white m-4 text-3xl">Admin Panel</h1>
          {cookies.accessLvl > 2 ? (
            <a
              target="blank"
              href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=blog_posts"
              className="w-2/4 block uppercase mx-auto shadow bg-indigo-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none text-white text-xs py-3 px-10 rounded"
            >
              PhPMyAdmin
            </a>
          ) : null}
        </div>

        <div className="grid p-12 px-24 mt-24 grid-padding-x-24 rounded-2xl m-12 bg-slate-400 w-4/5 h-4/5 grid-rows-2 grid-cols-3 gap-12">
          <div className="bg-white p-2 m-auto w-full h-64 col-span-2 rounded-xl">
            <label htmlFor="insert">Table to insert:</label>
            <select
              className=" ml-1 rounded-sm "
              name="insert"
              id="insert"
              onChange={(event) => {
                setInsertSelect(event.target.value);
              }}
            >
              <option value={1}>Car Brand</option>
              <option value={2}>Car Model</option>
              <option value={3}>Engine</option>
            </select>
            {insertSelect == 1 ? (
              <div className="flex justify-center flex-col">
                <input
                  onChange={(e) => setCarBrand(e.target.value)}
                  className="mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="carBrand"
                  id="carBrand"
                  placeholder="Audi, BMW..."
                />
                <button
                  onClick={() => carBrandSubmit()}
                  className="block ml-8 w-24 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Submit
                </button>
              </div>
            ) : null}
            {insertSelect == 2 ? (
              <div className="flex justify-center flex-col">
                <input
                  onChange={(e) =>
                    setCarModel((prevState) => ({
                      ...prevState,
                      carModel: e.target.value,
                    }))
                  }
                  className="mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="carBrand"
                  id="carBrand"
                  placeholder="(Toyota) Yaris, (BMW) E36..."
                />
                <div className="flex mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
                  <select
                    className="w-full"
                    onChange={(e) =>
                      setCarModel((prevState) => ({
                        ...prevState,
                        brandId: e.target.value,
                      }))
                    }
                  >
                    {carBrandList.map((carBrand, key) => {
                      return (
                        <option value={carBrand.brand_id} key={key}>
                          {carBrand.brandName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button
                  onClick={() => carModelSubmit()}
                  className="block ml-8 w-24 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Submit
                </button>
              </div>
            ) : null}
            {insertSelect == 3 ? (
              <div className="flex justify-center flex-row flex-wrap">
                <input
                  onChange={(e) =>
                    setEngine((prevState) => ({
                      ...prevState,
                      pojemnosc: e.target.value,
                    }))
                  }
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="capacity"
                  id="capacity"
                  placeholder="Pojemność (2.5L)"
                />
                <input
                  onChange={(e) =>
                    setEngine((prevState) => ({
                      ...prevState,
                      uklad: e.target.value,
                    }))
                  }
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="Uklad"
                  id="Uklad"
                  placeholder="Układ (V8...)"
                />
                <input
                  onChange={(e) =>
                    setEngine((prevState) => ({
                      ...prevState,
                      moc: e.target.value,
                    }))
                  }
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="number"
                  name="moc"
                  id="moc"
                  placeholder="Moc (KM)"
                />
                <input
                  onChange={(e) =>
                    setEngine((prevState) => ({
                      ...prevState,
                      momentObrotowy: e.target.value,
                    }))
                  }
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="number"
                  name="momentObrotowy"
                  id="momentObrotowy"
                  placeholder="Moment Obrotowy (NM)"
                />
                <input
                  onChange={(e) =>
                    setEngine((prevState) => ({
                      ...prevState,
                      nrSilnika: e.target.value,
                    }))
                  }
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="nrSilnika"
                  id="nrSilnika"
                  placeholder="Oznaczenie silnika"
                />
                <button
                  onClick={() => EngineSubmit()}
                  className="block w-24 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                >
                  Submit
                </button>
              </div>
            ) : null}
          </div>
          <div className="bg-white m-auto w-full h-64 rounded-xl">Panel 2</div>
          <div className="bg-white m-auto w-full h-64 rounded-xl">Panel 3</div>
          <div className="bg-white m-auto w-full h-64 col-span-2 rounded-xl">
            Panel 4
          </div>
        </div>
      </div>
    </>
  );
}
