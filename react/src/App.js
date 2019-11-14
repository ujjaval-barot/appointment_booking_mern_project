import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

// import components
import Homepage from "./Homepage";
import BookedSlotDetails from "./components/BookedSlotDetails";
import BookingForm from "./components/BookingForm";
import UpdateAppointmentForm from "./components/UpdateAppointmentForm";

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/bookedslotdetails/:_id"
          component={BookedSlotDetails}
        />
        <Route exact path="/bookingform/:_id" component={BookingForm} />
        <Route
          exact
          path="/updateappointmentform/:_id"
          component={UpdateAppointmentForm}
        />
      </HashRouter>
    );
  }
}
