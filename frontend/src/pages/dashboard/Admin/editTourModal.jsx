import React, { useState } from "react";
import axios from "axios";

const EditTourModal = ({ tour, onClose, onUpdate }) => {
  const [editedTour, setEditedTour] = useState({ ...tour });
  const [coverImage, setCoverImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // Handle dynamic list updates (Itinerary, Inclusions, Exclusions, FAQs)
  const handleListChange = (field, index, key, value) => {
    setEditedTour((prev) => {
      const updatedList = [...(prev[field] || [])];
      if (!updatedList[index]) {
        updatedList[index] = {};
      }
      if (key) {
        updatedList[index][key] = value;
      } else {
        updatedList[index] = value;
      }
      return { ...prev, [field]: updatedList };
    });
  };
  

  const handleAddItem = (field) => {
    setEditedTour((prev) => ({
      ...prev,
      [field]: [...prev[field], field === "faq" ? { question: "", answer: "" } : ""],
    }));
  };

  const handleRemoveItem = (field, index) => {
    setEditedTour((prev) => {
      const updatedList = [...prev[field]];
      updatedList.splice(index, 1);
      return { ...prev, [field]: updatedList };
    });
  };

  

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "coverImage") {
      setCoverImage(files[0]);
    } else if (name === "galleryImages") {
      setGalleryImages([...files]);
    }
  };


  
  // Submit the form to update the tour
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ensure this function only works in response to form submission
    setLoading(true);

    const formData = new FormData();
    formData.append("heading", editedTour.heading);
    formData.append("country", editedTour.country);
    formData.append("type", editedTour.type);
    formData.append("place", editedTour.place);
    formData.append("price", editedTour.price);
    formData.append("discountPrice", editedTour.discountPrice);
    formData.append("rating", editedTour.rating);
    formData.append("duration", editedTour.duration);
    formData.append("groupSize", editedTour.groupSize);
    formData.append("language", editedTour.language);
    formData.append("pricePerDay", editedTour.pricePerDay);
    formData.append("description", editedTour.description);

    // Append files if new ones are uploaded
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    galleryImages.forEach((file) => {
      formData.append("galleryImages", file);
    });

        // Convert list fields to JSON strings
        formData.append("itinerary", JSON.stringify(editedTour.itinerary));
        formData.append("inclusions", JSON.stringify(editedTour.inclusions));
        formData.append("exclusions", JSON.stringify(editedTour.exclusions));
        formData.append("faq", JSON.stringify(editedTour.faq));

    try {
      const response = await axios.put(
        `https://server-side-main-eight.vercel.app/api/tours/${editedTour._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200) {
        alert("Tour updated successfully!");
        onUpdate(response.data.tour); // Pass updated tour data to parent
        onClose();
     
      } else {
        alert(`Error: ${response.status} - ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error updating tour:", error);
      alert(`Failed to update the tour. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-h-[80vh] overflow-y-auto max-w-3xl">
        <h2 className="text-xl font-bold mb-4">Edit Tour</h2>
        <form onSubmit={handleSubmit}>
          {/* heading */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Heading</label>
            <input
              type="text"
              name="heading"
              value={editedTour.heading}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Country */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Tour</label>
            <input
              type="text"
              name="country"
              value={editedTour.country}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Type</label>
            <input
              type="text"
              name="type"
              value={editedTour.type}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Place */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={editedTour.place}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Discount Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Discount Price</label>
            <input
              type="number"
              name="price"
              value={editedTour.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

           {/* Price*/}
           <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="discountPrice"
              value={editedTour.discountPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              max="5"
              name="rating"
              value={editedTour.rating}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Duration */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={editedTour.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Group Size */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Group Size</label>
            <input
              type="number"
              name="groupSize"
              value={editedTour.groupSize}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Language */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={editedTour.language}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Price Per Day */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={editedTour.pricePerDay}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={editedTour.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
              required
            />
          </div>

          {/* Cover Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept="image/*"
            />
          </div>

          {/* Gallery Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Gallery Images
            </label>
            <input
              type="file"
              name="galleryImages"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              accept="image/*"
              multiple
            />
          </div>

              {/* Itinerary */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Itinerary</label>
  {editedTour.itinerary.map((item, index) => (
    <div key={index} className="border p-2 rounded mb-2">
      <input
        type="text"
        value={item.day}
        onChange={(e) =>
          handleListChange("itinerary", index, "day", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        placeholder={`Day ${index + 1}`}
      />
      <input
        type="text"
        value={item.title}
        onChange={(e) =>
          handleListChange("itinerary", index, "title", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        placeholder="Title"
      />
      <textarea
        value={item.description}
        onChange={(e) =>
          handleListChange("itinerary", index, "description", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Description"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem("itinerary", index)}
        className="text-red-500 mt-2"
      >
        Remove Day
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      handleAddItem("itinerary", { day: "", title: "", description: "" })
    }
    className="text-blue-500"
  >
    Add Itinerary Day
  </button>
</div>

  {/* Inclusions */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Inclusions</label>
  {editedTour.inclusions.map((item, index) => (
    <div key={index} className="flex space-x-4 mb-2">
      <input
        type="text"
        value={item}
        onChange={(e) => handleListChange("inclusions", index, null, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Inclusion item"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem("inclusions", index)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => handleAddItem("inclusions")}
    className="text-blue-500"
  >
    Add Inclusion
  </button>
</div>

{/* Exclusions */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">Exclusions</label>
  {editedTour.exclusions.map((item, index) => (
    <div key={index} className="flex space-x-4 mb-2">
      <input
        type="text"
        value={item}
        onChange={(e) => handleListChange("exclusions", index, null, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="Exclusion item"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem("exclusions", index)}
        className="text-red-500"
      >
        Remove
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() => handleAddItem("exclusions")}
    className="text-blue-500"
  >
    Add Exclusion
  </button>
</div>


         {/* FAQs */}
<div className="mb-4">
  <label className="block text-sm font-medium mb-1">FAQs</label>
  {editedTour.faq.map((faq, index) => (
    <div key={index} className="border p-2 rounded mb-2">
      <input
        type="text"
        value={faq.question}
        onChange={(e) =>
          handleListChange("faq", index, "question", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
        placeholder="FAQ Question" />
      <textarea
        value={faq.answer}
        onChange={(e) =>
          handleListChange("faq", index, "answer", e.target.value)
        }
        className="w-full border border-gray-300 rounded px-3 py-2"
        placeholder="FAQ Answer"
      />
      <button
        type="button"
        onClick={() => handleRemoveItem("faq", index)}
        className="text-red-500 mt-2"
      >
        Remove FAQ
      </button>
    </div>
  ))}
  <button
    type="button"
    onClick={() =>
      handleAddItem("faq", { question: "", answer: "" })
    }
    className="text-blue-500">
    Add FAQ
  </button>
</div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400" >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded ${
                loading
                  ? "bg-blue-300 text-white"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTourModal;
