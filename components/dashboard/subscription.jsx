import Link from "next/link";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../others/localstorage";
import axios from "axios";
import Pagination from "../others/pagination";
import Button from "./button";

function Subscription() {
  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(4);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("asc");
  let [filter, setFilter] = useState("live");
  let [sortBy, setSortBy] = useState("created_at");
  let [show, setShow] = useState(false);

  const test_it = async () => {
    await instanceOfAxios
      .get(
        `subscription?per_page=` +
          perpage +
          "&page=" +
          page +
          "&sort_by=" +
          sortBy +
          "&sort_order=" +
          sort +
          "&search=" +
          search +
          "&filter=" +
          filter
      )
      .then((response) => {
        setUser(response.data.data.items);
        console.log(response.data);
        console.log(response.data.data.item);
        setPage(response.data.data.page);
      });
  };

  useEffect(() => {
    test_it();
  }, [page, filter, sort]);

  function handleSearch(e) {
    if (e.keyCode === 13) {
      test_it();
    }
  }

  function handleOrder() {
    console.log("working");
    sort === "asc" ? setSort("desc") : setSort("asc");
  }

  return (
    <div className="pl-52 pt-20">
      <div className="flex">
        <label className="pl-8 pt-2 pb-2 text-4xl font-sans">
          Subscriptions
        </label>
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
              <ul className="absolute top-3 right-40 bg-orange-200 inlibe-block pt-1 pl-1 pr-2 rounded text-gray-700">
                <li
                  onClick={() => {
                    setFilter("live");

                    setShow(!show);
                  }}
                >
                  live
                </li>
                <hr className="border- border-slate-400" />
                <li
                  onClick={() => {
                    setFilter("future");

                    setShow(!show);
                  }}
                >
                  future
                </li>
                <hr className="border- border-slate-400" />
                <li
                  onClick={() => {
                    setFilter("cancelled"), setShow(!show);
                  }}
                >
                  cancelled
                </li>
                <hr className="border- border-slate-400" />
                <li
                  onClick={() => {
                    setFilter("non_renewing"), setShow(!show);
                  }}
                >
                  non_renewing
                </li>
                <hr className="border- border-slate-400" />
                <li
                  onClick={() => {
                    setFilter("extra_charge"), setShow(!show);
                  }}
                >
                  extra_charge
                </li>
                <hr className="border- border-slate-400" />
              </ul>
            ) : null}
          </div>
          <Link href="/auth/cus_register">
            <button className=" ml-3 px-8 border border-slate-400 h-12 rounded text-slate-400 bg-[#309fed] hover:bg-[#1776BD] text-white font-bold">
              + Add New
            </button>
          </Link>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
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
                  setSortBy("plan_number"), handleOrder();
                }}
              >
                Plan No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase"
                onClick={() => {
                  setSortBy("customer_name"), handleOrder();
                }}
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase"
                onClick={() => {
                  setSortBy("plan_name"), handleOrder();
                }}
              >
                Plan
              </th>
              <th scope="col" className="px-6 py-3 uppercase">
                Total Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase"
                onClick={() => {
                  setSortBy("due_amount"), handleOrder();
                }}
              >
                Billings Remain
              </th>
              <th
                scope="col"
                className="px-6 py-3 uppercase"
                onClick={() => {
                  setSortBy("created_at"), handleOrder();
                }}
              >
                Created On
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
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <td scope="row" className="px-6 py-4">
                  {post.code}
                </td>
                <td scope="row" className="px-6 py-4">
                  {post.plan_number}
                </td>

                <td className="px-6 py-4">
                  {post.customer.first_name} {post.customer.last_name}
                </td>
                <td className="px-6 py-4">{post.plan.name}</td>
                <td className="px-6 py-4">¥{post.total}</td>
                <td className="px-6 py-4">¥{post.billing_cycle}</td>
                <td className="px-6 py-4">¥{post.created_at}</td>
                <td className="px-6 py-4">
                  {post.status === "live" ? (
                    <div className="py-1 px-2 text-green-900 bg-green-200 inline-block rounded">
                      {post.status}
                    </div>
                  ) : (
                    <div className="py-1 px-2 text-red-900 bg-red-200  inline-block rounded">
                      {post.status}
                    </div>
                  )}
                  &nbsp;&nbsp;
                  {post.status_description ? (
                    <div className="py-1 px-2 text-red-500 inline-block rounded">
                      ({post.status_description})
                    </div>
                  ) : (
                    <div></div>
                  )}
                </td>
                {/* <td className="px-2 py-4">
                  <Link
                    className="bg-slate-300 inline-block text-l border-1 px-2 py-1 mb-1 rounded-md justify-end "
                    href={`/user/update/${post.id}`}
                  >
                    Update
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination setPage={setPage} page={page} />
    </div>
  );
}

export default Subscription;
