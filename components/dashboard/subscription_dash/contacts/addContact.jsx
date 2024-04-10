import { useState, useEffect } from "react";
import { instanceOfAxios } from "@/components/others/localstorage";
import { useFormik } from "formik";

export default function AddContact({ id, setShowAdd }) {
  const [initialValues] = useState({
    last_name: "",
    email: "",
    phone: "",
    first_name: "",
    mobile: "",
    title: "",
  });

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      let data = await instanceOfAxios
        .post(`customer/${id}/contacts`, values)
        .then((response) => {
          if (response.status === 200) {
            setShowAdd(false);
          }
        });
    },
  });

  return (
    <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
      <div className="bg-white border-2 rounded">
        <form onSubmit={formik.handleSubmit}>
          <div className="h-[500px]  py-10 px-8 ">
            <label className="font-bold text-[20px] capitalize">
              Add Contact
            </label>
            <div className="my-7">
              <label className="block text-[14px] font-bold mb-4">Email</label>
              <input
                className="bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline focus:border-blue-300 "
                type="email"
                name="email"
                value={formik.values.email}
                onChange={(newVal) => {
                  formik.setFieldValue("email", newVal.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-7">
                <label className="block text-[14px] font-bold font-bold mb-2">
                  First Name
                </label>
                <input
                  className=" bg-slate-200 w-full h-[40px] py-2 px-3 text-gray-700 leading-tight"
                  type="text"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={(newVal) => {
                    formik.setFieldValue("first_name", newVal.target.value);
                  }}
                />
              </div>
              <div className="mb-7">
                <label className="block text-[14px] font-bold font-bold mb-2">
                  Last Name
                </label>
                <input
                  className=" bg-slate-200 rounded w-full h-[40px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={(newVal) => {
                    formik.setFieldValue("last_name", newVal.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mb-7">
              <label className="block text-[14px] font-bold font-bold mb-2">
                Phone
              </label>
              <input
                className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                name="phone"
                value={formik.values.phone}
                onChange={(newVal) => {
                  formik.setFieldValue("phone", newVal.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-7">
                <label className="block text-[14px] font-bold font-bold mb-2">
                  Mobile
                </label>
                <input
                  className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="mobile"
                  value={formik.values.mobile}
                  onChange={(newVal) => {
                    formik.setFieldValue("mobile", newVal.target.value);
                  }}
                />
              </div>

              <div className="mb-7">
                <label className="block text-[14px] font-bold font-bold mb-2">
                  Title
                </label>
                <input
                  className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onChange={(newVal) => {
                    formik.setFieldValue("title", newVal.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between px-8 py-6 mb-5">
            <button
              className="px-10 py-4 bg-[#309FED] text-white rounded"
              type="submit"
            >
              Add
            </button>
            {}
            <button
              className="px-10 py-4 bg-white border border-slate-400 rounded"
              onClick={() => {
                setShowAdd(false);
              }}
            >
              Cancel{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
