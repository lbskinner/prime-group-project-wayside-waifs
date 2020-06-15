import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Paper from "@material-ui/core/Paper";
const moment = require("moment");

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  paperTransparent: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff0",
  },
  padding: {
    padding: "8px 20px",
  },
  selectorSize: {
    minWidth: 600,
  },
  inputMargin: {
    margin: "10px 0px",
    minWidth: 600,
  },
});

class MyEvent extends Component {
  state = {
    FIA: "Kindness in Action (Formerly Families in Action",
    NMB: "No More Bullying",
    DS: "PAW-tiquette for Pooches & People: Dog Safety",
    AE: "Activating Em-PAW-thy: Exploring Similarities Between Pets & People",
    OUT: "Once U-PAW-n a Time Reading Program",
    KIA: "Kids in Action",
    ET: "Educational Tours",
    Other: "Other",
  };

  // click handlers
  eventDetails = () => {
    this.props.dispatch({
      type: "GET_EVENT_DETAILS",
      payload: this.props.eventItem.id,
    });
    this.props.history.push(`/details/${this.props.eventItem.id}`);
  };

  render() {
    const { classes } = this.props;
    let background = { backgroundColor: "white" };
    if (this.props.eventItem.status === "Contacted") {
      background = { backgroundColor: "lightblue" };
    } else if (this.props.eventItem.status === "Scheduled") {
      background = { backgroundColor: "yellow" };
    }

    return (
      <div>
        {this.props.eventItem.educator_id === this.props.store.user.id && (
          <Paper classes={{ root: classes.root }} elevation={1}>
            <div className={classes.padding}>
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
                  {moment(this.props.eventItem.program_date).format(
                    "MM-DD-YYYY"
                  )}
                </p>
                <p>
                  Program Requested: {this.state[this.props.eventItem.program]}
                </p>
              </div>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(
  withRouter(connect(mapStoreToProps)(MyEvent))
);
