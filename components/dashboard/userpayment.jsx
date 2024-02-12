import Link from 'next/link'
import { useState, useEffect } from "react"
import {instanceOfAxios} from "../others/localstorage";
import axios from 'axios';
import Pagination from '../others/pagination'

function UserPay() {

  const [user, setUser] = useState([])
  let [page, setPage] = useState(1)
  let [perpage, setPerPage] = useState(5)
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
    statusText: ""

  })

  const test_it = async () => {
    await instanceOfAxios.get(`payment?page=` + page + "&per_page=" + perpage, 
    // {
    //   method: "GET",
    //   headers: {
    //     'Authorization': `Bearer ${access_token}`,
    //   }
    // }
    ).then((response) => {
      setUser(response.data.data.items)
      console.log(response.data.data)
      setPage(response.data.data.page)
      setShowPopup(response.status)
      console.log(response)
      response.status === 200 ? setShowPopup({
        status: true,
        message: "Success, Thankyou",
        messageDetails: "user created sucessfully",
        statusCode: 200
      }) : setShowPopup({
        status: true,
        message: "Failed, Sorry",
        messageDetails: "couldn't create user",
        statusCode: 400

      })
    })
  }
  useEffect(() => {
    test_it()
  }, [page])

return(
<div className = "pt-20">
<div className="pl-56 py-22 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Payment Date
               </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Payment No.
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Invoice Number	
               </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Customer Name	
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Mode
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Total Amount
                </th>
                <th scope="col" className="px-6 py-3 uppercase">
                Status
                </th>
            </tr>
        </thead>
        <tbody>
            
          {user.map((post)=> 
            <tr key = {post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td scope="row" className="px-6 py-4">
                    {post.paid_at}
                </td>
                <td scope="row" className="px-6 py-4">
                    {post.payment_number}
                </td>
                <td className="px-6 py-4">
                {post.invoices.number} 
                hello
                </td>
                <td className="px-6 py-4">
                {post.customer.first_name} {post.customer.last_name}
                </td>
                <td className="px-6 py-4">
                  {post.mode}
                </td>
                <td className="px-6 py-4">
                   ¥{post.amount }
                </td>
                <td className="px-6 py-4">
                 <p className = "bg-green-200 pl-1 py-1 rounded"> success </p>
                </td>
            </tr>
            )}
        </tbody>
    </table>
    
</div>
<Pagination setPage={setPage} page={page} />
<Link
      className=" m-3 bg-slate-300 inline-block text-l border-2 p-2 mb-2 rounded-md justify-end " href='/'>
     Back to Register
     </Link>
</div>

)}

export default UserPay;
