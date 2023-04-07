import { IproductCategory } from "../interfaces/product";
import insntance from "./insntace";
export const getAllProductCategory =() =>{
    return insntance.get("/categorys");
}
export const getOneProductCategory =(id:number|string) =>{
    return insntance.get("/categorys/"+id);
}
export const deleteCategory = (id:number|string) =>{
    return insntance.delete(`/categorys/${id}`,{
      
    });
}
export const addCategory = (category:IproductCategory) =>{
    return insntance.post(`/categorys`,category);
}
export const updateCategory = (category:IproductCategory,id:string|number) =>{
    return insntance.put(`/categorys/${id}`,category
    );
}