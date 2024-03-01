import Link from "next/link";
function SubSubmit() {
  return (
    <div className="flex pl-72 py-10">
      <div className="w-1/3 h-screen ">
        <div className="flex gap-x-4 py-6 my-5 border-b border-[#ECECEC]">
          <div className="pl-8">
            <Link href="/auth/subs_regi">
              <button className="h-[35px] w-[35px] rounded-md border border-slate-200 hover:border-[#309fed] text-black hover:text-[#309fed] p-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            </Link>
          </div>
          <div className="self-center">
            <h1 className="text-3xl font-semibold"> Create Subscription </h1>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="px-5">
            <p className="font-semibold text-[16px]  text-[#191D23]">
              Immediate charge
            </p>
            <p className="text-[#191D23] opacity-[0.7]"> On 2024-02-12</p>
          </div>
          <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
            ¥0
          </div>
        </div>

        <hr className="border border-l border-slate-200 my-5" />
        <div className="flex items-center justify-between">
          <div className="px-5">
            <p className="font-semibold text-[16px] text-[#191D23]">
              Recurring charge
            </p>
            <p className="text-[#191D23] opacity-[0.7]">
              Billed per monthly, starting from 2024-02-12
            </p>
          </div>
          <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
            ¥0
          </div>
        </div>
      </div>
      <div className="w-2/3 h-screen mt-20 px-24">
        <div className="font-semibold text-[18px] text-[#191D23]">
          Detailed Summary
        </div>
        <div className="border border-t-4 border-slate-200 my-5 rounded">
          <div className="flex items-center justify-between">
            <div className="px-5 mt-8">
              <p className="font-semibold text-[16px]  text-[#309FED]">
                Immediate charge
              </p>
              <p className="text-[#191D23] opacity-[0.7]"> On 2024-02-12</p>
            </div>
            <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
              ¥0
            </div>
          </div>
          <hr className="border-l border-slate-200 my-8 " />
          <div className="flex items-center justify-between">
            <div className="px-5 mb-8 ">
              <p className="font-semibold text-[16px] ">
                Total Immediate charge
              </p>
              <p className="text-[#191D23] opacity-[0.7]"> (total tax: ¥)</p>
            </div>
            <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
              ¥0
            </div>
          </div>
        </div>
        <div className="border border-t-4 border-slate-200 rounded">
          <div className="flex items-center justify-between">
            <div className="px-5 mt-8">
              <p className="font-semibold text-[16px]  text-[#309FED]">
                Recurring charge
              </p>
              <p className="text-[#191D23] opacity-[0.7]">
                {" "}
                Billed per , starting from 2024-02-19
              </p>
            </div>
            <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
              ¥0
            </div>
          </div>
          <hr className="border-l border-slate-200 my-8" />
          <div className="flex items-center justify-between">
            <div className="px-5 mb-8">
              <p className="font-semibold text-[16px]  ">
                Total Recurring charge
              </p>
              <p className="text-[#191D23] opacity-[0.7]"> (total tax: ¥)</p>
            </div>
            <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
              ¥0
            </div>
          </div>
        </div>
        <Link href="/dash/subscription">
          <button
            className="mt-5 w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SubSubmit;
