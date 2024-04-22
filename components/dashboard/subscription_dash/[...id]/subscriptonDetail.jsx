import { useState, useEffect } from "react";
import { instanceOfAxios } from "../../../others/localstorage";
import Image from "next/image";
import Link from "next/link";
import Overview from "../overview";
import Invoice from "../invoice";
import ExtraCharge from "../extra_charges";
import Comment from "../comment";
import Activity from "../activities";
import Contacts from "../contacts/contacts";
import { miniBar } from "../../../others/atom/atoms";
import { useRecoilValue } from "recoil";

function SubscriptionDetail({ id }) {
  const [subscriptionList, setsubscriptionList] = useState([]);
  const [subscriptionData, setsubscriptionData] = useState([]);
  const [tab, setTab] = useState("overview");
  const mBar = useRecoilValue(miniBar);

  const test_it = async () => {
    const response = await instanceOfAxios.get(`subscription/${id}`);
    setsubscriptionData(response.data.data);
  };

  const cusData = async () => {
    const response = await instanceOfAxios.get(
      `subscription?per_page=25&page=1&sort_by=created_at&sort_order=desc&search=&filter=live`
    );
    setsubscriptionList(response.data.data.items);
  };

  useEffect(() => {
    if (id) {
      test_it();
    }
    cusData();
  }, [id]);

  const changeTab = (tab_name) => {
    setTab(tab_name);
  };

  return (
    <div className={` ${mBar ? "pl-68" : "pl-32"} py-[50px]`}>
      <div className="flex">
        <div className="w-1/2 h-screen border-r overflow-y-auto">
          <div className="sticky top-0 bg-white w-full border-r border-b border-[#ECECEC]">
            <div className="flex justify-between py-6 px-6 gap-4 sticky top-0 bg-white z-50">
              <label className="text-xl font-semibold">Subscription</label>
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

          {subscriptionList.map((val) => (
            <Link href={`/subsDetals/details/${val.id}`}>
              <div
                key={val.id}
                className=" border-b flex items-center justify-between px-6 py-6"
              >
                <div className="flex ">
                  <input type="checkbox" className="mr-3 mb-6" />
                  <div className="flex flex-col">
                    <label className="font-semibold text-[13px]">
                      {val.subscriber_name}
                    </label>
                    <label>{val.plan.name}</label>
                  </div>
                </div>
                {val.status === "live" ? (
                  <div>
                    <div className="bg-green-100 px-2.5 py-0.5 rounded">
                      live
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

        <div className="w-full h-screen overflow-y-auto ">
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-6 border-b ">
            <div>
              <Link href="/dash/subscription">
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
              </Link>
              {subscriptionData.plan && (
                <label className=" px-4 font-bold text-[18px] capitalize">
                  {subscriptionData.plan.name}
                </label>
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
          <div className=" sticky top-0 bg-white border-b border-[#ECECEC] flex gap-x-8 px-8">
            <div
              className={`py-4 w-20 hover:text-[#309FED]  ${
                tab === "overview"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => changeTab("overview")}
            >
              <h6 className="font-bold text-center">OVERVIEW</h6>
            </div>
            <div
              className={`py-4 w-20 hover:text-[#309FED]  ${
                tab === "invoice"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => changeTab("invoice")}
            >
              {" "}
              <h6 className="font-bold text-center">INVOICE</h6>
            </div>
            <div
              className={`py-4 w-20 hover:text-[#309FED]  ${
                tab === "activity"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => changeTab("activity")}
            >
              {" "}
              <h6 className="font-bold text-center">ACTIVITIES</h6>
            </div>
            <div
              className={`py-4 w-21 hover:text-[#309FED]  ${
                tab === "extra_charges"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => changeTab("extra_charges")}
            >
              {" "}
              <h6 className="font-bold text-center ">EXTRA CHARGES</h6>
            </div>
            <div
              className={`py-4 w-20 hover:text-[#309FED]  ${
                tab === "comments"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => setTab("comments")}
            >
              {" "}
              <h6 className="font-bold text-center">COMMENTS</h6>
            </div>
            <div
              className={`py-4 w-20 hover:text-[#309FED]  ${
                tab === "contacts"
                  ? "border-b-2 border-[#309FED] text-[#309FED]"
                  : ""
              }`}
              onClick={() => setTab("contacts")}
            >
              {" "}
              <h6 className="font-bold text-center">CONTACTS</h6>
            </div>
          </div>
          {tab && tab === "overview" ? <Overview id={id} /> : ""}
          {tab && tab === "invoice" ? <Invoice id={id} /> : ""}
          {tab && tab === "activity" ? <Activity id={id} /> : ""}
          {tab && tab === "extra_charges" ? <ExtraCharge id={id} /> : ""}
          {tab && tab === "comments" ? <Comment id={id} /> : ""}
          {tab && tab === "contacts" ? <Contacts id={id} /> : ""}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetail;
