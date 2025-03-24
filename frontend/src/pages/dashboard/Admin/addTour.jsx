import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar'; // Adjust the path as needed
import Sidebar from '../Sidebar'; // Adjust the path as needed

const AddTour = () => {
  const [formData, setFormData] = useState({
    coverImage: null,
    galleryImages: [],
    type: '',
    country: '',
    place: '',
    rating: '',
    price: '',
    discountPrice: '',
    heading: '',
    duration: '',
    groupSize: '',
    language: '',
    pricePerDay: '',
    description: '',
    itinerary: [{ day: '', title: '', description: '' }],
    inclusions: [{ text: '' }], // Changed to array of objects
    exclusions: [{ text: '' }], // Changed to array of objects
    faq: [{ question: '', answer: '' }],
  });

  const countryOptions = ['India', 'USA', 'France', 'Japan', 'Australia'];
  const typeOptions = ['Domestic', 'International'];
  const languageOptions = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Mandarin'];

  const domesticPlaces = ['Spiti Valley', 'Leh Ladakh', 'Himachal Pradesh', 'Jammu & Kashmir', 'Punjab', 'Uttarakhand', 'Haryana', 'Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh',
  'Chhattisgarh', 'Gujarat', 'Maharashtra', 'Goa', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'West Bengal',
  'Odisha', 'Bihar', 'Jharkhand', 'Assam', 'Sikkim', 'Meghalaya', 'Manipur', 'Nagaland', 'Tripura', 'Arunachal Pradesh'];

  const internationalPlaces = ['Dubai', 'Malaysia', 'Thailand', 'Singapore', 'Bali'];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'coverImage') {
      setFormData({ ...formData, coverImage: files[0] });
    } else if (name === 'galleryImages') {
      setFormData({ ...formData, galleryImages: Array.from(files).slice(0, 5) });
    } else if (name.includes('itinerary')) {
      const [, index, field] = name.split('.');
      const updatedItinerary = formData.itinerary.map((item, i) =>
        i === Number(index) ? { ...item, [field]: value } : item
      );
      setFormData({ ...formData, itinerary: updatedItinerary });
    } else if (name.includes('faq')) {
      const [, index, field] = name.split('.');
      const updatedFaq = formData.faq.map((item, i) =>
        i === Number(index) ? { ...item, [field]: value } : item
      );
      setFormData({ ...formData, faq: updatedFaq });
    } else if (name.includes('inclusions')) {
      const [, index, field] = name.split('.');
      const updatedInclusions = formData.inclusions.map((item, i) =>
        i === Number(index) ? { ...item, [field]: value } : item
      );
      setFormData({ ...formData, inclusions: updatedInclusions });
    } else if (name.includes('exclusions')) {
      const [, index, field] = name.split('.');
      const updatedExclusions = formData.exclusions.map((item, i) =>
        i === Number(index) ? { ...item, [field]: value } : item
      );
      setFormData({ ...formData, exclusions: updatedExclusions });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === 'type') {
        setFormData({ ...formData, type: value, place: '' });
      }
    }
  };

  //add and remove itenerary
  const addItineraryItem = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: '', title: '', description: '' }],
    });
  };

  const removeItineraryItem = (index) => {
    const updatedItinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary: updatedItinerary });
  };

  // add and remove FAQ
  const addFaqItem = () => {
    setFormData({
      ...formData,
      faq: [...formData.faq, { question: '', answer: '' }],
    });
  };

  const removeFaqItem = (index) => {
    const updatedFaq = formData.faq.filter((_, i) => i !== index);
    setFormData({ ...formData, faq: updatedFaq });
  };

  // New functions for inclusions
  const addInclusionItem = () => {
    setFormData({
      ...formData,
      inclusions: [...formData.inclusions, { text: '' }],
    });
  };

  const removeInclusionItem = (index) => {
    const updatedInclusions = formData.inclusions.filter((_, i) => i !== index);
    setFormData({ ...formData, inclusions: updatedInclusions });
  };

  // New functions for exclusions
  const addExclusionItem = () => {
    setFormData({
      ...formData,
      exclusions: [...formData.exclusions, { text: '' }],
    });
  };

  const removeExclusionItem = (index) => {
    const updatedExclusions = formData.exclusions.filter((_, i) => i !== index);
    setFormData({ ...formData, exclusions: updatedExclusions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.coverImage) {
      alert('Cover image is required');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('coverImage', formData.coverImage);
    formData.galleryImages.forEach((file) => {
      formDataToSend.append('galleryImages', file);
    });
    
    // Handle regular form fields
    Object.keys(formData)
      .filter((key) => key !== 'coverImage' && key !== 'galleryImages' && key !== 'itinerary' && key !== 'faq' && key !== 'inclusions' && key !== 'exclusions')
      .forEach((key) => formDataToSend.append(key, formData[key]));
    
    // Append itinerary
    formDataToSend.append('itinerary', JSON.stringify(formData.itinerary));
    
    // Append FAQ
    formDataToSend.append('faq', JSON.stringify(formData.faq));
    
    // Append inclusions (extracting just the text values)
    const inclusionsArray = formData.inclusions.map(item => item.text).filter(text => text.trim() !== '');
    formDataToSend.append('inclusions', JSON.stringify(inclusionsArray));
    
    // Append exclusions (extracting just the text values)
    const exclusionsArray = formData.exclusions.map(item => item.text).filter(text => text.trim() !== '');
    formDataToSend.append('exclusions', JSON.stringify(exclusionsArray));

    try {
      const response = await axios.post('https://server-side-main-eight.vercel.app/api/tours', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert(response.data.message || 'Tour added successfully!');
      setFormData({
        coverImage: null,
        galleryImages: [],
        type: '',
        country: '',
        place: '',
        rating: '',
        price: '',
        discountPrice: '',
        heading: '',
        duration: '',
        groupSize: '',
        language: '',
        pricePerDay: '',
        description: '',
        itinerary: [{ day: '', title: '', description: '' }],
        inclusions: [{ text: '' }],
        exclusions: [{ text: '' }],
        faq: [{ question: '', answer: '' }],
      });
    } catch (error) {
      console.error('Error adding tour:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to add the tour. Please try again.');
    }
  };

  const placeOptions = formData.type === 'Domestic' ? domesticPlaces : internationalPlaces;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold mb-4">Add New Tour</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
                Cover Image
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleChange}
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-700">
                Gallery Images (max 5)
              </label>
              <input
                type="file"
                id="galleryImages"
                name="galleryImages"
                onChange={handleChange}
                multiple
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="" disabled>
                  Select a type
                </option>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="place" className="block text-sm font-medium text-gray-700">
                Place
              </label>
              <select
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="" disabled>
                  Select a place
                </option>
                {placeOptions.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            {[
              { id: 'country', label: 'Country', options: countryOptions },
              { id: 'language', label: 'Language', options: languageOptions },
            ].map(({ id, label, options }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <select
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Select a {label.toLowerCase()}
                  </option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            {[
              { id: 'rating', label: 'Rating', type: 'number', step: '0.1', placeholder: '4.5' },
              { id: 'discountPrice', label: 'Price', type: 'number', placeholder: '450' },
              { id: 'price', label: 'Discount Price', type: 'number', placeholder: '500' },
              { id: 'duration', label: 'Duration', type: 'text', placeholder: '5 days' },
              { id: 'groupSize', label: 'Group Size', type: 'number', placeholder: '10' },
              { id: 'pricePerDay', label: 'Price Per Day', type: 'number', placeholder: '100' },
              { id: 'heading', label: 'Heading', type: 'text', placeholder: 'Beautiful Trip to...' },
              { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Write something about the tour...' },
            ].map(({ id, label, type, ...rest }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                {type === 'textarea' ? (
                  <textarea
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    {...rest}
                  />
                ) : (
                  <input
                    type={type}
                    id={id}
                    name={id}
                    value={formData[id]}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    {...rest}
                  />
                )}
              </div>
            ))}

            {/* Itinerary Section */}
            <div>
              <h3 className="text-xl font-bold">Itinerary</h3>
              {formData.itinerary.map((item, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md bg-gray-50 mt-2">
                  <div>
                    <label htmlFor={`itinerary.${index}.day`} className="block text-sm font-medium text-gray-700">
                      Day
                    </label>
                    <input
                      type="text"
                      id={`itinerary.${index}.day`}
                      name={`itinerary.${index}.day`}
                      value={item.day}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Day 1"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`itinerary.${index}.title`} className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id={`itinerary.${index}.title`}
                      name={`itinerary.${index}.title`}
                      value={item.title}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Visit to..."
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`itinerary.${index}.description`} className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id={`itinerary.${index}.description`}
                      name={`itinerary.${index}.description`}
                      value={item.description}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Detailed description of the day's activities"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Day
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addItineraryItem}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Add Day
              </button>
            </div>

            {/* Inclusions Section */}
            <div>
              <h3 className="text-xl font-bold">Inclusions</h3>
              {formData.inclusions.map((item, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md bg-gray-50 mt-2">
                  <div>
                    <label htmlFor={`inclusions.${index}.text`} className="block text-sm font-medium text-gray-700">
                      Inclusion Item
                    </label>
                    <input
                      type="text"
                      id={`inclusions.${index}.text`}
                      name={`inclusions.${index}.text`}
                      value={item.text}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="E.g., Breakfast included"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeInclusionItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Item
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInclusionItem}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Add Inclusion
              </button>
            </div>

            {/* Exclusions Section */}
            <div>
              <h3 className="text-xl font-bold">Exclusions</h3>
              {formData.exclusions.map((item, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md bg-gray-50 mt-2">
                  <div>
                    <label htmlFor={`exclusions.${index}.text`} className="block text-sm font-medium text-gray-700">
                      Exclusion Item
                    </label>
                    <input
                      type="text"
                      id={`exclusions.${index}.text`}
                      name={`exclusions.${index}.text`}
                      value={item.text}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="E.g., Flights not included"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeExclusionItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Item
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addExclusionItem}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Add Exclusion
              </button>
            </div>

            {/* FAQ Section */}
            <div>
              <h3 className="text-xl font-bold">FAQs</h3>
              {formData.faq.map((item, index) => (
                <div key={index} className="space-y-4 border p-4 rounded-md bg-gray-50 mt-2">
                  <div>
                    <label htmlFor={`faq.${index}.question`} className="block text-sm font-medium text-gray-700">
                      Question
                    </label>
                    <input
                      type="text"
                      id={`faq.${index}.question`}
                      name={`faq.${index}.question`}
                      value={item.question}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="FAQ Question"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor={`faq.${index}.answer`} className="block text-sm font-medium text-gray-700">
                      Answer
                    </label>
                    <textarea
                      id={`faq.${index}.answer`}
                      name={`faq.${index}.answer`}
                      value={item.answer}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="FAQ Answer"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeFaqItem(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove FAQ
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addFaqItem}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600"
              >
                Add FAQ
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Tour
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTour;