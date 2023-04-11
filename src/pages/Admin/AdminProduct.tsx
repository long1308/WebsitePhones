import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Iproduct, IproductCategory } from "../../interfaces/product";
import { Image, Button, message, Popconfirm } from "antd";
import { getOneProductCategory } from "../../api/categorys";
// định nghĩa kiểu props
type AdminProductProps = {
  products: Iproduct[];
  onRemove: (id: number | string) => void;
  categorys: IproductCategory[]
};

const AdminProduct = ({ products, onRemove, categorys }: AdminProductProps) => {
  if (!products) return <h1>Loading List Products.....</h1>;
  // const [category, setCategory] = useState<IproductCategory>({} as IproductCategory);
  return (
    <div className="flex flex-col mt-8 ml-8">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 ">
          <Link
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500   rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            to={"/admin/products/add"}
          >
            Add New Product
          </Link>
          <div className="overflow-hidden">
            <table className="min-w-full  text-sm font-light text-center">
              <thead className="border-b  dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Categorys
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr className="border-b dark:border-neutral-500" key={index}>
                    <th className="whitespace-nowrap px-6 py-4 ">
                      {index + 1}
                    </th>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      <Image width={100} src={product.image} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {product.price}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {product.description}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {categorys.map((category) => (
                        category._id === product.categoryId ? <Link
                          key={category._id}
                          to={`/admin/products/category/${category._id}`}
                        >
                          {category.name}
                        </Link> : null
                      ))}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Popconfirm
                        placement="topLeft"
                        title={"Bạn có chắc chắn muốn xóa không"}
                        description={product.name}
                        onConfirm={() => onRemove(product._id!)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { background: 'red' } }}
                      >
                        <Button type="primary" danger>
                          Delete
                        </Button>
                      </Popconfirm>
                      <Link
                        to={`/admin/products/${product._id}/update`}
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300  rounded-lg text-sm px-5 py-2 mr-2 mx-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
