import React, { useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";

export default function Inquiry({ tourPlace, closeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "",
    phone: "",
    email: "",
    subject: "" || tourPlace ,
    number: "",
    departureMonth: "",
    inquiryPage: "" || tourPlace ,
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
        inquiryPage: "" || tourPlace ,
      });
    } catch (error) {
      console.error('Error submitting form:', error.response?.data?.message || error.message);
      alert('Something went wrong!');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center "
    >
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative"
        >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={closeModal}
        >
          <FiX size={24} />
        </button>

        {/* Modal Content */}
        <h3 className="text-2xl font-semibold mb-6 text-center">Get in touch!</h3>
        <form className="mt-3" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
          <div className="space-y-4">
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex space-x-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-20 p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="+91">+91 (India)</option> 
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
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="No. of People"
                required
              />
            </div>
            <div>
              <select
                name="departureMonth"
                value={formData.departureMonth}
                onChange={handleChange}
                className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="py-1 px-4 bg-red-500 text-white rounded hover:bg-red-600"
              >
              Send Message
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
    
  );
}
