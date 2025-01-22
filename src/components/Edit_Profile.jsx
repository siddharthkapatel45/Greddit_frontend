import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "@headlessui/react";
import { useToast } from "@/components/hooks/use-toast";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    desc: "",
    mature: false,
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("authToken");

    if (!token) {
      toast({
        description: "Please log in to edit your profile.",
      });
      navigate("/login");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("mature", formData.mature);
    if (formData.photo) formDataToSend.append("photo", formData.photo);

    try {
      const response = await fetch("http://localhost:5000/profile/edit", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          description: "Profile updated successfully!",
        });
        navigate("/profile");
      } else {
        toast({
          description: data.message || "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        description: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-6 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full border rounded px-3 py-2"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full border rounded px-3 py-2"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
            className="block w-full border rounded px-3 py-2"
            placeholder="Write something about yourself"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="mature"
            checked={formData.mature}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Mature Content</label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-blue-700 hover:file:bg-gray-200"
          />
        </div>

        <Button 
          type="submit"
          className="w-full border border-black rounded-xl py-2 rounded hover:text-white hover:bg-black"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
