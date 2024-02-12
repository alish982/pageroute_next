'use client'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {useRouter} from 'next/navigation';
import 'react-datepicker/dist/react-datepicker.css'
//import Select from 'react-select'


const Profile = () => {
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",

  })

  const [initialValue, setValue] = useState({
   zipcode:"",
   province:"",
   city: "",
   address: "",
   building: "",
   dob: "",
   mailing_address: "",
   whattsup: "",
   facebook: "",
   line: "",
   nationality: "",
   profession: ""

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
]

  return (
  <div className = "bg-slate-100 -mt-12">
  <form onSubmit={formik.handleSubmit} className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="flex flex-wrap -mx-3 mb-6">
   
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-last-name">
        Postal Code
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" name = "zipcode" placeholder="1252"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
     province
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nagoya" name = "province" 
            value={formik.values.province}
            onChange={(newVal) => {
            formik.setFieldValue('province',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
      city
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Tokyo" name = "city" 
            value={formik.values.city}
            onChange={(newVal) => {
            formik.setFieldValue('city',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>

     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       address
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="parsa" name = "address" 
            value={formik.values.address}
            onChange={(newVal) => {
            formik.setFieldValue('address',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>

     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       building
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "building" 
            value={formik.values.building}
            onChange={(newVal) => {
            formik.setFieldValue('building',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>


     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Date of Birth
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=".." name = "dob" 
            value={formik.values.dob}
            onChange={(newVal) => {
            formik.setFieldValue('dob',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       mailing address
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="example@gmail.com" name = "mailing_address" 
            value={formik.values.mailing_address}
            onChange={(newVal) => {
            formik.setFieldValue('mailing_address',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       whattsup
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="9600000000" name = "whattsup" 
            value={formik.values.whattsup}
            onChange={(newVal) => {
            formik.setFieldValue('whattsup',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Facebook
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="varcar" placeholder="" name = "facebook" 
            value={formik.values.facebook}
            onChange={(newVal) => {
            formik.setFieldValue('facebook',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Line
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "line" 
            value={formik.values.line}
            onChange={(newVal) => {
            formik.setFieldValue('line',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       profession
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "profession" 
            value={formik.values.profession}
            onChange={(newVal) => {
            formik.setFieldValue('profession',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
     </div>
     <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Nationality
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="" name = "nationality" 
            value={formik.values.nationality}
            onChange={(newVal) => {
            formik.setFieldValue('nationality',newVal.target.value)
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

export default Profile; 


