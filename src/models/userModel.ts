
import mongoose from "mongoose";
import  Jwt  from "jsonwebtoken";
// import bcrypt from 'bcrypt-ts';
const userModel=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:[true,"Email  is required"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please fill a valid email address']
    },
    password:{
        type:String,
        select:false,
        maxLength:[15,"Password shhould not exceed more then 15 characters"],
        minLength:[6,"Password shhould have atleast  then 6 characters"],
    },
    permissions:["read","write"],
    merchants:[{type:mongoose.Schema.Types.ObjectId,ref:"merchants"}],
},{timestamps:true})

// userModel.pre('save',function(next){
//     debugger
//     const salt= bcrypt.genSaltSync(10);
//     this.email="ddd@gmail.com";
//     next() 
// })
const JWT_SECRET_KEY:string=process.env.JWT_SECRET_KEY||"";
const JWT_EXPIRE:string=process.env.JWT_EXPIRE||"";

userModel.methods.getJwtToken = function (): string {
    return Jwt.sign({ id: this._id },JWT_SECRET_KEY,{
      expiresIn: JWT_EXPIRE,
    });
  };


export const USER=mongoose.model("user",userModel)

export default USER;


