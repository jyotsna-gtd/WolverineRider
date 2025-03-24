import React, { useState } from "react";
import axios from "axios";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

export default function DetailSidebar({ tourPlace }) {
  const [formData, setFormData] = useState({
      name: "",
      countryCode: "",
      phone: "",
      email: "",
      subject: "" || tourPlace,
      number: "",
      departureMonth: "",
      inquiryPage: tourPlace || "",
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
  
      try {
        const response = await axios.post('https://server-side-main-eight.vercel.app/form/submit', formData);
        alert(response.data.message);
        setFormData({
          name: "",
          countryCode: "",
          phone: "",
          email: "",
          subject: "" || tourPlace,
          number: "",
          departureMonth: "",
          inquiryPage: tourPlace || "",
        });
      } catch (error) {
        console.error('Error submitting form:', error.response?.data?.message || error.message);
        alert('Something went wrong!');
      }
    };

  return (
    <div className="lg:col-span-4 md:col-span-5">
      <div className="p-4 rounded-md shadow dark:shadow-gray-700 sticky top-20">
      <h3 className="text-2xl font-semibold mb-6 text-center">Inquiry for {tourPlace} Tour </h3>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex space-x-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="+91">+91 (India)</option> 
                <option value="+1">+1 (USA)</option>  
              </select>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
                required
              />
            </div>
            <div>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Destination"
                required
              />
            </div>
            <div>
              <input
                name="number"
                value={formData.number}
                onChange={handleChange}
                type="number"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of People"
                required
              />
            </div>
            <div>
              <select
                name="departureMonth"
                value={formData.departureMonth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="py-1 px-4 bg-red-500 text-white rounded hover:bg-red-600">
              Send Message
              </button>
            </div>
          </div>
        </form>

        
      </div>
    

    </div>
  );
}
