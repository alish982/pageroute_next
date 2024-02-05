'use client'
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {useRouter} from 'next/navigation';
import Success from '../others/popup'
import Select from 'react-select'


const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",

  })

  const [initialValue, setValue] = useState({
    user_type: "",
    email: "",
    name: "",
    password: "",
    company: "",
    phone: "",
  });

const router = useRouter()
 const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      const data = await fetch(
        "https://nitvcrmapi.truestreamz.com/api/v1/user",
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
           router.push('/auth/login')
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
    
    // <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
    //     <label htmlFor = "register " className = 'form-label font-bold '>Register</label>
    //   <div hidden={!submitted} className="alert alert-primary" role="alert">
    //   </div>

    //   <form className="w-50 " onSubmit={formik.handleSubmit}>
    //     <div className = "text-black-300 focus:ring  focus:ring-green-700 focus:rounded-md">
    //     <Select name = "user_type" className = " mb-2 border border-opacity-0 rounded " onChange = {formik.handleChange}  options = {options} />
    //     </div>
    //     <div className="mb-3">
    //       <label htmlFor="name" className="form-label">
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         name="name"
    //         className="form-control"
    //         placeholder=""
    //         value={formik.values.name}
    //         onChange={(newVal) => {
    //           formik.setFieldValue('name',newVal.target.value)
    //           console.log(newVal.target.value);
    //         }}
    //         onBlur={formik.handleBlur}
    //       />
    //       <label htmlFor="password" className="form-label">
    //         password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         className="form-control"
    //         placeholder=""
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.errors.name && (
    //         <div className="text-danger">{formik.errors.name}</div>
    //       )}
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="email" className="form-label">
    //         Email
    //       </label>

    //       <input
    //         type="email"
    //         name="email"
    //         className="form-control"
    //         placeholder=""
    //         value={formik.values.email}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.errors.email && (
    //         <div className="text-danger">{formik.errors.email}</div>
    //       )}
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="company" className="form-label">
    //         Company
    //       </label>

    //       <input
    //         type="text"
    //         name="company"
    //         className="form-control"
    //         placeholder=""
    //         value={formik.values.company}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.errors.company && (
    //         <div className="text-danger">{formik.errors.company}</div>
    //       )}
    //     </div>

    //     <div className="mb-3">
    //       <label htmlFor="phone" className="form-label">
    //         phone
    //       </label>

    //       <input
    //         type="number"
    //         name="phone"
    //         className="form-control"
    //         placeholder=""
    //         value={formik.values.phone}
    //         onChange={formik.handleChange}
    //         onBlur={formik.handleBlur}
    //       />
    //       </div>
        
    //     <button type="submit" className="btn btn-primary">
    //     Register 
    //     </button><br></br><br></br>
    //     Already have an account? <Link href ="/auth/login" className = "btn btn-primary ">Click here to Login </Link>
          
    //   </form>
    //   {showPopup.status && <Success showPopup = {showPopup} setShowPopup={setShowPopup}/>}
    // </div>
  <div className = "bg-slate-100 px-60 py-16">
  <label className = "text-4xl font-bold text-gray-600 uppercase">User Signup</label>
  <form onSubmit={formik.handleSubmit} className="w-full bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-first-name" >
       Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="name" name = "name" 
            value={formik.values.name}
            onChange={(newVal) => {
            formik.setFieldValue('name',newVal.target.value)
            console.log(newVal.target.value);
            }}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-last-name">
        Email
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" name = "email" placeholder="something@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-password" >
       password
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name = "password" type= "password" placeholder="***************"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-company" name = "email">
        Company
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Company"/>
    </div>
  </div>
  <div className="flex flex-wrap -mx-3 mb-2">
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-city">
        Address
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" name = "company" placeholder="e.g : Dang"
            value={formik.values.company}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-state">
        Role
      </label>
      <div className="relative">
        <Select name = "user_type" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
           onChange={(e) => {
            formik.setFieldValue("user_type", e.target.value)
            console.log(e.target.value)
            console.log("e.target.value")
            setValue((currVal) => {
              currVal.user_type = e.target.value
              return currVal
            })
            console.log("value")
            console.log(e.target.value);

          }}
         options = {options} />
      </div>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2" htmlFor="grid-zip">
        Phone
      </label>
      <input name = "phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="98....................."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
      />
    </div>
  </div>
</form>
<div className="py-5 flex items-center justify-between">
      <button className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-lg font-bold py-2 px-4 -mb-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Sign Up
      </button>
    </div>
    <p className = "inline">Already have an account ?&nbsp;</p>  <Link href = "/auth/login"><button className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Login
      </button></Link>
      {showPopup.status && <Success showPopup = {showPopup} setShowPopup={setShowPopup}/>}
</div>
  );
}; 

export default Register; 


