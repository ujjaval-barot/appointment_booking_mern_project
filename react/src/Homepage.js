import React, { Component } from "react";
import AvailableHourslot from "./components/AvailableHourslot";
import BookedHourSlot from "./components/BookedHourslot";
import { Row, Col, Divider, Button } from "antd";
import { Link } from "react-router-dom";
import HeaderWithDrawern from "./HeaderWithDrawer";
import AppointmentBookingForm from "./components/BookingForm";
import { connect  } from 'react-redux'
import fetchAppointments from './actions/action'

class Homepage extends Component {
  state = {
    appointments: [],
    loader: true,
    error: false
  };

  componentWillMount(){
    this.props.fetchAppointments();
  }
  
  componentWillReceiveProps(){
    setTimeout(()=>{ this.setState({
      appointments: this.props.appointments,
      loader: false,
      error: false
    }) }, 1000);
  }

  render() {
    if (this.state.loader) {
      return <h4>Loading Appointment Information....</h4>;
    } else if (this.state.error) {
      return <h3>Failed to fetch data, please try again after some time.</h3>;
    }

    return (
      <div style={{ backgroundColor: "#f9f8f1" }}>
        <HeaderWithDrawern title="Appointment Booking" />
        <Row type="flex" justify="center" align="middle">
          <Col xs={23} sm={22} md={21} lg={20} xl={19}>
            <div style={{ height: "100%", width: "100%", marginTop: "5px" }}>
              <div
                className="gutter-example"
                style={{
                  Height: "10%",
                  textAlign: "center",
                  marginTop: "10px"
                }}
              >
                <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <p
                    style={{
                      margin: "10px",
                      fontSize: 20,
                      textAlign: "center",
                      fontWeight: "bold"
                    }}
                  >
                    Choose your preferred time to book an appointment!
                  </p>
                </Row>

                <Row style={{ paddingTop: 10, paddingBottom: 15 }}> 
                  <Button style={{height: '22px', color: 'white', background:'#c70d3a'}}/>&nbsp; Booked &nbsp; &nbsp; &nbsp;
                  <Button style={{height: '22px', color: 'white', background:'#71a95a'}}/>&nbsp; Available
                </Row>

                <Row>
                  {this.state.appointments.map(appointment => {
                    if (appointment.is_appointment_booked === 0) {
                      return (
                        <Link
                          to={{
                            pathname: `/bookingform/${appointment._id}`
                          }}
                        >
                          <Col span={8} className="gutter-row">
                            <div
                              onClick={<AppointmentBookingForm />}
                              className="gutter-box"
                            >
                              <AvailableHourslot
                                cardname={appointment.appointment_slot}
                              />
                            </div>
                          </Col>
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          to={{
                            pathname: `/bookedslotdetails/${appointment._id}`
                          }}
                        >
                          <Col span={8} className="gutter-row">
                            <div className="gutter-box">
                              <BookedHourSlot
                                cardname={appointment.appointment_slot}
                              />
                            </div>
                          </Col>
                        </Link>
                      );
                    }
                  })}
                </Row>
                <Divider />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => { 
  return {
    appointments: state.appointments
   }
}

const mapDispatchToProps = (dispatch) => {
  return  {
     fetchAppointments: () => {dispatch(fetchAppointments())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)