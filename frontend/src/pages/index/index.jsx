import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Tagline from "../../components/tagline";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Switcher from "../../components/switcher";
import TopDestinationTwo from "../../components/top-destination-two";
import Client from "../../components/client";

import bg from "../../assets/images/bg/cta.jpg"; // Update with the correct path to your banner image
import { FiMapPin, FiX, FaStar } from "../../assets/icons/vander";
import Inquiry from "../inquiryForm"; // Assuming you have an Inquiry component
import { Parallax } from "react-parallax";

export default function TourGrid() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const BASE_URL = "https://server-side-main-eight.vercel.app";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    email: "",
    subject: "",
    number: "",
    departureMonth: "",
    inquiryPage: "bannerSection",
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get("https://server-side-main-eight.vercel.app/api/tours");
        setTours(response.data || []);
      } catch (error) {
        setError("Failed to load tours");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const openModal = (tour) => {
    setSelectedTour(tour);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTour(null);
    setModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://server-side-main-eight.vercel.app/form/submit", formData);
      alert(response.data.message); // Success message
      setFormData({
        name: "",
        countryCode: "",
        phone: "",
        email: "",
        subject: "",
        number: "",
        departureMonth: "",
        inquiryPage: "IndexPage",
      });
    } catch (error) {
      console.error("Error submitting form:", error.response?.data?.message || error.message);
      alert("Something went wrong!");
    }
  };

  return (
    <>
      <Tagline />
      <Navbar navclass="defaultscroll is-sticky tagline-height" navlight={true} manuclass="justify-end nav-light" />
     <section className="relative py-28 md:py-32 lg:py-36 bg-cover bg-center jarallax flex items-center" data-jarallax data-speed="0.5">
  <Parallax bgImage={bg} bgImageAlt="Adventure" strength={200} className="absolute inset-0" />
  <div className="absolute inset-0 bg-slate-900/50"></div>

  <div className="container relative">
    <div className="grid lg:grid-cols-12 items-center gap-10">
      {/* Left Content */}
      <div className="lg:col-span-7 text-center lg:text-left">
        <h5 className="text-2xl md:text-3xl font-dancing text-white">Your Next Adventure Awaits!</h5>
        <h4 className="font-bold text-white leading-snug text-3xl md:text-5xl lg:text-6xl my-4">
          Where Do You <br className="hidden md:block" /> Want To Go?
        </h4>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
          From exotic destinations to cozy retreats, we’ve got everything you need to start your journey. Pack your bags today!
        </p>
      </div>

      {/* Right Form */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-xl w-full max-w-md">
          <h3 className="text-lg md:text-xl font-semibold text-center mb-4">Plan Your Trip</h3>
          <form onSubmit={handleSubmit}>
                  <div className="grid gap-4">
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Name"
                      className="border rounded p-2 w-full"
                      required
                    />
                    <div className="flex space-x-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-20 border rounded p-2"
                        required
                      >
  
                        <option value="+91">+91 (India)</option>
                        <option value="+1">+1</option>
                        <option value="+7">+7 (Russia)</option>
<option value="+66">+66 (Thailand)</option>
<option value="+81">+81 (Japan)</option>
<option value="+82">+82 (S. Korea)</option>
<option value="+84">+84 (Vietnam)</option>
<option value="+86">+86 (China)</option>
<option value="+90">+90 (Turkey)</option>
<option value="+92">+92 (Pakistan)</option>
<option value="+93">+93 (Afghanistan)</option>
<option value="+94">+94 (Sri Lanka)</option>
<option value="+95">+95 (Myanmar)</option>
<option value="+960">+960 (Maldives)</option>
<option value="+961">+961 (Lebanon)</option>
<option value="+962">+962 (Jordan)</option>
<option value="+963">+963 (Syria)</option>
<option value="+964">+964 (Iraq)</option>
<option value="+965">+965 (Kuwait)</option>
<option value="+966">+966 (Saudi)</option>
<option value="+967">+967 (Yemen)</option>
<option value="+968">+968 (Oman)</option>
<option value="+970">+970 (Palestine)</option>
<option value="+971">+971 (UAE)</option>
<option value="+972">+972 (Israel)</option>
<option value="+973">+973 (Bahrain)</option>
<option value="+974">+974 (Qatar)</option>
<option value="+975">+975 (Bhutan)</option>
<option value="+976">+976 (Mongolia)</option>
<option value="+977">+977 (Nepal)</option>
<option value="+992">+992 (Tajikistan)</option>
<option value="+993">+993 (Turkmenistan)</option>
<option value="+994">+994 (Azerbaijan)</option>
<option value="+995">+995 (Georgia)</option>
<option value="+996">+996 (Kyrgyzstan)</option>
<option value="+998">+998 (Uzbekistan)</option>
<option value="+855">+855 (Cambodia)</option>
<option value="+856">+856 (Laos)</option>
<option value="+880">+880 (Bangladesh)</option>
<option value="+886">+886 (Taiwan)</option>
<option value="+852">+852 (Hong Kong)</option>
<option value="+853">+853 (Macau)</option>
<option value="+670">+670 (Timor-Leste)</option>
<option value="+673">+673 (Brunei)</option>
<option value="+60">+60 (Malaysia)</option>
<option value="+62">+62 (Indonesia)</option>
<option value="+63">+63 (Philippines)</option>

                      </select>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Phone"
                        className="border rounded p-2 w-full"
                        required
                      />
                    </div>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      className="border rounded p-2 w-full"
                      required
                    />
                    <input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      type="text"
                      placeholder="Destination"
                      className="border rounded p-2 w-full"
                      required
                    />
                <input
                          name="number"
                          value={formData.number}
                          onChange={handleChange}
                          id="numberInput"
                          type="number"
                          className="w-full py-2 px-3 mt-2 mb-2 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                          placeholder="No. of People"
                          required
                        />

                    <select
                      name="departureMonth"
                      value={formData.departureMonth}
                      onChange={handleChange}
                      className="border rounded p-2 w-full"
                      required
                    >
                      <option value="" disabled>Select Month of Departure</option>
                     <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                      {/* Add other months */}
                    </select>
                    <button
                      type="submit"
                      className="bg-red-500 text-white p-2 rounded w-full hover:bg-red-600">
                      Submit Inquiry
                    </button>
                  </div>
                </form>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="relative md:py-24 py-16">
        {/* Tours Section */}
        <TopDestinationTwo />
        <div className="mt-10 container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Tour Packages
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Planning for a trip? We will organize your trip with the best places and within the best budget!
            </p>
          </div>
          {/* packages from backend*/}
          {loading ? (
            <div className="text-center">Loading tours...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : tours.length > 0 ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-6 gap-8">
             {tours
    .sort((a, b) => {
      // Parse the upload dates and sort in descending order (most recent first)
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA; // Descending order
    }) 
    .slice(0, 20) // Limit to 5 rows (4 items per row = 20 items)
    .map((tour, index) => (
                <div
                  className="group rounded-md shadow dark:shadow-gray-700 cursor-pointer"
                  key={index}
                  onClick={() => navigate(`/tour/${tour._id}`)}
                >
                  <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 mx-2 mt-2">
                    <img
                      src={tour.coverImage}
                      className="scale-125 group-hover:scale-100 duration-500"
                      alt={tour.place || "Tour"}
                    />
                    {tour.country && (
                      <div className="absolute top-0 start-0 p-4">
                        <span className="bg-red-500 text-white text-[12px] px-2.5 py-1 font-medium rounded-md h-5">
                           {tour.country}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="flex items-center text-slate-400 font-medium mb-2">
                      <FiMapPin className="text-red-500 size-4 ms-2" />
                      {tour.place || "Unknown Location"}
                      <span className="flex ms-12 bg-red-500 text-white text-[12px] px-2 py-1 font-medium rounded-md h-6">
                      <FaStar className="text-yellow-200 size-4 me-1"/> {tour.rating}
                      </span>
                    </p>

                    <Link
                      to={`/tour/${tour._id}`}
                      className="text-lg font-medium hover:text-red-500 duration-500 ease-in-out">
                      {tour.heading}
                    </Link>
                    <div className="mt-3 pt-3 flex justify-between items-center border-t border-slate-100 dark:border-gray-800">
                      <h5 className="text-lg font-medium text-red-500">₹&nbsp;{tour.price}</h5>
                      <s className="text-gray"><p className="font-medium bg-red text-red-500">₹&nbsp;{tour.discountPrice}</p></s>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(tour);
                        }}
                        className="text-slate-400 hover:text-red-500">
                        Explore Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No tours available.</div>
          )}
        </div>
      </section>
      <Client />
      <Footer />
      <Switcher/>
      {modalVisible && selectedTour && (
              <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
              onClick={closeModal}>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg relative w-11/12 md:w-2/3 lg:w-1/2 hiddden">
                  <button
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 hidden"
                    onClick={closeModal}>
                    <FiX size={24}/>
                  </button>
                  <div className="p-6 hidden">
                    <h3 className="text-2xl font-semibold mb-4">Inquiry for {selectedTour.place}</h3>
                    {/* Inquiry Form */} 
                  </div>
                  <Inquiry tourPlace={selectedTour.heading}/> 
                </div>
              </div>
            )}  
          </>
        );
      }
