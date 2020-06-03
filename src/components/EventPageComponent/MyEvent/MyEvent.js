import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class MyEvent extends Component {
  state = {
    heading: "Events",
  };
  render() {
    return (
      <div>
        {this.props.event.educator_user_id === this.props.store.user.id && (
          <div onClick={this.eventDetails}>
            <p>
              {this.props.event.organization}
              <span>{this.props.event.request_date}</span>
            </p>
            <p>Program Date: {this.props.event.program_date}</p>
            <p>Program Requested: {this.props.event.training_program}</p>
            <button onClick={this.assign}>Assign</button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MyEvent);
