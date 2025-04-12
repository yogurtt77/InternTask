import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../types/product";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.isLiked = !product.isLiked;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addProduct: (state, action) => {
      // Генерируем уникальный ID с префиксом для пользовательских продуктов
      const userProductId = `user-${Date.now()}`;
      state.items.push({
        ...action.payload,
        id: userProductId,
        isLiked: false,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;

        // Находим пользовательские продукты (с префиксом 'user-' в ID)
        const userProducts = state.items.filter((item) => {
          return typeof item.id === "string" && item.id.startsWith("user-");
        });

        // Преобразуем продукты из API и сохраняем статусы лайков
        const apiProducts = action.payload.map((product: Product) => ({
          ...product,
          isLiked:
            state.items.find((p) => p.id === product.id)?.isLiked || false,
        }));

        // Объединяем продукты из API и пользовательские продукты
        state.items = [...apiProducts, ...userProducts];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Произошла ошибка";
      });
  },
});

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
