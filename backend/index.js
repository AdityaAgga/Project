const express = require("express");
const app = express();

require("dotenv").config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dbConnect = require("./config/dbConnect")

const PORT = process.env.PORT

dbConnect();

const routes = require("./routes/index")

app.use("/api/v1",routes)

app.listen(PORT,() => {
    console.log(`Server is listening at PORT ${PORT}`)
})