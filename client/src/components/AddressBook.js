import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddressBook() {
  //   const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  const baseURL = "http://localhost:8000/api/v1/address";
  const validateAddress = () => {
    if (
      !newAddress.street.trim() ||
      !newAddress.city.trim() ||
      !newAddress.state.trim() ||
      !newAddress.zip.trim()
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }

    const zipCodePattern = /^[0-9]{6}$/;
    if (!zipCodePattern.test(newAddress.zip)) {
      toast.error("Please enter a valid ZIP code.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddress()) {
      return;
    }
    try {
      const response = await axios.post(baseURL, {
        body: newAddress,
      });
      if (response.data.statusCode == 201) {
        toast.success("Address added successfully");
        // fetchAddresses();
        setNewAddress({ street: "", city: "", state: "", zip: "" });
      } else {
        toast.error("Failed to add address");
      }
    } catch (error) {
      console.log("response", error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-1 flex-col mx-auto p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Address Book</h1>
      <form onSubmit={handleSubmit} className="sm:w-full mb-4">
        <div className="flex flex-col -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-2 flex-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              street
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="street"
              value={newAddress.street}
              onChange={handleChange}
              placeholder="Albuquerque"
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                name="city"
                value={newAddress.city}
                onChange={handleChange}
                type="text"
                placeholder="Albuquerque"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="state"
                  value={newAddress.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a State</option>
                  {indianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Zip
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="zip"
                maxLength={6}
                value={newAddress.zip}
                onChange={handleChange}
                placeholder="400607"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white max-w-48 font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out flex justify-center items-center"
        >
          Save Address
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddressBook;
