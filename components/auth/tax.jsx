import { useFormik } from "formik";
import { instanceOfAxios } from "../others/localstorage";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { businessNameState } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";

function AddTax() {
  const [initialValue] = useState({
    name: "",
    rate: "",
    description: "",
  });
  const router = useRouter();
  const minBar = useRecoilValue(businessNameState);

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    rate: Yup.number().required("Rate is required"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: async (values) => {
      await instanceOfAxios.post("tax", values).then((response) => {
        if (response.status === 201) {
          router.push("/dash/tax");
        }
      });
    },
  });
  return (
    <div>
      <div className={` ${minBar ? "pl-72" : "pl-32"} py-8 pr-10`}>
        <div className="bg-white mt-10 ">
          <div className="flex gap-x-4 p-6 border-b border-[#ECECEC]">
            <div className="pl-8">
              <Link href="/dash/tax">
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
              <h1 className="text-3xl font-semibold"> Add Tax </h1>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="pl-14">
            <div className="flex">
              <div className="flex flex-col py-8 ">
                <label className=" ">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-[485px] text-gray-700 border border-slate-300 rounded py-3 px-4 mb-2 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={(newVal) => {
                    formik.setFieldValue("name", newVal.target.value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <span className="text-red-500 ">Name is required</span>
                ) : (
                  <span>&nbsp;&nbsp;</span>
                )}
              </div>

              <div className="flex flex-col py-8 px-5">
                <label className="  ">
                  Rate <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-[485px] text-gray-700 border border-slate-300 rounded py-3 px-4 mb-2 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                  type="number"
                  placeholder=""
                  name="rate"
                  value={formik.values.rate}
                  onChange={(newVal) => {
                    formik.setFieldValue("rate", newVal.target.value);
                  }}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rate && formik.errors.rate ? (
                  <span className="text-red-500 ">Rate is required</span>
                ) : (
                  <span>&nbsp;&nbsp;</span>
                )}
              </div>
            </div>
            <div className="flex flex-col -my-7">
              <label>Description</label>
              <textarea
                type="text"
                className="w-[485px] h-[150px] text-gray-700 border border-slate-300 rounded py-3 px-4 mb-2 mt-2 h-[38px] focus:outline-none focus:bg-white focus:border-blue-500"
                value={formik.values.description}
                onChange={(e) => {
                  formik.setFieldValue("description", e.target.value);
                }}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-blue-400 text-xl text-white px-10 py-3 rounded"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTax;
