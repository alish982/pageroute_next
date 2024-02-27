import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

//import Select from 'react-select'

const Document = ({ formik }) => {
  const [imgs, setImgs] = useState();
  const [imgs1, setImgs1] = useState();

  console.log(imgs);
  // const handleChange = (e) => {
  //   console.log(e.target.files);
  //   const data = new FileReader();

  //   data.addEventListener("load", () => {
  //     setImgs(data.result);
  //     formik.setFieldValue("residence_card_front", data.result);
  //   });
  //   data.readAsDataURL(e.target.files[0]);
  // };
  // console.log(imgs);

  return (
    <div className="bg-slate-100 -mt-12">
      <div className="w-full bg-gray-100 shadow-md rounded px-3 pt-14 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Residence Card Number
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="residence_card_no"
              placeholder=""
              value={formik.values.residence_card_no}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Residence Card Status
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Sandip"
              name="residence_card_status"
              value={formik.values.residence_card_status}
              onChange={(newVal) => {
                formik.setFieldValue(
                  "residence_card_status",
                  newVal.target.value
                );
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Residence Card Front
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="file-input-id1"
              type="file"
              placeholder=""
              name="residence_card_front"
              onChange={(e) => {
                const data = new FileReader();
                data.addEventListener("load", () => {
                  const blob = new Blob([data.result]);
                  const url = URL.createObjectURL(blob);
                  setImgs(url);
                  formik.setFieldValue("residence_card_front", blob);
                });
                data.readAsArrayBuffer(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            <div className="relative">
              {imgs && (
                <div ClassName="relative inline-block">
                  <button
                    className="absolute top-0 right-0 z-10 bg-white border border-black"
                    onClick={() => {
                      setImgs(''),
                        formik.setFieldValue("residence_card_front", '');
                        document.getElementById("file-input-id1").value = "";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {imgs && <img src={imgs} alt="Selected Image" />}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Residence Card Back
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="file-input-id2"
              type="file"
              placeholder=""
              name="residence_card_back"
              onChange={(e) => {
                const data = new FileReader();
                data.addEventListener("load", () => {
                  const blob = new Blob([data.result]);
                  const url = URL.createObjectURL(blob);
                  setImgs1(url);
                  formik.setFieldValue("residence_card_back", blob);
                });
                data.readAsArrayBuffer(e.target.files[0]);
              }}
              onBlur={formik.handleBlur}
            />
            <div className="relative">
              {imgs1 && (
                <div ClassName="relative inline-block">
                  <button
                    className="absolute top-0 right-0 z-10 bg-white border border-black"
                    onClick={() => {
                      setImgs1('');
                      formik.setFieldValue("residence_card_back", '');
                      document.getElementById("file-input-id2").value = "";
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            {imgs1 && <img src={imgs1} alt="Selected Image" />}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>

        <div className="py-5 flex items-center justify-between"></div>
      </div>
    </div>
  );
};

export default Document;
