import { useState, useEffect } from "react";
import { instanceOfAxios } from "../../../others/localstorage";
import Image from "next/image";
import Link from "next/link";

function SubscriptionDetail({ id }) {
  const [subscriptionList, setsubscriptionList] = useState([]);
  const [subscriptionData, setsubscriptionData] = useState([]);

  const test_it = async () => {
    const response = await instanceOfAxios.get(`subscription/${id}`);
    setsubscriptionData(response.data.data);
    console.log(response.data.data, "d");
  };

  const cusData = async () => {
    const response = await instanceOfAxios.get(
      `subscription?per_page=25&page=1&sort_by=created_at&sort_order=desc&search=&filter=live`
    );
    setsubscriptionList(response.data.data.items);
  };

  useEffect(() => {
    if (id) {
      test_it();
    }
    cusData();
  }, [id]);
  return (
    <div className="pl-60 py-[50px]">
      <div className="flex">
        <div className="w-1/2 h-screen border-r overflow-y-auto">
          <div className="sticky top-0 bg-white w-full border-r border-b border-[#ECECEC]">
            <div className="flex justify-between py-6 px-6 gap-4 sticky top-0 bg-white z-50">
              <label className="text-xl font-semibold">Subscription</label>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {subscriptionList.map((val) => (
            <div
              key={val.id}
              className="flex items-center justify-between px-6 py-6"
            >
              <div className="flex ">
                <input type="checkbox" className="mr-3 mb-6" />
                <div className="flex flex-col">
                  <label className="font-semibold text-[13px]">
                    {val.subscriber_name}
                  </label>
                  <label>{val.plan.name}</label>
                </div>
              </div>
              {val.status === "live" ? (
                <div>
                  <div className="bg-green-100 px-2.5 py-0.5 rounded">live</div>
                </div>
              ) : (
                <div>
                  <div className="bg-red-100 px-2.5 py-0.5 rounded">
                    inactive
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full h-screen overflow-y-auto ">
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-6 border-b ">
            <div>
              <Link href="/dash/subscription">
                <button className="border border-slate-200 rounded p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              </Link>
              {subscriptionData.plan && (
                <label className=" px-4 font-bold text-[18px] capitalize">
                  {subscriptionData.plan.name}
                </label>
              )}
            </div>
            <div>
              <button className="border border-slate-200 px-4 py-1.5 mx-2 rounded">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                  </svg>
                  <label className="px-2">Edit</label>
                </div>
              </button>
              <button className="text-white bg-[#309FED] border border-slate-200 px-4 py-1.5 mx-2 rounded">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                  </svg>
                  <label className="px-1">Add new</label>
                </div>
              </button>
              <button className="m1-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className=" sticky top-0 bg-white border-b border-[#ECECEC] flex gap-x-8 px-8">
            <div className="py-4 w-20 hover:text-[#309FED] false">
              <h6 className="font-bold text-center">OVERVIEW</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">INVOICE</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">PAYMENTS</h6>
            </div>
            <div className="py-4 pl-1 w-21 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center ">UNUSED PAYMENTS</h6>
            </div>
            <div className="py-4 w-20 hover:text-[#309FED] false">
              {" "}
              <h6 className="font-bold text-center">COMMENTS</h6>
            </div>
          </div>
          <div className="flex">
            <div className="w-1/3 h-screen border-r">
              <div className="grid place-items-center py-5 border-b">
                <div>
                  <Image
                    src="/default_profile.svg"
                    alt=""
                    height="80"
                    width="80"
                  />
                </div>
                <label className="text-[16px] font-semibold py-3">Alish</label>
                <lable className=" text-green-400 bg-green-50 px-2 rounded">
                  live
                </lable>
              </div>

              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                  CUSTOMER CONTACT
                </label>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="blue"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                  <div>
                    {subscriptionData.customer &&
                      subscriptionData.customer.email}
                  </div>
                </div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest ">
                  SUBSCRIPTION INFO
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="py-4">
                    <p className="text-[11px] text-[#a3a5a7]">Plan Id</p>
                    <div>{subscriptionData.plan_number}</div>
                  </div>
                  <div className="py-4">
                    <p className="text-[11px] text-[#a3a5a7]">
                      Subscription Code
                    </p>
                    <div>{subscriptionData.code}</div>
                  </div>
                </div>
                {console.log(subscriptionData)}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[11px] text-[#a3a5a7]">Product</p>
                    <div>
                      {subscriptionData.product &&
                        subscriptionData.product.name}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] text-[#a3a5a7]">Repeat Every</p>
                    <div>{subscriptionData.billing_cycle}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                  OTHERS DETAILS
                </label>
                <div>
                  {" "}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="py-4">
                      <p className="text-[11px] text-[#a3a5a7]">
                        Activation Date
                      </p>
                      <div>
                        {" "}
                        <div>{subscriptionData.start_date}</div>
                      </div>
                    </div>
                    <div className="py-4">
                      <p className="text-[11px] text-[#a3a5a7]">
                        Creation Date
                      </p>
                      <div>{subscriptionData.last_billing_date}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b">
                <label className="font-bold text-[#808080] tracking-widest">
                  CONTACT PERSON
                </label>
                <div>
                  <div className="grid grid-cols-2 gap-2 py-4">
                    <div>
                      <p className="text-[11px] text-[#a3a5a7]">First Name</p>
                      <div>00990</div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a3a5a7]">Last Name</p>
                      <div>00990</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-4">
                    <div>
                      <p className="text-[11px] text-[#a3a5a7]">Email</p>
                      <div>00990</div>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#a3a5a7]">Phone</p>
                      <div>00990</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-4">
                    <div>
                      <p className="text-[11px] text-[#a3a5a7]">Mobile</p>
                      <div>00990</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-2/3 h-screen ">
              <div className="grid grid-cols-2 p-4   ">
                <div className="border">
                  <div className="p-4">
                    <p className="text-[11px] text-[#a3a5a7]">
                      Subscription Amount
                    </p>
                    <p>¥ {subscriptionData.total}</p>
                  </div>
                </div>
                <div className="border">
                  {" "}
                  <div className="p-4">
                    <p className="text-[11px] text-[#a3a5a7]">
                      Next Billing Date
                    </p>
                    <p>{subscriptionData.next_billing_date}</p>
                  </div>
                </div>
                <div className="border">
                  {" "}
                  <div className="p-4">
                    <p className="text-[11px] text-[#a3a5a7]">
                      Last Billing Date
                    </p>
                    <p>{subscriptionData.last_billing_date}</p>
                  </div>
                </div>
                <div className="border">
                  {" "}
                  <div className="p-4">
                    <p className="text-[11px] text-[#a3a5a7]">
                      Billing Cycles Left
                    </p>
                    <p>{subscriptionData.billing_cycle}</p>
                  </div>
                </div>
              </div>

              <table className="w-full">
                <thead className="text-left bg-[#F8F8F8]">
                  <tr>
                    <th className="p-4">Plans & Addons Details</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Qty</th>
                    <th className="p-4 text-right">Amt</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionData.plan && (
                    <tr>
                      <td className="p-4">
                        {subscriptionData.plan.name}
                        <p className="text-[#a3a5a7] text-[11px]">
                          {subscriptionData.plan.description}
                        </p>
                      </td>
                      <td className="p-4">
                        {subscriptionData.plan.unit_price}
                      </td>
                      <td className="p-4">{subscriptionData.plan.quantity}</td>
                      <td className="p-4">
                        {subscriptionData.plan.quantity *
                          subscriptionData.plan.unit_price}
                      </td>
                      <td></td>
                    </tr>
                  )}
                  {subscriptionData.addons &&
                    subscriptionData.addons.map((val) => (
                      <tr>
                        <td className="p-4">
                          {val.name}
                          <p className="text-[#a3a5a7] text-[11px]">
                            {val.description}
                          </p>
                        </td>
                        <td className="p-4">{val.unit_price}</td>
                        <td className="p-4">{val.quantity}</td>
                        <td className="p-4 text-right">
                          {val.unit_price * val.quantity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="px-4 py-4 flex justify-end">
                <div className="px-8 text-left">
                  <p className="py-2">Tax included </p>
                  <p className="font-bold text-right pt-2">Total </p>
                </div>
                <div className=" ">
                  <p className="py-2 text-right">
                    ¥ {subscriptionData.total_tax_amount}{" "}
                  </p>
                  <p className="text-[20px]">¥ {subscriptionData.sub_total} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionDetail;
