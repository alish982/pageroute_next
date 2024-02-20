import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";

//import Select from 'react-select'

const Document = ({ formik }) => {
  const [imgs, setImgs] = useState();

  const handleChange = (e) => {
    console.log(e.target.files);
    const data = new FileReader();

    data.addEventListener("load", () => {
      formik.setFieldValue("residence_card_front", data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  console.log(imgs);

  return (
    <div className="bg-slate-100 -mt-12">
      <div
       
        className="w-full bg-gray-100 shadow-md rounded px-3 pt-14 pb-8 mb-4"
      >
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
              id="grid-first-name"
              type="file"
              placeholder=""
              name="residence_card_front"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <img src={imgs} alt="" />
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
              id="grid-first-name"
              type="file"
              placeholder=""
              name="residence_card_back"
              value={formik.values.residence_card_back}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>

        <div className="py-5 flex items-center justify-between"></div>
      </div>
    </div>
  );
};

export default Document;
