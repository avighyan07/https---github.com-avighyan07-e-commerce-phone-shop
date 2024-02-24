const Product=require("../models/productmodel");
const ApiFeatures = require("../utils/apifeatures");
const isAuthenticatedUser=require("../config/auth")
exports.createallproducts=async (req,res,next)=>{

    // req.body.user = req.user.id;
     
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      product
    });
    };


    exports.updateProduct = async (req, res, next) => {
        let product = await Product.findById(req.params.id);
      
        if (!product) {
          
   return  res.status(500).json({
        success: false,
        message:"product not found"
      });
        }
      
        // Images Start Here
        // let images = [];
      
        // if (typeof req.body.images === "string") {
        //   images.push(req.body.images);
        // } else {
        //   images = req.body.images;
        // }
      
        // if (images !== undefined) {
        //   // Deleting Images From Cloudinary
        //   for (let i = 0; i < product.images.length; i++) {
        //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        //   }
      
        //   const imagesLinks = [];
      
        //   for (let i = 0; i < images.length; i++) {
        //     const result = await cloudinary.v2.uploader.upload(images[i], {
        //       folder: "products",
        //     });
      
        //     imagesLinks.push({
        //       public_id: result.public_id,
        //       url: result.secure_url,
        //     });
        //   }
      
        //   req.body.images = imagesLinks;
        // }
      
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
      
        res.status(200).json({
          success: true,
          product,
        });
      };

      exports.deleteProduct = async (req, res, next) => {
        let product = await Product.findById(req.params.id);
      
        if (!product) {
          
   return  res.status(500).json({
        success: false,
        message:"product not found"
      });
        }
      
        product = await product.deleteOne()
      
        res.status(200).json({
          success: true,
          product,
        });
      };

      exports.findProduct = async (req, res, next) => {
        try {
          const productId = req.params.id;
    console.log("Product ID:", productId);

    const product = await Product.findById(productId);
    console.log("Product from database:", product);
      
          if (!product) {
            return res.status(404).json({
              success: false,
              message: "Product not found",
            });
          }
      
          res.status(200).json({
            success: true,
            product,
          });
        } catch (error) {
          console.error("Error finding product:", error);
          res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
      };
      
  // Update the getallhomeproducts route
exports.getallhomeproducts = async (req, res) => {
  try {
    const resultPerPage = 5; // Adjust the number of items per page

    // You need to fetch the products here, similar to the getallproducts route
    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const pds = await apifeatures.query;

    res.status(200).json({
      success: true,
      pds,
      resultPerPage,
    });
  } catch (error) {
    console.error("Error in getallhomeproducts:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};


exports.getallproducts=async (req,res)=>{
  
const resultPerPage=2
const count=2
const prcn=await Product.countDocuments()  
const apifeatures=new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)
// const pds=await Product.find()
const pds=await apifeatures.query
res.status(200).json({ 
    success: true,
    pds,
    resultPerPage,
    prcn
})
}
// exports.getallproducts = async (req, res) => {
//   try {
//     const { paginate } = req.query;
    
//     let query = Product.find();
//     const prcn = await Product.countDocuments();

//     if (paginate && paginate === 'true') {
//       // Apply pagination if the 'paginate' parameter is present and set to 'true'
//       const resultPerPage = 3; // Adjust the number of items per page
      
//       // Initialize ApiFeatures instance with query and queryStr
//       const apiFeatures = new ApiFeatures(query, req.query);
      
//       // Chain methods: search, filter, and pagination
//       const pds = await apiFeatures.search().filter().pagination(resultPerPage).query;

//       res.status(200).json({
//         success: true,
//         pds,
//         resultPerPage,
//       });
//     } else {
//       // Return all products without pagination
//       const pds = await query;
//       res.status(200).json({
//         success: true,
//         pds,
//         count: prcn,
//       });
//     }
//   } catch (error) {
//     console.error("Error in getallproducts:", error);
//     res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//     });
//   }
// };


exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId } = req.body;
console.log(req.body)
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews && product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user._id.toString()
  );
  
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user && rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
};


exports.getProductReviews = async (req, res, next) => {
  const {  productId } = req.body;
  const product = await Product.findById(productId);

  if (!product) {
           
    return  res.status(500).json({
      success: false,
      message:"product not found"
    });
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};

// // Delete Review
// exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
//   const product = await Product.findById(req.query.productId);

//   if (!product) {
//     return next(new ErrorHander("Product not found", 404));
//   }

//   const reviews = product.reviews.filter(
//     (rev) => rev._id.toString() !== req.query.id.toString()
//   );

//   let avg = 0;

//   reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   let ratings = 0;

//   if (reviews.length === 0) {
//     ratings = 0;
//   } else {
//     ratings = avg / reviews.length;
//   }

//   const numOfReviews = reviews.length;

//   await Product.findByIdAndUpdate(
//     req.query.productId,
//     {
//       reviews,
//       ratings,
//       numOfReviews,
//     },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   res.status(200).json({
//     success: true,
//   });
// });