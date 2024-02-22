import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Success from '../components/others/popup';
import Cookies from 'js-cookie'

const MainHomepage = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: '',
    messageDetails: '',
    statusCode: '',
  });

  const [initialValue, setValue] = useState({
    username: 'jimmy@gmail.com',
    password: 'asdfghjkl',
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {

      let formData = new FormData();
      formData.append('username', values.username);
      formData.append('password', values.password);

      let data = await fetch(
        'https://nitvcrmapi.truestreamz.com/api/v1/user/login',
        {
          method: 'POST',
          body: formData,
        }
      )
      let response = await data.json();
      localStorage.setItem('token_ho_yo', response.access_token);

      if (data.status === 200) {
          
          
          router.push('/dash')
          Cookies.set("auth", true)

        setShowPopup({
          status: true,
          message: 'Success, Thankyou',
          messageDetails: 'LoggdIn sucessfully',
          statusCode: 200,
        })
        } else {
          setShowPopup({
            status: true,
            message: 'Failed, Sorry',
            messageDetails: 'username or password wrong',
            statusCode: 400,
          })
          router.push('');
        }

      setMessage(' ');
      setSubmitted(true);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div className="flex">
      <div className="w-[60%] bg-slate-100 h-screen flex items-center justify-center">
        <Image
          className=" absolute top-8 left-8 pb-16 "
          src="/companylogo.webp"
          alt="npnt"
          height="100"
          width="140"
        />
        <h1 className="text-white text-4xl font-bold">
          <Image
            className="pb-10 "
            src="/crm.png"
            alt="hero"
            height="550"
            width="350"
          />
        </h1>
      </div>
      <div className="w-[40%] bg-slate-100 h-screen flex items-center justify-center">
        <div>
          <div className=" bg-slate-100 pr-28 pb-10 rounded">
            <label className=" leading-loose font-custom font-[700] text-[#191D23] text-[25px]">
              Welcome to CRM Portal
            </label>
            <form
              onSubmit={formik.handleSubmit}
              className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-[14px] font-custom mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="email"
                  placeholder="Email"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-[14px] text-[400] font-custom mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <div className="flex mt-2">
                  <label className="text-blue-500 text-sm hover:text-green-700 ">
                    <input type="checkbox" /> Remember Me
                  </label>
                  <label className="text-blue-500 text-sm hover:text-red-700 pl-32">
                    Forgot Password?
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-slate-500 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {showPopup.status && (
          <Success showPopup={showPopup} setShowPopup={setShowPopup} />
        )}
      </div>
    </div>
  );
};

export default MainHomepage;
