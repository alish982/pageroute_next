"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { instanceOfAxios } from "../others/localstorage";

//import Select from 'react-select'

const SubRegister = () => {
  const [date, setDate] = useState(new Date());
  const [relation, setRelation] = useState([]);
  const [product, setProduct] = useState([]);
  const [product_id, setProductId] = useState("");
  const [productplanID, setProductPlanID] = useState([])

  const [optionCus, setOptionCus] = useState([]);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    subscriber_name: "",
    subscriber_relation: "",
    customer_name: "",
    product_name: "",
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      let formData = new FormData();

      for (const [key, value] of Object.entries(values)) {
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

  const customer_func = async () =>
    await instanceOfAxios.get("customer").then((response) => {
      setOptionCus(
        response.data.data.items.map((row) => {
          let newRow = {};
          newRow.value = row.first_name + " " + row.last_name;
          newRow.label = row.first_name + " " + row.last_name;
          return newRow;
        })
      );
    });

  const relation_func = async () =>
    await instanceOfAxios.get(`subscription/relationships`).then((res) => {
      setRelation(
        res.data.data.map((value) => {
          let newRow = {};

          newRow.label = value.label;
          newRow.value = value.value;

          return newRow;
        })
      );
    });

  const product_func = async () =>
    await instanceOfAxios.get(`product`).then((res) => {
      setProduct(
        res.data.data.items.map((value) => {
          let newRow = {};
          setProductId(value.id);
          newRow.label = value.name;
          newRow.value = value.name;
          newRow.id = value.id;
          return newRow;
        })
      );
    });

  // const product_plan = async () =>
  //   await instanceOfAxios.get("product/" + product_id).then((res) => {
  //     console.log(res, "product_plan");
  //   });

  useEffect(() => {
    customer_func();
    relation_func();
    product_func();
    // product_plan();
  }, []);

  return (
    <div className=" pl-72 py-24 pr-10">
      <label className="pl-6 text-2xl font-bold text-gray-600 uppercase">
        Create Subscription
      </label>
      <hr className="border border-slate-200 mt-1 " />
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
              Select Customer *
            </label>

            <Select
              className="appearance-none block w-full text-gray-700 rounded focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              name="customer_name"
              options={optionCus}
              value={{
                value: formik.values.customer_name,
                label: formik.values.customer_name,
              }}
              onChange={(newVal) => {
                formik.setFieldValue("customer_name", newVal.value);
                formik.setFieldValue("subscriber_name", newVal.value);
                formik.setFieldValue("subscriber_relation", "self");
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Subscriber Name
            </label>
            <input
              className="w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 focus:outline-none focus:bg-white focus:border-blue-500"
              type="text"
              placeholder=""
              name="subscriber_name"
              value={formik.values.subscriber_name}
              onChange={(newVal) => {
                formik.setFieldValue("subscriber_name", newVal.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Subscriber Relation*
            </label>
            <Select
              className="appearance-none block w-full text-gray-700 rounded mb-3 focus:outline-none focus:bg-white"
              type="number"
              options={relation}
              placeholder=""
              name="subscriber_relation"
              value={{
                value: formik.values.subscriber_relation,
                label: formik.values.subscriber_relation,
              }}
              onChange={(newVal) => {
                formik.setFieldValue("subscriber_relation", newVal.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <label className="text-white">hello</label>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Select Product *
            </label>
            <Select
              className=" w-full text-gray-700 rounded mb-10 focus:outline-none focus:bg-white"
              type="text"
              options={product}
              name="product_name"
              value={{
                value: formik.values.product_name,
                label: formik.values.product_name,
              }}
              onChange={(newValue) => {
                formik.setFieldValue("product_name", newValue.value);
                instanceOfAxios.get("product/" + product_id).then((res) => {
                  setProductPlanID(res.data.data.plans);
                });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <hr />
  {productplanID.length > 0 ? <div></div> : <div></div>}
          <div className="flex mb-10">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Select Plan *
              </label>

              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="plan Name"
                name="mobile"
                value={formik.values.mobile}
                onChange={(newVal) => {
                  formik.setFieldValue("mobile", newVal.target.value);
                }}
                onBlur={formik.handleBlur}
              />
            </div>

            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                htmlFor="grid-first-name"
              >
                price
              </label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Ncell"
                name="company"
                value={formik.values.company}
                onChange={(newVal) => {
                  formik.setFieldValue("company", newVal.target.value);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Quantity
              </label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Ncell"
                name="company"
                value={formik.values.company}
                onChange={(newVal) => {
                  formik.setFieldValue("company", newVal.target.value);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Amount
              </label>
              <input
                className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="number"
                placeholder="Ncell"
                name="company"
                value={formik.values.company}
                onChange={(newVal) => {
                  formik.setFieldValue("company", newVal.target.value);
                }}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Registration Date
            </label>

            <DatePicker
              className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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

        <p className="py-5 flex items-center justify-between">
          <button
            className="w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Continue
          </button>
        </p>
      </form>
    </div>
  );
};

export default SubRegister;
