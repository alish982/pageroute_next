import Link from 'next/link';
import Image from 'next/image';

function Sidebar() {
  return (
    <div>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-1/6 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-slate-50 border-b border-slate-500 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href=""
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group"
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
              <hr className="border border-slate-200" />
            </li>
            <li>
              <Link
                href="/dash"
                className="flex items-center pt-2 pl-2 active:text-[#309fed] rounded-lg dark:text-white hover:bg-gray-100 hover:font-serif hover:font-bold hover:text-xl  active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/customer"
                className="flex items-center p-2 text-sm-gray-900 rounded-lg dark:text-white hover:bg-gray-100 active:bg-gray-500 hover:font-serif hover:font-bold hover:text-xl  dark:hover:bg-gray-700 group"
              >
                <Image src="/customersLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Customer</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/payment"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/paymentsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Payment</span>
              </Link>
            </li>
            <li>
              <Link
                href="/user"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/subscription"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/subscriptionsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Subscription</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/invoice"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/invoicesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Invoice</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/product"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500  dark:hover:bg-gray-700 group"
              >
                <Image src="/productsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dash/tax"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 hover:font-serif hover:font-bold hover:text-xl hover:bg-gray-100 active:bg-gray-500 dark:hover:bg-gray-700 group"
              >
                <Image src="/taxesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Tax</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
