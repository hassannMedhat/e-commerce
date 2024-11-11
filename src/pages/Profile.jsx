import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { currentUser, logout } = useContext(ShopContext);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      {currentUser ? (
        <div className="bg-white shadow-md rounded p-5">
          <h2 className="text-xl font-semibold">User Information</h2>
          <p><strong>Name:</strong> {currentUser.name}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Phone:</strong> {currentUser.phone}</p> {/* Display phone number */}
          <div className="mt-4">
            <Link to="/orders" className="text-blue-500 hover:underline">View My Orders</Link>
          </div>
          <button 
            onClick={logout} 
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-red-500">You are not logged in. Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
