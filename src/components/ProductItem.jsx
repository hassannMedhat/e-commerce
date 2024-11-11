import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaHeart, FaBookmark } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price }) => {
  const {
    saveForLater,
    removeFromSaveForLater,
    wishlist,
    savedForLater,
    addToWishlist,
    removeFromWishlist,
    currency,
  } = useContext(ShopContext);

  console.log("Currency:", currency);

  const imgSrc = image || 'default-image-url.jpg';
  const productName = name || 'Unnamed Product';
  const productPrice = price !== undefined ? price : 0;

  const isSaved = savedForLater.includes(id);
  const isWishlisted = wishlist.includes(id);

  console.log("Product Price:", productPrice);
  console.log("Product Price Type:", typeof productPrice);

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
          {typeof productPrice === 'number' ? `${productPrice.toFixed(2)} ` : productPrice  + ` ${currency}`}
        </p>
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
};

export default ProductItem;
