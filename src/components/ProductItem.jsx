import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart, FaBookmark } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price, sizes = [] }) => {
  const {
    saveForLater,
    removeFromSaveForLater,
    wishlist,
    savedForLater,
    addToWishlist,
    removeFromWishlist,
    currency,
  } = useContext(ShopContext);

  const imgSrc = image || 'default-image-url.jpg';
  const productName = name || 'Unnamed Product';
  const productPrice = price !== undefined ? price : 0;

  // Calculate total quantity of all sizes
  const totalQuantity = sizes.reduce((acc, sizeObj) => acc + sizeObj.quantity, 0);
  const isOutOfStock = totalQuantity === 0;

  const isSaved = savedForLater.includes(id);
  const isWishlisted = wishlist.includes(id);

  return (
    <div className="relative">
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="hover:scale-110 transition ease-in-out"
            src={imgSrc}
            alt={productName}
          />
        </div>
        <p className="pt-3 pb-1 text-sm">{productName}</p>
        <p className="text-sm font-medium">
          {typeof productPrice === 'number' ? `${productPrice.toFixed(2)} ` : productPrice + ` ${currency}`}
        </p>
        {/* Display total quantity with a message if it is 5 or less */}
        {totalQuantity <= 5 && totalQuantity > 0 && (
          <p className="text-red-600 mt-2 font-bold">
            Only {totalQuantity} left in stock! Hurry up!
          </p>
        )}
      </Link>

      <div className="absolute top-2 right-2 flex space-x-2">
        <FaBookmark
          className={`cursor-pointer ${isSaved ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={(e) => {
            e.preventDefault();
            isSaved ? removeFromSaveForLater(id) : saveForLater(id);
          }}
        />
        <FaHeart
          className={`cursor-pointer ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
          onClick={(e) => {
            e.preventDefault();
            isWishlisted ? removeFromWishlist(id) : addToWishlist(id);
          }}
        />
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  sizes: PropTypes.arrayOf(PropTypes.shape({
    size: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired, // Ensure sizes prop is passed
};

export default ProductItem;
