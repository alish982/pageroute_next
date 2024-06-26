import { useState, useEffect } from "react";
import { instanceOfAxios } from "@/components/others/localstorage";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import AddContact from "../contacts/addContact";

function Contacts({ id }) {
  const [subscriptionData, setsubscriptionData] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showUpdate, setShowUpdate] = useState(false);
  const [contact_id, setscriptionDataId] = useState({});
  const [showAdd, setShowAdd] = useState(false);

  const [initialValues, setInitialValue] = useState({
    last_name: "",
    email: "",
    phone: "",
    first_name: "",
    mobile: "",
    title: "",
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,

    onSubmit: async (values) => {
      let data = await instanceOfAxios
        .put(`customer/${id}/contacts/${contact_id}`, values)
        .then((response) => {
          if (response.status === 200) {
            setShowUpdate(false);
            test_it();
          }
        });
    },
  });

  const test_it = async () => {
    const response = await instanceOfAxios.get(`subscription/${id}`);
    setInitialValue(response.data.data.contacts);
    setsubscriptionData(response.data.data);
  };

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
    if (id) {
      test_it();
    }
  }, [id]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <table className="table-auto w-full">
          <thead className="border-b ">
            <tr className="text-left bg-[#F8F8F8] ">
              <th scope="col" className="px-6 py-4 text-gray-800 ">
                Name
              </th>
              <th scope="col" className="px-6 py-4 text-gray-800">
                Email
              </th>
              <th scope="col" className="px-1 py-4 text-gray-800">
                Phone
              </th>
              <th scope="col" className="px-6 py-4 text-gray-800">
                Mobile
              </th>
              <th scope="col" className="px-6 py-4 text-gray-800">
                Title
              </th>
            </tr>
          </thead>

          <tbody>
            {subscriptionData.contacts &&
              subscriptionData.contacts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-[#EEEEEF] hover:bg-[#f7f7f8] "
                >
                  <td scope="row" className="px-6 py-4">
                    {post.first_name} {post.last_name}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {post.email === null ? <p>-</p> : post.email}
                  </td>
                  <td className="px-1 py-4">
                    {post.phone === null ? <p>-</p> : post.phone}
                  </td>
                  <td className="px-6 py-4">
                    {post.mobile === null ? <p>-</p> : post.mobile}
                  </td>
                  <td className="px-6 py-4">
                    {post.title === null ? <p>-</p> : post.title}
                  </td>
                  <td className="px-6 py-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-[#A3A5A7] hover:text-black "
                      onClick={(e) => {
                        handleClick(e);
                        setInitialValue(post);
                        setscriptionDataId(post.id);
                      }}
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
        {showOption ? (
          <div
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
              <li className="my-1" onClick={() => setShowAdd(true)}>
                Add new
              </li>
              <li className="my-1" onClick={() => setShowUpdate(true)}>
                update
              </li>
              <li
                className="my-1"
                onClick={() => {
                  instanceOfAxios
                    .delete(`customer/${id}/contacts/${contact_id}`)
                    .then((response) => {
                      if (response.status === 200) {
                        console.log("deleted");
                        test_it();
                      }
                    });
                }}
              >
                delete
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}
        {showUpdate ? (
          <div className="fixed top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-white border-2 rounded">
              <div className="h-[500px]  py-10 px-8 ">
                <label className="font-bold text-[20px] capitalize">
                  Update Contact
                </label>
                <div className="my-7">
                  <label className="block text-[14px] font-bold mb-4">
                    Email
                  </label>
                  <input
                    className="bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline focus:border-blue-300 "
                    type="email"
                    value={initialValues.email}
                    onChange={(newVal) => {
                      formik.setFieldValue("email", newVal.target.value);
                      setInitialValue((currVal) => {
                        currVal.email = newVal.target.value;
                        return currVal;
                      });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-7">
                    <label className="block text-[14px] font-bold font-bold mb-2">
                      First Name
                    </label>
                    <input
                      className=" bg-slate-200 w-full h-[40px] py-2 px-3 text-gray-700 leading-tight"
                      type="text"
                      value={formik.values.first_name}
                      onChange={(newVal) => {
                        formik.setFieldValue("first_name", newVal.target.value);
                        setInitialValue((currVal) => {
                          currVal.first_name = newVal.target.value;
                          return currVal;
                        });
                      }}
                    />
                  </div>
                  <div className="mb-7">
                    <label className="block text-[14px] font-bold font-bold mb-2">
                      Last Name
                    </label>
                    <input
                      className=" bg-slate-200 rounded w-full h-[40px]  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={initialValues.last_name}
                      onChange={(newVal) => {
                        formik.setFieldValue("last_name", newVal.target.value);
                        setInitialValue((currVal) => {
                          currVal.last_name = newVal.target.value;
                          return currVal;
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="mb-7">
                  <label className="block text-[14px] font-bold font-bold mb-2">
                    Phone
                  </label>
                  <input
                    className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={initialValues.phone}
                    onChange={(newVal) => {
                      formik.setFieldValue("phone", newVal.target.value);
                      setInitialValue((currVal) => {
                        currVal.phone = newVal.target.value;
                        return currVal;
                      });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-7">
                    <label className="block text-[14px] font-bold font-bold mb-2">
                      Mobile
                    </label>
                    <input
                      className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={initialValues.mobile}
                      onChange={(newVal) => {
                        formik.setFieldError("mobile", newVal.target.value);
                        setInitialValue((currVal) => {
                          currVal.mobile = newVal.target.value;
                          return currVal;
                        });
                      }}
                    />
                  </div>

                  <div className="mb-7">
                    <label className="block text-[14px] font-bold font-bold mb-2">
                      Title
                    </label>
                    <input
                      className=" bg-slate-200 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={initialValues.title}
                      onChange={(newVal) => {
                        formik.setFieldValue("title", newVal.target.value);
                        setInitialValue((currVal) => {
                          currVal.title = newVal.target.value;
                          return currVal;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-8 py-6 mb-5">
                <button
                  className="px-10 py-4 bg-[#309FED] text-white rounded"
                  type="submit"
                >
                  Update
                </button>
                {}
                <button
                  className="px-10 py-4 bg-white border border-slate-400 rounded"
                  onClick={() => {
                    setShowUpdate(false);
                  }}
                >
                  Cancel{" "}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </form>
      {showAdd && <AddContact id={id} setShowAdd={setShowAdd} />}
    </>
  );
}

export default Contacts;
