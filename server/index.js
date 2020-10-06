const express = require("express");
require("dotenv").config();
const cors = require('cors')
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/auth");
const UserRoutes = require("./Routes/User")
const bodyParser = require('body-parser');
const app = express();

const port = process.env.port || 4000;

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use("/api", authRoutes);
app.use("/api", UserRoutes);

app.listen(port, () => {
    console.log("App is up at ", `${port}`)
})