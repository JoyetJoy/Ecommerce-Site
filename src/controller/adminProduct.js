const productModel=require('../../Models/productdetails')
const categoryModel=require('../../Models/categories')


exports.addproductGet = async (req, res) => {
    try {
        const categoryList = await categoryModel.find();
        res.render('admin/addproduct', { categoryList });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(404).json({success:false});
    }
};



exports.addproductPost = async (req, res) => {
    try {
        if(!req.files||req.files.length>5){
            return res.status(230).json({message:"Please provide a image",success:false});
        }

        const productImage=req.files.map((file)=>file.filename)
      
        const { productName, description, category, subcategory, returnproduct, size, color,deliverydate, price, quantity, discount } = req.body;
        
        
        const newSchema = new productModel({
            productImage,
            productName,
            category,
            subcategory,
            returnproduct,
            size,
            color,
            deliverydate,
            description,
            price,
            quantity,
            discount,
             
        });
        await newSchema.save();
        res.status(203).json({ success: true,  message: "Product Added Successfully" })

        
        
    } catch (error) {
        console.error("Error in adding the product to the database", error);
        res.status(500).send('Internal Server Error');
    }
};



exports.productsGet=async(req,res)=>{
    try{
        const productDetails=await productModel.find()

        res.render("admin/products",{productDetails})
    }catch(err){
        console.log('error to send product to products page',err)
        res.status(500).json({success:false});

    }
    
}

exports.editproductGet = async (req, res) => {
    try {
        const data=req.params.id;
        const productDetails=await productModel.findById(data)
        const categoryList = await categoryModel.find();
        res.render('admin/editproduct', { categoryList, productDetails });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(404).json({success:false});
    }
};

exports.editproductPost = async (req, res) => {
    try {
        const data = req.params.id;
        const { productName, price, category,subcategory,size,returnproduct, discount,deliverydate, description, quantity } = req.body;

        const productImage=req.files.map((file)=>file.filename)

        const product = productModel.find({ _id: data });
        const productimage = product.image;
        const image = req.files ? req.files.filename : productimage;
        

        const productDetail = await productModel.updateOne(
            { _id: data },
            {
                $set: {
                    productName,
                    price,
                    category,
                    subcategory,
                    size,
                    returnproduct,
                    discount,
                    deliverydate,
                    description,
                    quantity,
                    productImage:productImage
                }
            }
        );

        res.redirect("/admin/products");

    } catch (error) {
        console.log('Error in updating the product:', error);
        res.status(500).send('Error in updating the product');
    }
};

exports.deleteproduct=async(req,res)=>{
    try{
        const id=req.query.id;
        console.log(id);
        await productModel.deleteOne({_id: id});
        res.status(203).json({ success: true,  message: "Product Deleted Successfully" })

    }catch(error){
        console.log('Error in deleting product', error);
        res.status(500).send('Internal Server Error');
    }

}