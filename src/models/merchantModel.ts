const mongoose=require("mongoose")

const merchantModel=new mongoose.Schema({
    user:[{type:mongoose.Schema.Types.ObjectId,ref:"user"}],
    storeID:{
        type:String,
        unique:true,
        required:[true,"storeID  is Required"],
        
    },
    merchantName:{
        type:String,
        required:[true,"merchantname is Required"]
    },
     email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         'Please fill a valid email address']
     },
     commission:Number,
},{timestamps:true})

export const Merchants=mongoose.model("merchants",merchantModel)

export default Merchants;
