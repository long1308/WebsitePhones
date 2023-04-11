import { useEffect, useState } from "react";
import { IproductCategory } from "../../../interfaces/product";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getOneProductCategory } from "../../../api/categorys";
type AdminEditProductProps = {
    onEdit: (category: IproductCategory, id: string | number) => void;
};

const AdminCategoryEdit = ({ onEdit }: AdminEditProductProps) => {
    const navigate = useNavigate()
    const { id } = useParams();
    const fetchProductById = async (id: string | number) => {
        const { data } = await getOneProductCategory(id)
        return data
    }
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IproductCategory>({
        defaultValues: async () => {
            if (id) {
                return await fetchProductById(id)
            }
        }
    });


    const onSubmit: SubmitHandler<IproductCategory> = ({ _id, updatedAt, createdAt, products, ...inputUpdate }: IproductCategory) => {
        // console.log(inputUpdate);
        // console.log(id);
        onEdit(inputUpdate, id!);
        navigate('/admin/categorys')
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 ml-8">
            <h1 className="text-3xl mb-10">Form Edit</h1>
            <div>

                <label htmlFor="name">Name</label>
                <input
                    {...register("name", { required: true })}
                    className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <button
                type="submit"
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
                Edit
            </button>
        </form>
    );
};

export default AdminCategoryEdit;
