import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar"; // Adjust the path as needed
import Sidebar from "../Sidebar";

const FormDataTable = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Fetch data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get("https://server-side-main-eight.vercel.app/form/data");
      console.log("Fetched data:", response.data); // Log to verify the data
      setFormData(response.data.data || []); // Ensure data is set to state
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // Poll for new data every 5 seconds
  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Polling interval
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = formData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="container mt-6" style={{ marginLeft: "100px"}}>
          <h2 className="text-3xl font-semibold mb-4 text-center">Form Data</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="overflow-x-auto ms-20" style={{ maxHeight: "500px", overflowY: "auto" }}>
              <table className="min-w-full table-auto border-collapse bg-white dark:bg-slate-900 rounded-lg shadow-lg"  style={{ marginLeft: "15px"}}>
                <thead className="bg-gray-100 dark:bg-slate-800 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      People
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Departure Month
                    </th>
                    <th className="px-6 py-3 text-left text-lg font-medium text-gray-700 dark:text-slate-200">
                      Inquiry Page
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  ) : (
                    currentRows.map((entry, index) => (
                      <tr
                        key={entry._id}
                        className="border-t border-gray-200 dark:border-slate-700"
                      >
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {indexOfFirstRow + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.countryCode} {entry.phone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.subject}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.number}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.departureMonth}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 dark:text-slate-200">
                          {entry.inquiryPage}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="mt-4 flex justify-center items-center space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                {Array.from(
                  { length: Math.ceil(formData.length / rowsPerPage) },
                  (_, i) => (
                    <button
                      key={i + 1}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(formData.length / rowsPerPage)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === Math.ceil(formData.length / rowsPerPage)
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormDataTable;
