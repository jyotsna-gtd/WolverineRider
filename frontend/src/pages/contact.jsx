import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Switcher from "../components/switcher";
import axios from "axios";

import { FiPhone, FiMail, FiMapPin, FiX } from "react-icons/fi"; // Importing icons from react-icons
import travel from "../assets/images/travel-train-station.svg";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    email: "",
    subject: "",
    number: "",
    departureMonth: "",
    inquiryPage: "contactPage",
  });

  const [modal, setModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the formData to check if it is correct
    console.log(formData);
  
    try {
      const response = await axios.post('https://server-side-main-eight.vercel.app/form/submit', formData);
  
      alert(response.data.message); // Success message
      setFormData({ name: "", countryCode: "", phone: "", email: "", subject: "", number: "", departureMonth: "",  inquiryPage: "contactPage"  });
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.message || error.message);
      alert('Something went wrong!');
    }
  };
  
  return (
    <>
      <Navbar navclass="defaultscroll is-sticky" navlight={false} manuclass="justify-end" />
      <div className="container-fluid relative mt-20">
        <div className="grid grid-cols-1">
          <div className="w-full leading-[0] border-0">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d448286.8577153205!2d77.135558!3d28.622536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0331eb2e4b5f%3A0x9604516c746d2703!2sWolverine%20Rider!5e0!3m2!1sen!2sus!4v1731918109094!5m2!1sen!2sus"
              style={{ border: "0" }}
              title="Wolverine-rider"
              className="w-full h-[500px]"
            ></iframe>
          </div>
        </div>
      </div>

      <section className="relative lg:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
            <div className="lg:col-span-7 md:col-span-6">
              <img src={travel} className="w-full max-w-[500px] mx-auto" alt="Travel Illustration" />
            </div>
            <div className="lg:col-span-5 md:col-span-6">
              <div className="lg:ms-5">
                <div className="bg-white dark:bg-slate-900 shadow-lg mb-5 bg-body-tertiary rounded dark:shadow-gray-800 p-6">
                  <h3 className="mb-6 text-2xl leading-normal font-semibold">Get in touch!</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                      <div className="lg:col-span-12">
                        <input
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                          placeholder="Name:"
                          required
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <div className="mt-2 flex items-center space-x-2">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            id="countryCode"
                            className="py-2 w-24 px-1 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                            required
                          >
                            <option value="+91">+91 (India)</option>
                            <option value="+1">+1 (USA)</option>
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

                            {/* Add more options as needed */}
                          </select>
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            id="phone"
                            type="tel"
                            className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                      </div>
                      <div className="lg:col-span-12">
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          id="email"
                          type="email"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                          placeholder="Email:"
                          required
                        />
                      </div>
                      <div className="lg:col-span-12">
                        <input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          id="subject"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                          placeholder="Destination"
                          required
                        />
                      </div>
                      <div className="lg:col-span-12">
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
                      </div>
                      <div className="lg:col-span-12">
                        <select
                          name="departureMonth"
                          value={formData.departureMonth}
                          onChange={handleChange}
                          id="departureMonth"
                          className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-600 dark:border-gray-800 focus:ring-0"
                          required
                        >
                          <option value="" disabled>
                            Select Month of Departure
                          </option>
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
                        <input
                     type="hidden"
                     name="inquiryPage"
                     value="yourInquiryPageValue" // This can be dynamic if needed
                      />
                      </div>
                    </div>
                    <button
                      type="submit"
                      id="submit"
                      name="send"
                      className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <Switcher />

      {modal && (
        <div className="w-full h-screen bg-slate-900/80 fixed top-0 left-0 bottom-0 right-0 z-999 flex items-center justify-center">
          <div className="w-full h-full px-5 md:px-40 md-py-20 py-5">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d448286.8577153205!2d77.135558!3d28.622536!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0331eb2e4b5f%3A0x9604516c746d2703!2sWolverine%20Rider!5e0!3m2!1sen!2sus!4v1731918109094!5m2!1sen!2sus"
              style={{ border: "0" }}
              className="w-full h-full"
            ></iframe>
            <div
              onClick={() => setModal(false)}
              className="absolute z-99999 w-10 md:h-10  bg-danger-300 justify-center items-center fixed end-10 cursor-pointer"
            >
              <FiX color="white"></FiX>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
