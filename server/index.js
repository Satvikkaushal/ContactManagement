const express = require("express");
require("dotenv").config();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/auth");
const UserRoutes = require("./Routes/User")
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api", authRoutes);
app.use("/api", UserRoutes);



app.listen(4000, () => {
    console.log("App is up at 4000")
})