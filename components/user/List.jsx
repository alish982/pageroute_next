import Link from 'next/link'
import { useState, useEffect } from "react"
import { access_token } from "../others/localstorage";
import axios from 'axios';
import Pagination from '../others/pagination'

function UserList() {

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
    await axios.get(`https://nitvcrmapi.truestreamz.com/api/v1/user?page=` + page + "&per_page=" + perpage, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${access_token}`,
      }
    }).then((response) => {
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
<div >
<div className="px-4 py-2 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase ">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    name
                </th>
                <th scope="col" className="px-6 py-3">
                    email
                </th>
                <th scope="col" className="px-6 py-3">
                    role
                </th>
                <th scope="col" className="px-6 py-3">
                    comapany
                </th>
                <th scope="col" className="px-6 py-3">
                    phone
                </th>
                <th scope="col" className="px-6 py-3">
                    address
                </th>
                <th scope="col" className="px-6 py-3">
                    last login
                </th>
                <th scope="col" className="px-6 py-3">
                    status
                </th>
                <th scope="col" className="px-6 py-3">
                    update
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
                    {post.name}
                </td>
                <td className="px-6 py-4">
                {post.email}
                </td>
                <td className="px-6 py-4">
                {post.user_type}
                </td>
                <td className="px-6 py-4">
                    {post.company}
                </td>
                <td className="px-6 py-4">
                    {post.phone}
                </td>
                <td className="px-6 py-4">
                    {post.address}
                </td>
                <td className="px-6 py-4">
                    {post.last_login_ip}
                </td>
                <td className="px-6 py-4">
                    {post.is_active ? <div className='py-1 px-2 text-green-900 bg-green-200 inline-block rounded'>active</div>
                          : <div className="py-1 px-2 text-red-900 bg-red-200 inline-block rounded">inactive</div>}
                </td>
                <td className="px-6 py-4">
                    
                <Link
                    className="bg-slate-300 inline-block text-l border-1 px-2 py-1 mb-1 rounded-md justify-end " href={`/user/update/${post.id}`}>
                    Update 
                </Link>
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
    {/* <div className = "w-full overflow-y-auto h-screen">
        <table className = "table-auto w-full">
            <thead className = "border-b ">
                <tr className = "text-left bg-[#F8F8F8] ">
                    <th className =  "px-4">
                        <input type = "checkbox" className = ""
                    </th>

                </tr>

            </thead>
        </table>
        
    </div> */}
</div>

)}

export default UserList;
