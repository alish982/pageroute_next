'use client'

import { useState, useEffect } from "react";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import { useFormik } from "formik";
import Success from '../others/popup'


const Home = () => {
  const [message, setMessage] = useState(""); // This will be used to show a message if the submission is successful
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",

  })

  const [initialValue, setValue] = useState({
    username: "",
    password: "",

  });
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      let formData = new FormData()
       formData.append("username", values.username)
       formData.append("password", values.password)
      //console.log(formData)
      //console.log(values)
      const data = await fetch(
        "https://nitvcrmapi.truestreamz.com/api/v1/user/login",
        {
          method: "POST",
          body: formData,
          
        }
      ).then((response) => {
        setShowPopup(response.status)
        console.log(response)
        response.status === 200 ? setShowPopup({
          status:true,
          message: "Success, Thankyou",
          messageDetails: "LoggdIn sucessfully",
          statusCode : 200
        }) : setShowPopup({
            status:true,
            message:"Failed, Sorry",
            messageDetails:"username or password wrong",
            statusCode: 400
            
        })
        if(response.status === 200){
           router.push('/dash')
        } else {
          router.push('')
        }
      })
      
      
      const res = await data.json();
      //console.log(res);
    
      localStorage.setItem("token_ho_yo", res.access_token)
      

      setMessage(" ");
      setSubmitted(true);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup])

  return (
//     <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
//         <label htmlFor = "register " className = 'form-label font-bold '>Login</label>
//       <div hidden={!submitted} className="alert alert-primary" role="alert">
//         {message}
//       </div>

//       <form className="w-50 " onSubmit={formik.handleSubmit}>
//         <div className="mb-3">
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Email
//           </label>

//           <input
//             type="username"
//             name="username"
//             className="form-control"
//             placeholder=""
//             value={formik.values.username}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.errors.username && (
//             <div className="text-danger">{formik.errors.username}</div>
//           )}
//         </div>

//           <label htmlFor="password" className="form-label">
//             password
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             value = {formik.values.password}
//             placeholder=""
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Login
//         </button><br></br><br></br>
//         <Link href ="/" className = "btn btn-primary">Back to Register</Link>
//       </form>
//       {showPopup.status && <Success showPopup = {showPopup} setShowPopup={setShowPopup}/>}
// </div>
<div>
<div className=" bg-slate-100 content-center w-full px-96 py-32">
<label className = "text-4xl font-bold text-gray-600 uppercase">User Login</label>
  <form onSubmit={formik.handleSubmit} className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
        Email
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" name = "username" 
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
      />
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input name = "password" className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}/>
    </div>
    <div className="flex items-center justify-between">
     <Link href = "/"> <button className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Back to register
      </button></Link>
      <button className="bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Submit
      </button>
    </div>
  </form>
  {showPopup.status && <Success showPopup = {showPopup} setShowPopup={setShowPopup}/>}
</div>
</div>

  );
};

export default Home;