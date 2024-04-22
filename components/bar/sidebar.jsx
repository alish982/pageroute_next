import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { miniBar } from "../others/atom/atoms";
import { useRecoilValue } from "recoil";

function Sidebar() {
  const router = useRouter();
  const [tab, setTab] = useState("dashboard");
  const mBar = useRecoilValue(miniBar);

  useEffect(() => {
    if (router.asPath.includes("/dash/customer")) {
      setTab("customer");
    } else if (router.asPath.includes("/auth/cus_register")) {
      setTab("customer");
    } else if (router.asPath.includes("/dash/payment")) {
      setTab("payment");
    } else if (router.asPath.includes("/user")) {
      setTab("user");
    } else if (router.asPath.includes("/user")) {
      setTab("user");
    } else if (router.asPath.includes("/dash/subscription")) {
      setTab("subs");
    } else if (router.asPath.includes("/auth/subs_regi")) {
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
    } else if (router.asPath.includes("/auth/tax")) {
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
    <div>
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
        className={`bg-white fixed top-0 left-0 z-40 ${
          mBar ? "w-60" : "w-28"
        } h-screen border-r border-[#ECECEC] transition-all duration-300 ease-in-out transform sm:translate-x-0`}
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
                    height={mBar ? "110" : "90"}
                    width={mBar ? "110" : "90"}
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

                {mBar === true ? (
                  <span className="ml-3">Dashboard</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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

                {mBar === true ? (
                  <span className="ml-3">Customer</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Payment</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Subscription</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Invoice</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Products</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Tax</span>
                ) : (
                  <span className="ml-3"></span>
                )}
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
                {mBar === true ? (
                  <span className="ml-3">Report</span>
                ) : (
                  <span className="ml-3"></span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
