import { useEffect, useState } from "react";
import Image from "next/image";
import { instanceOfAxios } from "@/components/others/localstorage";

function Overview({ id }) {
  const [subscriptionData, setsubscriptionData] = useState([]);

  const test_it = async () => {
    const response = await instanceOfAxios.get(`subscription/${id}`);
    setsubscriptionData(response.data.data);
  };

  useEffect(() => {
    if (id) {
      test_it();
    }
  }, [id]);
  return (
    <div className="flex">
      <div className="w-1/3 h-screen border-r">
        <div className="grid place-items-center py-5 border-b">
          <div>
            <Image src="/default_profile.svg" alt="" height="80" width="80" />
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
              {subscriptionData.customer && subscriptionData.customer.email}
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
              <p className="text-[11px] text-[#a3a5a7]">Subscription Code</p>
              <div>{subscriptionData.code}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-[11px] text-[#a3a5a7]">Product</p>
              <div>
                {subscriptionData.product && subscriptionData.product.name}
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
                <p className="text-[11px] text-[#a3a5a7]">Activation Date</p>
                <div>
                  {" "}
                  <div>{subscriptionData.start_date}</div>
                </div>
              </div>
              <div className="py-4">
                <p className="text-[11px] text-[#a3a5a7]">Creation Date</p>
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
              <p className="text-[11px] text-[#a3a5a7]">Subscription Amount</p>
              <p>¥ {subscriptionData.total}</p>
            </div>
          </div>
          <div className="border">
            {" "}
            <div className="p-4">
              <p className="text-[11px] text-[#a3a5a7]">Next Billing Date</p>
              <p>{subscriptionData.next_billing_date}</p>
            </div>
          </div>
          <div className="border">
            {" "}
            <div className="p-4">
              <p className="text-[11px] text-[#a3a5a7]">Last Billing Date</p>
              <p>{subscriptionData.last_billing_date}</p>
            </div>
          </div>
          <div className="border">
            {" "}
            <div className="p-4">
              <p className="text-[11px] text-[#a3a5a7]">Billing Cycles Left</p>
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
                <td className="p-4">{subscriptionData.plan.unit_price}</td>
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
  );
}

export default Overview;
