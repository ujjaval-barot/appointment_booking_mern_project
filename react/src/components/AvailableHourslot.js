import React, { Component } from "react";
import { Card } from "antd";
import Schedule from "../assets/images/schedule.png";

export default class Hourslot extends Component {
  state = {
    is_slot_booked: 0
  };
  render() {
    return (
      <div>
        <Card
          bodyStyle={{ padding: "2" }}
          hoverable
          style={{
            background: "#71a95a",
            height: "100%",
            width: "100%",
            textAlign: "center",
            borderStyle: "2px solid ",
            maxHeight: "50%",
            alignContent: "center",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: "auto"
          }}
          cover={
            <img
              style={{
                height: "50%",
                width: "40%",
                paddingTop: 3,
                paddingBottom: 2,
                margin: "auto",
                marginTop: "5%",
                display: "block",
                maxWidth: "100%"
              }}
              alt="example"
              src={Schedule}
            />
          }
        >
          {this.props.cardname}
        </Card>
      </div>
    );
  }
}
