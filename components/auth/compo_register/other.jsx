
import 'react-datepicker/dist/react-datepicker.css'
//import Select from 'react-select'


const Other = ( {formik}) => {
  
  return (
  <div className = "bg-slate-100 -mt-12">
  <div className="w-full bg-gray-100 shadow-md rounded px-3 pt-14 pb-8 mb-4">
  <div className="flex flex-wrap -mx-3 mb-6">
   
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-last-name">
        referer
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name = "referer" placeholder=""
            value={formik.values.referer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       company
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Sandip" name = "comapny" 
            value={formik.values.comapny}
            onChange={(newVal) => {
            formik.setFieldValue('comapny',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       emergency contact Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "emergency_contact_name" 
            value={formik.values.emergency_contact_name}
            onChange={(newVal) => {
            formik.setFieldValue('emergency_contact_name',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>

     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       emergency contact number
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="" name = "emergency_contact_number" 
            value={formik.values.emergency_contact_number}
            onChange={(newVal) => {
            formik.setFieldValue('emergency_contact_number',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>

     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Remark
      </label>
      <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "remark" 
            value={formik.values.remark}
            onChange={(newVal) => {
            formik.setFieldValue('remark',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
    </div>
 <div className="flex flex-wrap -mx-3 mb-2">
 </div>
</div>
</div>

  );
}; 

export default Other; 


