import { instanceOfAxios } from "@/components/others/localstorage";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

export default function Profile({ formik }) {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [optionProvince, setOptionProvince] = useState([]);
  const [optionCity, setoptionCity] = useState("");
  const [optionaddress, setoptionAddress] = useState("");

  return (
    <div className="-mt-12">
      <div className="w-full shadow-md rounded px-2 pt-14 pb-8 mb-4">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 mb-2"
              htmlFor="grid-last-name"
            >
              Postal Code
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              name="zipcode"
              maxLength="7"
              placeholder="5200461"
              value={formik.values.zipcode}
              onBlur={formik.handleBlur}
              onChange={(e) => {
                formik.setFieldValue("zipcode", e.target.value);
                if (e.target.value.length === 7) {
                  const response = instanceOfAxios
                    .get(`postal_codes/` + e.target.value)
                    .then((response) => {
                      setCity(response.data.data.city_en);
                      setAddress(response.data.data.town_en);
                      let option = instanceOfAxios
                        .get(`postal_codes/list-view/prefecture`)
                        .then((res) => {
                          setOptionProvince(
                            res.data.data.map((row) => {
                              let newRow = {};
                              newRow.value = row;
                              newRow.label = row;
                              return newRow;
                            })
                          );
                          formik.setFieldValue(
                            "province",
                            response.data.data.pref_en
                          );
                          formik.setFieldValue(
                            "city",
                            response.data.data.city_en
                          );
                          formik.setFieldValue(
                            "address",
                            response.data.data.town_en
                          );
                        });
                    });
                }
                formik.handleChange;
              }}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              province
            </label>

            <Select
              className="appearance-none text-red-600 block w-full rounded mb-2 "
              name="province"
              value={{
                value: formik.values.province,
                label: formik.values.province,
              }}
              options={optionProvince}
              onChange={(newVal) => {
                formik.setFieldValue("province", newVal.value);
                instanceOfAxios
                  .get(`postal_codes/city-list/` + newVal.value)
                  .then((res) => {
                    setoptionCity(
                      res.data.data.map((row) => {
                        let newRow = {};
                        newRow.value = row;
                        newRow.label = row;
                        return newRow;
                      })
                    );
                  });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              city
            </label>
            <Select
              className="appearance-none text-red-600 block w-full rounded mb-2 "
              type="text"
              placeholder=""
              options={optionCity}
              name="city"
              value={{
                value: formik.values.city,
                label: formik.values.city,
              }}
              onChange={(newVal) => {
                formik.setFieldValue("city", newVal.value);
                instanceOfAxios
                  .get(`postal_codes/town-list/` + newVal.value)
                  .then((res) => {
                    setoptionAddress(
                      res.data.data.map((row) => {
                        let newRow = {};
                        newRow.value = row;
                        newRow.label = row;
                        return newRow;
                      })
                    );
                  });
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              address
            </label>
            <Select
              className="appearance-none text-red-600 block w-full rounded mb-2"
              type="text"
              placeholder=""
              name="address"
              options={optionaddress}
              value={{
                value: formik.values.address,
                label: formik.values.address,
              }}
              onChange={(newVal) => {
                formik.setFieldValue("address", newVal.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* value={initialValue.name}
          onChange=
          {(newVal) => {
            console.log(newVal.target.value);
            formik.setFieldValue("name", newVal.target.value);
            setInitialValue((currVal) => {
              currVal.name = newVal.target.value;
              return currVal;
            });
            console.log(newVal.target.value);
          }} */}

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              building
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=""
              name="building"
              value={formik.values.building}
              onChange={(newVal) => {
                formik.setFieldValue("building", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Date of Birth
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=".."
              name="dob"
              value={formik.values.dob}
              onChange={(newVal) => {
                formik.setFieldValue("dob", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              mailing address
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="example@gmail.com"
              name="mailing_address"
              value={formik.values.mailing_address}
              onChange={(newVal) => {
                formik.setFieldValue("mailing_address", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              whattsup
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="9600000000"
              name="whattsup"
              value={formik.values.whattsup}
              onChange={(newVal) => {
                formik.setFieldValue("whattsup", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Facebook
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="varcar"
              placeholder=""
              name="facebook"
              value={formik.values.facebook}
              onChange={(newVal) => {
                formik.setFieldValue("facebook", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Line
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=""
              name="line"
              value={formik.values.line}
              onChange={(newVal) => {
                formik.setFieldValue("line", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              profession
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=""
              name="profession"
              value={formik.values.profession}
              onChange={(newVal) => {
                formik.setFieldValue("profession", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Nationality
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder=""
              name="nationality"
              value={formik.values.nationality}
              onChange={(newVal) => {
                formik.setFieldValue("nationality", newVal.target.value);
                console.log(newVal.target.value);
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
