import { instanceOfAxios } from "@/components/others/localstorage";
import { useState, useEffect } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Link from "next/link";

function InvoiceDetails({ id }) {
  const [InvoiceList, setInvoiceList] = useState([]);
  const [invoiceDetails, setInvoiceDetail] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [accord, setAccord] = useState(false);
  const [checked, setChecked] = useState(false);

  const test_it = async () =>
    await instanceOfAxios
      .get(`invoice/${id}`)
      .then((response) => setInvoiceDetail(response.data.data));

  const invoiceData = async () =>
    await instanceOfAxios.get(`invoice`).then((response) => {
      setInvoiceList(response.data.data.items);
    });

  const handleDownloadPDF = () => {
    const input = document.getElementById("pdf-content", "hello");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("downloaded-file.pdf");
    });
  };

  useEffect(() => {
    if (id) {
      test_it();
    }
    invoiceData();
  }, [id]);
  return (
    <div className="pl-60 py-[50px]">
      <div className="flex">
        <div className=" w-1/3 h-screen border-r overflow-y-auto">
          <div className="sticky top-0 bg-white border-r border-b border-[#ECECEC]">
            <div className=" flex justify-between py-6 px-6 gap-4 ">
              <label className="text-xl font-semibold">Invoices</label>
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

          {InvoiceList.map((val) => (
            <Link href={`/invDetails/details/${val.id}`}>
              <div
                onClick={() => setChecked(true)}
                key={val.id}
                className="flex items-center justify-between px-6 py-6 "
              >
                <div className="flex  ">
                  <input type="checkbox" className="mr-3 mb-6" />
                  <div className="flex flex-col">
                    <label className="font-semibold text-[13px]">
                      {val.number}
                    </label>
                    <label> {val.invoice_date}</label>
                  </div>
                </div>
                {val.status === "paid" ? (
                  <div>
                    <div className="bg-green-100 px-2.5 py-0.5 rounded">
                      {val.status}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="px-2.5 py-0.5 text-right">
                      ¥ {val.due_amount}
                    </div>
                    <div className="px-2.5 py-0.4 rounded bg-red-200">
                      {val.status_description}
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className=" relative w-2/3 h-screen overflow-y-auto ">
          <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-6 border-b z-10 ">
            <div>
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

              {isLoading ? (
                <div className="ml-4 inline-block h-9 w-9 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] "></div>
              ) : (
                invoiceDetails && (
                  <label className="px-4 font-bold text-[18px] capitalize">
                    {invoiceDetails.number}
                  </label>
                )
              )}
            </div>

            <div className="flex gap-10">
              <button className="">
                <Image src="/pencilEdit.svg" alt="" height="25" width="25" />
              </button>
              <button className=" ">
                <Image src="/upload.svg" alt="" height="17" width="17" />
              </button>
              <button className="">
                <Image src="/printer.svg" alt="" height="22" width="22" />
              </button>
              <button className="">
                <Image src="/delete.svg" alt="" height="22" width="22" />
              </button>
            </div>
          </div>
          <div className="h-screen bg-[#F7F7FA]">
            <div className="border bg-[#F7F7FA]"></div>
            <div>
              <div
                onClick={() => setAccord(!accord)}
                className=" border bg-white m-10 px-4 py-6 rounded border-slate-200 rounded"
              >
                <div className="flex justify-between">
                  <label className="text-[13px] font-bold">
                    Payment Recieved{" "}
                    <span className="bg-blue-200 px-2 py-0.5 ml-1">
                      {invoiceDetails.payments &&
                        invoiceDetails.payments.length}
                    </span>
                  </label>
                  {accord ? (
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
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  ) : (
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
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  )}
                </div>

                {accord ? (
                  <div>
                    <table className="w-full mt-8 mb-14">
                      <thead>
                        <tr className="bg-slate-50 rounded ">
                          <th className=" text-left text-[12px]">Date</th>
                          <th className=" text-left text-[12px]">Payment No</th>
                          <th className=" text-left text-[12px]">
                            Reference No
                          </th>
                          <th className=" text-left text-[12px]">
                            Payment Mode
                          </th>
                          <th className=" text-left text-[12px]">Amount</th>
                        </tr>
                      </thead>
                      {invoiceDetails.payments.map((val) => (
                        <tbody className="">
                          <tr key={val.id}>
                            <td className="pt-4">{val.paid_at}</td>
                            <td className="pt-4">{val.pending_payment_id}</td>
                            <td className="pt-4">{val.reference_number}</td>
                            <td className="pt-4">{val.mode}</td>
                            <td className="pt-4">¥ {val.amount}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className=" bg-white m-10" id="pdf-content">
              <div className=" px-4 py-5 bg-white h-screen border border-b-0 border-t-4  ">
                <div className="flex justify-between">
                  <label className="text-[16px] font-bold">Invoice</label>
                  <div className="flex">
                    <div>{invoiceDetails.number}</div>
                    <div>
                      {" "}
                      {invoiceDetails.status === "paid" ? (
                        <div>
                          <div className="bg-green-100 px-2.5 py-0.5 rounded ml-2 text-sm">
                            {invoiceDetails.status}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="px-2.5 py-0.5 text-right">
                            ¥ {invoiceDetails.due_amount}
                          </div>
                          <div className="px-2.5 py-0.5 rounded bg-red-200">
                            {invoiceDetails.status_description}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="opacity-[0.7] py-4 border-b-2">
                  {" "}
                  <p>NEW IT VENTURE CORPORATION Kopo</p>
                  <p>Yamato Bldg 2F, Tateishi 5-24-8</p>
                  <p> Katsushika-Ku, Tokyo 124-0012</p>
                </div>
                <div className="pt-4 flex justify-between">
                  <label className="font-bold ">Billed To:</label>
                  <label className="font-bold ">Invoice Date:</label>
                </div>
                {invoiceDetails.customer && (
                  <div className="pt-3 pb-9 flex justify-between">
                    <div className=" ">
                      <p className="font-bold">
                        {invoiceDetails.customer.first_name}&nbsp;
                        {invoiceDetails.customer.last_name}
                      </p>

                      <p>{invoiceDetails.customer.email}</p>
                      <p>{invoiceDetails.customer.mobile}</p>
                      <p>{invoiceDetails.customer.address}</p>
                    </div>
                    <label className="">{invoiceDetails.invoice_date}</label>
                  </div>
                )}
                <label className="text-[13px] font-bold">Order summary</label>
                <div>
                  <table className="w-full mt-8 mb-14">
                    <thead>
                      <tr className="bg-slate-50 rounded ">
                        <th className=" text-left text-[12px]">No</th>
                        <th className="px-4 text-left text-[12px]">
                          Description
                        </th>
                        <th className="px-4 text-left text-[12px]">Rate No</th>
                        <th className="px-4 text-left text-[12px]">Quantity</th>
                        <th className="pl-4 text-left text-[12px]">Total</th>
                      </tr>
                    </thead>
                    {invoiceDetails.charges &&
                      invoiceDetails.charges.map((val, index) => (
                        <tbody className="">
                          <tr key={val.id}>
                            <td className="px-4 py-6 border-b">{index + 1}</td>
                            <td className="px-4 py-6 border-b flex flex-col">
                              <label>{val.name}</label>
                              <label className="text-[11px] opacity-[0.5]">
                                {val.description}
                              </label>
                            </td>
                            <td className="px-4 py-6 border-b">
                              ¥{val.unit_price}
                            </td>
                            <td className="px-4 py-6 border-b text-right">
                              {val.quantity}
                            </td>
                            <td className="py-6 border-b text-right">
                              ¥ {val.unit_price * val.quantity}
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </table>
                  <div></div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Sub Total
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Tax Amount
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Discount
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Total
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Payment Made
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-end">
                    <p className="px-10 py-3 text-[13px] opacity-[0.7]">
                      Due Amount
                    </p>
                    <p className="py-3 text-[13px] opacity-[0.7]">¥ 394</p>
                  </div>
                  <div className="flex justify-center py-5">
                    <button
                      onClick={handleDownloadPDF}
                      className="text-[#34405499] text-lg border-2 border-slate-300 rounded px-8 py-4"
                    >
                      Download invoice
                    </button>
                    <button className="text-white text-lg bg-blue-400 border-2 border-slate-300 rounded ml-3 px-10 py-4 hover:bg-[#1776BD]">
                      Send to Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
