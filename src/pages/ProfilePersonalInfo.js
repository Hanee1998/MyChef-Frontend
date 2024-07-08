import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePersonalInfo = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    email: '',
    displayName: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    country: '',
    city: '',
    zipCode: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${currentUser.email}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setProfile(data);
          } else {
            setProfile({
              email: currentUser.email,
              displayName: currentUser.displayName || currentUser.email.split('@')[0],
              firstName: '',
              lastName: '',
              address: '',
              phone: '',
              country: '',
              city: '',
              zipCode: ''
            });
          }
        } else {
          setTimeout(() => {
            toast.error('Error fetching profile');
          }, 2000); // Wait for 2 seconds before displaying the message
        }
      } catch (error) {
        console.log(error)
      
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000); // Wait for 2 seconds before setting loading to false
      }
    };
    

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const validateZipCode = (zipCode) => {
    const re = /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i;
    return re.test(String(zipCode));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty field validation
    for (const [key, value] of Object.entries(profile)) {
      if (!value && key !== 'phone' && key !== 'country' && key !== 'address' && key !== 'city' && key !== 'zipCode') {
        toast.error(`Field cannot be empty`);
        return;
      }
    }
    

    // Specific field validations
    if (!validateEmail(profile.email)) {
      toast.error('Invalid email address');
      return;
    }

    if (profile.phone && !validatePhone(profile.phone)) {
      toast.error('Invalid phone number');
      return;
    }

    if (profile.zipCode && !validateZipCode(profile.zipCode)) {
      toast.error('Invalid zip code');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/users/${currentUser.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        toast.success('Profile updated successfully');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2>Personal Information</h2>
      {loading ? (
        <p>Loading profile...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={profile.email} readOnly />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} />
          </div>
     
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={profile.address} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" name="city" value={profile.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" value={profile.country} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Zip Code</label>
            <input type="text" name="zipCode" value={profile.zipCode} onChange={handleChange} />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default ProfilePersonalInfo;
