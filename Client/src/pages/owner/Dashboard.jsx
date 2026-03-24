import React, { useEffect, useState } from "react";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const { axios, currency } = useAppContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
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
    fetchDashboardData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen">
      <Title
        title="Admin Dashboard"
        subTitle="Overview of your nursery's performance, orders, and inventory."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          { label: "Total Plants", value: data?.totalPlants, color: "bg-blue-500" },
          { label: "Total Orders", value: data?.totalBookings, color: "bg-green-500" },
          { label: "Pending Orders", value: data?.pendingBookings, color: "bg-yellow-500" },
          { label: "Monthly Revenue", value: `${currency}${data?.monthlyRevenue}`, color: "bg-purple-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
            </div>
            <div className={`w-12 h-12 ${stat.color} rounded-xl opacity-10`}></div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 font-display">Recent Orders</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Plant</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-xs text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-600">
              {data?.recentBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img src={booking.plant?.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-medium text-gray-800">{booking.plant?.name}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold uppercase">
                    <span className={`px-2 py-1 rounded-full ${
                      booking.status === 'confirmed' ? 'text-green-600 bg-green-50' : 
                      booking.status === 'cancelled' ? 'text-red-500 bg-red-50' : 
                      'text-yellow-600 bg-yellow-50'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{currency}{booking.price}</td>
                </tr>
              ))}
              {data?.recentBookings.length === 0 && (
                <tr>
                   <td colSpan="3" className="px-6 py-12 text-center text-gray-400">No recent orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
