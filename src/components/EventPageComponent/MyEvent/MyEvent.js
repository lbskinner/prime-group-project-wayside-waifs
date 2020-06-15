import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const moment = require("moment");

const styles = (theme) => ({
  root: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid white",
    borderWidth: "0px 0px 0px 10px",
  },
  rootContacted: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid #BCD053",
    borderWidth: "0px 0px 0px 10px",
  },
  rootScheduled: {
    maxWidth: "90%",
    width: "920px",
    margin: "15px auto",
    padding: 10,
    border: "1px solid #51AEA4",
    borderWidth: "0px 0px 0px 10px",
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
    let background = classes.root;
    if (this.props.eventItem.status === "Contacted") {
      background = classes.rootContacted;
    } else if (this.props.eventItem.status === "Scheduled") {
      background = classes.rootScheduled;
    }

    return (
      <div>
        {this.props.eventItem.educator_id === this.props.store.user.id && (
          <CssBaseline>
            <Paper classes={{ root: background }} elevation={1}>
              <div onClick={this.eventDetails}>
                <Typography variant="h6">
                  {this.props.eventItem.organization}
                  <span>
                    {" on "}
                    {moment(this.props.eventItem.request_date).format(
                      "MM-DD-YYYY"
                    )}
                  </span>
                </Typography>
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
            </Paper>
          </CssBaseline>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(
  withRouter(connect(mapStoreToProps)(MyEvent))
);
