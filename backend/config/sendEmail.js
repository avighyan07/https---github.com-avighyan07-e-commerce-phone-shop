// //"a2533084@gmail.com"       howareudear
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//  service: 'gmail',
//  host: 'smtp.gmail.com',
//  port: 465,
//  secure: true,
//  auth: {
//   user: 'ilovedhoni00717@gmail.com',
//   pass: 'pnlx qhyn iruh guhv',
//  },
// });

// const sendEmail = async (email, token,options) => {
//     const mailOptions = {
//         from: 'niazi@gmail.com',
//         to: options.email,
//         subject: 'Email verification',
//         html:
//       '<p>Please click on the following link to verify your email address:</p>' +
//       '<a href="http://localhost:3000/verify/' +
//       token +
//       '">http://localhost:3000/verify/' +
//       token +
//         '</a>',
//       };

//  transporter.sendMail(mailOptions);
 
// // transporter.sendMail(mailOptions, function (error, info) {
// //   if (error) {
// //     console.log('Error in sending email  ' + error);
// //     return true;
// //   } else {
// //    console.log('Email sent: ' + info.response);
// //    return false;
// //   }
// //  });
// };
// module.exports = sendEmail;

const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
 host: 'smtp.gmail.com',
 port: 465,
 secure: true,
 auth: {
  user: 'ilovedhoni00717@gmail.com', //
  pass: 'pnlx qhyn iruh guhv',
 },
  });

  const mailOptions = {
    from: "ilovedhoni00717@gmail.com", //
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;