import Image from "next/image";
import Link from 'next/link'
const ForgotPass = () => {

  return (
    <form>
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
          <Link href="/">
            <button class="h-[35px] w-[35px] text-[#191D23] rounded-md border hover:border-[#309fed] text-black hover:text-[#309fed] mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          </Link>
          <div className="">
            <p className="font-bold text-[#191D23] text-[23px]">
              Forgot password?
            </p>
            <p className="text-[14px] opacity-[.7] font-normal mt-0.5">
              Enter your email address below and we'll email<br></br>
              instructions for setting a new one
            </p>
          </div>
          <div className="mt-10">
            <label className="block text-black text-[14px] mb-1">
              Email
              <span className="text-red-600"> *</span>
            </label>
            <input
              className=" block w-full py-2 px-4 rounded-md h-[40px] border border-slate-300 rounded focus:outline focus:border-[#309fed] focus:ring-0"
              type="email"
              placeholder="Email"
              name="username"
            />
          </div>
          <div className="mt-5">
            <button
              className="w-full h-[40px] font-bold text-white rounded-md bg-[#309fed]"
              type="submit"
            >
              Reset
            </button>
          </div>
          <div className="fixed bottom-4">
            <p className="text-[#808080] text-[12px] text-[#A3A5A7] tracking-wider">
              Copyright@ NITV CRM. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPass;

{
  /* <div>
  <button class="h-[35px] w-[35px] rounded-md border hover:border-[#309fed] text-black hover:text-[#309fed]">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
</svg>

  </button>
</div>; */
}