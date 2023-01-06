import React, { useState } from "react";
import getCookieObject from "../getCookieObject";

export default function AdminPanel() {
  const [insertSelect, setInsertSelect] = useState(1);
  const cookies = getCookieObject();

  const [carBrand, setCarBrand] = useState("");
  const [carModel, setCarModel] = useState("");
  const [pojemnosc, setPojemnosc] = useState("");
  const [uklad, setUklad] = useState("");
  const [moc, setMoc] = useState("");
  const [momentObrotowy, setMomentObrotowy] = useState("");
  const [nrSilnika, setNrSilnika] = useState("");

  const carBrandSubmit = () => {};

  const carModelSubmit = () => {};

  const EngineSubmit = () => {
    const data = new FormData();

    data.append("pojemnosc", pojemnosc);
    data.append("uklad", uklad);
    data.append("moc", moc);
    data.append("momentObrotowy", momentObrotowy);
    data.append("nrSilnika", nrSilnika);
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
                <button className="block ml-8 w-24 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                  Submit
                </button>
              </div>
            ) : null}
            {insertSelect == 2 ? (
              <div className="flex justify-center flex-col">
                <input
                  onChange={(e) => setCarModel(e.target.value)}
                  className="mt-4 w-4/5 mx-auto rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="carBrand"
                  id="carBrand"
                  placeholder="(Toyota) Yaris, (BMW) E36..."
                />
                <button className="block ml-8 w-24 bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                  Submit
                </button>
              </div>
            ) : null}
            {insertSelect == 3 ? (
              <div className="flex justify-center flex-row flex-wrap">
                <input
                  onChange={(e) => setPojemnosc(e.target.value)}
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="capacity"
                  id="capacity"
                  placeholder="Pojemność (2.5L)"
                />
                <input
                  onChange={(e) => setUklad(e.target.value.toUpperCase())}
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="text"
                  name="Uklad"
                  id="Uklad"
                  placeholder="Układ (V8...)"
                />
                <input
                  onChange={(e) => setMoc(e.target.value)}
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="number"
                  name="moc"
                  id="moc"
                  placeholder="Moc (KM)"
                />
                <input
                  onChange={(e) => setMomentObrotowy(e.target.value)}
                  className="mt-4 mr-4 w-2/5 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  type="number"
                  name="momentObrotowy"
                  id="momentObrotowy"
                  placeholder="Moment Obrotowy (NM)"
                />
                <input
                  onChange={(e) => setNrSilnika(e.target.value)}
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
