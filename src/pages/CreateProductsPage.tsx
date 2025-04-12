import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../store/productsSlice";
import { Link } from "react-router-dom";
interface ProductFormData {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export const CreateProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: ProductFormData) => {
    console.log("Отправка данных формы:", data);
    dispatch(addProduct(data));
    navigate("/products");
  };

  // Обновляем стили формы создания продукта

  // ... существующий код ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Создать новый продукт
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название
              </label>
              <input
                {...register("title", { required: "Обязательное поле" })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                {...register("description", { required: "Обязательное поле" })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                rows={4}
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена
              </label>
              <input
                type="number"
                {...register("price", {
                  required: "Обязательное поле",
                  min: { value: 0, message: "Цена должна быть больше 0" },
                })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL изображения
              </label>
              <input
                {...register("thumbnail", { required: "Обязательное поле" })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              {errors.thumbnail && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.thumbnail.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/products"
                className="px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                Отмена
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Создать
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
