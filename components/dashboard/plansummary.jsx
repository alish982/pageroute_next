"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { instanceOfAxios } from "../others/localstorage";
import axios from "axios";

function Dashboard() {
  const [plan, setPlan] = useState([{ plan: "h" }]);
  const [subData, setSubData] = useState([{ customers: "" }]);
  const [dashStat, setdashStat] = useState([]);

  const test_it = async () => {
    const response = await instanceOfAxios.get("dashboard/plan_summary");

    setPlan(response.data.data);

    const statData = await instanceOfAxios.get("dashboard/statistics");
    setdashStat(statData.data.data);

    const newresponse = await instanceOfAxios.get(
      "dashboard/subscription_summary"
    );
    setSubData(newresponse.data.data);
  };

  useEffect(() => {
    setPlan([{ plan: "s" }]);
    setSubData([{ subData: "n" }]);
    test_it();
  }, []);

  return (
    <div className={`flex-col pl-72 pt-24`}>
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        <div className="p-4 flex flex-col gap-4 basis-4/6">
          <div className="-ml-12 -mt-4">
            <div className="p-4 overflow-hidden border border-[#ECECEC]">
              <h6 className="text-[16px] font-bold text-gray-70 py-1.5">
                Plan Summary
              </h6>

              <table className="min-w-full bg-white my-3">
                <thead className=" bg-[#FAFAFA] text-black text-[13px]">
                  <tr>
                    <th
                      scope="col"
                      className="w-2/4 text-left text-[13px] py-3 px-4 uppercase font-semibold text-sm"
                    >
                      plan name
                    </th>
                    <th
                      scope="col"
                      className="w-1/4 text-left text-[13px] py-3 px-4 uppercase font-semibold text-sm"
                    >
                      quantity
                    </th>
                    <th
                      scope="col"
                      className="text-left text-[13px]  py-3 pl-20 uppercase font-semibold text-sm"
                    >
                      amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {plan.map((post) => (
                    <tr key={post.id}>
                      <td className="w-1/3 text-left  py-3 px-4">
                        {post.plan_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {post.quantity}
                      </td>
                      <td className="text-left text-[16px]  py-3 pl-20">
                        {post.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="-ml-12">
            <div className="p-4 overflow-hidden border border-[#ECECEC]">
              <h6 className="text-[16px] font-bold">Subscription Summary</h6>
              <table className="min-w-full my-3 ">
                <thead className=" bg-[#FAFAFA] text-black text-[13px]">
                  <tr>
                    <th
                      scope="col"
                      className="w-1/5 text-left  text-[13px] py-3 px-4 uppercase font-semibold text-sm"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 text-left  text-[13px] py-3 px-4 uppercase font-semibold text-sm"
                    >
                      Signups
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 text-left py-3  text-[13px] px-4 uppercase font-semibold text-sm"
                    >
                      Activation
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 text-left py-3  text-[13px] px-4 uppercase font-semibold text-sm"
                    >
                      Cancelation
                    </th>
                    <th
                      scope="col"
                      className="w-1/5 text-left py-3  text-[13px] px-4 uppercase font-semibold text-sm"
                    >
                      Customer
                    </th>
                  </tr>
                </thead>
              </table>
              <div className="overflow-auto max-h-96">
                <table className="min-w-full">
                  <tbody className="text-gray-700 overflow-auto scrollbar-hide">
                    {subData.map((post) => (
                      <tr key={post.id}>
                        <td className="w-1/5 text-left py-3 px-4">
                          {post.date}
                        </td>
                        <td className="w-1/5 text-left py-3 px-4">
                          {post.signups}
                        </td>
                        <td className="w-1/5 text-left py-3 px-4">
                          {post.activation}
                        </td>
                        <td className="w-1/5 text-left py-3 px-4">
                          {post.cancellations}
                        </td>
                        <td className="w-1/5 text-left py-3 px-4">
                          {post.customers}
                        </td>
                        <td className="w-1/5 text-left py-3 px-4"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 basis-2/6">
          <div className="p-4 rounded-md ">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#f1f2ff] text-left  p-4 ">
                <div>
                  <Image
                    src="/wcustomers.png"
                    alt="none"
                    height="50"
                    width="50"
                    className="bg-[#7a70ee]  my-3 w-12 rounded-md p-1 "
                  />
                  <label className="py-0 font-bold text-[13px] text-[#5b5756] ">
                    customers
                  </label>
                </div>
                <label className="text-[43px] font-bold">
                  {dashStat.total_customers}
                </label>{" "}
                <br></br>
                <label className="pt-4 font-bold text-sm  text-[#8f8b83] ">
                  {dashStat.new_customers} New
                </label>
              </div>
              <div className="bg-[#fef4e2]  text-left p-4 ">
                <div>
                  <Image
                    src="/wsubscriptions.png"
                    alt="none"
                    height="50"
                    width="50"
                    className="bg-[#ff8421]  my-3 w-12 rounded-md p-1 "
                  />
                  <label className="py-0 font-bold text-[13px] text-[#5b5756]  ">
                    Subscription
                  </label>
                </div>
                <label className="text-[43px] font-bold dark:text-[#dfecff] ">
                  {dashStat.total_Subscriptions}
                </label>
                <br></br>
                {dashStat.new_Subscriptions}{" "}
                <label className="pt-4 font-bold text-sm  text-[#8f8b83] dark:text-[#959eb0]">
                  New
                </label>
              </div>
              <div className="bg-[#fde7e2]  text-left p-4">
                <div>
                  <Image
                    src="/wproducts.png"
                    alt="none"
                    height="50"
                    width="50"
                    className="bg-red-300"
                  />
                  <label className="py-0 font-bold text-[13px] text-[#5b5756]  ">
                    Products
                  </label>
                </div>
                <label className="text-[43px] font-bold ">
                  {dashStat.total_products}
                </label>
                <br></br>
                <label className="pt-4 font-bold text-sm  text-[#8f8b83]">
                  {" "}
                  {dashStat.new_products} New
                </label>
              </div>
              <div className="bg-[#d7f3ef]  text-left  p-4 ">
                <div>
                  <Image
                    src="/winvoice.png"
                    alt="none"
                    height="45"
                    width="45"
                    className="bg-[#1ab6c4]  my-3 w-12 rounded-md p-1 "
                  />
                  <label className="py-0 font-bold text-[13px] text-[#5b5756]">
                    Unpaid Invoice
                  </label>
                </div>
                <label className="text-[43px] font-bold ">
                  {dashStat.total_unpaid_invoices}
                </label>
                <br></br>

                <label className="pt-4 font-bold text-sm text-[#8f8b83] ">
                  {dashStat.new_unpaid_invoices} New
                </label>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="p-4 border border-[#ECECEC] w-full">
              <div className="flex flex-col justify-around ">
                <p className="text-[16px] font-bold border-b border-[#ECECEC] mb-4">
                  Signups
                </p>
                <div className="flex flex-row justify-around -mt-5">
                  <div className="text-center">
                    <p className="pt-4 text-[14px] text-[#4c4c4c] font-bold ">
                      Today
                    </p>
                    <p className="pt-4 text-[43px] font-bold ">0</p>
                  </div>
                  <div className="text-center">
                    <p className="pt-4 text-[14px] text-[#4c4c4c] font-bold ">
                      Yesterday
                    </p>
                    <p className="pt-4 text-[43px] font-bold ">1</p>
                  </div>
                  <div className="text-center">
                    <p className="pt-4 text-[14px] text-[#4c4c4c] font-bold ">
                      This Month
                    </p>
                    <p className="pt-4 text-[43px] font-bold ">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
