require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var cors = require("cors");
const {
  getAllAppointments,
  getAppointmentDetail,
  bookUpdateOrDeleteAppointment
} = require("./routes");

//serving static files
app.use(express.static("public"));

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/getAppointments", (req, res) => {
  return getAllAppointments(req, res);
});

app.get("/getAppointmentDetail/:_id", (req, res) => {
  return getAppointmentDetail(req, res);
});

app.post("/bookAppointment", (req, res) => {
  return bookUpdateOrDeleteAppointment(req, res);
});

app.delete("/deleteAppointment", (req, res) => {
  return bookUpdateOrDeleteAppointment(req, res);
});

app.put("/updateAppointment", (req, res) => {
  return bookUpdateOrDeleteAppointment(req, res);
});

app.use((req, res) => {
  return res.status(404).send({ message: "Page not found, 404" });
});

app.listen(port, () => {
  console.log("server is up and running on port : " + port);
});
