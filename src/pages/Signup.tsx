import {useForm ,SubmitHandler } from "react-hook-form"
import { IUserSignup } from "../interfaces/auth";
import { useRef } from "react";
import { signup } from "../api/auth";
type Props = {}



const Signup = (props: Props) => {
const { register, handleSubmit, formState:{errors}, watch } = useForm<IUserSignup>();

//định nghĩa password
  const password = useRef({});
  password.current = watch("password", "");
  

  const onSubmit:SubmitHandler<IUserSignup> = (inputSignup:IUserSignup ) => {
    (async() =>{
      const {data} = await signup(inputSignup);
    })()
    console.log(inputSignup); 
    
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="">
    <div className="form-group">
      <label htmlFor="exampleInputEmail1">Name</label>
      <input {...register('name',{required: true })}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      {errors.name?.type === "required" && <small id="emailHelp" className="form-text text-muted">Trường Name là bắt buộc</small>}
   </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail2">Email address</label>
    <input {...register('email',{required: true, pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Địa chỉ email không đúng định dạng cần"
        }})}  type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" />
    {errors.email?.type === "required" && <small id="emailHelp" className="form-text text-muted">Trường email là bắt buộc</small>}
    {errors.email?.type === "pattern" && <small id="emailHelp" className="form-text text-muted">{errors.email.message}</small>}
  </div>
  <div className="form-group">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input {...register('password',{required: true, minLength:{
        value: 6,
        message: "Mật khẩu phải có ít nhất 6 ký tự"
      }})} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      {errors.password?.type ==="required" &&  <small id="emailHelp" className="form-text text-muted">Trường  Password là bắt buộc</small>}
      {errors.password?.type ==="minLength" &&  <small id="emailHelp" className="form-text text-muted">{errors.password.message}c</small>}
    </div>
  <div className="form-group">
      <label htmlFor="exampleInputPassword2">Confirm Password</label>
      <input {...register('confirmPassword',{
        validate: value => value === password.current || "Mật khẩu xác nhận không khớp"
      })} type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" />
      {errors.confirmPassword && <small id="emailHelp" className="form-text text-muted">{errors.confirmPassword.message}</small>}
    </div>
  <button type="submit" className="btn btn-primary">Signup</button>
</form>
}

export default Signup


