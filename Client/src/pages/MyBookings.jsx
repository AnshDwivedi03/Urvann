import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, currency, token } = useAppContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  if (loading) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center border border-gray-100">
          <p className="text-gray-500 text-lg">You haven't ordered any plants yet.</p>
          <button 
            onClick={() => window.location.href = '/plants'}
            className="mt-4 text-green-600 font-semibold hover:underline"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-6"
            >
              <img 
                src={booking.plant?.image || ""} 
                alt={booking.plant?.name} 
                className="w-24 h-24 object-cover rounded-xl"
              />
              
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800">
                  {booking.plant?.name || "Plant Deleted"}
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-gray-500">
                  <p>Order ID: <span className="text-gray-700 font-mono">#{booking._id.slice(-8).toUpperCase()}</span></p>
                  <p>Date: <span className="text-gray-700">{new Date(booking.createdAt).toLocaleDateString()}</span></p>
                  <p>Total: <span className="text-green-600 font-bold">{currency}{booking.price}</span></p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {booking.status}
                </span>
                <p className="text-xs text-gray-400">Payment: Offline</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
