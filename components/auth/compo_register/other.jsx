'use client'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {useRouter} from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css'
//import Select from 'react-select'


const Other = () => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",

  })

  const [initialValue, setValue] = useState({
    referer: "",
    comapny: "",
    emergency_contact_number: "",
    emergency_contact_name : "",
    remark: "",


  });

const router = useRouter()
 const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      const data = await fetch(
        "https://nitvcrmapi.truestreamz.com/api/v1/customer/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          },
        }
      ).then((data) => {
        setShowPopup(data.status)
        console.log(data)
        data.status === 200 ? setShowPopup({
          status:true,
          message: "Success, Thankyou",
          messageDetails: "user created sucessfully",
          statusCode : 200
        }) : setShowPopup({
            status:true,
            message:"Failed, Sorry",
            messageDetails:"couldn't create user",
            statusCode: 400
            
        })
        if(data.status === 200){
           router.push('/dash/customer')
        } else {
          router.push('/')
        }
      })
    },

  });

  useEffect(() => {
    const timer = setTimeout(() => {
    setShowPopup(false);
  }, 3000);
return () => clearTimeout(timer);
}, [showPopup]);

const options = [
  { value: "admin" , label: "admin"},
  { value: "subadmin" , label: "subadmin"}
];

  return (
  <div className = "bg-slate-100 -mt-12">
  <form onSubmit={formik.handleSubmit} className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

<div className="py-5 flex items-center justify-between">
      <button className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mt-5 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
      </button>
    </div>
      </form>
</div>

  );
}; 

export default Other; 


