import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "EGP";
  const delivery_fee = 10;
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [savedForLater, setSavedForLater] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:7000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const checkUserAuth = async () => {
    if (!currentUser) return false; // Check if currentUser is null
    try {
      const response = await fetch(`http://localhost:4000/users`);
      const users = await response.json();
      return users.some(user => user.id === currentUser.id);
    } catch (error) {
      console.error("Error verifying user:", error);
      return false;
    }
  };

  const addToCart = async (itemId, size) => {
    const isAuthenticated = await checkUserAuth();
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your cart");
      return;
    }

    const product = products.find((p) => String(p.id) === String(itemId));
    if (!product) {
      toast.error("Product not found");
      return;
    }

    let cartData = { ...cartItems };
    if (!cartData[itemId]) {
      cartData[itemId] = {}; // Initialize size object if it doesn't exist
    }
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1; // Increment quantity if size exists
    } else {
      cartData[itemId][size] = 1; // Set quantity to 1 if size doesn't exist
    }
    setCartItems(cartData);
    toast.success("Added to cart successfully");
  };

  const addToWishlist = async (productId) => {
    const isAuthenticated = await checkUserAuth();
    if (!isAuthenticated) {
      toast.error("Please log in to add items to your wishlist");
      return;
    }

    if (!wishlist.includes(productId)) {
      setWishlist([...wishlist, productId]);
      toast.success("Added to wishlist");
    } else {
      toast.info("Item already in wishlist");
    }
  };

  const saveForLater = async (productId) => {
    const isAuthenticated = await checkUserAuth();
    if (!isAuthenticated) {
      toast.error("Please log in to save items for later");
      return;
    }

    if (!savedForLater.includes(productId)) {
      setSavedForLater([...savedForLater, productId]);
      toast.success("Saved for later");
    } else {
      toast.info("Item already saved for later");
    }
  };

  // Helper functions for cart and wishlist management
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, item) => {
      return total + Object.values(item).reduce((sum, qty) => sum + qty, 0);
    }, 0);
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = { ...cartItems };
    if (quantity < 1) {
      delete cartData[itemId][size]; // Remove size if quantity is less than 1
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Remove item if no sizes left
      }
    } else {
      cartData[itemId][size] = quantity; // Update quantity
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    const totalAmount = Object.entries(cartItems).reduce((total, [id, sizes]) => {
      const product = products.find(p => p.id === (id));
      console.log(products);
      console.log(product);
      if (product && product.price) {
        const sizeTotal = Object.entries(sizes).reduce((sum, [size, qty]) => {
          console.log(product.price);
          return sum + (product.price * qty);
        }, 0);
        return total + sizeTotal;
      }
      return total;
    }, 0);
  
    console.log("Total Cart Amount:", totalAmount); // Check total amount
    return totalAmount;
  };
  
  

  const removeFromCart = (itemId) => {
    let cartData = { ...cartItems };
    delete cartData[itemId];
    setCartItems(cartData);
    toast.success("Item removed from cart");
  };

  const removeFromSaveForLater = (productId) => {
    setSavedForLater(savedForLater.filter(id => id !== productId));
    toast.success("Removed from saved items");
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(id => id !== productId));
    toast.success("Removed from wishlist");
  };

  // User Authentication functions
  const login = async (email, password) => {
    try {
      const response = await fetch(`http://localhost:4000/users?email=${email}&password=${password}`);
      const [user] = await response.json();
      if (user) {
        setCurrentUser(user);
        toast.success("Login successful");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    toast.info("Logged out successfully");
  };

  const register = async (name, email, password) => {
    const newUser = { id: Date.now(), name, email, password };
    try {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        setCurrentUser(newUser);
        toast.success("Registration successful");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  // Context value
  const value = {
    products,
    currency,
    delivery_fee,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    removeFromCart,
    savedForLater,
    saveForLater,
    removeFromSaveForLater,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    currentUser,
    setCurrentUser,
    login,
    logout,
    register,
    navigate,
    showSearch,
    setShowSearch,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
