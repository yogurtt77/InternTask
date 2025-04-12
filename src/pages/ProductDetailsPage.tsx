import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === Number(id))
  );

  if (!product) {
    return <div className="text-center mt-10">Продукт не найден</div>;
  }

  // Обновляем стили страницы деталей продукта

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/products")}
          className="mb-8 px-6 py-3 flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span>Назад к списку</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-96 w-full object-cover"
              />
            </div>
            <div className="p-8 md:w-1/2">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {product.title}
                </h1>
                {product.isLiked && (
                  <span className="bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm font-medium">
                    В избранном
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <button
                  onClick={() => navigate("/products")}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  К списку продуктов
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
