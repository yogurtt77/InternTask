import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ProductsPage } from "./pages/ProductPages";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { CreateProductPage } from "./pages/CreateProductsPage";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Router basename="/new-vite-react">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/create-product" element={<CreateProductPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
