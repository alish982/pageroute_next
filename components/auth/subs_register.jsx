import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik, validateYupSchema } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { instanceOfAxios } from "../others/localstorage";
import { miniBar } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";
import * as Yup from "yup";

const SubRegister = () => {
  const [date, setDate] = useState(new Date());
  const [relation, setRelation] = useState([]);
  const [product, setProduct] = useState([]);
  const [product_id, setProductId] = useState("1");
  const [planID, setPlanID] = useState("");
  const [productPlan, setProductPlan] = useState("0");
  const [raiseInvoice, setRaiseInvoice] = useState("");
  const [response, setResponse] = useState({});
  const [values, setValues] = useState({});

  const [optionCus, setOptionCus] = useState([]);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    subscriber_name: "",
    plan_number: "",
    status: "live",
    subscriber_relation: "",
    product_id: "",
    auto_collect: false,
    is_recurring: true,
    customer_id: "",
    invoice_creation_day: "1",
    billing_cycle: "",
    skip_initial_invoice: "true",
    invoice_now: "true",
    has_setup_fee: "true",
    apply_discount_for_past: "true",
    plan: {
      id: "",
      quantity: "1",
      description: "",
      unit_price: "",
      tax_id: "",
      setup_fee: "",
    },
    addon: {},
    addons: [],
    coupons: [],
  });

  const mBar = useRecoilValue(miniBar);
  const schema = Yup.object().shape({
    customer_id: Yup.number().required("customer is required"),
    subscriber_name: Yup.string().required("name is required"),
    subscriber_relation: Yup.string().required("relation is required"),
    plan_number: Yup.string().required("plan number is required"),
    interval: Yup.number().required("interval is required"),
    billing_cycle: Yup.number().required("billing_cycle is required"),
  });

  //formatting date in year-month-day
  const dd = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const formattedDate = `${year}-${month}-${day}`;

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: async (values) => {
      console.log("hello people");
      setValues(values);
      await instanceOfAxios
        .post("subscription/calculate", values)
        .then((data) => {
          setResponse(data.data.data);
          setShowPopup(data.status);

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
          // if (data.status === 200) {
          //   router.push({
          //     pathname: "/auth/sec_subs_redi",
          //     query: { responseData: JSON.stringify(response) },
          //   });
          // } else {
          //   router.push("/auth/cus_register");
          // }
        });
    },
  });

  const customer_func = async () =>
    await instanceOfAxios.get("customer").then((response) => {
      setOptionCus(
        response.data.data.items.map((row) => {
          let newRow = {};
          newRow.value = row.id;
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
    if (response && Object.keys(response).length > 0) {
      router.push({
        pathname: "/auth/sec_subs_redi",
        query: { responseData: JSON.stringify({ response, values }) },
      });
    }
  }, [response]);

  useEffect(() => {
    customer_func();
    relation_func();
    product_func();
    product_planFunc();

    // product_plan();
  }, [product_id]);

  return (
    <div className={` ${mBar ? "pl-72" : "pl-32"} py-8 pr-10`}>
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
                <label className=" ">
                  Select Customer <span className="text-red-500">*</span>
                </label>

                <Select
                  className="appearance-none block w-full text-gray-700 rounded focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  name="customer_id"
                  options={optionCus}
                  value={{
                    label: formik.values.subscriber_name,
                    value: formik.values.customer_id,
                  }}
                  onChange={(newVal) => {
                    formik.setFieldValue("status");
                    formik.setFieldValue("customer_id", newVal.value);
                    formik.setFieldValue("subscriber_name", newVal.label);
                    formik.setFieldValue("subscriber_relation", "self");
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.customer_id && formik.errors.customer_id ? (
                  <span className="text-red-500">Required *</span>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <label className=" ">
                  Subscriber Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full text-gray-700 border border-slate-300 rounded py-3 px-4 mb-2 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  placeholder=""
                  name="subscriber_name"
                  value={formik.values.subscriber_name}
                  onChange={(newVal) => {
                    formik.setFieldValue(
                      "subscriber_name",
                      newVal.target.value
                    );
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.subscriber_name &&
                formik.errors.subscriber_name ? (
                  <span className="text-red-500">Required *</span>
                ) : (
                  ""
                )}
              </div>

              <div className=" md:w-1/2 md:mb-0">
                <label className=" text-gray-700">
                  Subscriber Relation <span className="text-red-500">*</span>
                </label>
                <Select
                  className="w-[484px] appearance-none block w-full text-gray-700 rounded mb-3 mt-2 focus:outline-none focus:bg-white"
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
                {formik.touched.subscriber_relation &&
                formik.errors.subscriber_relation ? (
                  <span className="text-red-500">Required *</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="mt-5">
              <label className="text-[16px] font-bold ">Product</label>
              <div className="w-full md:w-1/2 mt-5 mb-6 md:mb-0">
                <label className=" ">
                  Select Product <span className="text-red-500">*</span>
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
                    formik.setFieldValue("product_id", newValue.id);
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
                    <label className="">
                      Select Plan <span className="text-red-500">*</span>
                    </label>

                    <Select
                      className="appearance-none block w-full text-gray-700 rounded py-3 mb-3 -mt-1 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      options={productPlan}
                      placeholder="plan Name"
                      name=""
                      value={{
                        label: formik.values.plan.name,
                        value: formik.values.plan.name,
                      }}
                      onChange={(newValue) => {
                        formik.setFieldValue("plan.name", newValue.name);
                        formik.setFieldValue(
                          "plan.description",
                          newValue.description
                        );
                        formik.setFieldValue("plan.id", newValue.id);
                        formik.setFieldValue("plan.unit_price", newValue.price);
                        formik.setFieldValue("interval", newValue.interval);
                        formik.setFieldValue("plan.tax_id", newValue.tax_id);

                        formik.setFieldValue(
                          "billing_cycle",
                          newValue.billing_cycle
                        );
                        formik.setFieldValue(
                          "plan.product_id",
                          newValue.product_id
                        );
                        formik.setFieldValue(
                          "plan.setup_fee",
                          newValue.setup_fee
                        );
                        formik.setFieldValue(
                          "plan.interval_unit",
                          newValue.interval_unit
                        );
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="w-full md:w-1/2 pl-4 pr-1 mb-6 md:mb-0">
                    <label className=" mb-2">price</label>
                    <input
                      className=" border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="number"
                      placeholder=""
                      name="product_price"
                      value={formik.values.plan.price}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="mb-2">Quantity</label>
                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      type="text"
                      placeholder="Ncell"
                      name="product_quantity"
                      value="1"
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full md:w-1/2 pl-1 mb-6 md:mb-0">
                    <label className=" mb-2">Amount</label>
                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                      type="varcar"
                      placeholder="Ncell"
                      name="product_ammount"
                      value={[formik.values.product_ammount]}
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
                    <label className=" mb-2">
                      Plan Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-1 mt-2 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="text"
                      placeholder="Enter plan number"
                      name="plan_number"
                      onChange={(val) => {
                        formik.setFieldValue("plan_number", val.target.value);
                      }}
                    />
                    {formik.touched.plan_number && formik.errors.plan_number ? (
                      <span className="text-red-500">Required * </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className=" flex flex-col w-full md:w-1/2 pl-5 mb-6 md:mb-0">
                    <label className=" mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>

                    <DatePicker
                      className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-first-name"
                      type="varchar"
                      placeholder=""
                      name="start_date"
                      onChange={(date) => {
                        formik.setFieldValue("start_date", formattedDate);
                        setDate(date);
                      }}
                      selected={date}
                      //onChange={(date) => setDate(date)}
                    />
                    {formik.touched.start_date && formik.errors.start_date ? (
                      <span className="text-red-500">Required *</span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                  <label className=" mb-2">
                    Billing Cycle <span className="text-red-500">*</span>
                  </label>

                  <input
                    className="border border-slate-300 ppearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder=""
                    name="billing_cycle"
                    onChange={(val) => {
                      formik.setFieldValue("billing_cycle", val.target.value);
                    }}
                  />
                  {formik.touched.billing_cycle &&
                  formik.errors.billing_cycle ? (
                    <span className="text-red-500">Required *</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="w-full md:w-1/2 pl-5 mb-6 md:mb-0">
                  <label className=" mb-2">
                    Invoice Billing Day <span className="text-red-500">*</span>
                  </label>

                  <input
                    className=" border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 mt-2 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder=""
                    name="interval"
                    onChange={(val) => {
                      formik.setFieldValue("interval", val.target.value);
                    }}
                  />
                  {formik.touched.interval && formik.errors.billing_cycle ? (
                    <span className="text-red-500">Required *</span>
                  ) : (
                    ""
                  )}
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
                  onClick={() => {
                    setRaiseInvoice("yes"),
                      formik.setFieldValue("skip_initial_invoice", true);
                  }}
                />{" "}
                &nbsp;yes &nbsp;&nbsp;
                <input
                  type="radio"
                  name="skip"
                  value="1"
                  defaultChecked
                  onClick={() => {
                    setRaiseInvoice("no"),
                      formik.setFieldValue("skip_intial_value", false);
                  }}
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
                    <input
                      type="radio"
                      name="no"
                      id="yes"
                      value="0"
                      onClick={() => formik.setFieldValue("invoice_now", true)}
                    />{" "}
                    &nbsp;
                    <label>Invoice Now &nbsp;&nbsp;</label>
                    <input
                      type="radio"
                      name="no"
                      id="no"
                      value="1"
                      onClick={() => formik.setFieldValue("invoice_now", false)}
                    />
                    &nbsp;{" "}
                    <label>Add to unbilled charges and invoice later </label>
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
