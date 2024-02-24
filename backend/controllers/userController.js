
const User = require("../models/userModel");
 const sendToken = require("../utils/jwt");
 const sendEmail = require("../config/sendEmail");
const crypto = require("crypto");
// const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = async (req, res, next) => {
  try {
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "myCloud.public_id",
        url: "myCloud.url",
      },
    });


    const token=user.getJWTToken()
    // sendToken(user, 201, res);
    res.status(201).json({
        success:true,
        // user
        token
    })
  } catch (error) {
    // Handle errors as needed
    next(error); // Pass the error to the next middleware or express default error handler
  }
//   console.log(token)
};
exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Checking if the user has provided both email and password
      if (!email || !password) {
        throw new Error("Please Enter Email & Password");
      }
  
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        throw new Error("Invalid email or password");
      }
  
      const isPasswordMatched = await user.comparePassword(password);
  
      if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
      }
  
      const token=user.getJWTToken()
     sendToken(user, 201, res);
    // res.status(201).json({
    //     success:true,
    //     // user
    //     token
    // })
    } catch (error) {
      // Handle errors as needed
      next(error); // Pass the error to the next middleware or express default error handler
    }
  };
  


// Logout User
exports.logout = async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  };  


 // Forgot Password
 exports.forgotPassword = async (req, res, next) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Save the user with the new token
    await user.save({ validateBeforeSave: false });

    // Construct reset password URL
    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    // Email message
    const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email, please ignore it.`;

    // Send email
    await sendEmail({
      email: user.email,
      subject: 'Password Reset',
      message,
    });

    return res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.error('Error processing forgot password request:', error);

    // Send response with error details
    return res.status(500).json({
      success: false,
      message: 'Error processing forgot password request',
      error: error.message,
    });
  }
};

  // Reset Password
exports.resetPassword = async (req, res, next) => {
    try {
      // creating token hash
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
  
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Reset Password Token is invalid or has been expired",
        });
      }
  
      if (req.body.password !== req.body.confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password does not match",
        });
      }
  
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save();
  
      sendToken(user, 200, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  

  exports.getUserDetails = async (req, res, next) => {
    const { token } = req.cookies;
    console.log('Token:', token);
    console.log('User ID:', req.user.id); // Corrected line
    const user = await User.findById(req.user.id);
    console.log('User Details:', user);
  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
  
    console.log(user);
    res.status(200).json({
      success: true,
      user,
    });
  };

  
  exports.updatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  
    if (!isPasswordMatched) {
      return next(new ErrorHander("Old password is incorrect", 400));
    }
  
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHander("password does not match", 400));
    }
  
    user.password = req.body.newPassword;
  
    await user.save();
  
    sendToken(user, 200, res);
  };
  

  exports.updateProfile = async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };
  
  
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  };






  // // Get all users(admin)
  // exports.getAllUser = async (req, res, next) => {
  //   const users = await User.find();
  
  //   res.status(200).json({
  //     success: true,
  //     users,
  //   });
  // };
  
  // // Get single user (admin)
  // exports.getSingleUser = async (req, res, next) => {
  //   const user = await User.findById(req.params.id);
  
  //   if (!user) {
  //     return next(
  //       new ErrorHander(`User does not exist with Id: ${req.params.id}`)
  //     );
  //   }
  
  //   res.status(200).json({
  //     success: true,
  //     user,
  //   });
  // };
  
  // // update User Role -- Admin
  // exports.updateUserRole = async (req, res, next) => {
  //   const newUserData = {
  //     name: req.body.name,
  //     email: req.body.email,
  //     role: req.body.role,
  //   };
  
  //   await User.findByIdAndUpdate(req.params.id, newUserData, {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   });
  
  //   res.status(200).json({
  //     success: true,
  //   });
  // };
  
  // // Delete User --Admin
  // exports.deleteUser = async (req, res, next) => {
  //   const user = await User.findById(req.params.id);
  
  //   if (!user) {
  //     return next(
  //       new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
  //     );
  //   }
  
  //   // const imageId = user.avatar.public_id;
  
  //   // await cloudinary.v2.uploader.destroy(imageId);
  
  //   await user.remove();
  
  //   res.status(200).json({
  //     success: true,
  //     message: "User Deleted Successfully",
  //   });
  // };  