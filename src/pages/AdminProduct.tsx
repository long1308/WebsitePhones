
import { Link } from 'react-router-dom'
import { Iproduct } from '../interfaces/product'
// định nghĩa kiểu props
type AdminProductProps = {
  products: Iproduct[]
  onRemove : (id:number |string) => void
}

const AdminProduct = ({products, onRemove}: AdminProductProps) => {
  if(!products ) return <h1>Loading List Products.....</h1>
  return <div>
    <Link className="btn btn-primary" to={'/admin/products/add'}>Add New Product</Link>
    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">Description</th>
      <th scope="col">Active</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product,index) => (
      <tr key={index}>
        <th scope="row">{index +1}</th>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.description}</td>
        <td>
          <button className="btn btn-danger" onClick={() => onRemove(product._id!)}>Remove</button>
          <Link to={`/admin/products/${product._id}/update`} className="btn btn-success" >Update</Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  </div>
}

export default AdminProduct