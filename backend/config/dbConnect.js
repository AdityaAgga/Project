const mongoose = require("mongoose")

const db_url = process.env.DB_URL.replace(
    "<db_password>",
    process.env.DB_PASSWORD
)

const dbConnect = () => {
    mongoose.connect(db_url)
    .then(() => console.log("Database Connected Successfully.."))
    .catch((err) => console.log(err))
}

module.exports = dbConnect;