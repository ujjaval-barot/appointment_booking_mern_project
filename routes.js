const mongoose = require("mongoose");
const { mongourl } = require("./config/database");

const AppointmentModel = require("./models/appointment");

// MongoDB connection
mongoose
  .connect(mongourl, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch(error => {
    console.log("Failed to connect MongoDB", error);
  });

const getAllAppointments = (req, res) => {
  AppointmentModel.find({}, (err, docs) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Failed to fetch appointment list." });
    }
    return res.status(200).send({ data: docs });
  });
};

const getAppointmentDetail = (req, res) => {
  AppointmentModel.find({ _id: req.params._id }, (err, docs) => {
    if (err) {
      return res
        .status(400)
        .send({ message: "Failed to fetch appointment details " });
    }
    return res.status(200).send({ data: docs });
  });
};

const bookUpdateOrDeleteAppointment = (req, res) => {
  let { first_name, last_name, phone_number, _id } = req.body;

  AppointmentModel.findOneAndUpdate(
    { _id },
    {
      $set: {
        first_name: req.method === "DELETE" ? "" : first_name,
        last_name: req.method === "DELETE" ? "" : last_name,
        phone_number: req.method === "DELETE" ? "" : phone_number,
        is_appointment_booked: req.method === "DELETE" ? 0 : 1
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        return res
          .status(400)
          .send({ message: "Failed to update record, please try again." });
      }
      return res
        .status(200)
        .send({ message: "Appointment has been updated successfully." });
    }
  );
};

module.exports = {
  getAllAppointments,
  getAppointmentDetail,
  bookUpdateOrDeleteAppointment
};
