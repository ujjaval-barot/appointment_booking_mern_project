import React, { Component } from "react";
import { Form, Input, Button, message, Row, Col } from "antd";
import axios from "axios";
import HeaderWithDrawern from "../HeaderWithDrawer";

const CustomizedForm = Form.create({
  name: "global_state",
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      first_name: Form.createFormField({
        ...props.first_name,
        value: props.first_name.value
      }),
      last_name: Form.createFormField({
        ...props.last_name,
        value: props.last_name.value
      }),
      phone_number: Form.createFormField({
        ...props.phone_number,
        value: props.phone_number.value
      })
    };
  },
  onValuesChange(_, values) {}
})(props => {
  const { getFieldDecorator } = props.form;
  return (
    <Form style={{ padding: 20 }}>
      <Form.Item hasFeedback label="First Name">
        {getFieldDecorator("first_name", {
          rules: [
            {
              required: true,
              message: "Please input your First Name!",
              whitespace: true
            }
          ]
        })(<Input pattern="[a-zA-Z]{3,15}" />)}
      </Form.Item>

      <Form.Item hasFeedback label="Last Name">
        {getFieldDecorator("last_name", {
          rules: [
            {
              required: true,
              message: "Please input your Last Name!",
              whitespace: true
            }
          ]
        })(<Input pattern="[a-zA-Z]{3,15}" />)}
      </Form.Item>

      <Form.Item hasFeedback label="Phone Number">
        {getFieldDecorator("phone_number", {
          rules: [
            { required: true, message: "Please input your Phone number!" }
          ]
        })(
          <Input type="tel" pattern="^[6-9]\d{9}$" style={{ width: "100%" }} />
        )}
      </Form.Item>
    </Form>
  );
});

export default class Profile extends Component {
  state = {
    loading: false,
    fields: {
      first_name: {
        value: "user"
      },
      last_name: {
        value: "user"
      },
      phone_number: {
        value: 9898989898
      }
    }
  };

  handleSubmit = () => {
    const updatedObject = {
      first_name: this.state.fields.first_name.value,
      last_name: this.state.fields.last_name.value,
      phone_number: this.state.fields.phone_number.value,
      is_appointment_booked: 1,
      _id: this.props.match.params._id
    };

    axios
      .put("http://localhost:5000/updateAppointment", updatedObject)
      .then(response => {
        if (response.status == 200) {
          message.warning("Appointment Updated");
          return window.location.replace("/");
        }
      })
      .catch(() => {
        message.error(`Can't update info, Please try again later`, 1);
        return window.location.reload("/");
      });
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:5000/getAppointmentDetail/${this.props.match.params._id}`,
        {}
      )
      .then(res => {
        var data = {
          first_name: res.data.data[0].first_name,
          last_name: res.data.data[0].last_name,
          phone_number: res.data.data[0].phone_number
        };
        let fields = {};

        if (data) {
          var first_name = {
            value: data.first_name
          };
          var last_name = {
            value: data.last_name
          };
          var phone_number = {
            value: data.phone_number
          };
        }

        fields.first_name = first_name;
        fields.last_name = last_name;
        fields.phone_number = phone_number;

        this.setState(
          {
            fields
          },
          function() {}
        );
      })
      .catch(err => {
        return ;
      });
  }

  render() {
    this.handleFormChange = changedFields => {
      this.setState(({ fields }) => ({
        fields: { ...fields, ...changedFields }
      }));
    };

    const { fields } = this.state;

    return (
      <div>
        <HeaderWithDrawern title="Update Appointment" />
        <Row type="flex" justify="center" align="middle">
          <Col xs={23} sm={22} md={20} lg={18} xl={16}>
            <CustomizedForm
              {...fields}
              onSubmit={this.handleSubmit}
              onChange={this.handleFormChange}
            />
            <Form style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
              <Form.Item>
                <Button
                  style={{
                    height: 40,
                    width: "100%",
                    color: "white",
                    backgroundColor: "#ff7143"
                  }}
                  onClick={this.handleSubmit}
                  htmlType="submit"
                  type="submit"
                  className="login-form-button"
                >
                  Apply Changes
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
