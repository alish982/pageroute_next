"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Profile from "./compo_register/profile";
import Other from "./compo_register/other";
import Document from "./compo_register/document";
import Payment from "./compo_register/payment";
import Success from "../others/popup";
import { instanceOfAxios } from "../others/localstorage";

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

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      console.log("values start");
      console.log(values);
      console.log("values end");
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
    <div className="bg-slate-100 pl-72 py-24 pr-10">
      <label className="pl-6 text-2xl font-bold text-gray-600 uppercase">
        Customer Signup
      </label>
      <form
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
        className="w-full bg-gray-100 rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="email"
              name="email"
              placeholder="something@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Sandip"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              customer type
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="either o or 1"
              name="customer_type"
              value={formik.values.customer_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Phone
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            className="inline-block px-2 py-1 rounded active:bg-red-400"
          >
            Profile
          </div>
          <div
            onClick={() => changeTab("other")}
            className="px-4 inline-block px-2 py-1 rounded active:bg-red-400"
          >
            {" "}
            Other
          </div>
          <div
            onClick={() => changeTab("document")}
            className="px-4 inline-block px-2 py-1 rounded active:bg-red-400"
          >
            {" "}
            document
          </div>
          <div
            onClick={() => changeTab("payment")}
            className="px-4 inline-block px-2 py-1 rounded active:bg-red-400"
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
            className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline"
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
