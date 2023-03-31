import { useEffect, useState } from 'react'
//interface
import {Iproduct} from "./interfaces/product"
//bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes } from 'react-router-dom'
import BaseLayout from './components/layouts/baseLayout'
import AdminLayout from './components/layouts/adminLayout'
import { addProduct, deleteProduct, getAllProducts, updateProduct } from './api/product'
import AdminProduct from './pages/AdminProduct'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import AdminProductAdd from './pages/AdminProductAdd'
import AdminEditProduct from './pages/AdminEditProduct'


function App() {
  const [products, setProducts] = useState<Iproduct[]>([])
  // call api  lấy dữ liệu
  useEffect(() =>{
    (async() =>{
      const {data} = await getAllProducts()
      setProducts(data)
    })()
  },[])
  // xóa sản phẩm 
  const onHandDeleteProduct = async (id: number|string) => {
    const result = confirm(`Bạn có chắc chắn muốn xóa sản phẩm thứ ${id}`)
     if(result) {
        await deleteProduct(id).then(() =>{
        setProducts(products.filter(product => product._id !== id))
       })
     }else{
      return false
     }
    
  }
  //add sản phẩm
  const onHandAddProduct = async (product: Iproduct) => {
      await addProduct(product).then(() =>{
        setProducts([...products, product])
      })
  
  }
  // sửa sản phẩm 
  const onHandEditProduct = async (data: Iproduct,id:string|number) => {
      await updateProduct(data,id).then(() =>{
        setProducts(products.map(product => product._id === data._id? data : product))
      })
  }
  return (
    <div className="App">
      <Routes>
        {/* client */}
          <Route path='/' element={<BaseLayout />}> 
            <Route index  element={"Home Page"} />
            <Route path='signin' element={<Signin />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          {/* admin */}
          <Route path='/admin' element={<AdminLayout />}>
            <Route index  element={"DashBoard Page"} />
            <Route path='products' element = {<AdminProduct  products = {products} onRemove= {onHandDeleteProduct}/>} />
            <Route path='products/add' element = {<AdminProductAdd onAdd = {onHandAddProduct} />} />
            <Route path='products/:id/update' element = {<AdminEditProduct  onEdit = {onHandEditProduct}/> } />
          </Route>
      </Routes> 
    </div>
  )
}

export default App
