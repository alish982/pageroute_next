import 'react-datepicker/dist/react-datepicker.css';
//import Select from 'react-select'

const Payment = ({ formik }) => {
  return (
    <div className="bg-slate-100 -mt-12">
      <div
        onSubmit={formik.handleSubmit}
        className="w-full bg-gray-100 shadow-md rounded px-3 pt-14 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Smartpit No
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="num"
              name="Smartpait_No"
              placeholder=""
              value={formik.values.Smartpait_No}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Bankauto ID (Telecom)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              name="Bankeuto_ID"
              value={formik.values.Bankeuto_ID}
              onChange={(newVal) => {
                formik.setFieldValue('Bankeuto_ID', newVal.target.value);
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
              Bankauto ID (Veritrans)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder=""
              name="VBankeuto_ID"
              value={formik.values.VBankeuto_ID}
              onChange={(newVal) => {
                formik.setFieldValue('VBankeuto_ID', newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2"></div>
      </div>
    </div>
  );
};

export default Payment