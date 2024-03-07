"use client";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../../../others/localstorage";
import Image from "next/image";

function CustomerDetail({ id }) {
  const test_it = async () => {
    const response = await instanceOfAxios.get(`customer/${id}`);
    console.log(response.data.data);
  };
  useEffect(() => {
    if (id) {
      test_it();
    }
  }, []);

  return (
    <div className="pl-60 py-[50px]">
      <div className="flex">
        <div className="w-1/3 h-screen border-r">
          <div className="w-full border-r border-b border-[#ECECEC]">
            <div className="flex justify-between py-6 px-6 gap-4 sticky top-0 bg-white z-50">
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
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex ">
              <input type="checkbox" className="mr-3 mb-6" />
              <div className="flex flex-col">
                <label className="font-semibold text-[13px]">
                  Alish Acharya
                </label>
                <label>¥ 0</label>
              </div>
            </div>
            <div className="bg-green-100 px-2.5 py-0.5 rounded">active</div>
          </div>
          <hr />
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex ">
              <input type="checkbox" className="mr-3 mb-6" />
              <div className="flex flex-col">
                <label className="font-semibold text-[13px]">
                  Alish Acharya
                </label>
                <label>¥ 0</label>
              </div>
            </div>
            <div className="bg-green-100 px-2.5 py-0.5 rounded">active</div>
          </div>
        </div>
        <div className="w-2/3 h-screen ">
          <div className="flex items-center justify-between px-6 py-6 border-b ">
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
              <label className=" px-4 font-bold text-[18px] capitalize">
                Alish
              </label>
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
          <div className="border-b border-[#ECECEC] flex gap-x-8 px-8">
            <div className="py-4 w-20 hover:text-[#309FED] false">
              <h6 className="font-bold text-center">OVERVIEW</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">INVOICE</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">PAYMENTS</h6>
            </div>
            <div className="py-4 pl-1 w-21 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center ">UNUSED PAYMENTS</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">COMMENTS</h6>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 h-screen border-r">
              <div className="grid place-items-center py-5 border-b">
                <div>
                  <Image
                    src="/default_profile.svg"
                    alt=""
                    height="80"
                    width="80"
                  />
                </div>
                <label className="text-[16px] font-semibold py-3">Alish</label>
                <lable className=" text-green-400 bg-green-50 px-2 rounded">
                  active
                </lable>
              </div>
              <div className="flex gap-6 py-3 pl-24 pr-20 border-b">
                <div>
                  <Image src="/whatsapp.svg" alt="" height="25" width="25" />
                </div>
                <div>
                  <Image src="/fb.svg" alt="" height="25" width="25" />
                </div>
                <div>
                  <Image src="/line.svg" alt="" height="25" width="25" />
                </div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                  PERSONAL INFO
                </label>
                <div className="flex items-center justify-between">
                  <div>image of email</div>
                  <div>email</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>image of phone</div>
                  <div>contact</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>image of location</div>
                  <div>location</div>
                </div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                 ADDITIONAL INFO
                </label>
                <div></div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                 OTHERS DETAILS
                </label>
              </div>
            </div>
            <div className="w-2/3 h-screen ">
              <div className="flex flex-col">
                <div className=" gap-5 py-4 px-4 flex ">
                  <div className="border rounded w-[150px]">
                    <div>
                      <div className="flex py-6 px-4">
                        <div>
                          <Image
                            src="/receivable.svg"
                            alt=""
                            height="30"
                            width="30"
                          />
                        </div>
                        <div className="flex flex-col mx-3">
                          <label>receivables</label>
                          <p className="space-x-1 font-bold text-[20px]">¥ 0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded w-[150px]">
                    <div>
                      <div className="flex py-6 px-4">
                        <div>
                          <Image
                            src="/excess_credit.svg"
                            alt=""
                            height="30"
                            width="30"
                          />
                        </div>
                        <div className="flex flex-col mx-3">
                          <label>excess credits</label>
                          <p className="space-x-1 font-bold text-[20px]">¥ 0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded w-[150px]">
                    <div>
                      <div className="flex py-6 px-4">
                        <div>
                          <Image
                            src="/deposit.svg"
                            alt=""
                            height="30"
                            width="30"
                          />
                        </div>
                        <div className="flex flex-col mx-3">
                          <label>deposit</label>
                          <p className="space-x-1 font-bold text-[20px]">¥ 0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <label className="font-bold text-[16px] border-b p-4">
                  Card Info
                </label>
              </div>
              <div className="bg-slate-200 w-[250px] h-[75px] grid place-items-center mx-4 mb-5">
                + Add card
              </div>
              <div>
                <label className="text-[16px] font-semibold px-4">
                  Subscription Data
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetail;
