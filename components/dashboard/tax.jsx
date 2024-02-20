import Link from 'next/link'
import { useState, useEffect } from "react"
import {instanceOfAxios} from "../others/localstorage";
import axios from 'axios';
import Pagination from '../others/pagination'

function Tax() {

  const [user, setUser] = useState([])
  let [page, setPage] = useState(1)
  let [perpage, setPerPage] = useState(5)
  let [search, setSearch] = useState('')
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
    statusText: ""

  })

  const test_it = async () => {
    await instanceOfAxios.get(`tax?page=` + page + "&per_page=" + perpage, 
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

return (
  <div className="pt-20">
    <div className="pl-52 flex">
      <label className="pl-8 pt-2 pb-2 text-4xl font-sans">Tax</label>
      <div className = "pl-20">
        <div className="pl-96 flex pt-1 pb-2">
          <input
            className="border border-slate-400 h-12 rounded text-slate-400"
            type="search"
            name="search"
            placeholder="   search........"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(e) => {
              handleSearch(e);
            }}
          />
          <Link href="/auth/cus_register">
            <button className=" ml-3 px-28 border border-slate-400 h-12 rounded text-slate-400 bg-[#309fed] hover:bg-[#1776BD] text-white font-bold">
              + Add New
            </button>
          </Link>
        </div>
      </div>
    </div>
    <div className="px-56 pr-0 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase ">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Name
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Rate
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((post) => (
            <tr
              key={post.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td scope="row" className="px-6 py-4">
                {post.name}
              </td>
              <td scope="row" className="px-6 py-4">
                {post.rate}
              </td>
              <td className="px-6 py-4">{post.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination setPage={setPage} page={page} />
  </div>
);}

export default Tax;
