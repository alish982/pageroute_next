"use client";
import React, { useEffect, useState} from "react";
import Link from "next/link";
import { access_token } from "../others/localstorage";
import axios from 'axios';



function Dashboard() {
  const [plan, setPlan] = useState([{'plan' : 'h'}])
  const [subData, setSubData] = useState([])

  const test_it = async () => {
    const response = await axios.get('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/plan_summary', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }})
    setPlan(response.data.data)
    console.log(response.data.data)     
    
    const newresponse = await axios.get('https://nitvcrmapi.truestreamz.com/api/v1/dashboard/subscription_summary', {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }})
    setSubData(newresponse.data.data)
    console.log(newresponse.data.data)
  
    }

    useEffect(() => {
      setPlan([{'plan':'s'}])
      setSubData([{'subData': 'n'}])
      console.log(plan)
      console.log(subData)
        test_it ()      
  },[])   

  return (
    <div className=" bg-gray-100 flex flex-col px-20 py-20 ">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <label className="text-2xl  text-gray-700  bg-slate-300 rounded uppercase font-mono px-6 py-1.5">
              PLAN SUMMARY
            </label>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
              { plan.map((post) => 
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
    )}
              </tbody>
            </table>

            <br></br>
            <br></br>
            
            <label className="text-2xl  text-gray-700  bg-slate-300 rounded uppercase font-mono px-6 py-1.5">
              Subscription Summary
            </label>
            <table className=" min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
              { subData.map((post) =>
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
         
      )}
              </tbody>
              </table>
            <hr />
            <br></br>
            <Link  href="/" ><button
              className="inline text-xl px-3 py-1.5 rounded font-bold text-white bg-slate-500 inline-block "
            >
             Back to Register</button>
            </Link><br></br><br></br>
            <Link href = "/user">
              <button className = "bg-slate-500 inline-block text-l text-white border-2 p-2 mb-2 rounded-md justify-end font-semibold " type = 'button'>
                Users Details
            </button></Link>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Dashboard