import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { instanceOfAxios } from "@/components/others/localstorage";

function Overview({ id }) {
  const [customerDetails, setCustomerDetails] = useState([]);
  const [subscriptionDetail, setSubscriptionDetails] = useState([]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const test_it = async () => {
    const response = await instanceOfAxios.get(`customer/${id}`);
    const data = await instanceOfAxios.get(`subscription?customer_id=${id}`);
    setCustomerDetails(response.data.data);
    setSubscriptionDetails(data.data.data.items);
    setLoading(false);
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
            <Image
              src={customerDetails.profile}
              alt=""
              height="80"
              width="80"
            />
          </div>

          {isLoading ? (
            <div className="ml-4 inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "></div>
          ) : (
            customerDetails && (
              <label className="px-4 font-bold text-[18px] capitalize">
                {customerDetails.first_name}
              </label>
            )
          )}
          <lable className=" text-green-400 bg-green-50 px-2 rounded">
            active
          </lable>
        </div>
        <div className="flex gap-6 py-3 pl-24 pr-20 border-b">
          <div>
            <Image src="/whatsapp.svg" alt="" height="25" width="25" />
          </div>
          <div>
            <Image src="/fb.svg" alt="" height="25" width="25" />
          </div>
          <div>
            <Image src="/line.svg" alt="" height="25" width="25" />
          </div>
        </div>
        <div className="p-4 border-b">
          <label className="font-bold text-[#808080] tracking-widest">
            PERSONAL INFO
          </label>
          <div className="flex items-center justify-between">
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
              {" "}
              {customerDetails.email === null ? (
                <div>-</div>
              ) : (
                customerDetails.email
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
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
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <div>
              {" "}
              {customerDetails.phone === null ? (
                <div>-</div>
              ) : (
                customerDetails.phone
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <div>
              {" "}
              {customerDetails.address === null ? (
                <div>-</div>
              ) : (
                customerDetails.address
              )}
            </div>
          </div>
        </div>
        <div className="p-4 border-b">
          <label className="font-bold text-[#808080] tracking-widest">
            ADDITIONAL INFO
          </label>
          <div>
            {" "}
            <div className="p-1 text-[11px] text-[#a3a5a7]">Smartpit No:</div>
            <div className="pl-1">
              {" "}
              {customerDetails.smartpit_no === null ? (
                <div>-</div>
              ) : (
                customerDetails.smartpit_no
              )}
            </div>
            <div className="p-1 text-[11px] text-[#a3a5a7]">
              Bank Auto (Telecom):
            </div>
            <div className="pl-1">
              {" "}
              {customerDetails.bankautoid_telecom === null ? (
                <div>-</div>
              ) : (
                customerDetails.bankautoid_telecom
              )}
            </div>
            <div className="p-1 text-[11px] text-[#a3a5a7]">
              Bank Auto (Veritrans):
            </div>
            <div className="pl-1">
              {" "}
              {customerDetails.bankauto_veritrans === null ? (
                <div>-</div>
              ) : (
                customerDetails.bankauto_veritrans
              )}
            </div>
          </div>
        </div>
        <div className="p-4 border-b">
          <label className="font-bold text-[#808080] tracking-widest">
            OTHERS DETAILS
          </label>
          <div>
            <div className="grid grid-cols-2 gap-4 py-1">
              <div className="">
                <p className="text-[11px] text-[#a3a5a7] py-1">Customer Type</p>
                <div className="">
                  {customerDetails.customer_type === 0 ? (
                    <p>Individual</p>
                  ) : (
                    <p>Company</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7] py-1">Date of Birth</p>
                <div className="">
                  {customerDetails.dob === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.dob
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Gender</p>
                <div className="">
                  {customerDetails.gender === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.gender
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Company</p>
                <div className="">
                  {customerDetails.company === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.company
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4  py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Profession</p>
                <div className="">
                  {" "}
                  {customerDetails.profession === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.profession
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Registration Date</p>
                <div className="">
                  {customerDetails.registration_date === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.registration_date
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Emergency Name</p>
                <p className="">-</p>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Emergency Phone</p>
                <p className="">-</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4  py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">ZipCode</p>
                <div className="">
                  {customerDetails.zipcode === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.zipcode
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Province</p>
                <div className="">
                  {customerDetails.province === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.province
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4  py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Nationality</p>
                <div className="">
                  {customerDetails.nationality === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.nationality
                  )}
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Residence Card No</p>
                <div className="">
                  {customerDetails.residence_card_no === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.residence_card_no
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4  py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">
                  Residence Card Front
                </p>
                <p className="">-</p>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">
                  Residence Card Back
                </p>
                <p className="">-</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 py-1">
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Agent</p>
                <p className="">
                  {/* { customerDetails.customerDetails.agent.name === null ? (
                    <div>-</div>
                  ) : (
                    customerDetails.customerDetails.agent.name
                  )} */}
                  -
                </p>
              </div>
              <div>
                <p className="text-[11px] text-[#a3a5a7]">Referer</p>
                <div className="">
                  {" "}
                  {customerDetails.referer === null ? (
                    <p>-</p>
                  ) : (
                    customerDetails.referer
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 h-screen ">
        <div className="flex flex-col">
          <div className=" gap-1 py-4 px-4 flex ">
            <div className="border rounded w-[155px]">
              <div>
                <div className="flex py-6 px-4">
                  <div>
                    <Image
                      src="/receivable.svg"
                      alt=""
                      height="30"
                      width="30"
                    />
                  </div>
                  <div className="flex flex-col mx-3">
                    <label>receivables</label>
                    <p className="space-x-1 font-bold text-[20px]">¥ 0</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded w-[163px]">
              <div>
                <div className="flex py-6 px-4">
                  <div>
                    <Image
                      src="/excess_credit.svg"
                      alt=""
                      height="30"
                      width="30"
                    />
                  </div>
                  <div className="flex flex-col mx-2">
                    <label>excess credits</label>
                    <p className="font-bold text-[20px] ">
                      ¥ {customerDetails.excess_credit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border rounded w-[155px]">
              <div>
                <div className="flex py-6 px-4">
                  <div>
                    <Image src="/deposit.svg" alt="" height="30" width="30" />
                  </div>
                  <div className="flex flex-col mx-3">
                    <label>deposit</label>
                    <p className="space-x-1 font-bold text-[20px]">
                      ¥ {customerDetails.deposit}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <label className="font-bold text-[16px] border-b p-4">
            Card Info
          </label>
        </div>
        <div className="grid grid-cols-2">
          {customerDetails.cards &&
            customerDetails.cards.map((card) => (
              <div key={card.id} className="w-full border-r border-b">
                <div className="flex px-3 py-4                ">
                  <div>
                    {card.brand === "Visa" ? (
                      <Image src="/visa.svg" alt="" height="25" width="30" />
                    ) : (
                      <Image
                        src="/mastercard.svg"
                        alt=""
                        height="25"
                        width="30"
                      />
                    )}
                  </div>
                  <div className="pl-4">
                    <div>{card.brand}</div>
                    <div>
                      {card.object}**** **** ****{card.last4}
                    </div>
                    <div className="text-[#a3a5a7] pt-1">
                      {" "}
                      Expires {card.exp_month}/{card.exp_year}
                    </div>
                    <div className="flex py-3">
                      <button className="text-blue-600 rounded">
                        set as default
                      </button>
                      <button className="text-blue-600 pl-16"> delete</button>
                    </div>
                  </div>
                  <div>
                    {card.is_default ? (
                      <p className="bg-green-100 text-green-500 px-2 py-0.5 inline-block rounded">
                        default
                      </p>
                    ) : (
                      <p className="bg-red-100 text-red-500 px-2 py-0.5 inline-block rounded">
                        expired
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

          <div
            className="w-full grid place-items-center py-5 border-r border-b hover:bg-slate-200"
            onClick={() => setShowAddCard(true)}
          >
            + Add card
          </div>
        </div>
        {showAddCard ? (
          <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-slate-300">
              <div className="max-w-md mx-auto rounded px-8 pt-6 grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card Brand
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    id="cardBrand"
                    type="text"
                    placeholder="Card Brand"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cardNumber"
                    type="text"
                    placeholder="Card Number"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expiry Year
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expiryYear"
                    type="text"
                    placeholder="Expiry Year"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Expiry Month
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="expiryMonth"
                    type="text"
                    placeholder="Expiry Month"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Card Holder Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cardHolderName"
                    type="text"
                    placeholder="Card Holder Name"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="country"
                    type="text"
                    placeholder="Country"
                  />
                </div>
              </div>
              <div className="flex justify-between px-8 py-6">
                <button className="px-4 py-1 bg-white rounded">Add </button>
                <button
                  className=" bg-white px-4 py-1 rounded"
                  onClick={() => setShowAddCard(false)}
                >
                  Cancel{" "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="py-4">
          <label className="text-[16px] font-semibold px-4">
            Subscription Data
          </label>
          {subscriptionDetail.map((val) => (
            <div key={val.id}>
              <div className="flex pt-3 justify-between">
                <div className="">
                  <p className="px-4 mb-1 hover:text-[#309fed] font-bold">
                    {val.plan.name}
                  </p>
                  <p className="text-sm px-4 ">
                    Subscription ID: {val.code} | Subscription #:
                    {val.plan_number}
                  </p>
                </div>
              </div>
              <div className="pl-4 pt-3">
                <div className="flex border-b pb-4">
                  <div className="border w-1/3 px-4">
                    <p className="text-[#a3a5a7] mt-3 mb-1">
                      Next billing Date
                    </p>
                    <p className="text-base">{val.next_billing_date}</p>
                  </div>

                  <div className="border w-1/3 px-4 border-r">
                    <p className="text-[#a3a5a7] mt-3 mb-1">Price</p>
                    <div className="flex">
                      <label className="text-base block">
                        ¥ {val.unit_price}
                        <p className="text-[#a3a5a7] inline">/month</p>
                      </label>
                    </div>
                  </div>
                  <div className="border w-1/3 px-4 pb-2">
                    <div className="text-[#a3a5a7] mt-3 mb-1">Status</div>
                    {val.status === "live" ? (
                      <p className="bg-green-200 text-green-500 inline-block px-2 rounded">
                        live
                      </p>
                    ) : (
                      <p className="bg-red-200 text-red-500 inline-block px-2 rounded">
                        dead
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
