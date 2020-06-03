import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";

class RequestedEvent extends Component {
  render() {
    return ( <div>{this.props.event.status === "Requested" && (
        <div>
            
        </div>)
        });
        </div>
  }
}
export default connect(mapStoreToProps)(RequestedEvent);
