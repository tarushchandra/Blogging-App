require("dotenv").config();

// Importing Modules
const path = require("path");
const express = require("express");

// Importing Middlewares
const cookieParser = require("cookie-parser");
const { checkForAuthentication } = require("./middlewares/auth");

// Importing Services
const { connectToMongoDB } = require("./services/connection");

// Importing Routes
const staticRoutes = require("./routes/static");
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const commentRoutes = require("./routes/comment");

// MongoDB Connection
connectToMongoDB(process.env.MONGO_URL);

// Intializing App
const app = express();
const PORT = process.env.PORT;

// EJS Configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));
app.use(checkForAuthentication());

// Routes
app.use("/", staticRoutes);
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/comment", commentRoutes);

// Server Running
app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`));
