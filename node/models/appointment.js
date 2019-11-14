const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = Schema({
  first_name: {
    type: String,
    required: [false, "first_name is required"]
  },
  last_name: {
    type: String,
    required: [false, "last_name is required"]
  },
  phone_number: {
    type: String,
    required: [false, "phone_number is required"]
  },
  appointment_slot: {
    type: String,
    required: [true, "booking_slot is required"]
  },
  is_appointment_booked: {
    type: Number,
    required: [true, "is_booked is required"]
  }
});

module.exports = mongoose.model("AppointmentModel", AppointmentSchema);
