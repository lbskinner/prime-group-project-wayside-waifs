import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
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
        <h2>{this.state.heading}</h2>
        <div>
          <h5>
            <label onClick={this.requestSelect}>Requested Events </label>
            <label onClick={this.mySelect}> My Events </label>
            <label onClick={this.allSelect}> All Events</label>
          </h5>
        </div>
        <div>
          {this.state.status === "Requested Events" && (
            <div>
              <div>IN REQUESTED EVENTS!</div>
              <div>
                {this.props.store.event.map((eventItem) => {
                  return (
                    <RequestedEvent key={eventItem.id} eventItem={eventItem} />
                  );
                })}
              </div>
            </div>
          )}
          {this.state.status === "My Events" && (
            <div>
              <div>IN MY EVENTS!</div>
              <div>
                {this.props.store.event.map((eventItem) => {
                  return <MyEvent key={eventItem.id} eventItem={eventItem} />;
                })}
              </div>
            </div>
          )}
          {this.state.status === "All Events" && (
            <div>
              <div>IN ALL EVENTS!</div>
              <div>
                {this.props.store.event.map((eventItem) => {
                  return <AllEvent key={eventItem.id} eventItem={eventItem} />;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(EventPage));
