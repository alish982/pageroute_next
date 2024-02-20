import Link from 'next/link'
import { useState, useEffect } from "react"
import {instanceOfAxios} from "../../others/localstorage";
import axios from 'axios';
import Pagination from '../../others/pagination'
import Button from '../button';

function ProductList() {

  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(4);
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState('asc');
  let [filter, setFilter] = useState('all');
  let [sortBy, setSortBy] = useState('created_at');
  let [show, setShow] = useState(false);

  const test_it = async () => {
    await instanceOfAxios.get(`product?per_page=` +
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
    )
    .then((response) => {
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

  function handleOrder() {
    console.log('working');
    sort === 'asc' ? setSort('desc') : setSort('asc')
  }

return (
  <div className="pl-52 pt-20">
    <div className="flex">
      <label className="pl-8 pt-2 pb-2 text-4xl font-sans">Product</label>
      <div className="pl-96 flex pt-1">
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
            <ul className="absolute top-3 right-40 bg-orange-200 inlibe-block pt-1 pl-2 pr-2 rounded text-gray-700">
              <li
                onClick={() => {
                  setFilter("all");

                  setShow(!show);
                }}
              >
                all
              </li>
              <hr className="border- border-slate-400" />
              <li
                onClick={() => {
                  setFilter("active");

                  setShow(!show);
                }}
              >
                active
              </li>
              <hr className="border- border-slate-400" />
              <li
                onClick={() => {
                  setFilter("inactive"), setShow(!show);
                }}
              >
                inactive
              </li>
            </ul>
          ) : null}
        </div>
        <Link href="/auth/cus_register">
          <button className="ml-3 px-16 border border-slate-400 h-12 rounded text-slate-400 bg-[#309fed] hover:bg-[#1776BD] text-white font-bold">
            + Add New
          </button>
        </Link>
      </div>
    </div>
    <div className="px-6 pr-0 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
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
                setSortBy("code"), handleOrder();
              }}
            >
              Code
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("name"), handleOrder();
              }}
            >
              Name
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Plans
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Addons
            </th>
            <th scope="col" className="px-6 py-3 uppercase">
              Coupons
            </th>
            <th
              scope="col"
              className="px-6 py-3 uppercase"
              onClick={() => {
                setSortBy("status"), handleOrder();
              }}
            >
              Status
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
                {post.code}
              </td>
              <td scope="row" className="px-6 py-4">
                {post.name}
              </td>
              <td className="px-6 py-4">{post.active_plan_count}</td>
              <td className="px-6 py-4">{post.active_addon_count}</td>
              <td className="px-6 py-4">{post.active_coupon_count}</td>
              <td className="px-6 py-4">
                {post.status ? (
                  <div className="py-1 px-2 text-green-900 bg-green-200 inline-block rounded">
                    active
                  </div>
                ) : (
                  <div className="py-1 px-2 text-red-900 bg-red-200 inline-block rounded">
                    inactive
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination setPage={setPage} page={page} />
  </div>
);}

export default ProductList;
