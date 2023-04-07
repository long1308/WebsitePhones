import React from "react";
import { IproductCategory } from "../../../interfaces/product";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom'
type AdminProductAddProps = {
    onAdd: (category: IproductCategory) => void;
};

const AdminCategoryAdd = ({ onAdd }: AdminProductAddProps) => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IproductCategory>();

    const onSubmit: SubmitHandler<IproductCategory> = (inputAdd: IproductCategory) => {
        onAdd(inputAdd)
        // console.log(inputAdd);

        navigate('/admin/categorys')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ml-8">
            <h1 className="text-3xl mb-10">Form Add Category</h1>
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
                        Trường Category là bắt buộc
                    </small>
                )}
            </div>
            <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Add Category
            </button>
        </form>
    );
};

export default AdminCategoryAdd;
