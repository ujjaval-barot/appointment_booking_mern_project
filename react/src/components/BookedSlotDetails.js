import React, { Component } from "react";
import { Col, Button, Card, Row, Carousel, message, Descriptions } from "antd";
import User from "../assets/images/man.png";
import HeaderWithDrawer from "../HeaderWithDrawer";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class BookedSlotDetails extends Component {
  state = {
    first_name: "",
    last_name: "",
    phone_number: "",
    appointment_slot: ""
  };
  componentDidMount() {
    Axios.get(
      `http://localhost:5000/getAppointmentDetail/${this.props.match.params._id}`
    )
      .then((res, id) => {
        this.setState({
          first_name: res.data.data[0].first_name,
          last_name: res.data.data[0].last_name,
          phone_number: res.data.data[0].phone_number,
          appointment_slot: res.data.data[0].appointment_slot
        });
      })
      .catch(err => {
        return;
      });
  }

  handleDelete = () => {
    Axios.delete(`http://localhost:5000/deleteAppointment`, {
      data: {
        _id: this.props.match.params._id
      }
    })
      .then(response => {
        if (response.status == 200) {
          message.warning("Appointment Deleted");
          return window.location.replace("/");
        }
      })
      .catch(err => {
        message.warning("Failed to delete appointment");
        return window.location.replace("/");
      });
  };

  render() {
    return (
      <div>
        <HeaderWithDrawer title="Booked Slot Details" />
        <Row
          style={{ marginTop: "5%" }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col xs={23} sm={22} md={20} lg={18} xl={16}>
            <Card
              title={'Appointment Time:- '+''+this.state.appointment_slot}
              style={{
                padding: 5,
                width: "100%",
                marginBottom: 10,
                boxShadow:
                  "0px 1px 5px 0px lightgrey, 0px 2px 2px 0px lightgrey, 0px 3px 1px -2px lightgrey",
                backgroundColor: ""
              }}
              extra={
                <div>
                  <Row
                    style={{
                      fontWeight: "bold",
                      marginLeft: 0,
                      fontSize: "12px"
                    }}
                  >
                    12:40 PM
                  </Row>
                  <Row
                    style={{
                      fontWeight: "bold",
                      marginLeft: 0,
                      fontSize: "12px"
                    }}
                  >
                    10/10/2019
                  </Row>
                </div>
              }
              cover={
                <div>
                  <Carousel
                    style={{
                      textAlign: "center",
                      overflow: "hidden",
                      width: "100%"
                    }}
                  >
                    <div>
                      <Row
                        style={{ marginTop: 15 }}
                        type="flex"
                        justify="center"
                        align="middle"
                      >
                        <Col xs={23} sm={22} md={18} lg={16} xl={14}>
                          <img
                            style={{
                              marginTop: "50px",
                              margin: "auto",
                              width: "40%"
                            }}
                            alt="example"
                            src={User}
                          />
                        </Col>
                      </Row>
                    </div>
                  </Carousel>
                </div>
              }
            >
              <br />
              <Row type="flex" justify="center" align="middle">
                <Col span={23}>
                  <Descriptions bordered>
                    <Descriptions.Item label="First Name">
                      {this.state.first_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Name">
                      {this.state.last_name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                      {this.state.phone_number}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <br />
              <Row
                style={{ marginTop: 10, marginBottom: 10 }}
                type="flex"
                justify="center"
                align="middle"
              >
                <Col span={23}>
                  <Col span={12}>
                    <Link
                      to={{
                        pathname: `/updateappointmentform/${this.props.match.params._id}`
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor: "green",
                          width: "100%",
                          color: "white"
                        }}
                      >
                        Edit Details
                      </Button>
                    </Link>
                  </Col>
                  <Col span={12}>
                    <Button
                      onClick={() => this.handleDelete()}
                      style={{
                        backgroundColor: "red",
                        width: "100%",
                        color: "white"
                      }}
                    >
                      Delete Appointment
                    </Button>
                  </Col>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
