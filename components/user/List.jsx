import Link from "next/link";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../others/localstorage";
import axios from "axios";
import Pagination from "../others/pagination";

function UserList() {
  const [user, setUser] = useState([]);
  let [page, setPage] = useState(1);
  let [perpage, setPerPage] = useState(9);
  const [showPopup, setShowPopup] = useState({
    status: false,
    message: "",
    messageDetails: "",
    statusCode: "",
    statusText: "",
  });

  const test_it = async () => {
    await instanceOfAxios
      .get(`user?page=` + page + "&per_page=" + perpage)
      .then((response) => {
        setUser(response.data.data.items);
        console.log(response.data.data);
        setPage(response.data.data.page);
        setShowPopup(response.status);
        console.log(response);
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
              <h1 className="text-2xl font-semibold">Users</h1>
            </div>
            <div className=" flex gap-2">
              <div className=""></div>
              <div className="relateive"></div>
              <Link href="/auth/cus_register">
                <button className=" bg-[#309fed] hover:bg-[#1776BD] text-white font-bold py-2 px-4 w-[205px] h-[40px] rounded null">
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

                    <th scope="col" className="py-4 text-gray-800 ">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800 ">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Role
                    </th>
                    <th scope="col" className="px-1 py-4 text-gray-800">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Last Login
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-gray-800">
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
                      <td className=" py-4">{post.name}</td>
                      <td className="px-6 py-4">{post.email}</td>
                      <td className="px-6 py-4">{post.user_type}</td>
                      <td className="px-1 py-4">{post.company}</td>
                      <td className="px-6 py-4">{post.phone}</td>
                      <td className="px-6 py-4">{post.address}</td>
                      <td className="px-6 py-4">{post.last_login_ip}</td>
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
                      <td>
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

export default UserList;
