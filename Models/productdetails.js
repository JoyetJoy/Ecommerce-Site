const mongoose=require("mongoose");
const { array } = require("../src/middlewares/multerMiddleware");

const schema={
    productImage:{
        type:Array,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    size:{
        type:[String]
    },
    color:{
        type:[String]
    },
    return:{
        type:Boolean,
        default:false
    },
    deliverydate:{
        type:String,
        required:true
    },
    description:{
        type : String,
        required:true
    },
    price:{
        type:String,
        required: true
    },
    quantity:{
        type:String,
        required:true
    },
    discount:{
        type:String,
        required:true
    }
    


}


const productSchema=new mongoose.Schema(schema)
const productModel=new mongoose.model('ProductDatas',productSchema)
module.exports = productModel;