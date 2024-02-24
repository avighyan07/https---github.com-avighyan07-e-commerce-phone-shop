const express=require("express")
const {newOrder,getSingleOrder,myOrders,deleteOrder}=require("../controllers/ordercontroller")
const isAuthenticatedUser = require("../config/auth");
const router=express.Router()


router.route("/createorder").post(isAuthenticatedUser,newOrder)                         
router.route("/getSingleOrder").get(isAuthenticatedUser,getSingleOrder)             //admin             
router.route("/myorders").get(isAuthenticatedUser, myOrders);
router.route("/deletemyorders").delete(isAuthenticatedUser, deleteOrder);




module.exports=router