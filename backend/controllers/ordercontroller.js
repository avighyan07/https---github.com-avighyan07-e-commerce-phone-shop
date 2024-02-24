const Order = require("../models/orderModel");
const Product = require("../models/productmodel");



// Create new Order
exports.newOrder = async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
};


// get Single Order
exports.getSingleOrder = async (req, res, next) => {
     const {pid}=req.body
    const order = await Order.findById(pid).populate(
      "user",
      "name email"
    );
  
    if (!order) {
        return res.status(404).json({
            success: false,
            message: 'order not found',
          });
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  };
  
  // get logged in user  Orders
  exports.myOrders = async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });
  
    res.status(200).json({
      success: true,
      orders,
    });
  };



// delete Order
exports.deleteOrder = async (req, res, next) => {
    const {pid}=req.body
    const order = await Order.findById(pid);
    //const orders = await Order.find({ user: req.user._id });

    if (!order) {                    //params means ::/
        return res.status(404).json({
            success: false,
            message: 'order not found',
          });
    }
  
    await order.deleteOne();
    //await orders.remove();
    res.status(200).json({
      success: true,
    });
  };  