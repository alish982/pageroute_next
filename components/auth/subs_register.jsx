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
  const [product_id, setProductId] = useState("1");
  const [planID, setPlanID] = useState("");
  const [productPlan, setProductPlan] = useState("0");
  const [raiseInvoice, setRaiseInvoice] = useState("");

  const [optionCus, setOptionCus] = useState([]);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    billing_cycle: "",
    customer_id: "",
    customer_name: "",
    invoice_creation_day: "",
    plan_id: "",
    plan_number: "",
    proudct_id: "",
    product_name: "",
    start_date: "",
    subscriber_name: "",
    subscriber_relation: "",
    plan: {
      id: "",
      quantity: "",
      price: "",
      product_id: "",
      interval_unit: "",
      name: "",
      setup_fee: "",
    },
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      const data = await instanceOfAxios
        .post(
          "subscription", 
           {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'content-type': 'application/json',
          },
        }
          
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
        res.data.data.items.map((row) => {
          row.label = row.name;
          row.value = row.id;
          return row;
        })
      );
    });

  const product_planFunc = async () =>
    await instanceOfAxios.get("product/" + product_id).then((res) => {
      setProductPlan(
        res.data.data.plans.map((row) => {
          row.label = row.name;
          row.value = row.id;
          return row;
        })
      );
    });

  useEffect(() => {
    customer_func();
    relation_func();
    product_func();
    product_planFunc();

    // product_plan();
  }, [product_id]);

  return (
    <div className=" pl-72 py-8 pr-10">
      <div className="bg-white dark:bg-gray-500 mt-10 ">
        <div className="flex gap-x-4 p-6 border-b border-[#ECECEC]">
          <div className="pl-8">
            <Link href="/dash/subscription">
              <button className="h-[35px] w-[35px] rounded-md border border-slate-300 hover:border-[#309fed] text-black hover:text-[#309fed] p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="self-center">
            <h1 className="text-3xl font-semibold"> Create Subscription </h1>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="w-full rounded px-8 ">
          <div className="w-4/7 p-6">
            <div className="py-8 grid grid-flow-row xl:grid-cols-2 gap-x-8 gap-y-4 border-b border-[#e5e5e5]">
              <div className="flex flex-col gap-y-2 form-group ">
                <label className=" ">Select Customer *</label>

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
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className="  " htmlFor="grid-first-name">
                  Subscriber Name
                </label>
                <input
                  className="w-full text-gray-700 border border-slate-300 rounded py-3 px-4 mb-3 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
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
              <div className=" md:w-1/2 md:mb-0">
                <label className=" text-gray-700" htmlFor="grid-first-name">
                  Subscriber Relation*
                </label>
                <Select
                  className="w-[484px] appearance-none block w-full text-gray-700 rounded mb-3 mt-2 focus:outline-none focus:bg-white"
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
            </div>
            <div className="mt-5">
              <label className="text-[16px] font-bold ">Product</label>
              <div className="w-full md:w-1/2 mt-5 mb-6 md:mb-0">
                <label className=" " htmlFor="grid-first-name">
                  Select Product *
                </label>
                <Select
                  className=" w-[484px] text-gray-700 rounded mb-10 mt-2 focus:outline-none focus:bg-white"
                  type="text"
                  options={product}
                  name="product_name"
                  value={{
                    label: formik.values.product_name,
                    value: formik.values.product_name,
                  }}
                  onChange={(newValue) => {
                    setProductId(newValue.value);
                    product_planFunc();
                    formik.setFieldValue("product_name", newValue.label);
                    setPlanID(newValue.active_plan_count);
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div>
              {planID >= 1 ? (
                <div className="flex mb-3">
                  <div className="w-full md:w-1/2 md:mb-0">
                    <label className=" " htmlFor="grid-first-name">
                      Select Plan *
                    </label>

                    <Select
                      className="appearance-none block w-full text-gray-700 rounded py-3 mb-3 -mt-1 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      options={productPlan}
                      placeholder="plan Name"
                      name=""
                      value={{
                        label: formik.values.product_planname,
                        value: formik.values.product_planname,
                      }}
                      onChange={(newValue) => {
                        console.log(newValue, "newvaldd");
                        formik.setFieldValue("product_planname", newValue.name);
                        formik.setFieldValue("product_price", newValue.price);
                        formik.setFieldValue("product_ammount", newValue.price);
                        formik.setFieldValue(
                          "plan_type",
                          newValue.interval_unit
                        );
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="w-full md:w-1/2 pl-4 pr-1 mb-6 md:mb-0">
                    <label className=" mb-2" htmlFor="grid-first-name">
                      price
                    </label>
                    <input
                      className=" border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="number"
                      placeholder=""
                      name="product_price"
                      value={formik.values.product_price}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="   mb-2">Quantity</label>
                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Ncell"
                      name="product_quantity"
                      value="1"
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-1 mb-6 md:mb-0">
                    <label className="   mb-2" htmlFor="grid-first-name">
                      Amount
                    </label>
                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="varcar"
                      placeholder="Ncell"
                      name="product_ammount"
                      value={[
                        formik.values.product_ammount,
                        formik.values.plan_type,
                      ]}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <hr className="border-l border-slate-200 mb-5" />
            <div>
              <label className="text-[16px] font-bold ">
                Subscription Details
              </label>
              <div className="mt-5">
                <div className="flex">
                  <div className="w-full md:w-1/2 md:mb-0">
                    <label className=" mb-2" htmlFor="grid-first-name">
                      Plan Number *
                    </label>

                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter plan number"
                      name="plan_number"
                      onChange={(val) => {
                        formik.setFieldValue("plan_number", val);
                      }}
                    />
                  </div>

                  <div className=" flex flex-col w-full md:w-1/2 pl-5 mb-6 md:mb-0">
                    <label className=" mb-2" htmlFor="grid-first-name">
                      Start Date *
                    </label>

                    <DatePicker
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="varchar"
                      placeholder=""
                      name="start_data"
                      onChange={(date) => {
                        formik.setFieldValue("start_date", date);
                        setDate(date);
                      }}
                      selected={date}
                      //onChange={(date) => setDate(date)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <label className=" mb-2" htmlFor="grid-first-name">
                    Billing Cycle *
                  </label>

                  <input
                    className="border border-slate-300 ppearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder=""
                    name="billing_cycle"
                    onChange={(value) => {
                      formik.setFieldValue("billing_cycle", value);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 pl-5 mb-6 md:mb-0">
                  <label className="   mb-2" htmlFor="grid-first-name">
                    Invoice Billing Day *
                  </label>

                  <input
                    className=" border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3  mt-2 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder=""
                    name="interval"
                    onChange={(value) => {
                      formik.setFieldValue("interval", value);
                    }}
                  />
                </div>
              </div>
            </div>
            <hr className="border-l border-slate-200 mt-5" />
            <div className="mb-10 mt-5">
              <label className="text-[16px] font-bold ">Coupon</label>
              <Select placeholder="select coupon" className="w-[496px] mt-3" />
              <br></br>
              <label className="text-[16px] ">
                when do you want the coupon to be applied ?
              </label>
              <br />
              <div className="mt-3 flex">
                <input type="radio" name="date" /> &nbsp;Starting date &nbsp;
                &nbsp;
                <input type="radio" name="date" /> &nbsp;Next billing date{" "}
                <br></br>
              </div>
            </div>
            <hr className="border-l border-slate-200" />
            <div>
              <div className="mt-5 -mb-2">
                <label className="text-[16px] font-bold ">
                  Invoice details
                </label>
              </div>
              <br></br>
              <label className="text-[16px]">
                Do you want to skip invoice until incoming billing date ?
              </label>{" "}
              <br />
              <div className="mt-2 mb-5 flex">
                <input
                  type="radio"
                  name="skip"
                  value="0"
                  onClick={() => setRaiseInvoice("yes")}
                />{" "}
                &nbsp;yes &nbsp;&nbsp;
                <input
                  type="radio"
                  name="skip"
                  value="1"
                  defaultChecked
                  onClick={() => setRaiseInvoice("no")}
                />{" "}
                &nbsp;No <br></br>
              </div>
              {raiseInvoice !== "yes" ? (
                <div>
                  <label className="text-[16px]">
                    {" "}
                    When do you want to raise the invoice ?{" "}
                  </label>
                  <br />
                  <div className="mt-2 flex">
                    <input type="radio" name="no" id="yes" value="1" /> &nbsp;
                    <label for="yes">Invoice Now &nbsp;&nbsp;</label>
                    <input type="radio" name="no" id="no" value="2" />
                    &nbsp;{" "}
                    <label for="no">
                      Add to unbilled charges and invoice later{" "}
                    </label>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <br></br>
            </div>

            <div className="py-5 flex items-center justify-between">
              <button
                className="w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubRegister;
