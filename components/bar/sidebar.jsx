import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Sidebar() {
  const router = useRouter();
  const [tab, setTab] = useState("dashboard");

  useEffect(() => {
    if (router.asPath.includes("/dash/customer")) {
      setTab("customer");
    } else if (router.asPath.includes("/dash/payment")) {
      setTab("payment");
    } else if (router.asPath.includes("/user")) {
      setTab("user");
    } else if (router.asPath.includes("/dash/subscription")) {
      setTab("subs");
    } else if (router.asPath.includes("/subsDetals/details")) {
      setTab("subs");
    } else if (router.asPath.includes("/invDetails/details")) {
      setTab("invoice");
    } else if (router.asPath.includes("/dash/invoice")) {
      setTab("invoice");
    } else if (router.asPath.includes("/dash/product")) {
      setTab("product");
    } else if (router.asPath.includes("/dash/tax")) {
      setTab("tax");
    } else if (router.asPath.includes("/dash/report")) {
      setTab("report");
    } else {
      setTab("dashboard");
    }
  }, [router.asPath]);

  const ChangeTab = (tab_name) => {
    setTab(tab_name);
  };

  return (
    <div className>
      <style>{`
            .change-color:hover img{
              filter: invert(55%) sepia(27%) saturate(1710%) hue-rotate(171deg) brightness(96%) contrast(93%);
            }
             .change-full{
              filter: invert(55%) sepia(27%) saturate(1710%) hue-rotate(171deg) brightness(96%) contrast(93%);
            }
            `}</style>
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

            <li
              className={`pl-4 py-1 change-color ${
                tab === "dashboard" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("dashboard")}
            >
              <Link
                href="/dash"
                className="flex items-center py-2 my-3 px-3 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "customer" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("customer")}
            >
              <Link
                href="/dash/customer"
                className="flex items-center px-3 my-3 text-sm-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/customersLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Customer</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "payment" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("payment")}
            >
              <Link
                href="/dash/payment"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/paymentsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Payment</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "user" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("user")}
            >
              <Link
                href="/user"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/dashboardLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "subs" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("subs")}
            >
              <Link
                href="/dash/subscription"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
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
            <li
              className={`pl-4 py-1 change-color ${
                tab === "invoice" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("invoice")}
            >
              <Link
                href="/dash/invoice"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/invoicesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Invoice</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "product" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("product")}
            >
              <Link
                href="/dash/product"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/productsLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "tax" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("tax")}
            >
              <Link
                href="/dash/tax"
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
              >
                <Image src="/taxesLogo.svg" alt="" width="21" height="21" />
                <span className="flex-1 ms-3 whitespace-nowrap">Taxes</span>
              </Link>
            </li>
            <li
              className={`pl-4 py-1 change-color ${
                tab === "report" ? "change-full" : ""
              }`}
              onClick={() => ChangeTab("report")}
            >
              <Link
                href=""
                className="flex items-center px-3 my-3 text-gray-900 rounded-lg hover:bg-[#309fed0D]"
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
