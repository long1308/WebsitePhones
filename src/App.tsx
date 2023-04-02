import { useEffect, useState } from "react";
//interface
import { Iproduct } from "./interfaces/product";
//bootstrap
// import "bootstrap/dist/css/bootstrap.min.css"
//ant
import "antd/dist/reset.css";

import { Route, Routes } from "react-router-dom";
import BaseLayout from "./components/layouts/Client/baseLayout";
import AdminLayout from "./components/layouts/Admin/adminLayout";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "./api/product";
import AdminProduct from "./pages/Admin/AdminProduct";
import Signin from "./pages/Client/Signin";
import Signup from "./pages/Client/Signup";
import AdminProductAdd from "./pages/AdminProductAdd";
import AdminEditProduct from "./pages/AdminEditProduct";
import HomePages from "./pages/Client/HomePage";
import ProductDetail from "./pages/Client/ProductDetail";
import DashBoardPage from "./pages/Admin/DashBoardPage";

function App() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  // call api  lấy dữ liệu
  useEffect(() => {
    (async () => {
      const { data } = await getAllProducts();
      setProducts(data);
    })();
  }, []);
  // xóa sản phẩm
  const onHandDeleteProduct = async (id: number | string) => {
    await deleteProduct(id).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };
  //add sản phẩm
  const onHandAddProduct = async (product: Iproduct) => {
    await addProduct(product).then(() => {
      setProducts([...products, product]);
    });
  };
  // sửa sản phẩm
  const onHandEditProduct = async (data: Iproduct, id: string | number) => {
    await updateProduct(data, id).then(() => {
      setProducts(
        products.map((product) => (product._id === data._id ? data : product))
      );
    });
  };
  return (
    <div className="App">
      <Routes>
        {/* client */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePages />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoardPage />} />
          <Route
            path="products"
            element={
              <AdminProduct
                products={products}
                onRemove={onHandDeleteProduct}
              />
            }
          />
          <Route
            path="products/add"
            element={<AdminProductAdd onAdd={onHandAddProduct} />}
          />
          <Route
            path="products/:id/update"
            element={<AdminEditProduct onEdit={onHandEditProduct} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
