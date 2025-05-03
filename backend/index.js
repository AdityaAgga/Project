const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const dbConnect = require("./config/dbConnect")

const PORT = process.env.PORT

dbConnect();

const routes = require("./routes/index")

// API routes
app.use("/api/v1", routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!"
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Route not found"
    });
});

app.listen(PORT,() => {
    console.log(`Server is listening at PORT ${PORT}`)
})