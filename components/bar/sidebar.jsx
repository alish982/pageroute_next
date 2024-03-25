import Link from "next/link";
import Image from "next/image";

function Sidebar() {
  return (
    <div className>
      <aside
        id="default-sidebar"
        className="bg-white fixed top-0 left-0 z-40 w-60 h-screen border-r border-[#ECECEC] transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto border-b border-slate-500">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg group"
              >
                <span className="ms-3">
                  <Image
                    src="/companylogo.webp"
                    alt=""
                    height="110"
                    width="120"
                    className="p-2"
                  ></Image>
                </span>
              </Link>
            </li>
            <li className="pl-4">
              <Link
                href="/dash"
                className="flex items-center py-2 my-3 px-3 active:text-[#309fed] rounded-lg dark:text-white hover:bg-gray-100 hover:font-serif hover:font-bold hover:text-xl  active:outline active:bg-blue-200 focus:outline-none focus:bg-violet-300  "
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/customer"
                className="flex items-center px-3 my-3 text-sm-gray-900 rounded-lg dark:text-white hover:bg-gray-100 active:bg-gray-500 hover:font-serif hover:font-bold hover:text-xl focus:outline-none focus:bg-violet-300 dark:hover:bg-gray-700 group"
              >
                <Image src="/customersLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Customer</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/payment"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/paymentsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Payment</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/user"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/subscription"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image
                  src="/subscriptionsLogo.svg"
                  alt=""
                  width="21"
                  height="21"
                />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Subscription
                </span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/invoice"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/invoicesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Invoice</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/product"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/productsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href="/dash/tax"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500 dark:hover:bg-gray-700 group"
              >
                <Image src="/taxesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Taxes</span>
              </Link>
            </li>
            <li className="pl-4 py-1">
              <Link
                href=""
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500 dark:hover:bg-gray-700 group"
              >
                <Image src="/reportLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Report</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
