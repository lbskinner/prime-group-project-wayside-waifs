import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Select from "react-select";
const moment = require("moment");

class MyEvent extends Component {
  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.eventItem,
    });
    this.props.history.push("/details");
  };

  assign = (selectedOption) => {
    let submission = {
      user: selectedOption.value,
      event: this.props.eventItem.id,
    };

    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
    const users = this.props.store.allUser;
    let userList = [];
    if (this.props.store.allUser.length > 1) {
      for (let user of users) {
        userList.push({
          value: `${user.id}`,
          label: `${user.first_name}  ${user.last_name}`,
        });
      }
    }

    let background = { backgroundColor: "white" };
    if (this.props.eventItem.status === "Contacted") {
      background = { backgroundColor: "lightblue" };
    } else if (this.props.eventItem.status === "Scheduled") {
      background = { backgroundColor: "yellow" };
    }
    return (
      <div>
        {this.props.eventItem.educator_user_id === this.props.store.user.id && (
          <div>
            <div onClick={this.eventDetails} style={background}>
              <p>
                {this.props.eventItem.organization}
                <span>
                  {" "}
                  {moment(this.props.eventItem.request_date).format(
                    "MM-DD-YYYY"
                  )}
                </span>
              </p>
              <p>
                Program Date:{" "}
                {moment(this.props.eventItem.program_date).format("MM-DD-YYYY")}
              </p>
              <p>Program Requested: {this.props.eventItem.program}</p>
            </div>
            <Select
              placeholder="Assign"
              onChange={this.assign}
              options={userList}
              className="selector_container"
            />
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(connect(mapStoreToProps)(MyEvent));
