import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext"; // Import ShopContext
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(ShopContext); // Get setCurrentUser from context
  const [currentState, setCurrentState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    try {
      let response;
      if (currentState === "Login") {
        response = await axios.get(
          `http://localhost:4000/users?email=${formData.email}&password=${formData.password}`
        );
        const user = response.data[0];
        if (user) {
          setCurrentUser(user);
          toast.success("Login successful");
          navigate("/");
        } else {
          toast.error("Invalid email or password");
        }
      } else {
        
        const response = await axios.post('/api/signup', formData );

        if (response.ok) {
          toast.success("Account created successfully");
          setCurrentUser(formData);
          navigate("/");
        } else {
          alert("Data submission failed");
        }
      }
    } catch (error) {
      console.error("There was an error!", error);
      toast.error("An error occurred,  please try again later.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" && (
        <>
          <input
            className="w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 border border-gray-800"
            type="text"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </>
      )}
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        className="w-full px-3 py-2 border border-gray-800"
        type="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
