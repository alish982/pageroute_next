'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import Success from '../others/popup';
//import Select from 'react-select'

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: '',
    messageDetails: '',
    statusCode: '',
  });

  const [initialValue, setValue] = useState({
    user_type: '',
    email: '',
    name: '',
    password: '',
    company: '',
    phone: '',
  });

  const router = useRouter();
  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      const data = await fetch(
        'https://nitvcrmapi.truestreamz.com/api/v1/user',
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'content-type': 'application/json',
          },
        }
      ).then((data) => {
        setShowPopup(data.status);
        console.log(data);
        data.status === 200
          ? setShowPopup({
              status: true,
              message: 'Success, Thankyou',
              messageDetails: 'user created sucessfully',
              statusCode: 200,
            })
          : setShowPopup({
              status: true,
              message: 'Failed, Sorry',
              messageDetails: "couldn't create user",
              statusCode: 400,
            });
        if (data.status === 200) {
          router.push('/auth/login');
        } else {
          router.push('/');
        }
      });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div className="bg-slate-100 px-96 pt-24 pr-32 ">
      <label className="text-3xl font-bold text-gray-600 uppercase">
        User Signup
      </label>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-gray-100 shadow-md rounded px-8 pt-4 pb-8 mb-4"
      >
        <div className="flex flex-wrap -mx-3 mb-6 py-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Name"
              name="name"
              value={formik.values.name}
              onChange={(newVal) => {
                formik.setFieldValue('name', newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-last-name"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              name="email"
              placeholder="something@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-password"
            >
              password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              name="password"
              type="password"
              placeholder="***************"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-company"
              name="email"
            >
              Company
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Company"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-city"
            >
              Address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="company"
              placeholder="e.g : Dang"
              value={formik.values.company}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-state"
            >
              Role
            </label>
            <div className="relative">
              <select
                name="user_type"
                className="px-5 py-3 bg-gray-200 text-gray-700 text-m rounded"
                onChange={formik.handleChange}
              >
                <option>--select you role--</option>
                <option value="Admin" className="text-gray-700">
                  admin
                </option>
                <option value="Subadmin" className="text-gray-700">
                  sub admin
                </option>
              </select>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-m font-bold mb-2"
              htmlFor="grid-zip"
            >
              Phone
            </label>
            <input
              name="phone"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="98....................."
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
      </form>
      <div className="py-4 flex items-center justify-between">
        <button
          className="w-32 h-12 bg-slate-500 hover:bg-slate-900 text-white text-m font-bold py-2 px-4 -mb-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add User
        </button>
      </div>
      {showPopup.status && (
        <Success showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
    </div>
  );
};

export default Register;
