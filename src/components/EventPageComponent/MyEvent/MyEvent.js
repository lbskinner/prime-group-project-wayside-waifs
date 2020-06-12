import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../../redux/mapStoreToProps";
const moment = require("moment");

class MyEvent extends Component {
  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.eventItem.id,
    });
    this.props.history.push(`/details/${this.props.eventItem.id}`);
  };

  render() {
    let background = { backgroundColor: "white" };
    if (this.props.eventItem.status === "Contacted") {
      background = { backgroundColor: "lightblue" };
    } else if (this.props.eventItem.status === "Scheduled") {
      background = { backgroundColor: "yellow" };
    }
    return (
      <div>
        {this.props.eventItem.educator_id === this.props.store.user.id && (
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
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(connect(mapStoreToProps)(MyEvent));
