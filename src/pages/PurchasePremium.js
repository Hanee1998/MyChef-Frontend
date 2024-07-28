import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchasePremium = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser) {
        try {
          console.log(currentUser);
          const response = await fetch(`http://localhost:8080/users/${currentUser.email}`);
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const handlePurchase = async () => {
    // Logic to handle premium purchase
    // After successful purchase, update the user's isPremiumUser field in the backend
    try {
      const response = await fetch(`http://localhost:8080/users/${currentUser.email}/purchasePremium`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Premium purchased successfully!');
        navigate('/add'); // Redirect back to add recipe page after purchase
      } else {
        toast.error('Failed to purchase premium');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while purchasing premium');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Purchase Premium</h1>
      <p className="text-gray-600 mb-4">
        You have reached the maximum number of recipes allowed for free users. Please purchase premium to add more recipes.
      </p>
      {user && !user.isPremiumUser && (
        <>
          <p className="text-gray-700 mb-4">You have {3 - user.recipeCount} recipe(s) left to add.</p>
          <button
            onClick={handlePurchase}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Purchase Premium for $10/month
          </button>
        </>
      )}
      {user && user.isPremiumUser && (
        <p className="text-green-500 mb-4">You are already a premium user. Thank you for your support!</p>
      )}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Terms and Conditions</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Premium membership is billed at $10 per month.</li>
          <li>You can cancel your premium membership at any time.</li>
          <li>No refunds will be issued for partial months.</li>
          <li>By purchasing premium, you agree to our terms and conditions.</li>
          <li>Premium features include the ability to add unlimited recipes.</li>
        </ul>
      </div>
    </div>
  );
};

export default PurchasePremium;
