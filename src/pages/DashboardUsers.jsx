import { useState, useEffect } from "react";
import axios from "axios";
import Title from "../components/Title";
import { toast } from "react-toastify";

const DashboardUsers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      toast.success("User deleted successfully");
      getUser();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Title text1="USERS" text2="DATA" />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">NAME</th>
            <th className="border border-gray-300 px-4 py-2">EMAIL</th>
            <th className="border border-gray-300 px-4 py-2">PHONE</th>
            <th className="border border-gray-300 px-4 py-2">PASSWORD</th>
            <th className="border border-gray-300 px-4 py-2">Is Admin</th>
            <th className="border border-gray-300 px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                <td className="border border-gray-300 px-4 py-2">{user.password}</td>
                <td className="border border-gray-300 px-4 py-2">{user.isAdmin ? "Yes" : "No"}</td>
                <td className="border border-gray-300 px-4 py-2 flex justify-between space-x-2">
                  <button type="button" className="btn btn-info">Edit</button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                Loading data...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUsers;
