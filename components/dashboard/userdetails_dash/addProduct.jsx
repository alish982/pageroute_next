import { useState, useEffect } from "react";
import { instanceOfAxios } from "@/components/others/localstorage";
import Select from "react-select";
import { useFormik } from "formik";

function AddProduct({ setShowAdd }) {
  const [initialValues] = useState({
    code: "",
    name: "",
    status: "",
    description: "",
  });

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: async (values) => {
      let data = await instanceOfAxios
        .post(`product`, values)
        .then((response) => {
          if (response.status === 200) {
            setShowAdd(false);
          }
        });
    },
  });

  const option = [
    { label: "active", value: true },
    { label: "inactive", value: false },
  ];
  return (
    <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
      <div className="bg-white border-2">
        <form onSubmit={formik.handleSubmit}>
          <div className="h-[450px] w-[500px] py-5 px-8 ">
            <div className="border-b border-slate-300 pb-4">
              {" "}
              <label className="font-bold text-[20px] capitalize">
                Add Product
              </label>
            </div>

            <div className="my-4">
              <label className=" mb-2">
                Product Code <span className="text-red-500">*</span>
              </label>
              <input
                className=" border border-slate-300 rounded w-full h-[40px] mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="code"
                value={formik.values.code}
                onChange={(newVal) => {
                  formik.setFieldValue("code", newVal.target.value);
                }}
              />
            </div>
            <div className="my-4">
              <label className="mb-2">
                Product Name <span className="text-red-500">*</span>{" "}
              </label>
              <input
                className="border border-slate-300 rounded w-full h-[40px] mt-3 py-2 px-3 text-gray-700 leading-tight focus:outline focus:border-blue-300 "
                type="text"
                name="name"
                value={formik.values.name}
                onChange={(newVal) => {
                  formik.setFieldValue("name", newVal.target.value);
                }}
              />
            </div>
            <div className="my-4">
              <label className=" mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <Select
                className=" w-full h-[40px] my-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="status"
                options={option}
                value={{
                  label: formik.values.status,
                  value: formik.values.status,
                }}
                onChange={(newVal) => {
                  formik.setFieldValue("status", newVal.value);
                }}
              />
            </div>
            <div className="my-4">
              <label className="mb-5">Description </label>
              <textarea
                className=" border border-slate-300 w-full h-[40px] py-2 mt-3 px-3 text-gray-700 leading-tight"
                type="text"
                name="description"
                value={formik.values.description}
                onChange={(newVal) => {
                  formik.setFieldValue("description", newVal.target.value);
                }}
              />
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

export default AddProduct;
