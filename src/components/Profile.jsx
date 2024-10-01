import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../redux/auth/authActions";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [street, setStreet] = useState(user?.address?.street);
  const [city, setCity] = useState(user?.address?.city);
  const [postalCode, setPostalCode] = useState(user?.address?.postalCode);

  const handleSave = () => {
    const updatedProfile = {
      ...user,
      name,
      email,
      address: {
        street,
        city,
        postalCode,
      },
    };
    dispatch(editProfile(user.id, updatedProfile));
    setEditMode(false);
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);

  return (
    <div className="container mx-auto p-8 pt-20 md:px-40 lg:px-80">
      <h1 className="text-4xl font-extrabold mb-8">Profile</h1>

      {editMode ? (
        <div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4"></div>

          <label className="block text-gray-700 font-bold mb-2">Address</label>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="street"
            >
              Street
            </label>
            <input
              id="street"
              type="text"
              className="w-full p-3 border rounded"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              className="w-full p-3 border rounded"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="postalCode"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full p-3 border rounded"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg mb-4">
            <strong>Name:</strong> {user?.name}
          </p>
          <p className="text-lg mb-4">
            <strong>Email:</strong> {user?.email}
          </p>
          {user?.address ? (
            <p className="text-lg mb-4">
              <strong>Address:</strong> {user?.address?.street},{" "}
              {user?.address?.city}, {user?.address?.postalCode}
            </p>
          ) : null}

          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
