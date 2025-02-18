const express = require("express")
const app = express()
const cookieParser = require("cookies-parser");


app.use(
    cours({
        origin: ["http://localhost:5173"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
)
app.use(express.json({ limit: "24kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// route

const userRouter = require("./routes/user.router.js")

app.use("api/v1/users", userRouter)

export {app}