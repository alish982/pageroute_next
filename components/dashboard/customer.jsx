import Link from "next/link";
import { useState, useEffect } from "react";
import { instanceOfAxios } from "../others/localstorage";
import Pagination from "../others/pagination";
import Button from "./button";
import { miniBar } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";

function CusList() {
  const [user, setUser] = useState([]);
  let [perpage, setPerPage] = useState(25);
  let [page, setPage] = useState(1);
  let [sortBy, setSortBy] = useState("customer_number");
  let [sort, setSort] = useState("asc");
  let [search, setSearch] = useState("");
  let [filter, setFilter] = useState("all");
  let [show, setShow] = useState(false);
  let [permission, setPermissionCustomer] = useState(true);
  let [showOption, setShowOption] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const mBar = useRecoilValue(miniBar);

  const test_it = async () => {
    await instanceOfAxios
      .get(
        `customer?per_page=` +
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
        console.log(response.data.data, "hello")
        setUser(response.data.data.items);
        setPage(response.data.data.page);
      });
  };

  function handleSearch(e) {
    if (e.keyCode === 13) {
      test_it();
    }
  }

  function changeFilter(filter) {
    setFilter(filter);
    setShow(!show);
  }

  function handleOrder() {
    console.log("working");
    sort === "asc" ? setSort("desc") : setSort("asc");
  }

  const perData = async () =>
    await instanceOfAxios
      .get("permissions?module_value=customer")
      .then((response) => {
        const roleId = response.data.data.customer.map((val) => ({
          code: val.code,
          name: val.name,
        }));
      });

  const handleClick = (e) => {
    if (!e) return;
    const { clientX, clientY } = e;
    if (
      clientX >= coordinates.x &&
      clientX <= coordinates.x + 100 &&
      clientY >= coordinates.y &&
      clientY <= coordinates.y + 80
    ) {
      setShowOption(!showOption);
    } else {
      setShowOption(true);
      setCoordinates({ x: clientX, y: clientY });
    }
  };

  const handleClickOutside = (e) => {
    const { clientX, clientY } = e;
    if (
      clientX < coordinates.x ||
      clientX > coordinates.x + 100 ||
      clientY < coordinates.y ||
      clientY > coordinates.y + 80
    ) {
      setShowOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [coordinates.x, coordinates.y]);

  useEffect(() => {
    test_it();
    perData();
  }, [page, filter, sort, perpage]);

  return (
    <div className="pt-16 overflow-hidden">
      <div className={`${mBar ? "pl-52" : "pl-20"}`}>
        <div className="flex justify-between pl-16 pb-2 pt-8 pr-6">
          <div className="place-self-center">
            <h1 className="text-2xl font-semibold">Customers</h1>
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
                    <li onClick={() => changeFilter("credit_card")}>credit</li>
                    <hr className="border- border-slate-400" />
                    <li onClick={() => changeFilter("due_outstanding")}>
                      Due outstanding
                    </li>
                  </ul>
                ) : null}
              </div>
            </div>
            <div>
              {permission ? (
                <Link href="/auth/cus_register">
                  <button className=" bg-[#309fed] hover:bg-[#1776BD] text-white font-bold py-2 px-4 w-[150px] h-[40px] rounded null">
                    + Add New
                  </button>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className="pl-6 pr-0 bg-white">
          <div className="w-full dark:bg-[#393d50] overflow-y-auto h-screen">
            <table className="table-auto-w-full ">
              <thead className="border-b dark:border-neutral-500">
                <tr className="sticky top-0 text-left bg-[#F8F8F8] dark:bg-gray-700">
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
                      setSortBy("customer_number"), handleOrder();
                    }}
                  >
                    Customer No.
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-gray-800 "
                    onClick={() => {
                      setSortBy("first_name"), handleOrder();
                    }}
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-gray-800"
                    onClick={() => {
                      setSortBy("email"), handleOrder();
                    }}
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-1 py-4 text-gray-800"
                    onClick={() => {
                      setSortBy("phone"), handleOrder();
                    }}
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-gray-800"
                    onClick={() => {
                      setSortBy("company"), handleOrder();
                    }}
                  >
                    Company
                  </th>
                  <th scope="col" className="px-6 py-4 text-gray-800">
                    Due Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-gray-800"
                    onClick={() => {
                      setSortBy("excess_credit"), handleOrder();
                    }}
                  >
                    Excess Credit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-gray-800"
                    onClick={() => {
                      setSortBy("is_active"), handleOrder();
                    }}
                  >
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-gray-800"></th>
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

                    <td scope="row" className=" py-4 hover:text-[#309fed]">
                      <Link href={`/cusDetails/details/${post.id}`}>
                        {post.customer_number}
                      </Link>
                    </td>

                    <td scope="row" className="px-6 py-4">
                      {post.first_name} {post.last_name}
                    </td>
                    <td className="px-6 py-4">{post.email}</td>
                    <td className="px-1 py-4">{post.phone}</td>
                    <td className="px-6 py-4">{post.company}</td>
                    <td className="px-6 py-4">¥{post.total_due_amount}</td>
                    <td className="px-6 py-4">¥ {post.excess_credit}</td>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-[#A3A5A7] hover:text-black "
                        onClick={handleClick}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                        />
                      </svg>
                      {showOption ? (
                        <div
                          onClick={() => setShowOption(!showOption)}
                          className="bg-white rounded flex flex-col absolute bottom-10 right-7 box-border border-none w-[100px] h-88 border-2 py-2 pl-2 mr-0 rounded text-black shadow"
                          style={{
                            top: coordinates.y,
                            right: window.innerWidth - coordinates.x,
                            display: "inline-block",
                            width: "100px",
                            height: "80px",
                          }}
                        >
                          <ul className="pl-2 ">
                            <li className="my-1">show</li>
                            <li className="my-1">
                              <Link href={`/user/update/${post.id}`}>
                                update
                              </Link>
                            </li>
                            <li className="my-1">delete</li>
                          </ul>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination setPage={setPage} page={page} setPerPage={setPerPage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CusList;
