import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Select from "react-select";

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
      user: selectedOption.value.id,
      event: this.props.eventItem.id,
    };

    this.props.dispatch({
      type: "ASSIGN_EVENT",
      payload: submission,
    });
  };

  render() {
    const users = this.props.store.allUser;

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
                <span>{this.props.eventItem.request_date}</span>
              </p>
              <p>Program Date: {this.props.eventItem.program_date}</p>
              <p>Program Requested: {this.props.eventItem.program}</p>
            </div>
            <Select
              value="Assign"
              onChange={this.assign}
              options={users}
              className="selector_container"
            />
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MyEvent);
