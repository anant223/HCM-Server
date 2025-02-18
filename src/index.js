const dotenv = require("dotenv")
const connectDB = require("./db/mongoose.js");
const app = require("./app.js")

dotenv.config(
    {
        path: "./env"
    }
)


connectDB().then(
    app.listen(process.env.MY_PORT, function () {
           console.log("⚙️  Server Running on Port : ", process.env.MY_PORT);
    })
);

