import React, { useState, useEffect } from "react";
import axios from "axios";
import EditTourModal from "./editTourModal"; // Import the modal for editing
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import '../../dashboard/dashboard.css';

const EditTour = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]); // For filtered data
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedTour, setSelectedTour] = useState(null); // Modal state for viewing full description
  const [editingTour, setEditingTour] = useState(null); // Modal state for editing tour
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal open state for editing
  const rowsPerPage = 10; // Number of rows per page

  // Fetch tours from the API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://server-side-main-eight.vercel.app/api/tours");
        setTours(response.data);
        setFilteredTours(response.data); // Initialize filtered tours
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Handle Delete Functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      try {
        await axios.delete(`https://server-side-main-eight.vercel.app/api/tours/${id}`);
        setTours(tours.filter((tour) => tour._id !== id)); // Update state
        alert("Tour deleted successfully!");
      } catch (error) {
        console.error("Error deleting tour:", error);
        alert("Failed to delete the tour. Please try again.");
      }
    }
  };

  

  // Open the modal for editing
  const handleEditClick = (tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
  };

  // Update a tour after editing
  const handleUpdateTour = (updatedTour) => {
    setTours((prevTours) =>
      prevTours.map((tour) =>
        tour._id === updatedTour._id ? updatedTour : tour
      )
    );
  };

// Filter tours by search term
const handleSearch = (event) => {
  const term = event.target.value.toLowerCase();
  setSearchTerm(term);
  const filtered = tours.filter((tour) =>
    tour.heading.toLowerCase().includes(term)
  );
  setFilteredTours(filtered);
  setCurrentPage(0); // Reset to the first page when searching
};

   // Pagination logic
   const totalPages = Math.ceil(filteredTours.length / rowsPerPage);
   const currentPageTours = filteredTours.slice(
     currentPage * rowsPerPage,
     (currentPage + 1) * rowsPerPage
   );


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Dashboard Content */}
        <main className="flex-grow ml-52 p-4 mt-2 overflow-auto">
          <div className="p-6 bg-gray-100">
            {/* Fixed Heading */}
            <h2 className="text-2xl font-bold mt-2 mb-4 bg-gray-100 z-10">
              Edit Tours
            </h2>
            {/* Search Bar */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by Heading"
                className="p-2 w-full border-black rounded"
              />
            </div>
            {loading ? (
              <div className="text-center mt-16">
                <p>Loading tours...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200 ">
                    <tr>
                      <th className="px-4 py-2 text-left">Cover Image</th>
                      <th className="px-4 py-2 text-left">Gallery</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-left">Place</th>
                      <th className="px-4 py-2 text-left">Rating</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Discount</th>
                      <th className="px-4 py-2 text-left">Duration</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {currentPageTours.map((tour) => (
                      <tr key={tour._id} className="hover:bg-gray-100">
                        {/* Cover Image */}
                        <td className="px-4 py-2">
                          <img
                            src={tour.coverImage}
                            alt="Cover"
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>

                        {/* Gallery Images */}
                        <td className="px-4 py-2">
                          {tour.galleryImages.slice(0, 2).map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Gallery ${index}`}
                              className="w-10 h-10 object-cover inline-block rounded mr-1"
                            />
                          ))}
                          {tour.galleryImages.length > 2 && (
                            <span className="text-sm text-gray-600">
                              +{tour.galleryImages.length - 2} more
                            </span>
                          )}
                        </td>

                        {/* Other Columns */}
                        <td className="px-4 py-2">{tour.type}</td>
                        <td className="px-4 py-2">{tour.place}</td>
                        <td className="px-4 py-2">{tour.rating}</td>
                        <td className="px-4 py-2">₹{tour.discountPrice}</td>
                        <td className="px-4 py-2">₹{tour.price}</td>
                        <td className="px-4 py-2">{tour.duration}</td>

                        {/* Truncated Description */}
                        <td className="px-4 py-2">
                          {tour.description.length > 50 ? (
                            <>
                              {tour.description.substring(0, 50)}...
                              <button
                                onClick={() => setSelectedTour(tour)}
                                className="text-blue-500 ml-2 hover:underline"
                              >
                                View More
                              </button>
                            </>
                          ) : (
                            tour.description
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleEditClick(tour)}
                            className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tour._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                  
                </table>

                {/* Pagination */}
                {/* <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage + 1 >= totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Next
                  </button>
                </div> */}
                
              </div>
              
            )}
          </div>
          <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded-l hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage + 1 >= totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Next
                  </button>
                </div>
        </main>
      </div>

      {/* Modal for Viewing Full Description */}
      {selectedTour && (
      <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg h-[60vh] overflow-y-auto p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">
              Heading: {selectedTour.heading}
            </h3>
            <p className="mb-4">
              <strong>Tour:</strong> {selectedTour.country}
            </p>
            <p className="mb-4">
              <strong>Group-Size:</strong> {selectedTour.groupSize}
            </p>
            <p className="mb-4">
              <strong>Price Per Day:</strong> {selectedTour.pricePerDay}
            </p>
            <p className="mb-4">
              <strong>Description:</strong> {selectedTour.description}
            </p>
            <button
              onClick={() => setSelectedTour(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Editing Tour */}
      {isModalOpen && editingTour && (
        <EditTourModal
          tour={editingTour}
          onClose={handleCloseModal}
          onUpdate={(updatedTour) => {
            handleUpdateTour(updatedTour);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
};

export default EditTour;