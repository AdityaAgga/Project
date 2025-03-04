const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"*",
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true
}))

const dbConnect = require("./config/dbConnect")

const PORT = process.env.PORT

dbConnect();

const routes = require("./routes/index")

app.use("/api/v1",routes)

app.listen(PORT,() => {
    console.log(`Server is listening at PORT ${PORT}`)
})