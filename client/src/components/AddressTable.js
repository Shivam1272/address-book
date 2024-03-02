import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateAddressModal from "./UpdateAddressModal";
import { toast } from "react-toastify";

const AddressesTable = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [addressesPerPage] = useState(10); // Adjust based on your preference
  const [totalAddresses, setTotalAddresses] = useState(0);

  // Fetch addresses from the API
  const baseURL = "http://localhost:8000/api/v1/address";
  useEffect(() => {
    fetchAddresses();
  }, [currentPage, addressesPerPage]);
  const totalPages = Math.ceil(totalAddresses / addressesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `${baseURL}?page=${currentPage}&limit=${addressesPerPage}`
      ); // Adjust the URL based on your API endpoint
      //   console.log(response);
      setAddresses(response.data.data); // Adjust based on your API response structure
      setTotalAddresses(response.data.total);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  //   console.log(addresses);
  // Function to handle delete (placeholder)
  const handleDelete = async (id) => {
    console.log("Delete address with id:", id);
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const res = await axios.delete(`${baseURL}/${id}`); // Adjust this URL to your API endpoint
        // console.log(res);
        toast.success(res.data.message);
        fetchAddresses(); // Refresh the list of addresses after deletion
      } catch (error) {
        // console.error("Error deleting address:", error);
        toast.success(error.data.msg);
      }
    }
  };

  // Function to handle update (placeholder)
  const handleUpdate = (address) => {
    setCurrentAddress(address);
    setIsModalOpen(true);
  };
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="hidden md:table-cell px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {addresses.map((address) => (
            <tr key={address._id}>
              <td className="px-2 md:px-6 py-4 whitespace-normal md:whitespace-nowrap text-sm text-gray-900">
                {address.street}, {address.city}, {address.state}, {address.zip}
              </td>
              <td className="px-2 md:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleUpdate(address)}
                  className="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(address._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <UpdateAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={currentAddress}
        refreshAddresses={fetchAddresses} // Pass fetchAddresses to refresh the list after an update
      />
      <nav className="py-8">
        <ul className="flex pl-0 list-none rounded my-2 justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className="mr-3">
              <button
                onClick={() => paginate(index + 1)}
                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
                  currentPage === index + 1 ? "bg-gray-400" : ""
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AddressesTable;
