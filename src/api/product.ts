import { Iproduct } from "../interfaces/product";
import insntance from "./insntace";
const accessToken = JSON.parse(localStorage.getItem("accessToken")!)
export const getAllProducts = () =>{
    return insntance.get("/products",);
}
export const getOneProducts = (id:string|number) =>{
    return insntance.get("/products/"+id);
}
export const deleteProduct = (id:number|string) =>{
    return insntance.delete(`/products/${id}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}
export const addProduct = (product:Iproduct) =>{
    return insntance.post("/products",product,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}
export const updateProduct = (product:Iproduct,id:string|number) =>{
    return insntance.put(`/products/${id}`,product,{
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}