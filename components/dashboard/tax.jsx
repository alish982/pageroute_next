import Link from "next/link";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../others/localstorage";
import axios from "axios";
import Pagination from "../others/pagination";

function Tax() {
  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(10);
  let [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
    statusText: "",
  });

  const test_it = async () => {
    await instanceOfAxios
      .get(
        `tax?page=` + page + "&per_page=" + perpage
        // {
        //   method: "GET",
        //   headers: {
        //     'Authorization': `Bearer ${access_token}`,
        //   }
        // }
      )
      .then((response) => {
        setUser(response.data.data.items);

        setPage(response.data.data.page);
        setShowPopup(response.status);

        response.status === 200
          ? setShowPopup({
              status: true,
              message: "Success, Thankyou",
              messageDetails: "user created sucessfully",
              statusCode: 200,
            })
          : setShowPopup({
              status: true,
              message: "Failed, Sorry",
              messageDetails: "couldn't create user",
              statusCode: 400,
            });
      });
  };
  useEffect(() => {
    test_it();
  }, [page]);

  return (
    <div className="">
      <div className=" pt-16">
        <div className="pl-52 ">
          <div className="flex justify-between pl-16 pb-2 pt-8 pr-6">
            <div className="place-self-center">
              <h1 className="text-2xl font-semibold">Taxes</h1>
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

              <Link href="/auth/tax">
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
                      onClick={() => {
                        setSortBy("name"), handleOrder();
                      }}
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-72 py-4 text-gray-800 "
                      onClick={() => {
                        setSortBy("name"), handleOrder();
                      }}
                    >
                      Rate
                    </th>
                    <th scope="col" className="px-36 py-4 text-gray-800">
                      Description
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
                        {post.name}
                      </td>
                      <td scope="row" className="px-72 py-4">
                        {post.rate}
                      </td>
                      <td className="px-36 py-4">{post.description}</td>
                      <td className="pr-10">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tax;
