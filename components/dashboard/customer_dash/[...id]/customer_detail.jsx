import { useState, useEffect, use } from "react";
import { instanceOfAxios } from "../../../others/localstorage";
import Invoice from "../Invoice";
import Overview from "../overview";
import Payments from "../payment.jsx";
import Unused_Payments from "../unused_payment";
import Comment from "../comment";
import { miniBar } from "../../../others/atom/atoms";
import { useRecoilValue } from "recoil";
import Link from "next/link";

function CustomerDetail({ id }) {
  const [customerList, setCustomerList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isLoading, setLoading] = useState(true);
  let [tab, changeTab] = useState("overview");
  const mBar = useRecoilValue(miniBar);

  const test_it = async () => {
    const response = await instanceOfAxios.get(`customer/${id}`);
    setCustomerDetails(response.data.data);
    setLoading(false);
  };

  const cusData = async () => {
    const response = await instanceOfAxios.get(
      `customer?per_page=25&page=1&sort_by=created_at&sort_order=desc&search=&filter=all`
    );

    setCustomerList(response.data.data.items);
  };

  const setTab = (tab_name) => {
    changeTab(tab_name);
  };

  useEffect(() => {
    if (id) {
      test_it();
    }
    cusData();
  }, [id]);

  return (
    <div className={` ${mBar ? "pl-72" : "pl-32"} py-[50px]`}>
      <div className="flex">
        <div
          className=" h-screen border-r overflow-y-auto"
          style={{ width: `calc(33.333% - 2.5rem)` }}
        >
          <div className="sticky top-0 bg-white border-r border-b border-[#ECECEC]">
            <div className=" flex justify-between py-6 px-6 gap-4 ">
              <label className="text-xl font-semibold">Customer</label>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {customerList.map((val) => (
            <Link href={`/cusDetails/details/${val.id}`}>
              <div
                key={val.id}
                className="border-b border-slate-200 flex items-center justify-between px-6 py-6 "
              >
                <div className="flex  ">
                  <input type="checkbox" className="mr-3 mb-6" />
                  <div className="flex flex-col">
                    <label className="font-semibold text-[13px]">
                      {val.first_name}
                      {val.last_name}
                    </label>
                    <label>¥ 0</label>
                  </div>
                </div>
                {val.is_active ? (
                  <div>
                    <div className="bg-green-100 px-2.5 py-0.5 rounded">
                      active
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="bg-red-100 px-2.5 py-0.5 rounded">
                      inactive
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className=" relative w-2/3 h-screen overflow-y-auto ">
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-6 border-b ">
            <div>
              <button className="border border-slate-200 rounded p-2">
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

              {isLoading ? (
                <div className="ml-4 inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "></div>
              ) : (
                customerDetails && (
                  <label className="px-4 font-bold text-[18px] capitalize">
                    {customerDetails.first_name}
                  </label>
                )
              )}
            </div>
            <div>
              <button className="border border-slate-200 px-4 py-1.5 mx-2 rounded">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                  </svg>
                  <label className="px-2">Edit</label>
                </div>
              </button>
              <button className="text-white bg-[#309FED] border border-slate-200 px-4 py-1.5 mx-2 rounded">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    f
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  <label className="px-1">Add new</label>
                </div>
              </button>
              <button className="m1-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="sticky top-0 bg-white border-b border-[#ECECEC] flex gap-x-8 px-8">
            <div
              className={` py-4 w-22 hover:text-[#309FED] ${
                tab === "overview"
                  ? "text-[#309FED] border-b-2 border-[#309FED]"
                  : ""
              }`}
            >
              <h6
                className="font-bold text-center"
                onClick={() => setTab("overview")}
              >
                OVERVIEW
              </h6>
            </div>
            <div
              className={` py-4 w-20 hover:text-[#309FED] ${
                tab === "invoice"
                  ? " text-[#309FED] border-b-2 border-[#309FED]"
                  : ""
              }`}
            >
              {" "}
              <h6
                className="font-bold text-center"
                onClick={() => setTab("invoice")}
              >
                INVOICE
              </h6>
            </div>
            <div
              className={` py-4 w-22 hover:text-[#309FED] ${
                tab === "payment"
                  ? "text-[#309FED] border-b-2 border-[#309FED]"
                  : ""
              }`}
            >
              {" "}
              <h6
                className="font-bold text-center"
                onClick={() => setTab("payment")}
              >
                PAYMENTS
              </h6>
            </div>
            <div
              className={` py-4 w-22 hover:text-[#309FED] ${
                tab === "unused_payment"
                  ? "text-[#309FED] border-b-2 border-[#309FED]"
                  : ""
              }`}
            >
              {" "}
              <h6
                className="font-bold text-center "
                onClick={() => setTab("unused_payment")}
              >
                UNUSED PAYMENTS
              </h6>
            </div>
            <div
              className={` py-4 w-22 hover:text-[#309FED] ${
                tab === "comment"
                  ? "text-[#309FED] border-b-2 border-[#309FED]"
                  : ""
              }`}
            >
              {" "}
              <h6
                className="font-bold text-center"
                onClick={() => setTab("comment")}
              >
                COMMENTS
              </h6>
            </div>
          </div>
          {tab === "overview" && <Overview id={id} />}
          {tab === "invoice" && <Invoice id={id} />}
          {tab === "payment" && <Payments id={id} />}
          {tab === "unused_payment" && <Unused_Payments id={id} />}
          {tab === "comment" && <Comment id={id} />}
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
