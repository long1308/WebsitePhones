import { useEffect, useState } from "react";
//interface
import { Iproduct, IproductCategory } from "./interfaces/product";
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
import AdminProductAdd from "./pages/Admin/AdminProductAdd";
import AdminEditProduct from "./pages/Admin/AdminEditProduct";
import HomePages from "./pages/Client/HomePage";
import ProductDetail from "./pages/Client/ProductDetail";
import DashBoardPage from "./pages/Admin/DashBoardPage";
import { addCategory, deleteCategory, getAllProductCategory, updateCategory } from "./api/categorys";
import AdminCategory from "./pages/Admin/Categorys/AdminCategory";
import AdminCategoryAdd from "./pages/Admin/Categorys/AdminCategoryAdd";
import AdminCategoryEdit from "./pages/Admin/Categorys/AdminCategoryEdit";
import NotFound from "./pages/Client/NotFound";
import PrivateRouter from "./components/PrivateRouter";


function App() {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [categorys, setCategory] = useState<IproductCategory[]>([]);
  // call api  lấy dữ liệu
  useEffect(() => {
    (async () => {
      await getAllProducts().then(({ data: { docs } }) => {
        setProducts(docs);
      })
      await getAllProductCategory().then(({ data }) => {
        setCategory(data)
      })
    })();
  }, []);
  // xóa sản phẩm
  const onHandDeleteProduct = async (id: number | string) => {
    await deleteProduct(id).then(() => {
      setProducts(products.filter((product) => product._id !== id));
    });
  };
  // xóa sản category
  const onHandDeleteCategory = async (id: number | string) => {
    await deleteCategory(id).then(() => {
      setCategory(categorys.filter((category) => category._id !== id));
    });
  };
  //add sản phẩm
  const onHandAddProduct = async (product: Iproduct) => {
    await addProduct(product);
    await getAllProducts().then(({ data: { docs } }) => {
      setProducts(docs);
    })

  };

  //add sản category
  const onHandAddCategory = async (category: IproductCategory) => {
    await addCategory(category)
    await getAllProductCategory().then(({ data }) => {
      setCategory(data);
    })
  };
  // sửa sản phẩm
  const onHandEditProduct = async (data: Iproduct, id: string | number) => {
    await updateProduct(data, id).then(() => {
      const newProducts = products.map((product) =>
        product._id === (data._id ?? id) ? data : product
      )
    });
    await getAllProducts().then(({ data: { docs } }) => {
      setProducts(docs);
    })
  };
  // sửa  category
  const onHandEditCategory = async (data: IproductCategory, id: string | number) => {
    await updateCategory(data, id).then(() => {
      const newProducts = categorys.map((category) =>
        category._id === (data._id ?? id) ? data : category
      )
    });
    await getAllProductCategory().then(({ data }) => {
      setCategory(data);
    })
  };
  return (
    <div className="App">
      <Routes>
        {/* client */}
        <Route path="*" element={<NotFound />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePages />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<PrivateRouter>
          <AdminLayout />
        </PrivateRouter>}>
          <Route index element={<DashBoardPage />} />
          <Route
            path="products"
            element={
              <AdminProduct
                products={products}
                onRemove={onHandDeleteProduct}
                categorys={categorys}
              />
            }
          />
          <Route
            path="products/add"
            element={<AdminProductAdd onAdd={onHandAddProduct} categorys={categorys} />}
          />
          <Route
            path="products/:id/update"
            element={<AdminEditProduct onEdit={onHandEditProduct} categorys={categorys} />}
          />
          <Route
            path="categorys"
            element={<AdminCategory categorys={categorys} onRemove={onHandDeleteCategory} />}
          />
          <Route
            path="categorys/add"
            element={<AdminCategoryAdd onAdd={onHandAddCategory} />}
          />
          <Route
            path="categorys/:id/update"
            element={<AdminCategoryEdit onEdit={onHandEditCategory} />}
          />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
