import { Request,Response,NextFunction } from "express"
import USER from "../models/userModel";
import { catchAsyncErrors } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/errorHandler";
import { sendtokens } from "../utils/sendtoken";





export const merchantsignup=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body);
    const user = await new USER(req.body).save();
    res.json(user)
    sendtokens(user,200,res)

});

  
export const merchantsignin=catchAsyncErrors(async(req:Request,res:Response,next:NextFunction)=>{
    const user = await USER.findOne({ email: req.body.email })
        .select("+password")
        .exec();

    // res.json(user)

    if (!user) return next(new ErrorHandler("User not found by this email address", 404))


    const isMatch:boolean= user.password == req.body.password
    if(isMatch==true){
        sendtokens(user,200,res)
    }
    else{
        return next(new ErrorHandler("Wrong Password", 402))
    }
    res.send('done')
    

    // if (!isMatch) return next(new Errorhandler("Wrong Password", 402))
});

export const merchantsignout= catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Succesfully signout" })
})

export const merchantsession= catchAsyncErrors(async (req, res, next) => {
    res.json({
        authenticated: true,
        // user: req.user,
        // permissions: req.USER.permissions
    })
})