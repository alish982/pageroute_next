import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { instanceOfAxios } from "../others/localstorage";
import Success from "../others/popup";
import { miniBar } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";

function SubSubmit() {
  const [value, setValue] = useState({});
  const [parseData, setParsedData] = useState({});
  const router = useRouter();
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
  });

  useEffect(() => {
    const { responseData } = router.query;
    if (responseData) {
      const parsedData = JSON.parse(responseData);
      setValue(parsedData.values);
      console.log(parsedData.response, "hello");
      setParsedData(parsedData);
    }
  }, [router.query]);

  const handleSubmit = async () => {
    console.log(value, "value");
    await instanceOfAxios.post("subscription", value).then((response) => {
      if (response.status === 201) {
        setShowPopup({
          status: true,
          message: "Success",
          messageDetails: "Subscription Created",
          statusCode: 200,
        });
        setTimeout(() => {
          router.push("/dash/subscription");
        }, 1500);
      } else {
        setShowPopup({
          status: true,
          message: "Failed, Sorry",
          messageDetails: "something went wrong",
          statusCode: 400,
        });
      }
    });
  };

  const mBar = useRecoilValue(miniBar);

  return (
    <div className={` ${mBar ? "pl-72" : "pl-32"} py-10 flex`}>
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
            ¥{parseData.immediate_charges_grand_total}
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
            ¥{parseData.recurring_grand_total}
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
          {parseData.response &&
            parseData.response.immediate_charges.map((val) => (
              <div className="flex items-center justify-between">
                <div className="px-5 mt-8">
                  <p className="opacity-[0.7]">{val.name} (¥0)</p>
                  <p className="text-[#191D23] opacity-[0.7]">
                    {" "}
                    {val.description}
                  </p>
                </div>
                <div className="  pr-8">
                  <label className="pr-10">x1</label>
                  <lable className="pl-14"> ¥{val.total}</lable>
                  <p>
                    {" "}
                    <label>({val.tax_rate}% tax Included)</label>
                  </p>
                </div>
              </div>
            ))}
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
        {parseData.response &&
          parseData.response.recurring_charges.map((val) => (
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
              <div className="flex items-center justify-between">
                <div className="px-5 mt-8">
                  <p className="opacity-[0.7]">{val.name} (¥0)</p>
                </div>
                <div className="  pr-8">
                  <label className="pr-10">x1</label>
                  <lable className="pl-14"> ¥0</lable>
                  <p>
                    {" "}
                    <label>(4% tax Included)</label>
                  </p>
                </div>
              </div>
              <hr className="border-l border-slate-200 my-8" />
              <div className="flex items-center justify-between">
                <div className="px-5 mb-8">
                  <p className="font-semibold text-[16px]  ">
                    Total Recurring charge
                  </p>
                  <p className="text-[#191D23] opacity-[0.7]">
                    {" "}
                    (total tax: ¥)
                  </p>
                </div>
                <div className=" font-semibold text-[18px] text-[#191D23] pr-8">
                  ¥0
                </div>
              </div>
            </div>
          ))}
        <div className="pb-16">
          <button className="mx-3 mt-5 w-32 h-12 text-gray-400 border-2 border-slate-200 rounded font-bold rounded ">
            previous
          </button>
          <button
            onClick={handleSubmit}
            className="mt-5 w-32 h-12 bg-blue-500 hover:bg-slate-900 text-white text-lg font-bold rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>

        {showPopup.status && (
          <Success showPopup={showPopup} setShowPopup={setShowPopup} />
        )}
      </div>
    </div>
  );
}

export default SubSubmit;
