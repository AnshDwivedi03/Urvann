import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManagePlants = () => {
  const { isOwner, axios, currency } = useAppContext();
  const [plants, setPlants] = useState([]);

  // fetch all plants of owner
  const fetchOwnerPlants = async () => {
    try {
      const { data } = await axios.get("/api/owner/plants");
      if (data.success) {
        setPlants(data.plants);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // toggle availability
  const toggleAvailability = async (plantId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-plant", { plantId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerPlants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // delete plant
  const deletePlant = async (plantId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this plant?");
      if (!confirm) return null;

      const { data } = await axios.post("/api/owner/delete-plant", { plantId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerPlants();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) fetchOwnerPlants();
  }, [isOwner]);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <Title
        title="Manage Plants"
        subTitle="View all listed plants, update their details or remove them from your nursery."
      />

      <div className="max-w-4xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium"> Plant</th>
              <th className="p-3 font-medium max-md:hidden"> Category</th>
              <th className="p-3 font-medium"> Price</th>
              <th className="p-3 font-medium max-md:hidden"> Status</th>
              <th className="p-3 font-medium"> Actions</th>
            </tr>
          </thead>

          <tbody>
            {plants.map((plant, index) => (
              <tr key={index} className="border-t border-borderColor">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={plant.image}
                    className="h-12 w-12 aspect-square rounded-md object-cover"
                    alt={plant.name}
                  />
                  <div className="max-md:hidden">
                    <p className="font-medium">{plant.name}</p>
                    <p className="text-xs text-gray-500">{plant.scientificName}</p>
                  </div>
                </td>

                <td className="p-3 max-md:hidden">{plant.category}</td>
                <td className="p-3">
                  {currency} {plant.price}
                </td>

                <td className="p-3 max-md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      plant.isAvailable
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {plant.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className="flex items-center p-3 gap-2">
                  <img
                    onClick={() => toggleAvailability(plant._id)}
                    className="cursor-pointer"
                    src={
                      plant.isAvailable
                        ? assets.eye_close_icon
                        : assets.eye_icon
                    }
                    alt="toggle"
                  />
                  <img
                    onClick={() => deletePlant(plant._id)}
                    src={assets.delete_icon}
                    className="cursor-pointer"
                    alt="delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePlants;