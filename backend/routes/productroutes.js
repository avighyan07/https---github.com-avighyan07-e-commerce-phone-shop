const express=require("express")
const { getallproducts,getallhomeproducts,createallproducts,updateProduct,deleteProduct,findProduct,createProductReview,getProductReviews } = require("../controllers/productcontrollers")
const isAuthenticatedUser = require("../config/auth");
const router=express.Router()

router.use("/api/v1/products", isAuthenticatedUser);
router.route("/products").get(getallproducts)

router.route("/create").post(isAuthenticatedUser,createallproducts)                          //admin
router.route("/homeproducts").get(getallhomeproducts)
router.route("/update/:id").put(isAuthenticatedUser,updateProduct)          //admin

router.route("/delete/:id").delete(isAuthenticatedUser,deleteProduct)       //admin

router.route("/find/:id").get(findProduct)

router.route("/givereview").put(isAuthenticatedUser, createProductReview);

router.route("/allreviews").get(isAuthenticatedUser, getProductReviews);

module.exports=router