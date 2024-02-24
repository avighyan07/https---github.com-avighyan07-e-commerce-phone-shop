// auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = async (req, res, next) => {
  try {
    console.log(req.cookies);

    let cookies;

    // Check if req.cookies is available, otherwise try to extract from req.headers.cookie
    if (req.cookies) {
      cookies = req.cookies;
    } else if (req.headers.cookie) {
      cookies = req.headers.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
      }, {});
    } else {
      throw new Error("No cookies found");
    }

    const { token } = cookies;

    if (!token) {
      throw new Error("Please Login to access this resource");
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    // Handle errors as needed
    next(error); // Pass the error to the next middleware or express default error handler
  }
};

module.exports = isAuthenticatedUser;


// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }

//     next();
//   };
// };