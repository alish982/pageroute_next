import Link from 'next/link';
import { useState, useEffect } from 'react';
import { instanceOfAxios } from '../others/localstorage';
import axios from 'axios';
import Pagination from '../others/pagination';
import Button from './button';


function CusList() {

  const [user, setUser] = useState([])
  let [perpage, setPerPage] = useState(5)
  let [page, setPage] = useState(1)
  let [sortBy, setSortBy] = useState('customer_number');
  let [sort, setSort] = useState('asc');
  let [search, setSearch] = useState('');
  let [filter, setFilter] = useState('all');
  let [show, setShow] = useState(false);
 

  const test_it = async () => {
    await instanceOfAxios.get(
        `customer?per_page=` +
        perpage +
        '&page=' +
        page +
        '&sort_by=' +
        sortBy +
        '&sort_order=' +
        sort +
        '&search=' +
        search +
        '&filter=' +
        filter

    ).then((response) => {
      setUser(response.data.data.items)
      setPage(response.data.data.page)
    })
  }
  useEffect(() => {
    test_it()
  }, [page, filter, sort])

  function handleSearch(e) {
    if (e.keyCode === 13) {
      test_it();
    }
  }

  function changeFilter(filter) {
    setFilter(filter)
    setShow(!show)
   
  }

function handleOrder() {
    console.log('working');
    sort === 'asc' ? setSort('desc') : setSort('asc');
  }

return (
  <div className="static pt-20">
    <div className=" static pl-52 flex">
      <label className="pl-8 pt-2 pb-2 text-4xl font-sans">Customer</label>

      <div className=" static pl-80 flex pt-1">
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
        <Button onClick={() => setShow(!show)} />
        <div>
          {show ? (
            <ul className="absolute top-1 right-40 bg-orange-200 inline-block pt-1 pl-2 pr-2 rounded text-gray-700">
              <li
                onClick={() => {
                  setFilter("active");
                  setShow(!show), test_it();
                }}
              >
                all
              </li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("active")}>active</li>
              <hr className="border border-slate-400" />
              <li onClick={() => changeFilter("inactive")}>inactive</li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("smartpit")}>smartpit</li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("bankauto_telecom")}>
                bankauto telecom
              </li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("bankauto_veritrans")}>
                bankauto_veritrans
              </li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("credit_card")}>credit</li>
              <hr className="border- border-slate-400" />
              <li onClick={() => changeFilter("due_outstanding")}>
                Due outstanding
              </li>
            </ul>
          ) : null}
        </div>
        <Link href = "/auth/cus_register">
          <button className=" ml-3 px-20 border border-slate-400 h-12 rounded text-slate-400 bg-[#309fed] hover:bg-[#1776BD] text-white font-bold">
            + Add New
          </button>
        </Link>
      </div>
    </div>
    <div className=" px-56 pr-0 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
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
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("email"), handleOrder();
              }}
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("customer_number"), handleOrder();
              }}
            >
              customer number
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("first_name"), handleOrder();
              }}
            >
              name
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("phone"), handleOrder();
              }}
            >
              phone
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("company"), handleOrder();
              }}
            >
              company
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("due_outstanding"), handleOrder();
              }}
            >
              total due amount
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("excess_credit"), handleOrder();
              }}
            >
              excess credit
            </th>
            <th
              scope="col"
              className="px-6 py-3"
              onClick={() => {
                setSortBy("is_active"), handleOrder();
              }}
            >
              status
            </th>
            <th scope="col" className="px-6 py-3">
              update
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
                {post.email}
              </td>
              <td scope="row" className="px-6 py-4">
                {post.customer_number}
              </td>
              <td className="px-6 py-4">
                {post.first_name} {post.last_name}
              </td>
              <td className="px-6 py-4">{post.phone}</td>
              <td className="px-6 py-4">{post.company}</td>
              <td className="px-6 py-4">¥{post.total_due_amount}</td>
              <td className="px-6 py-4">{post.excess_credit}</td>
              <td className="px-6 py-4">
                {post.is_active ? (
                  <div className="py-1 px-2 text-green-900 bg-green-200 inline-block rounded">
                    active
                  </div>
                ) : (
                  <div className="py-1 px-2 text-red-900 bg-red-200 inline-block rounded">
                    inactive
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <Link
                  className="bg-slate-300 inline-block text-l border-1 px-2 py-1 mb-1 rounded-md justify-end "
                  href={`/user/update/${post.id}`}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination setPage={setPage} page={page} />
  </div>
);}

export default CusList;
