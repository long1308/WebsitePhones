
// dùng hook from
import {useForm ,SubmitHandler } from "react-hook-form"
import { signin } from "../api/auth"
import { IuserSignin } from "../interfaces/auth"
type Props = {}

const Signin = (props: Props) => {
    // sử dụng các hook form  destructuring  lấy ra 
    const {register, handleSubmit, formState:{errors}} = useForm<IuserSignin>()
    // hàm sử lý form 
    const onSubmit:SubmitHandler<IuserSignin> = (inputData : any) =>{
        console.log(inputData);
        
        ( async() =>{
            const {data} = await signin(inputData)
            localStorage.setItem("user",JSON.stringify(data))
        })()
    }
  return (
<form onSubmit={handleSubmit(onSubmit)} className="">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input {...register('email',{required: true, pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Địa chỉ email không đúng định dạng cần"
        }})}  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
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
    {errors.password?.type ==="minLength" &&  <small id="emailHelp" className="form-text text-muted">{errors.password.message}</small>}
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
</form>
  )
}

export default Signin