import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Fuse from "fuse.js"; // Import Fuse.js for fuzzy search
import { Button } from "@/components/ui/button";
import '@/globals.css';

export default function Navbar_OG() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [query, setQuery] = useState("");
  const [communityResults, setCommunityResults] = useState([]);
  const [allCommunities, setAllCommunities] = useState([]);

  // Fetch user data
  const fetchUserData = async () => {
    const token = Cookies.get("authToken");
    if (!token) return;

    try {
      const response = await fetch("https://reddit-project-1.onrender.com/profile/getimg", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch communities for search
  const fetchCommunities = async () => {
    try {
      const response = await fetch("https://reddit-project-1.onrender.com/createcomm/search");
      const data = await response.json();
      setAllCommunities(data);
    } catch (error) {
      console.error("Error fetching communities:", error);
    }
  };

  useEffect(() => {
    if (query) {
      const fuse = new Fuse(allCommunities, {
        keys: ["name"],
        threshold: 0.3,
      });
      const results = fuse.search(query);
      setCommunityResults(results.map((result) => result.item));
    } else {
      setCommunityResults([]);
    }
  }, [query, allCommunities]);

  useEffect(() => {
    fetchUserData();
    fetchCommunities();
  }, []);

  return (
    <nav className="bg-gray-100 bg-opacity-30 backdrop-blur-md fixed w-full z-20 top-0 shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 sm:p-3">
        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://res.cloudinary.com/dvy7hrlmp/image/upload/v1737393818/95f9d0a5599547818889f14c1b884ee0-free_zzpwla.png"
            className="h-16 w-auto p-2 rounded"
            alt="Greddit Logo"
          />
        </a>
        <div className="flex items-center space-x-2 md:order-2">
          <Button
            variant="destructive"
            className="border border-black rounded-xl text-sm px-2 sm:px-3"
            onClick={() => navigate("/create")}
          >
            Create
          </Button>
          <Button
            variant="success"
            className="border border-black rounded-xl text-sm px-2 sm:px-3"
            onClick={() => navigate("/create-community")}
          >
            Create Community
          </Button>
          <a
            href={Cookies.get("authToken") ? "/profile" : "#"}
            onClick={(e) => {
              if (!Cookies.get("authToken")) {
                e.preventDefault();
                alert("Please log in to access your profile.");
              }
            }}
          >
            <img
              src={userData ? userData.imgUrl : "https://avatars.githubusercontent.com/u/124599?v=4"}
              alt="sidd"
              className="w-8 h-8 rounded-full"
            />
          </a>
        </div>
        <div className="relative w-full sm:w-96 mt-4 sm:mt-0">
          <input
            type="text"
            className="block p-2 pl-10 w-full border rounded-2xl border-gray-500"
            placeholder="Search Communities..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg
            className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M4.5 10.5a6 6 0 1112 0 6 6 0 01-12 0z"
            />
          </svg>
          {query && (
            <div className="absolute bg-gray-800 border border-gray-600 rounded-lg shadow-lg w-full mt-2 max-h-60 overflow-y-auto">
              {communityResults.length > 0 ? (
                communityResults.map((community) => (
                  <div
                    key={community._id}
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={() =>
                      navigate("/community-names", {
                        state: { community_id: community._id },
                      })
                    }
                  >
                    <p className="font-semibold text-gray-200">{community.name}</p>
                    <p className="text-sm text-gray-400">{community.description}</p>
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-400">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
