// const app=require("./app")
// const dotenv=require("dotenv")
// const cors = require("cors"); 
// const condb=require("./config/database")
// app.use(cors());
// dotenv.config({path:"backend/config/config.env"})   //config

// condb()

// app.listen(process.env.PORT,()=>{

//     console.log(` Running on http://localhost:${process.env.PORT}`)
// })
// const express = require("express");
// const cors = require("cors");  // Import the cors middleware
// const dotenv = require("dotenv");
// const condb = require("./config/database");
// const app = express();

// dotenv.config({ path: "backend/config/config.env" });

// // Connect to the database
// condb();

// // Use the cors middleware
// app.use(cors());

// // Other middleware and routes
// // ...

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const condb = require("./config/database");

const app = express();
app.use(cors()); // Apply CORS middleware here

dotenv.config({ path: "backend/config/config.env" }); // Config
condb(); // Connect to the database

// Import and use your routes
const productRoutes = require("./routes/productroutes");
app.use("/api/v1", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
