const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
const mongoose = require("./config/dB_config");
const { urls } = require("./app/controllers/contact_controller");
const { Usersrouter } = require("./app/controllers/user_controller");

app.get("/", (req, res) => {
	res.send("welcome to contact manager");
});

app.use("/", urls);
app.use("/users", Usersrouter);

app.listen(port, function() {
	console.log("listening request from", port);
});
