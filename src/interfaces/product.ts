export interface Iproduct {
    _id?: string| number,
    name: string,
    image :string
    price: number,
    description: string,
    categoryId?: string
    updatedAt?:string
    createdAt?:string
}
export interface IproductCategory {
    _id?: string| number,
    name: string,
    // image :string
    // price: number,
    // description: string,
    // categoryId?: string
    updatedAt?:string
    createdAt?:string
    products:[]
}