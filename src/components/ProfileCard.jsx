import React, { useEffect, useState } from 'react';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = Cookies.get('authToken');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://reddit-project-1.onrender.com/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  if (!userData) {
    return (
      <div className="text-center mt-8">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto mt-8 bg-white shadow-lg rounded-lg text-gray-900 p-4 sm:p-6">
      {/* Cover Image */}
      <div className="rounded-t-lg h-24 sm:h-28 md:h-32 overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max"
          alt="Cover"
        />
      </div>
      {/* Profile Image */}
      <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 relative -mt-10 border-4 border-white rounded-full overflow-hidden">
        <img
          className="object-cover w-full h-full"
          src={userData.imgUrl || './sidd.jpg'}
          alt={userData.name || 'User'}
        />
      </div>
      {/* User Info */}
      <div className="text-center mt-4">
        <h2 className="font-semibold text-lg sm:text-base md:text-lg lg:text-xl">{userData.name || 'User'}</h2>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-base break-words">{userData.email || 'No email provided'}</p>
      </div>
      {/* Followers and Following */}
      <ul className="py-4 text-gray-700 flex flex-wrap justify-center md:justify-around">
        <li className="flex flex-col items-center sm:w-1/2 md:w-auto">
          <FaUserFriends className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="text-sm font-medium">{userData.followers?.length || 0} Followers</div>
        </li>
        <li className="flex flex-col items-center sm:w-1/2 md:w-auto">
          <FaUserPlus className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
          <div className="text-sm font-medium">{userData.following?.length || 0} Following</div>
        </li>
      </ul>
      {/* Edit Profile Button */}
      <div className="p-4 border-t mt-2">
        <button
          onClick={() => navigate('/profile/edit_profile')}
          className="w-full bg-gray-900 hover:shadow-lg font-semibold text-white px-4 py-2 rounded-full text-sm sm:text-base md:text-base"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
