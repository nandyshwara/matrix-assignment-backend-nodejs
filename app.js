const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { baseRoute } = require("./utils/baseRoutes");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use(baseRoute + "/candidate", require("./routes/candidate.Routes"));
app.use(baseRoute + "/auth", require("./routes/user.Routes"));

module.exports = app;
