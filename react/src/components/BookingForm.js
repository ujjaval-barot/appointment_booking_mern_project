import React, { Component } from "react";
import { Form, Col, Input, Button, message, Row } from "antd";
import axios from "axios";
import HeaderWithDrawern from "../HeaderWithDrawer";

const { TextArea } = Input;

class BookingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.is_appointment_booked = 1;
        values._id = this.props._id._id;

        axios
          .post(`http://localhost:5000/bookAppointment`, values, {
            "Access-Control-Allow-Origin": "*"
          })
          .then(res => {
            if (res) {
              message.success(`Appointment Booked successfully`);
              return window.location.replace("/");
            }
          })
          .catch(() => {
            return message.success(`Failed to book an appointment`);
          });
      }
    });
  };

  handleCancel = () => {
    message.warning("Appointment Booking canceled");
    window.location.replace("/");
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form
          style={{ marginTop: "80px" }}
          onSubmit={this.handleSubmit}
          className="login-form"
        >
          <Form.Item hasFeedback label={<span>First Name</span>}>
            {getFieldDecorator("first_name", {
              rules: [
                {
                  required: true,
                  message: "Please input your first name!",
                  whitespace: true
                }
              ]
            })(
              <TextArea
                autosize={{ minRows: 1, maxRows: 2 }}
                pattern="[a-zA-Z]{3,15}"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback label={<span>Last Name</span>}>
            {getFieldDecorator("last_name", {
              rules: [
                {
                  required: true,
                  message: "Please input your last name!",
                  whitespace: true
                }
              ]
            })(
              <TextArea
                autosize={{ minRows: 2, maxRows: 4 }}
                pattern="[a-zA-Z]{3,15}"
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback label={<span>Phone Number</span>}>
            {getFieldDecorator("phone_number", {
              rules: [
                {
                  required: true,
                  message: "Please input your phone number!",
                  whitespace: true
                }
              ]
            })(
              <TextArea
                autosize={{ minRows: 2, maxRows: 4 }}
                pattern="[a-zA-Z]{3,15}"
              />
            )}
          </Form.Item>
          <br />
          <Form.Item {...getFieldDecorator}>
            <Button
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "green",
                borderStyle: "hidden",
                height: 40
              }}
              type="primary"
              htmlType="submit"
            >
              Book Appointment
            </Button>
          </Form.Item>

          <Form.Item {...getFieldDecorator}>
            <Button
              onClick={() => this.handleCancel()}
              style={{
                width: "100%",
                color: "white",
                backgroundColor: "red",
                borderStyle: "hidden",
                height: 40
              }}
              type="primary"
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedBookingForm = Form.create({ name: "BookingForm" })(BookingForm);
export default class AppointmentBookingForm extends Component {
  render() {
    return (
      <div>
        <HeaderWithDrawern title="Booking Form" />
        <Row type="flex" justify="center" align="middle">
          <Col xs={23} sm={22} md={20} lg={18} xl={16}>
            <WrappedBookingForm _id={this.props.match.params} />
          </Col>
        </Row>
      </div>
    );
  }
}
