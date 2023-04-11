import React from "react";
import { Iproduct, IproductCategory } from "../../interfaces/product";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom'
type AdminProductAddProps = {
  onAdd: (product: Iproduct) => void;
  categorys: IproductCategory[]
};

const AdminProductAdd = ({ onAdd, categorys }: AdminProductAddProps) => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Iproduct>();

  const onSubmit: SubmitHandler<Iproduct> = (inputAdd: Iproduct) => {
    onAdd(inputAdd)
    console.log(inputAdd);
    navigate('/admin/products')
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ml-8">
      <h1 className="text-3xl mb-10">Form Add</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          {...register("name", { required: true })}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter Name"
          id="name"
        />
        {errors.name?.type === "required" && (
          <small id="emailHelp" className="form-text text-muted">
            Trường Name là bắt buộc
          </small>
        )}
      </div>

      <div>
        <label htmlFor="name">Image</label>
        <input
          {...register("image", { required: true })}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter Image"
          id="image"
        />
        {errors.name?.type === "required" && (
          <small id="emailHelp" className="form-text text-muted">
            Trường Image là bắt buộc
          </small>
        )}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          {...register("price", { required: true, pattern: /^[0-9]*$/ })}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter Price"
          id="name"
        />
        {errors.price?.type === "required" && (
          <small id="emailHelp" className="form-text text-muted">
            Trường Price là bắt buộc
          </small>
        )}
        {errors.price?.type === "pattern" && (
          <small id="emailHelp" className="form-text text-muted">
            Trường Price phải là số
          </small>
        )}
      </div>

      <div>
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn Danh Mục</label>
        <select {...register('categoryId')} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">

          {categorys.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="desc">Description</label>
        <input
          {...register("description", { required: true })}
          className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Enter Description"
          id="name"
        />
        {errors.description?.type === "required" && (
          <small id="emailHelp" className="form-text text-muted">
            Trường Description là bắt buộc
          </small>
        )}
      </div>
      <button
        type="submit"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add
      </button>
    </form>
  );
};

export default AdminProductAdd;
