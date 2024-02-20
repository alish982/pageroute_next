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
    const response = await instanceOfAxios.get(
      "dashboard/plan_summary"
      // {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`,
      //   }}
    );

    setPlan(response.data.data);

    const statData = await instanceOfAxios.get(
      "dashboard/statistics"
      // {
      //   headers:
      //     'Authorization': `Bearer ${access_token}`,
      //   }}
    );

    console.log("data");

    setdashStat(statData.data.data);
    console.log(dashStat);

    const newresponse = await instanceOfAxios.get(
      "dashboard/subscription_summary"
      // {
      //   headers: {
      //     'Authorization': `Bearer ${access_token}`,
      //   }}
    );
    setSubData(newresponse.data.data);
  };

  useEffect(() => {
    setPlan([{ plan: "s" }]);
    setSubData([{ subData: "n" }]);
    test_it();
  }, []);

  return (
    <div className=" bg-gray-100 flex flex-col pl-60 pt-20">
      <div className="overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <label className="text-2xl font-bold  text-gray-700 rounded uppercase font-mono px-6 py-1.5">
              PLAN SUMMARY
            </label>
            <div className="flex w-[90%]">
              <table className="w-[75%] divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      plan name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                    >
                      amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plan.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        {post.plan_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {post.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {post.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-200 px-7 py-7 rounded">
                  <div>
                    <Image
                      src="/wcustomers.png"
                      alt="none"
                      height="50"
                      width="50"
                      className="bg-blue-300"
                    />
                    <label className="text-sm">customers</label>
                  </div>
                  <label className="text-4xl font-bold">
                    {dashStat.total_customers}
                  </label>{" "}
                  <br></br>
                  <label className="text-xs">
                    {dashStat.new_customers} New
                  </label>
                </div>
                <div className="bg-gray-300 px-7 py-7 rounded">
                  <div>
                    <Image
                      src="/wsubscriptions.png"
                      alt="none"
                      height="50"
                      width="50"
                      className="bg-gray-300"
                    />
                    <label className="text-sm">Subscription</label>
                  </div>
                  <label className="text-4xl font-bold">
                    {dashStat.total_Subscriptions}
                  </label>
                  <br></br>
                  {dashStat.new_Subscriptions}{" "}
                  <label className="text-xs">New</label>
                </div>
                <div className="bg-red-200 px-7 py-7 rounded">
                  <div>
                    <Image
                      src="/wproducts.png"
                      alt="none"
                      height="50"
                      width="50"
                      className="bg-red-300"
                    />
                    <label className="text-sm">Products</label>
                  </div>
                  <label className="text-4xl font-bold">
                    {dashStat.total_products}
                  </label>
                  <br></br>
                  <label className="text-xs">
                    {" "}
                    {dashStat.new_products} New
                  </label>
                </div>
                <div className="bg-orange-200 px-7 py-7 rounded">
                  <div>
                    <Image
                      src="/winvoice.png"
                      alt="none"
                      height="45"
                      width="45"
                      className="bg-orange-300"
                    />
                    <label className="text-sm">Unpaid Invoice</label>
                  </div>
                  <label className="text-4xl font-bold">
                    {dashStat.total_unpaid_invoices}
                  </label>
                  <br></br>

                  <label className="text-xs">
                    {dashStat.new_unpaid_invoices} New
                  </label>
                </div>
              </div>
            </div>

            <br></br>
            <br></br>

            <label className="text-2xl  text-gray-700 font-bold rounded uppercase font-mono px-6 py-1.5">
              Subscription Summary
            </label>
            <table className="w-[67%] divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Signups
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Activation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Cancelation
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                  >
                    Customer
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {subData.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {post.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.signups}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.activation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.cancellations}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {post.customers}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <br></br>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Dashboard;
