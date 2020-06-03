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
          <div></div>
        )}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(MyEvent);
