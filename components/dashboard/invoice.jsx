import Link from 'next/link';
import { useState, useEffect } from 'react';
import { instanceOfAxios } from '../others/localstorage';
import axios from 'axios';
import Pagination from '../others/pagination';
import Button from './button';

function Invoice() {
  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(9);
  let [search, setSearch] = useState('');
  let [sort, setSort] = useState('asc');
  let [filter, setFilter] = useState('all');
  let [sortBy, setSortBy] = useState('number');
  let [show, setShow] = useState(false);

  const test_it = async () => {
    await instanceOfAxios
      .get(
        `invoice?per_page=` +
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
    console.log('working');
    sort === 'asc' ? setSort('desc') : setSort('asc')
  }

  return (
    // <div className="pl-52 pt-20">
    //   <div className="flex">
    //     <label className="pl-8 pt-2 pb-2 text-4xl font-sans">Invoice</label>
    //     <div className="pl-96 flex pt-1">
    //       <input
    //         className="border border-slate-400 h-12 rounded text-slate-400"
    //         type="search"
    //         name="search"
    //         placeholder="   search........"
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //         onKeyUp={(e) => {
    //           handleSearch(e);
    //         }}
    //       />
    //       <Button onClick={() => setShow(!show)} />
    //       <div>
    //         {show ? (
    //           <ul className="absolute top-3 right-40 bg-orange-200 inlibe-block pt-1 pl-2 pr-2 rounded text-gray-700">
    //             <li
    //               onClick={() => {
    //                 setFilter("all");

    //                 setShow(!show);
    //               }}
    //             >
    //               all
    //             </li>
    //             <hr className="border- border-slate-400" />
    //             <li
    //               onClick={() => {
    //                 setFilter("sent");

    //                 setShow(!show);
    //               }}
    //             >
    //               sent
    //             </li>
    //             <hr className="border- border-slate-400" />
    //             <li
    //               onClick={() => {
    //                 setFilter("paid"), setShow(!show);
    //               }}
    //             >
    //               paid
    //             </li>
    //             <hr className="border- border-slate-400" />
    //             <li
    //               onClick={() => {
    //                 setFilter("overdue"), setShow(!show);
    //               }}
    //             >
    //               overdue
    //             </li>
    //             <hr className="border- border-slate-400" />
    //             <li
    //               onClick={() => {
    //                 setFilter("partially_paid"), setShow(!show);
    //               }}
    //             >
    //               partially_paid
    //             </li>
    //             <hr className="border- border-slate-400" />
    //             <li
    //               onClick={() => {
    //                 setFilter("unpaid"), setShow(!show);
    //               }}
    //             >
    //               unpaid
    //             </li>
    //           </ul>
    //         ) : null}
    //       </div>
    //       <Link href="/auth/cus_register">
    //         <button className=" ml-3 px-16 border border-slate-400 h-12 rounded text-slate-400 bg-[#309fed] hover:bg-[#1776BD] text-white font-bold">
    //           + Add New
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="px-4 py-2 bg-gray-100 relative overflow-x-none overflow-y-none static shadow-md sm:rounded-lg">
    //     <table className="w-full text-sm text-left rtl:text-right text-gray-500">
    //       <thead className="text-xs text-gray-700 uppercase ">
    //         <tr>
    //           <th scope="col" className="p-4">
    //             <div className="flex items-center">
    //               <input
    //                 id="checkbox-all-search"
    //                 type="checkbox"
    //                 className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //               />
    //               <label htmlFor="checkbox-all-search" className="sr-only">
    //                 checkbox
    //               </label>
    //             </div>
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={handleOrder}
    //           >
    //             Inv Number
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={() => {
    //               setSortBy("invoice_date"), handleOrder();
    //             }}
    //           >
    //             Inv Date
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={() => {
    //               setSortBy("invoice_due_date"), handleOrder();
    //             }}
    //           >
    //             Due Date
    //           </th>
    //           <th scope="col" className="px-6 py-3 uppercase">
    //             Customer Name
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={() => {
    //               setSortBy("total"), handleOrder();
    //             }}
    //           >
    //             Total Amount
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={() => {
    //               setSortBy("due_amount"), handleOrder();
    //             }}
    //           >
    //             Due Amount
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 uppercase"
    //             onClick={() => {
    //               setSortBy("status"), handleOrder();
    //             }}
    //           >
    //             Status
    //           </th>
    //           <th scope="col" className="px-2 py-3 uppercase">
    //             update
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {user.map((post) => (
    //           <tr
    //             key={post.id}
    //             className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
    //           >
    //             <td className="w-4 p-4">
    //               <div className="flex items-center">
    //                 <input
    //                   id="checkbox-table-search-1"
    //                   type="checkbox"
    //                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    //                 />
    //                 <label
    //                   htmlFor="checkbox-table-search-1"
    //                   className="sr-only"
    //                 >
    //                   checkbox
    //                 </label>
    //               </div>
    //             </td>
    //             <td scope="row" className="px-6 py-4">
    //               {post.number}
    //             </td>
    //             <td scope="row" className="px-6 py-4">
    //               {post.invoice_date}
    //             </td>
    //             <td className="px-6 py-4">{post.invoice_due_date}</td>
    //             <td className="px-6 py-4">
    //               {post.customer.first_name} {post.customer.last_name}
    //             </td>
    //             <td className="px-6 py-4">¥{post.total}</td>
    //             <td className="px-6 py-4">¥{post.due_amount}</td>
    //             <td className="px-6 py-4">
    //               {post.status === "overdue" ? (
    //                 <div className="py-1 px-2 text-red-900 bg-red-200 inline-block rounded">
    //                   {post.status}
    //                 </div>
    //               ) : (
    //                 <div className="py-1 px-2 text-green-900 bg-green-200  inline-block rounded">
    //                   {post.status}
    //                 </div>
    //               )}
    //               &nbsp;&nbsp;
    //               {post.status_description ? (
    //                 <div className="py-1 px-2 text-red-500 inline-block rounded">
    //                   ({post.status_description})
    //                 </div>
    //               ) : (
    //                 <div></div>
    //               )}
    //             </td>
    //             <td className="px-2 py-4">
    //               <Link
    //                 className="bg-slate-300 inline-block text-l border-1 px-2 py-1 mb-1 rounded-md justify-end "
    //                 href={`/user/update/${post.id}`}
    //               >
    //                 Update
    //               </Link>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    //   <Pagination setPage={setPage} page={page} />
    // </div>

    <div className="">
      <div className=" pt-16">
        <div className="pl-52 ">
          <div className="flex justify-between pl-16 pb-2 pt-8 pr-6">
            <div className="place-self-center">
              <h1 className="text-2xl font-semibold">Invoice</h1>
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
              <Link href="/auth/cus_register">
                <button className=" bg-[#309fed] hover:bg-[#1776BD] text-white font-bold py-2 px-4 w-[150px] h-[40px] rounded null">
                  + Add New
                </button>
              </Link>
            </div>
          </div>

          <div className="pl-6 pr-0 bg-white">
            <div className="w-full dark:bg-[#393d50] overflow-y-auto h-screen">
              <table className="table-auto-w-full">
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
                      onClick={handleOrder}
                    >
                      Inv Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800 "
                      onClick={() => {
                        setSortBy("invoice_date"), handleOrder();
                      }}
                    >
                      Inv Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800"
                      onClick={() => {
                        setSortBy("invoice_due_date"), handleOrder();
                      }}
                    >
                      Due Date
                    </th>
                    <th scope="col" className="px-1 py-4 text-gray-800">
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800"
                      onClick={() => {
                        setSortBy("total"), handleOrder();
                      }}
                    >
                      Total Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-gray-800"
                      onClick={() => {
                        setSortBy("due_amount"), handleOrder();
                      }}
                    >
                      Due Amount
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
                    <th scope="col" className=" pl-6 py-4 text-gray-800">
                      Update
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
                        {post.number}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {post.invoice_date}
                      </td>
                      <td className="px-6 py-4">{post.invoice_due_date}</td>
                      <td className="px-1 py-4">
                        {" "}
                        {post.customer.first_name} {post.customer.last_name}
                      </td>
                      <td className="px-6 py-4">¥{post.total}</td>
                      <td className="px-6 py-4">¥{post.due_amount}</td>

                      <td className="px-6 py-4">
                        {post.status === "overdue" ? (
                          <div className="py-1 px-2 text-white-900 bg-red-200 inline-block rounded">
                            {post.status}
                          </div>
                        ) : (
                          <div className="py-1 px-2 text-slate-700 bg-green-200 inline-block rounded">
                            {post.status}
                          </div>
                        )}
                        &nbsp;&nbsp;
                        {post.status === "paid" ? (
                          <div className="py-1 px-2 text-green-500 inline-block rounded"></div>
                        ) : (
                          <div className="py-1 px-2 text-red-500 inline-block rounded">
                            {" "}
                            ({post.status_description})
                          </div>
                        )}
                      </td>
                      <td className="pl-6 pr-8 py-4">
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
              <Pagination setPage={setPage} page={page} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
