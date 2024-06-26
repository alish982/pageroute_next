"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "./compo_register/profile";
import Other from "./compo_register/other";
import Document from "./compo_register/document";
import Payment from "./compo_register/payment";

import { instanceOfAxios } from "../others/localstorage";
import { miniBar } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

//import Select from 'react-select'

const Cregister = () => {
  const [date, setDate] = useState(new Date());
  let [tab, setTab] = useState("profile");
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    first_name: "",
    customer_type: "",
    email: "",
    phone: "",
    mobile: "",
    company: "",
    zipcode: "",
    province: "",
    city: "",
    address: "",
    building: "",
    dob: "",
    mailing_address: "",
    whattsup: "",
    facebook: "",
    line: "",
    nationality: "",
    profession: "",
    residence_card_no: "",
    residence_card_status: "",
    residence_card_front: "",
    residence_card_back: "",
    smartpit_no: "",
    VBankeuto_ID: "",
    Bankeuto_ID: "",
    referer: "",
    company: "",
    emergency_contact_number: "",
    emergency_contact_name: "",
    remark: "",
  });

  const schema = Yup.object().shape({
    first_name: Yup.string().required("name is required"),
    email: Yup.string().required("email is required"),
    customer_type: Yup.string().required("customer type is required"),
  });
  const mBar = useRecoilValue(miniBar);
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: async (values) => {
      let formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
        console.log(key, value);
        formData.append(key, value);
      }
      let data = await instanceOfAxios
        .post(
          "https://nitvcrmapi.truestreamz.com/api/v1/customer/register",
          formData
        )
        .then((data) => {
          setShowPopup(data.status);
          console.log(data);
          data.status === 200
            ? setShowPopup({
                status: true,
                message: "Success, Thankyou",
                messageDetails: "user created sucessfully",
                statusCode: 200,
              })
            : setShowPopup({
                status: true,
                message: "Failed, Sorry",
                messageDetails: "couldn't create user",
                statusCode: 400,
              });
          if (data.status === 200) {
            router.push("/dash/customer");
          } else {
            router.push("/auth/cus_register");
          }
        });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  const changeTab = (tab_name) => {
    setTab(tab_name);
  };

  return (
    <div className={` ${mBar ? "pl-72" : "pl-32"} py-24 pr-10`}>
      <label className="pl-6 text-2xl font-bold text-gray-600 uppercase">
        Customer Signup
      </label>
      <form
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="w-full rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email <span className="text-red-400">*</span>
            </label>
            <input
              className=" w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-1 focus:outline-none focus:bg-white focus:border-blue-500"
              type="email"
              name="email"
              placeholder="something@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="text-red-500 px-1">Email is required *</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="Sandip"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <span className="text-red-500 px-1">Name is required *</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2 mt-1"
              htmlFor="grid-first-name"
            >
              customer type <span className="text-red-400">*</span>
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              type="number"
              placeholder="either o or 1"
              name="customer_type"
              value={formik.values.customer_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.customer_type && formik.errors.customer_type ? (
              <span className="text-red-500 px-1">
                Customer type is required *
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Phone
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder="9800000000"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Mobile
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-first-name"
              type="text"
              placeholder="9800000000"
              name="mobile"
              value={formik.values.mobile}
              onChange={(newVal) => {
                formik.setFieldValue("mobile", newVal.target.value);
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
              Company
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-first-name"
              type="text"
              placeholder="Ncell"
              name="company"
              value={formik.values.company}
              onChange={(newVal) => {
                formik.setFieldValue("company", newVal.target.value);
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
              Registration Date
            </label>

            <DatePicker
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              id="grid-first-name"
              type="text"
              placeholder=""
              name="date"
              onChange={(date) => {
                formik.setFieldValue("date", date);
                setDate(date);
              }}
              selected={date}
              //onChange={(date) => setDate(date)}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>

        <div className="flex flex-row text-gray-700 text-lg ">
          <div
            onClick={() => changeTab("profile")}
            className={` ${
              tab === "profile" ? "bg-[#309FED] text-white" : ""
            } inline-block px-2 py-1 rounded `}
          >
            Profile
          </div>
          <div
            onClick={() => changeTab("other")}
            className={` ${
              tab === "other" ? "bg-[#309FED] text-white" : ""
            } inline-block px-2 py-1 rounded `}
          >
            {" "}
            Other
          </div>
          <div
            onClick={() => changeTab("document")}
            className={` ${
              tab === "document" ? "bg-[#309FED] text-white" : ""
            } inline-block px-2 py-1 rounded `}
          >
            {" "}
            document
          </div>
          <div
            onClick={() => changeTab("payment")}
            className={` ${
              tab === "payment" ? "bg-[#309FED] text-white" : ""
            } inline-block px-2 py-1 rounded `}
          >
            {" "}
            payment
          </div>
        </div>
        <hr className="border-b border-slate-500" />

        {tab === "profile" && <Profile formik={formik} />}
        {tab === "other" && <Other formik={formik} />}
        {tab === "document" && <Document formik={formik} />}
        {tab === "payment" && <Payment formik={formik} />}

        <p className="py-5 flex items-center justify-between">
          <button
            className="w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Cregister;
