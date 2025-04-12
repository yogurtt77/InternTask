import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts } from "../store/productsSlice";
import { ProductCard } from "../components/ProductCard";
import { Link } from "react-router-dom";

export const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [showLiked, setShowLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return showLiked ? product.isLiked && matchesSearch : matchesSearch;
  });

  if (loading) return <div className="text-center mt-10">Загрузка...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              !showLiked ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShowLiked(false)}
          >
            Все
          </button>
          <button
            className={`px-4 py-2 rounded ${
              showLiked ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShowLiked(true)}
          >
            Избранное
          </button>
        </div>
        <Link
          to="/create-product"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Создать продукт
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск продуктов..."
          className="w-full px-4 py-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
