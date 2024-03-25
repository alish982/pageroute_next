"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { instanceOfAxios } from "../../../others/localstorage";
import { useFormik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import Success from "../../../others/popup";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Page({ id }) {
  
  const [initialValue, setInitialValue] = useState({
    user_type: "",
    email: "",
    name: "",
    company: "",
  });

  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const test_it = async () => {
    const response = await instanceOfAxios.get(
      `user/${id}/detail`
      // {
      //     method: "GET",
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`,
      //   }}
    );
    console.log(response.data.data);
    setInitialValue(response.data.data);
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      console.log(values);
      await instanceOfAxios
        .put(
          `user/${id}`,
          values
          // {
          //   headers : {
          //   'Authorization': `Bearer ${access_token}`,
          //   }
          // }
        )
        .then((data) => {
          setShowPopup(data.status);
          console.log(data);
          data.status === 200
            ? setShowPopup({
                status: true,
                message: "Success, Thankyou",
                messageDetails: "user updated sucessfully",
                statusCode: 200,
              })
            : setShowPopup({
                status: true,
                message: "Failed, Sorry",
                messageDetails: "couldn't update user",
                statusCode: 400,
              });
          if (data.status === 200) {
            router.push("/user");
          } else {
            router.push("");
          }
        });
      console.log(values);
      console.log("values");
    },
  });

  useEffect(() => {
    test_it();
  }, []);

  return (
    //       <>
    //        <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
    //         <label htmlFor = "register " className = 'form-label font-bold '>Update User</label>
    //            <div>
    //              </div>
    //                 <form className="w-50 " onSubmit={formik.handleSubmit}>
    //                     <select name="user_type"
    //                             className="mb-3 form-control"
    //                             value = {initialValue.user_type}
    //                             //onChange = {formik.handleChange}
    //                             onChange={(newVal) => {
    //                             console.log(newVal.target.value)
    //                             formik.setFieldValue('user_type',newVal.target.value)
    //                             setInitialValue((currVal) => {
    //                             currVal.user_type = newVal.target.value
    //                               return currVal
    //                              })
    //                              console.log(newVal.target.value);
    //                             }}
    //                             >
    //           <option>--select you role--</option>
    //            <option value = "Admin">admin</option>
    //           <option value = "Subadmin">sub admin</option>
    //         </select>
    //         <div className="mb-3">
    //           <label htmlFor="name" className="form-label">
    //             Name
    //           </label>
    //           <input
    //             type="text"
    //             name="name"
    //             className="form-control"
    //             placeholder=""
    //             value={initialValue.name}
    //             onChange={(newVal) => {
    //               console.log(newVal.target.value)
    //               formik.setFieldValue("name", newVal.target.value)
    //               setInitialValue((currVal) => {
    //                 currVal.name = newVal.target.value
    //                 return currVal
    //               })
    //               console.log(newVal.target.value);
    //             }}
    //             onBlur={formik.handleBlur}
    //           />
    //           {formik.errors.name && (
    //             <div className="text-danger">{formik.errors.name}</div>
    //           )}
    //         </div>

    //         <div className="mb-3">
    //           <label htmlFor="email" className="form-label">
    //             Email
    //           </label>

    //           <input
    //             type="email"
    //             name="email"
    //             className="form-control"
    //             placeholder=""
    //             value={initialValue.email}
    //             onChange={(newVal) => {
    //               console.log(newVal.target.value)
    //               formik.setFieldValue('email',newVal.target.value)
    //               setInitialValue((currVal) => {
    //                 currVal.email = newVal.target.value
    //                 return currVal

    //               })
    //             }}
    //             onBlur={formik.handleBlur}
    //           />

    // <label htmlFor="email" className="form-label">
    //             Company
    //           </label>

    //           <input
    //             type="text"
    //             name="company"
    //             className="form-control"
    //             placeholder=""
    //             value={initialValue.company}
    //             //onChange={formik.handleChange}
    //             onChange={(newVal) => {
    //               console.log(newVal.target.value)
    //               formik.setFieldValue('company',newVal.target.value)
    //               setInitialValue((currVal) => {
    //                 currVal.company = newVal.target.value
    //                 return currVal

    //               })

    //               //console.log(newVal.target.value);
    //             }}
    //             onBlur={formik.handleBlur}
    //           />
    //           {formik.errors.email && (
    //             <div className="text-danger">{formik.errors.email}</div>
    //           )}
    //         </div>

    //         <button type="submit" className="btn btn-primary">
    //         Update
    //         </button><br></br>
    //       </form>
    //       {showPopup.status && <Success showPopup = {showPopup} setShowPopup={setShowPopup}/>}
    //     </div>
    //       </>

    <div className="bg-slate-100 px-60 py-12">
      <label className="text-4xl font-bold text-gray-600 uppercase">
        User Update
      </label>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              name="name"
              value={initialValue.name}
              onChange={(newVal) => {
                console.log(newVal.target.value);
                formik.setFieldValue("name", newVal.target.value);
                setInitialValue((currVal) => {
                  currVal.name = newVal.target.value;
                  return currVal;
                });
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="email"
              value={initialValue.email}
              onChange={(newVal) => {
                console.log(newVal.target.value);
                formik.setFieldValue("email", newVal.target.value);
                setInitialValue((currVal) => {
                  currVal.email = newVal.target.value;
                  return currVal;
                });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-company"
              name="company"
            >
              Company
            </label>
            <input
              name="company"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              value={initialValue.company}
              onChange={(newVal) => {
                console.log(newVal.target.value);
                formik.setFieldValue("company", newVal.target.value);
                setInitialValue((currVal) => {
                  currVal.company = newVal.target.value;
                  return currVal;
                });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              for="grid-city"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="address"
              value={initialValue.address}
              onChange={(newVal) => {
                console.log(newVal.target.value);
                formik.setFieldValue("address", newVal.target.value);
                setInitialValue((currVal) => {
                  currVal.address = newVal.target.value;
                  return currVal;
                });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-state"
            >
              Role
            </label>
            <div className="relative">
              <select
                name="user_type"
                className="px-5 py-3 bg-gray-200 text-gray-700 text-lg rounded"
                onChange={formik.handleChange}
              >
                <option>--select you role--</option>
                <option value="Admin" className="text-gray-700">
                  admin
                </option>
                <option value="Subadmin" className="text-gray-700">
                  sub admin
                </option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-zip"
            >
              Phone
            </label>
            <input
              name="phone"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="number"
              value={initialValue.phone}
              onChange={(newVal) => {
                console.log(newVal.target.value);
                formik.setFieldValue("phone", newVal.target.value);
                setInitialValue((currVal) => {
                  currVal.phone = newVal.target.value;
                  return currVal;
                });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="py-5 flex items-center justify-between">
          <Link href="/user">
            <button
              className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mb-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Back
            </button>
          </Link>
          <button
            className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mb-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
      {showPopup.status && (
        <Success showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </div>
  );
}

export default Page;
