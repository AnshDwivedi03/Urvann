import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddPlants = () => {
  const { axios, currency } = useAppContext();
  const [image, setImage] = useState(null);
  const [plant, setPlant] = useState({
    name: "",
    scientificName: "",
    category: "",
    price: 0,
    size: "",
    sunlight: "",
    watering: "",
    location: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("plantData", JSON.stringify(plant));

      const { data } = await axios.post("/api/owner/add-plants", formData);




      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setPlant({
          name: "",
          scientificName: "",
          category: "",
          price: 0,
          size: "",
          sunlight: "",
          watering: "",
          location: "",
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Plant"
        subTitle="Fill in details to list a new plant or flower, including pricing, care info and availability"
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Plant Image */}
        <div className="flex items-center gap-2 w-full">
          <label htmlFor="plant-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              className="h-14 rounded cursor-pointer"
              alt="Plant Preview"
            />
            <input
              type="file"
              id="plant-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">
            Upload the picture of your plant
          </p>
        </div>

        {/* Plant Name & Scientific Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Plant Name</label>
            <input
              type="text"
              placeholder="Rose, Tulip, Snake Plant"
              required
              className="px-3 py-2 mt-1 border borderColor rounded-md outline-none"
              value={plant.name}
              onChange={(e) => setPlant({ ...plant, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label>Scientific Name</label>
            <input
              type="text"
              placeholder="Rosa indica, Ficus lyrata"
              className="px-3 py-2 mt-1 border borderColor rounded-md outline-none"
              value={plant.scientificName}
              onChange={(e) =>
                setPlant({ ...plant, scientificName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Price, Category, Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Price ({currency})</label>
            <input
              type="number"
              placeholder="500"
              required
              className="px-3 py-2 mt-1 border borderColor rounded-md outline-none"
              value={plant.price}
              onChange={(e) => setPlant({ ...plant, price: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              onChange={(e) => setPlant({ ...plant, category: e.target.value })}
              value={plant.category}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Category</option>
              <option value="Indoor">Indoor</option>
              <option value="Outdoor">Outdoor</option>
              <option value="Flowering">Flowering</option>
              <option value="Succulent">Succulent</option>
              <option value="Medicinal">Medicinal</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Size</label>
            <select
              onChange={(e) => setPlant({ ...plant, size: e.target.value })}
              value={plant.size}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select a Size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
        </div>

        {/* Sunlight & Watering Needs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label>Sunlight Requirement</label>
            <select
              onChange={(e) => setPlant({ ...plant, sunlight: e.target.value })}
              value={plant.sunlight}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select Sunlight Need</option>
              <option value="Full Sun">Full Sun</option>
              <option value="Partial Shade">Partial Shade</option>
              <option value="Low Light">Low Light</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label>Watering Frequency</label>
            <select
              onChange={(e) => setPlant({ ...plant, watering: e.target.value })}
              value={plant.watering}
              className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
            >
              <option value="">Select Watering Need</option>
              <option value="Daily">Daily</option>
              <option value="Twice a Week">Twice a Week</option>
              <option value="Weekly">Weekly</option>
              <option value="Rarely">Rarely</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full">
          <label>Available Location</label>
          <select
            onChange={(e) => setPlant({ ...plant, location: e.target.value })}
            value={plant.location}
            className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
          >
            <option value="">Select a Location</option>
            <option value="Nursery 1">Nursery 1</option>
            <option value="Nursery 2">Nursery 2</option>
            <option value="Garden Center">Garden Center</option>
            <option value="Online Only">Online Only</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            rows={5}
            placeholder="A beautiful indoor plant with air-purifying qualities"
            required
            className="px-3 py-2 mt-1 border borderColor rounded-md outline-none"
            value={plant.description}
            onChange={(e) =>
              setPlant({ ...plant, description: e.target.value })
            }
          ></textarea>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 mt-4 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium w-max cursor-pointer">
          <img src={assets.tick_icon} alt="tick" />
          {isLoading ? "Listing.." : "List Your Plant"}
        </button>
      </form>
    </div>
  );
};

export default AddPlants;
