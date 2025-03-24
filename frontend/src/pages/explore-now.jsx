import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import DetailSidebar from "../components/detail-sidebar";
import AddItenarary from "./dashboard/Admin/addItenarary";
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

import { FiClock, FiActivity, FiUsers, FiGlobe, FiDollarSign, FiMapPin, FiCamera, FiChevronUp,} from "react-icons/fi";

export default function TourDetailPage() {
  const { id } = useParams(); // Extract the tour ID from the URL
  const [tour, setTour] = useState(null);
  const [images, setImages] = useState([]);
  const [inclusions, setInclusions] = useState([]); // Add inclusions state
  const [exclusions, setExclusions] = useState([]); // Add exclusions state
  const [faqData, setFaqData] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const BASE_URL = "https://server-side-main-eight.vercel.app"; // Backend server URL

  // Fetch Tour Details and Gallery Images
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        if (!id) throw new Error("Invalid Tour ID");

        const response = await axios.get(`${BASE_URL}/api/tours/${id}`);
        if (response.data) {
          setTour(response.data);
          setImages(response.data.galleryImages || []); // Fetch gallery images
          setInclusions(response.data.inclusions || []); // Fetch inclusions
          setExclusions(response.data.exclusions || []);
          setFaqData(response.data.faq || []); // Fetch FAQs
        } else {
          throw new Error("Tour not found.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Error fetching tour details");
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleCLick = (index) => {
    console.log(`Image ${index + 1} clicked`);
    // Add lightbox or modal implementation here if needed
    
  };


  // Fallback to ensure proper structure even if there are fewer images
  const [image1, image2, image3, image4, image5] = [
    images[0] || "",
    images[1] || "",
    images[2] || "",
    images[3] || "",
    images[4] || "",         
  ];

  if (loading) return <div className="text-center mt-20">Loading tour details...</div>;
  if (error) return <div className="text-center text-red-500 mt-20">{error}</div>;

  return (
    <>
      <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />

      <div className="container-fluid relative mt-10">
                <div className="md:flex mt-20">
                  <div className="lg:w-1/2 md:w-1/2 p-1">
                    <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                      <img src={image1} alt="Gallery Image 1" />
                      <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"> </div>
                      <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                        <Link
                          to="#"
                          onClick={() => handleCLick(0)}
                          className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox">
                          <FiCamera className="size-4 align-middle" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2 md:w-1/2">
                    <div className="flex">
                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image2} alt="Gallery Image 2"/>
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(1)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image3} alt="Gallery Image 3" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(2)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox">
                              <FiCamera className="size-4 align-middle" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image4} alt="Gallery Image 4"/>
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(3)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle"/>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="w-1/2 p-1">
                        <div className="group relative overflow-hidden rounded-md shadow dark:shadow-gray-800">
                          <img src={image5} alt="Gallery Image 5" />
                          <div className="absolute inset-0 group-hover:bg-slate-900/70 duration-500 ease-in-out"></div>
                          <div className="absolute top-1/2 -translate-y-1/2 start-0 end-0 text-center opacity-0 group-hover:opacity-100 duration-500">
                            <Link
                              to="#"
                              onClick={() => handleCLick(4)}
                              className="inline-flex justify-center items-center size-9 bg-red-500 text-white rounded-full lightbox"
                            >
                              <FiCamera className="size-4 align-middle"/>
                            </Link>   
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            


      {/* Hero Section */}
      <section className="relative md:pb-24 pb-16 mx-6 mt-10">
        <div className="container-fluid">
          <div className="md:flex">
            {/* Main Content Section */}
            <div className="lg:w-3/4 p-4">
              <h5 className="text-3xl font-semibold">{tour.heading}</h5>
              <p className="flex items-center text-slate-600 font-medium mt-2">
                <FiMapPin className="size-4 me-1" /> {tour.country || "Unknown Country"}
              </p>  

              {/* Tour Details Icons */}
              <div className="flex items-center flex-wrap gap-6 bg-gray-100 dark:bg-slate-800 p-6 rounded-lg shadow mt-6">
                <div className="flex items-center gap-3">
                  <FiClock className="text-red-500 size-6"/>
                  <div>
                    <p className="font-semibold">Duration</p>
                    <p className="text-slate-600">{tour.duration || "N/A"} Days</p>
                  </div>
                </div>   

                <div className="flex items-center gap-3">
                  <FiActivity className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Type</p>
                    <p className="text-slate-600">{tour.type || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiUsers className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Group Size</p>
                    <p className="text-slate-600">{tour.groupSize || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FiGlobe className="text-red-500 size-6" />
                  <div>
                    <p className="font-semibold">Languages</p>
                    <p className="text-slate-600">{tour.language || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiDollarSign className="text-red-500 size-6"/>
                  <div>
                    <p className="font-semibold">Price</p>
                    <p className="text-slate-600">₹{tour.pricePerDay || "N/A"} / Day</p>
                  </div>
                </div>
              </div>

              {/* Tour Description */}
              <div className="mt-6">
                <h5 className="text-xl font-semibold">Tour Description</h5>  
                <p className="text-slate-600 mt-4">{tour.description || "No description available."}</p>
              </div>


              <div className="mt-6 w-full flex flex-col md:flex-row gap-6">
  {/* Itinerary Section */}
  {tour.itinerary && tour.itinerary.length > 0 && (
  <div className="w-full md:w-1/2">
    <h5 className="text-xl font-semibold text-center md:text-left">Itinerary:</h5>
    <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded shadow">
      {tour.itinerary.map((day, index) => (
        <div
          key={index}
          className="my-3 border border-gray-500 rounded p-3">
          <details className="group">
            <summary className="flex items-center text-center cursor-pointer font-bold text-gray-800">
              Day {day.day}: {day.title}
              <span className="ml-auto transition-transform group-open:rotate-180 text-red-500">
                <FiChevronUp />
              </span>
            </summary>
            <div className="mt-2 text-gray-600">
              <p>{day.description}</p>  
            </div>
          </details>
        </div>
      ))}
    </div>
  </div>
)}

  {/* FAQ Section */}
  {faqData && faqData.length > 0 && (
  <div className="w-full md:w-1/2">
    <h3 className="text-xl font-semibold text-center md:text-left">Questions & Answers:</h3>
    <div className="mt-4">
      {faqData.length > 0 ? (
        faqData.map((item, index) => (
          <div
            className="relative shadow dark:shadow-gray-800 rounded-md overflow-hidden mt-4 first:mt-0"
            key={index}
          >
            <h2 className="text-base font-semibold">
              <button
                type="button"
                className={`flex justify-between items-center p-5 w-full font-medium text-start ${
                  activeTab === index
                    ? "bg-gray-50 dark:bg-slate-800 text-red-500"
                    : ""
                }`}
                onClick={() => setActiveTab(index)}
              >
                <span>{item.question}</span>
                <FiChevronUp
                  className={`size-4 shrink-0 ${
                    activeTab === index ? "" : "rotate-180"
                  }`}
                />
              </button>
            </h2>
            <div className={activeTab === index ? "" : "hidden"}>
              <div className="p-5">
                <p className="text-slate-400 dark:text-gray-400">
                  {item.answer}
                </p>
              </div>
            </div>
        
          </div>
        ))
      ) : (
        <p className="text-slate-400">No FAQs available for this tour.</p>
      )}
    </div>
  </div>
  )}
</div>

{/* Inclusions and Exclusions */}
<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Inclusions */}
  {inclusions && inclusions.length > 0 && (
  <div>
    <h4 className="text-xl font-semibold">Inclusions:</h4>
    <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-600">
      {inclusions.length > 0
        ? inclusions.map((item, index) => <li key={index}>{item}</li>)
        : <li>No inclusions available for this tour.</li>}
    </ul>
  </div>
  )}

  {/* Exclusions */}
  {exclusions && exclusions.length > 0 && (
  <div>
    <h4 className="text-xl font-semibold">Exclusions:</h4>
    <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-600">
      {exclusions.length > 0
        ? exclusions.map((item, index) => <li key={index}>{item}</li>)
        : <li>No exclusions available for this tour.</li>}
    </ul>
  </div>
  )}
</div>
       {/* privacy policy and other content */}
<AddItenarary />

            </div>

          
  

            {/* Sidebar Section */}
            <div className="lg:w-1/4 md:w-1/3">
              <DetailSidebar tourPlace={tour.heading || "Unknown Destination"} />
            </div>
          </div>
        </div>
      </section>
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
        />
      )}

      <Footer />
      <Switcher />
      
    </>
  );
}