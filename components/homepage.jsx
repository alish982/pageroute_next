import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Success from "../components/others/popup";
import Cookies from "js-cookie";

const MainHomepage = () => {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showEye, setshowEye] = useState(true);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  const [initialValue, setValue] = useState({
    username: "jimmy@gmail.com",
    password: "asdfghjkl",
  });
  const router = useRouter();

  const formik = useFormik({
    initialValues: initialValue,

    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      let data = await fetch(
        "https://nitvcrmapi.truestreamz.com/api/v1/user/login",
        {
          method: "POST",
          body: formData,
        }
      );
      let response = await data.json();
      localStorage.setItem("token_ho_yo", response.access_token);

      if (data.status === 200) {
        Cookies.set("auth", true);

        setShowPopup({
          status: true,
          message: "Success, Thankyou",
          messageDetails: "LoggdIn sucessfully",
          statusCode: 200,
        });
      } else {
        setShowPopup({
          status: true,
          message: "Failed, Sorry",
          messageDetails: "username or password wrong",
          statusCode: 400,
        });
        router.push("");
      }

      setMessage(" ");
      setSubmitted(true);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dash");
      setShowPopup(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-row h-screen">
        <div className="lg:w-[60%] md:w-[60%] p-8 bg-[#F0F3FC] flex items-center justify-center">
          <Image
            className=" absolute top-8 left-8 pb-16 "
            src="/companylogo.png"
            alt="npnt"
            height="80"
            width="138"
          />
          <p className="text-white text-4xl font-bold">
            <Image
              className="pb-0"
              src="/login-bg.png"
              alt="hero"
              height="335"
              width="325"
            />
          </p>
        </div>
        <div className="lg:w-[40%] md:w-[40%] sm:w-full px-24 py-36 bg-white items-center justify-center">
          <div className="mb-4">
            <p className="font-bold text-[#191D23] text-[25px]">
              Welcome to CRM Portal
            </p>
            <p className="text-[14px] opacity-[.7] font-normal mt-3">
              Enter your credentials to access<br></br> your account
            </p>
          </div>
          <div className="mt-14">
            <label className="block text-black text-[14px] mb-1">
              Email
              <span className="text-red-600"> *</span>
            </label>
            <input
              required
              className=" block w-full py-2 px-4 rounded-md h-[40px] border border-slate-300 rounded focus:outline focus:border-[#309fed] focus:ring-0"
              type="email"
              placeholder="Email"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mt-10">
            <label className="block text-black text-[14px]">
              Password <span className="text-red-600"> *</span>
            </label>
            <div className="flex flex-row-reverse">
              <input
                name="password"
                className=" rounded w-full py-2 px-4 text-gray-700 mt-1 rounded-md h-[40px] border border-slate-300 rounded focus:outline focus:border-[#309fed] focus:ring-0"
                id="password"
                type={showEye ? "password" : "text"}
                placeholder="******************"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {showEye ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute text-[#afafb0] cursor mr-[1%] mt-4 inline active:text-black"
                  onClick={() => setshowEye(!showEye)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute text-[#afafb0] cursor mr-[1%] mt-4 inline active:text-black"
                  onClick={() => setshowEye(!showEye)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>

          <div className="flex align-middle justify-between mt-10">
            <div className="flex items-center ">
              <input
                type="checkbox"
                className="focus:text-[#309fed] foucs:ring-0 rounded-sm"
              />
              <p className="text-[14px] ml-2 font-normal opacity-[.7]">
                Remember me
              </p>
            </div>
            <div>
              <Link
                href="/pass/password"
                onClick={() => console.log("working")}
              >
                <p className="text-[14px] ml-2 font-normal text-blue-500 ">
                  Forgot Password?
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            <button
              className="w-full h-[40px] font-bold text-white rounded-md bg-[#309fed]"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="fixed bottom-4">
            <p className="text-[#808080] text-[12px] text-[#A3A5A7] tracking-wider">
              Copyright@ NITV CRM. All rights reserved
            </p>
          </div>
          {showPopup.status && (
            <Success showPopup={showPopup} setShowPopup={setShowPopup} />
          )}
        </div>
      </div>
    </form>
  );
};

export default MainHomepage;
