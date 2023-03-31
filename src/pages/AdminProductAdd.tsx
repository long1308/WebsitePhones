import React from 'react'
import { Iproduct } from '../interfaces/product'
import {useForm, SubmitHandler} from 'react-hook-form'

type AdminProductAddProps = {
    onAdd: (product: Iproduct) => void
}

const AdminProductAdd = ({onAdd}: AdminProductAddProps) => {
    const {register, handleSubmit, formState:{errors}} = useForm<Iproduct>()

    const onSubmit:SubmitHandler<Iproduct> = (inputAdd: Iproduct) => {
      onAdd(inputAdd)
      
    }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Form Add</h1>
    <div>
        <label htmlFor="name">Name</label>
        <input {...register('name',{required: true})} className="form-control" type="text" placeholder="Enter Name" id='name' />
        {errors.name?.type ==='required' &&  <small id="emailHelp" className="form-text text-muted">Trường Name là bắt buộc</small>}
    </div>
    <div>
        <label htmlFor="price">Price</label>
        <input {...register('price',{required: true, pattern: /^[0-9]*$/})} className="form-control" type="text" placeholder="Enter Price" id='name' />
        {errors.price?.type ==='required' &&  <small id="emailHelp" className="form-text text-muted">Trường Price là bắt buộc</small>}
        {errors.price?.type ==='pattern' &&  <small id="emailHelp" className="form-text text-muted">Trường Price phải là số</small>}

    </div>
    <div>
        <label htmlFor="desc">Description</label>
        <input {...register('description',{required: true})} className="form-control" type="text" placeholder="Enter Description" id='name' />
        {errors.description?.type ==='required' &&  <small id="emailHelp" className="form-text text-muted">Trường Description là bắt buộc</small>}
    </div>
    <button type="submit" className="btn btn-primary">Add</button>
  </form>
}

export default AdminProductAdd