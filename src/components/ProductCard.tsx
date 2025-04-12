import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { Product } from "../types/product";
import { toggleLike, deleteProduct } from "../store/productsSlice";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(product.id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(product.id));
  };

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Обновляем стили карточки продукта

  return (
    <div
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      onClick={handleClick}
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">
          {product.title}
        </h3>
        <p className="text-gray-600 line-clamp-2 text-sm mb-4">
          {product.description}
        </p>
        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
      </div>
      <button
        onClick={handleLike}
        className="absolute top-4 right-16 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
      >
        {product.isLiked ? (
          <AiFillHeart className="text-red-500 text-2xl" />
        ) : (
          <AiOutlineHeart className="text-gray-600 text-2xl" />
        )}
      </button>
      <button
        onClick={handleDelete}
        className="absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transform transition-all duration-300 hover:scale-110"
      >
        <AiOutlineDelete className="text-gray-600 text-2xl hover:text-red-500" />
      </button>
    </div>
  );
};
