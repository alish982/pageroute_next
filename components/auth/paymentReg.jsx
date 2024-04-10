"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { instanceOfAxios } from "../others/localstorage";
import Success from "../others/popup";

//import Select from 'react-select'

const PaymentRegi = () => {
  const [date, setDate] = useState(new Date());
  const [optionCus, setOptionCus] = useState([]);
  const [selectedOption, setSelectedOption] = useState(optionCus[0]);
  const [paymentMode, setpaymentMode] = useState([]);
  const [dueChecked, setDueChecked] = useState(false);
  const [dueAmt, setDueAmt] = useState([]);
  const [dataEntered, setDataEntered] = useState(false);
  const [userInvoice, setUserInvoice] = useState([]);
  const [customerID, setCustomerID] = useState([]);
  const [paymentValue, setPaymentValue] = useState(0);
  let [secValue, setSecVal] = useState(0);
  let [secpaid, setsecPaid] = useState(0);
  let [thirdVal, setthirdVal] = useState(0);
  let [finalVal, setfinalVal] = useState(0);
  let [excessVal, setexcessVal] = useState(0);
  let [cusPage, setcusPage] = useState(1);
  let [calcAmount, setcalcAmount] = useState(0);
  let [paidValue, setpaidValue] = useState(0);
  let [smallerValue, setsmallerValue] = useState(0);

  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    // amount_received: "",
    amount: "",
    subscriber_relation: "",
    customer_id: "",
    product_planname: "",
    mode: "",
    product_plan: "",
    product_price: "",
    product_ammount: "",
    plan_type: "",
    paid_at: "",
    reference: "",
    send_mail: "1",
    apply_to_invoice: "",
    send_main: "",
    payAmount: "",
  });

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      let data = await instanceOfAxios.post("payment", values).then((data) => {
        console.log(data.status, "status of response");
        data.status === 201
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
        router.push("/dash/payment");
      });
    },
  });

  const customer_func = async () =>
    await instanceOfAxios
      .get(`customer?per_page=` + 25 + "&page=" + cusPage)
      .then((response) => {
        setOptionCus(
          response.data.data.items.map((row) => {
            row.value = row.first_name + " " + row.last_name;
            row.label = row.first_name + " " + row.last_name;
            return row;
          })
        );
      });

  const payment_mode = async () =>
    await instanceOfAxios.get("payment_mode").then((response) => {
      setpaymentMode(
        response.data.data.map((row) => {
          row.value = row.id;
          row.label = row.mode;
          return row;
        })
      );
    });

  const fetchData = () => {
    if (dataEntered) {
      instanceOfAxios
        .get(
          "/invoice?page=1&per_page=5&customer_id= " +
            customerID +
            "&sort_by=invoice_due_date&filter=unpaid"
        )
        .then((response) => {
          setUserInvoice(
            response.data.data.items.map((row) => {
              row.payment_amount = 0;
              return row;
            })
          );
        });
    }
  };

  // useEffect(() => {
  //   userInvoice.forEach((data, index) => {
  //     if (index === 0) {
  //       if (formik.values.amount_received > data.due_amount) {
  //         let remainAmount = formik.values.amount_received - data.due_amount;
  //         setcalcAmount(remainAmount);
  //         setpaidValue(data.due_amount);
  //       } else if (formik.values.amount_received === data.due_amount) {
  //         let remainAmount = formik.values.amount_received;
  //         console.log(remainAmount, "remain amount");
  //       } else {
  //         setsmallerValue(formik.values.amount_received);
  //       }
  //     }
  //   });
  // }, [formik.values.amount_received, userInvoice, calcAmount]);

  // useEffect(() => {
  //   userInvoice.forEach((data, index) => {
  //     if (index === 1) {
  //       if (calcAmount > data.due_amount) {
  //         setSecVal(data.due_amount);
  //         console.log(secValue, "val of sec");
  //         let remain = calcAmount - data.due_amount;
  //         console.log(remain, "remain of sec");
  //         setthirdVal(remain);
  //       } else if (calcAmount === data.due_amount) {
  //         console.log("here it is boy");
  //       } else {
  //         console.log("none");
  //       }
  //     }
  //   });
  // });

  // useEffect(() => {
  //   userInvoice.forEach((data, index) => {
  //     if (index === 2) {
  //       if (thirdVal > data.due_amount) {
  //         setfinalVal(data.due_amount);

  //         let remain = thirdVal - data.due_amount;
  //         console.log(remain, "remain of sec");
  //         setexcessVal(remain);
  //       } else {
  //         console.log("none");
  //       }
  //     }
  //   });
  // }, [thirdVal]);

  useEffect(() => {
    userInvoice.forEach((data, index) => {
      if (index === 0) {
        if (formik.values.amount_received > data.due_amount) {
          let remainAmount = formik.values.amount_received - data.due_amount;
          setcalcAmount(remainAmount);
          setpaidValue(data.due_amount);
        } else if (formik.values.amount_received === data.due_amount) {
          setcalcAmount(formik.values.amount_received);
          setpaidValue(formik.values.amount_received);
        } else {
          setsmallerValue(formik.values.amount_received);
        }
      }
    });
  }, [formik.values.amount_received, userInvoice]);

  useEffect(() => {
    userInvoice.forEach((data, index) => {
      if (index === 1) {
        if (calcAmount > data.due_amount) {
          setSecVal(data.due_amount);
          let remain = calcAmount - data.due_amount;
          setthirdVal(remain);
        } else if (calcAmount === data.due_amount) {
          setsecPaid(data.due_amount);
        }
      }
    });
  }, [calcAmount, userInvoice, secValue, thirdVal, secpaid]);

  useEffect(() => {
    userInvoice.forEach((data, index) => {
      if (index === 2) {
        if (thirdVal > data.due_amount) {
          setfinalVal(data.due_amount);
          let remain = thirdVal - data.due_amount;
          setexcessVal(remain);
        }
      }
    });
  }, [thirdVal, userInvoice, excessVal]);

  const handleChange = () => {
    userInvoice.forEach((val) => {
      let totalPayment = 0;
      val.payment_amount == ""
        ? val.payment_amount === 0
        : (totalPayment += parseInt(val.payment_amount));
      setPaymentValue(totalPayment);
    });
  };

  const handleoptionChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    customer_func();
    payment_mode();
    fetchData();
  }, [customerID, cusPage]);

  return (
    <div className=" pl-72 py-8 pr-10">
      <div className="bg-white dark:bg-gray-500 mt-10 ">
        <div className="flex gap-x-4 p-6 border-b border-[#ECECEC]">
          <div className="pl-8">
            <Link href="/dash/payment">
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
            <h1 className="text-3xl font-semibold"> Add Payment </h1>
          </div>
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          className="w-full rounded px-8 "
        >
          <div className="w-4/7 p-6">
            <div className="py-8 grid grid-flow-row xl:grid-cols-2 gap-x-8 gap-y-4 border-b border-[#e5e5e5]">
              <div className="flex flex-col gap-y-2 form-group ">
                <label className=" ">Customer Name *</label>

                <Select
                  className="appearance-none block w-full text-gray-700 rounded focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  name="customer_id"
                  options={optionCus}
                  onMenuScrollToTop={() => {
                    cusPage > 1 &&
                      setTimeout(() => {
                        setcusPage(cusPage - 1);
                      }, 300);
                  }}
                  onMenuScrollToBottom={() => {
                    setTimeout(() => {
                      setcusPage(cusPage + 1);
                    }, 300);
                  }}
                  value={{
                    value: formik.values.customer_name,
                    label: formik.values.customer_name,
                  }}
                  onChange={(newVal) => {
                    handleoptionChange();
                    setCustomerID(newVal.id);
                    formik.setFieldValue("customer_name", newVal.label);
                    formik.setFieldValue("customer_id", newVal.id);
                    setDueAmt(newVal.total_due_amount);
                    setDataEntered(true);
                    fetchData();
                  }}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="flex mt-5">
              <div className="w-full md:w-1/2 md:mb-0">
                <label className="  " htmlFor="grid-first-name">
                  Amount Received *
                </label>
                <input
                  className="w-[485px] text-gray-700 border border-slate-300 rounded py-3 px-4 mb-2 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                  type="number"
                  placeholder=""
                  name="amount"
                  value={dueChecked ? dueAmt : formik.values.amount}
                  onChange={(newVal) => {
                    formik.setFieldValue("amount", newVal.target.value);
                    setDueChecked(false);
                  }}
                  onBlur={formik.handleBlur}
                />
                <div className="flex">
                  <input
                    type="checkbox"
                    value="1"
                    className="mr-2"
                    onClick={() => {
                      setDueChecked(!dueChecked);
                      formik.setFieldValue("payAmount", dueAmt);
                    }}
                  />
                  <label className="">Received full amount (¥ {dueAmt})</label>
                </div>
              </div>
              <div className=" flex flex-col md:w-1/2 md:mb-0 px-4">
                <label className=" mb-2" htmlFor="grid-first-name">
                  Payment Date *
                </label>
                <DatePicker
                  className="border border-slate-300 appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="varchar"
                  placeholder=""
                  name="paid_at"
                  onChange={(date) => {
                    formik.setFieldValue("paid_at", date);
                    setDate(date);
                  }}
                  selected={date}
                />
              </div>
            </div>
            <div className=" mt-4 flex">
              <div className="flex w-full md:w-1/2 mt-5 mb-3 md:mb-0">
                <div className="flex flex-col">
                  <label className=" " htmlFor="grid-first-name">
                    Mode of Payment *
                  </label>
                  <Select
                    className=" w-[484px] text-gray-700 rounded mb-10 mt-2 focus:outline-none focus:bg-white"
                    type="text"
                    options={paymentMode}
                    name="mode"
                    value={{
                      label: formik.values.mode,
                      value: formik.values.mode,
                    }}
                    onChange={(newValue) => {
                      formik.setFieldValue("mode", newValue.label);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="px-8 w-full md:w-1/2 md:mb-0">
                  <label className="  " htmlFor="grid-first-name">
                    Reference
                  </label>
                  <input
                    className="w-[485px] text-gray-700 border border-slate-300 rounded py-3 px-4 mb-7 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    placeholder=""
                    name="reference"
                    value={formik.values.reference}
                    onChange={(newVal) => {
                      formik.setFieldValue("reference", newVal.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label className="-mb-4">Description</label>
              <br></br>
              <textarea
                placeholder="here"
                value={formik.values.description}
                className="border border-slate-300 p-4 rounded text-gray-800"
                name="description"
                onChange={(val) => {
                  formik.setFieldValue("description", val.value);
                }}
              />
            </div>
            <div className="mb-10 mt-5">
              <label className="text-[16px] ">
                Apply to invoices immediately ?
              </label>
              <br />
              <div className="mt-3 mb-8 flex">
                <input
                  type="radio"
                  name="apply_to_invoice"
                  onClick={() => {
                    formik.setFieldValue("apply_to_invoice", "0");
                  }}
                />{" "}
                &nbsp;yes &nbsp; &nbsp;
                <input
                  type="radio"
                  name="apply_to_invoice"
                  onClick={() => {
                    formik.setFieldValue("apply_to_invoice", "1");
                  }}
                />{" "}
                &nbsp;No <br></br>
              </div>

              {dataEntered ? (
                <div>
                  <label className="text-[16px] font-bold ">invoices </label>

                  <table className="w-full mt-8 mb-14">
                    <thead>
                      <tr className="bg-slate-100 rounded ">
                        <th className="pl-[20px] text-left py-3 ">Date</th>
                        <th className="pl-[20px] text-left ">Invoice No</th>
                        <th className="pl-[20px] text-left ">Invoice Amount</th>
                        <th className="pl-[20px] text-left ">Due Amount</th>
                        <th className="pl-[20px] text-left ">Payment</th>
                      </tr>
                    </thead>
                    {userInvoice.map((val, index) => (
                      <tbody className="">
                        <tr key={val.id}>
                          <td className="px-6 py-4 border-b border-slate-200">
                            {val.invoice_date}
                          </td>

                          <td className="px-6 py-4  border-b border-slate-200">
                            {val.number}
                          </td>
                          <td className="px-6 py-4  border-b border-slate-200">
                            ¥ {val.due_amount}
                          </td>
                          <td className="px-6 py-4  border-b border-slate-200">
                            ¥ {val.due_amount}
                          </td>
                          <td className="px-6 py-4  border-b border-slate-200">
                            {}

                            <div className="flex flex-col">
                              <input
                                type="varchar"
                                name="amount_received_pay"
                                // value={
                                //   formik.values.amount_received
                                //     ? index === 0
                                //       ? calcAmount === 0
                                //         ? smallerValue
                                //         : paidValue
                                //       : index === 1
                                //       ? thirdVal !== 0
                                //         ? secValue
                                //         : calcAmount
                                //       : index === 2
                                //       ? excessVal > 0
                                //         ? finalVal
                                //         : thirdVal
                                //       : ""
                                //     : ""
                                // }
                                value={
                                  formik.values.payAmount
                                    ? index === 0
                                      ? calcAmount === 0
                                        ? smallerValue
                                        : paidValue
                                      : index === 1
                                      ? thirdVal !== 0
                                        ? secValue
                                        : calcAmount
                                      : index === 2
                                      ? excessVal > 0
                                        ? finalVal
                                        : thirdVal
                                      : ""
                                    : ""
                                }
                                onChange={(e) => {
                                  handleChange(
                                    (val.payment_amount = e.target.value),
                                    formik.setFieldValue(
                                      // `amount_received_${val.id}`,
                                      `amount_received_pay`,
                                      e.target.value
                                    )
                                  );
                                }}
                                className="h-[34px] w-[200px] border border-slate-200 px-2 m-2"
                              />{" "}
                              <label className="px-3 text-blue-600">
                                Pay In Full
                              </label>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <div className="pl-64 ">
                    {" "}
                    <div className="flex pl-96">
                      <div className="text-right">
                        <p className=" font-semibold text-[13px] opacity-[0.7] mb-8">
                          {" "}
                          Sub Total :
                        </p>
                        <p className="opacity-[0.7] mb-2 ">Amount recived:</p>
                        <p className="opacity-[0.7] mb-2">
                          Amount Used for Payment:
                        </p>
                        <p className="opacity-[0.7]">Amount in Excess</p>
                      </div>
                      <div>
                        <div className="text-right px-32">
                          <p className=" font-semibold text-[13px] opacity-[0.7] mb-8">
                            {" "}
                            ¥ {dueAmt}
                          </p>
                          <p className="opacity-[0.7] mb-2">
                            ¥{formik.values.amount_received}
                          </p>

                          <p className="opacity-[0.7] mb-2">
                            ¥ {isNaN(paymentValue) ? 0 : paymentValue}
                          </p>

                          <p> ¥{excessVal ? excessVal : ""}</p>

                          <p className="opacity-[0.7]"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <div className="flex mt-3">
                <input
                  type="checkbox"
                  value="email"
                  id="email"
                  name="send_main"
                />
                &nbsp;
                <label className="">
                  Email a "thank you" note for this payment
                </label>
              </div>
            </div>
            {showPopup.status && (
              <Success showPopup={showPopup} setShowPopup={setShowPopup} />
            )}
            <div className="py-5 flex items-center justify-between">
              <button
                className="w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentRegi;
