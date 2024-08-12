import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminSettings = () => {
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/settings/premiumMembershipPrice`);
        const data = await response.json();
        setPrice(data.price);
      } catch (error) {
        console.error('Error fetching premium membership price:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/settings/premiumMembershipPrice`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: parseFloat(price) }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrice(data.price);
        toast.success('Premium membership price updated successfully!');
      } else {
        toast.error('Failed to update premium membership price');
      }
    } catch (error) {
      console.error('Error updating premium membership price:', error);
      toast.error('An error occurred while updating the price');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Premium Membership Price ($)
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Update Price
      </button>
    </div>
  );
};

export default AdminSettings;
