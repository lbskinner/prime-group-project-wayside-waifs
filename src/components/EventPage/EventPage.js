import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "./EventPage.css";

import RequestedEvent from "../EventPageComponent/RequestedEvent/RequestedEvent";
import MyEvent from "../EventPageComponent/MyEvent/MyEvent";
import AllEvent from "../EventPageComponent/AllEvent/AllEvent";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

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

class EventPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_EVENTS",
    });
    this.props.dispatch({
      type: "GET_ALL_USERS",
    });
  }

  state = {
    heading: "Events",
    status: "Requested Events",
  };

  // Event Status Toggles
  requestSelect = () => {
    this.setState({
      status: "Requested Events",
    });
  };
  mySelect = () => {
    this.setState({
      status: "My Events",
    });
  };
  allSelect = () => {
    this.setState({
      status: "All Events",
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline>
          <Paper classes={{ root: classes.root }} elevation={1}>
            <Typography classes={{ root: classes.padding }} variant="h4">
              {this.state.heading}
            </Typography>
          </Paper>
          <div>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <Tabs>
                <Tab
                  label="Requested Events"
                  onClick={this.requestSelect}
                  color="secondary"
                ></Tab>
                <Tab
                  label="My Events"
                  onClick={this.mySelect}
                  color="secondary"
                ></Tab>
                <Tab
                  label="All Events"
                  onClick={this.allSelect}
                  color="secondary"
                ></Tab>
              </Tabs>
            </Box>
          </div>

          {this.state.status === "Requested Events" && (
            <Paper classes={{ root: classes.root }} elevation={1}>
              <div>
                <Typography variant="h6" align="center">
                  IN REQUESTED EVENTS
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="blue"
                        src="../images/blue.jpg"
                      ></img>{" "}
                      Contacted
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="yellow"
                        src="../images/yellow.jpg"
                      ></img>{" "}
                      Scheduled
                    </Typography>
                  </Box>
                </Typography>
                <div className={classes.padding}>
                  {this.props.store.event.map((eventItem) => {
                    return (
                      <RequestedEvent
                        key={eventItem.id}
                        eventItem={eventItem}
                      />
                    );
                  })}
                </div>
              </div>
            </Paper>
          )}
          {this.state.status === "My Events" && (
            <Paper classes={{ root: classes.root }} elevation={1}>
              <div>
                <Typography variant="h6" align="center">
                  IN MY EVENTS
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="blue"
                        src="../images/blue.jpg"
                      ></img>{" "}
                      Contacted
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="yellow"
                        src="../images/yellow.jpg"
                      ></img>{" "}
                      Scheduled
                    </Typography>
                  </Box>
                </Typography>
                <div className={classes.padding}>
                  {this.props.store.event.map((eventItem) => {
                    return <MyEvent key={eventItem.id} eventItem={eventItem} />;
                  })}
                </div>
              </div>
            </Paper>
          )}
          {this.state.status === "All Events" && (
            <Paper classes={{ root: classes.root }} elevation={1}>
              <div>
                <Typography variant="h6" align="center">
                  IN ALL EVENTS
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="blue"
                        src="../images/blue.jpg"
                      ></img>{" "}
                      Contacted
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Typography>
                      <img
                        className="swatches"
                        alt="yellow"
                        src="../images/yellow.jpg"
                      ></img>{" "}
                      Scheduled
                    </Typography>
                  </Box>
                </Typography>
                <div className={classes.padding}>
                  {this.props.store.event.map((eventItem) => {
                    return (
                      <AllEvent key={eventItem.id} eventItem={eventItem} />
                    );
                  })}
                </div>
              </div>
            </Paper>
          )}
        </CssBaseline>
      </div>
    );
  }
}

export default withStyles(styles)(
  withRouter(connect(mapStoreToProps)(EventPage))
);
