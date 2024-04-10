import Link from "next/link";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../../others/localstorage";
import axios from "axios";
import Pagination from "../../others/pagination";
import Button from "../button";
import AddProduct from "./addProduct";

function ProductList() {
  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(9);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("asc");
  let [filter, setFilter] = useState("all");
  let [sortBy, setSortBy] = useState("created_at");
  let [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const test_it = async () => {
    await instanceOfAxios
      .get(
        `product?per_page=` +
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
    <div className="">
      <div className=" pt-16">
        <div className="pl-52 ">
          <div className="flex justify-between pl-16 pb-2 pt-8 pr-6">
            <div className="place-self-center">
              <h1 className="text-2xl font-semibold">Products</h1>
            </div>
            <div className=" flex gap-2">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute  text-[#afafb0] focus:text-[#191D23] ml-4 mt-3 pointer-events-none "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>

                <input
                  className="block w-full rounded-md h-[40px] placeholder:px-1 placeholder:text-[#A3A5A7] border-gray-300 focus:outline focus:border-[#309fed] focus:shadow-[4px_4px_5px_-5px_rgba(0,0,0,0.05)] focus:shadow-[#309fed] focus:ring-0 border border-gray-200 pl-12 bg-white h-[40px]"
                  type="search"
                  name="search"
                  placeholder="   search........"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={(e) => {
                    handleSearch(e);
                  }}
                />
              </div>
              <div className="relateive">
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
                      <li onClick={() => changeFilter("credit_card")}>
                        credit
                      </li>
                      <hr className="border- border-slate-400" />
                      <li onClick={() => changeFilter("due_outstanding")}>
                        Due outstanding
                      </li>
                    </ul>
                  ) : null}
                </div>
              </div>
              <button
                onClick={() => setShowAdd(true)}
                className=" bg-[#309fed] hover:bg-[#1776BD] text-white font-bold py-2 px-4 w-[150px] h-[40px] rounded null"
              >
                + Add New
              </button>
            </div>
          </div>

          <div className="pl-6 pr-0 bg-white">
            <div className="w-full dark:bg-[#393d50] overflow-y-auto h-screen">
              <table className="table-auto w-full">
                <thead className="border-b dark:border-neutral-500">
                  <tr className="text-left bg-[#F8F8F8] dark:bg-gray-700">
                    <th scope="col" className="pl-11 py-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-all-search"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="py-4 text-gray-800 "
                      onClick={() => {
                        setSortBy("code"), handleOrder();
                      }}
                    >
                      <div className="flex">
                        <p> Code </p>

                        {sort === "asc" ? (
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 ml-1 text-black"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.47 10.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 12.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M11.47 4.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 6.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 ml-1 text-black"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.47 13.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 0 0-1.06-1.06L12 11.69 5.03 4.72a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M11.47 19.28a.75.75 0 0 0 1.06 0l7.5-7.5a.75.75 0 1 0-1.06-1.06L12 17.69l-6.97-6.97a.75.75 0 0 0-1.06 1.06l7.5 7.5Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800 "
                      onClick={() => {
                        setSortBy("name"), handleOrder();
                      }}
                    >
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Plans
                    </th>
                    <th scope="col" className="px-1 py-4 text-gray-800">
                      Addons
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Coupons
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800"
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
                      className="border-b border-[#EEEEEF] hover:bg-[#f7f7f8] "
                    >
                      <td className="px-11 py-4 truncate text-xs sm:text-sm text-gray-500">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            className="text-[#309fed] focus:ring-0"
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td scope="row" className=" py-4">
                        {post.code}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {post.name}
                      </td>
                      <td className="px-6 py-4">{post.active_plan_count}</td>
                      <td className="px-1 py-4">{post.active_addon_count}</td>
                      <td className="px-6 py-4">{post.active_coupon_count}</td>

                      <td className="pl-5 pr-3 py-4">
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
                      <td className="pr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-[#A3A5A7]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination setPage={setPage} page={page} />
              {showAdd && <AddProduct setShowAdd={setShowAdd} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
