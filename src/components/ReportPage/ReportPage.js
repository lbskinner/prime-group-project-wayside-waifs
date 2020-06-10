import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import moment from "moment";
import "./ReportPage.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

class ReportPage extends Component {
  state = {
    heading: "Reports",
    startDate: "",
    endDate: "",
    filterOption: "",
    programSelection: "All",
    userSelection: "All",
    statusSelection: "All",
    locationSelection: "All",
    allEventsInDateRange: [],
    reportArray: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: "GET_EVENTS",
    });
    this.props.dispatch({
      type: "GET_ALL_USERS",
    });
  }

  handelFilterOptionChange = (event) => {
    this.setState({
      ...this.state,
      filterOption: event.target.value,
    });
  };

  handelSelectionOptionsChange = (event, propertyKey) => {
    this.setState({
      ...this.state,
      [propertyKey]: event.target.value,
    });
  };

  handleStartDateChange = (date) => {
    this.setState({
      ...this.state,
      startDate: date,
    });
  };

  handleEndDateChange = (date) => {
    if (!this.state.startDate) {
      alert("Please enter a start date");
      return;
    }
    if (date < this.state.startDate) {
      alert("Please enter an end date greater than start date!");
      return;
    }
    this.setState({
      ...this.state,
      endDate: date,
    });
  };

  generateReport = (event) => {
    const dateRange = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
    };

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    axios
      .post("/api/report", dateRange, config)
      .then((response) => {
        this.setState(
          {
            allEventsInDateRange: response.data,
          },
          () => {
            console.log(this.state);
          }
        );
        switch (this.state.filterOption) {
          case "Program":
            this.handleProgramOptions(this.state.programSelection);
            break;
          case "User":
            this.handleUserOptions(this.state.userSelection);
            break;
          case "Status":
            this.handleStatusOptions(this.state.statusSelection);
            break;
          case "Location":
            this.handleLocationOptions(this.state.locationSelection);
            break;
          default:
            return;
        }
      })
      .catch((error) => {
        console.log("Get events for report request failed", error);
      });
  };

  handleProgramOptions(program) {
    if (program === "All") {
      this.setState({
        reportArray: [...this.state.allEventsInDateRange],
      });
      return;
    }
    const filteredReportArray = this.state.allEventsInDateRange.filter(
      (event) => {
        return event.program === program;
      }
    );
    this.setState({
      reportArray: [...filteredReportArray],
    });
  }

  handleUserOptions(userId) {
    if (userId === "All") {
      this.setState({
        reportArray: [...this.state.allEventsInDateRange],
      });
      return;
    }
    const filteredReportArray = this.state.allEventsInDateRange.filter(
      (event) => {
        return event.educator_id === userId;
      }
    );
    this.setState({
      reportArray: [...filteredReportArray],
    });
  }

  handleStatusOptions(status) {
    if (status === "All") {
      this.setState({
        reportArray: [...this.state.allEventsInDateRange],
      });
      return;
    }
    const filteredReportArray = this.state.allEventsInDateRange.filter(
      (event) => {
        return event.status === status;
      }
    );
    this.setState({
      reportArray: [...filteredReportArray],
    });
  }

  handleLocationOptions(location) {
    if (location === "All") {
      this.setState({
        reportArray: [...this.state.allEventsInDateRange],
      });
      return;
    }
    let filteredReportArray = [];
    if (location === "on_site") {
      filteredReportArray = this.state.allEventsInDateRange.filter((event) => {
        return event.location === "on_site";
      });
    } else {
      filteredReportArray = this.state.allEventsInDateRange.filter((event) => {
        return event.location !== "on_site";
      });
    }
    this.setState({
      reportArray: [...filteredReportArray],
    });
  }

  render() {
    const eventDataArray = this.state.reportArray.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.program}</td>
          <td>{item.status}</td>
          <td>{item.program_date}</td>
          <td>{item.time_of_day}</td>
          <td>{item.organization}</td>
          <td>{item.student_number}</td>
          <td>{item.adult_sponsors}</td>
          <td>{item.grade_level}</td>
          <td>
            {item.contact_first_name} {item.contact_last_name}
          </td>
          <td>{item.contact_email}</td>
          <td>
            {item.first_name} {item.last_name}
          </td>
          <td>{item.location}</td>
        </tr>
      );
    });

    const userArray = this.props.allUser.map((user) => {
      return (
        <MenuItem key={user.id} value={user.id}>
          {user.first_name} {user.last_name}
        </MenuItem>
      );
    });
    return (
      <div>
        <div>
          <h2>{this.state.heading}</h2>
        </div>

        <div>
          <h4>Total Events This Month:</h4>
          <h4>Total Events Last Month:</h4>
          <h4>Total Events This Year:</h4>
        </div>

        <div className="inputField">
          <div>
            <h3>Select Date Range</h3>
            <DatePicker
              placeholderText="Select a start date"
              selected={this.state.startDate}
              onChange={(date) => this.handleStartDateChange(date)}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
            <DatePicker
              placeholderText="Select a end date"
              selected={this.state.endDate}
              onChange={(date) => this.handleEndDateChange(date)}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
          </div>

          <div>
            <h3>Filter By</h3>
            <FormControl variant="outlined">
              <Select
                displayEmpty
                value={this.state.filterOption}
                onChange={this.handelFilterOptionChange}
              >
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="Program">Program</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Status">Status</MenuItem>
                <MenuItem value="Location">Location</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div>
            <h3>Filter Options</h3>
            {this.state.filterOption === "Program" && (
              <FormControl variant="outlined">
                <Select
                  value={this.state.programSelection}
                  onChange={(event) =>
                    this.handelSelectionOptionsChange(event, "programSelection")
                  }
                >
                  <MenuItem value="All">All Programs</MenuItem>
                  <MenuItem value="FIA">
                    "Kindness in Action!" (formerly Families in Action)
                  </MenuItem>
                  <MenuItem value="NMB">"No More Bullying!®"</MenuItem>
                  <MenuItem value="DS">
                    PAW-etiquette for Pooches & People: Dog Safety
                  </MenuItem>
                  <MenuItem value="AE">
                    Activating Em-PAW-thy: Exploring Similarities between Pets
                    and People
                  </MenuItem>
                  <MenuItem value="OUT">
                    Once U-PAW-n a Time Reading Program
                  </MenuItem>
                  <MenuItem value="KIA">Kids-in-Action</MenuItem>
                  <MenuItem value="ET">Educational Tours</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            )}
            {this.state.filterOption === "User" && (
              <FormControl variant="outlined">
                <Select
                  value={this.state.userSelection}
                  onChange={(event) =>
                    this.handelSelectionOptionsChange(event, "userSelection")
                  }
                >
                  <MenuItem value="All">All Users</MenuItem>
                  {userArray}
                </Select>
              </FormControl>
            )}
            {this.state.filterOption === "Status" && (
              <FormControl variant="outlined">
                <Select
                  value={this.state.statusSelection}
                  onChange={(event) =>
                    this.handelSelectionOptionsChange(event, "statusSelection")
                  }
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Received">Request Received</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Assigned">Assigned</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                  <MenuItem value="Missed">Missed Connections</MenuItem>
                </Select>
              </FormControl>
            )}
            {this.state.filterOption === "Location" && (
              <FormControl variant="outlined">
                <Select
                  value={this.state.locationSelection}
                  onChange={(event) =>
                    this.handelSelectionOptionsChange(
                      event,
                      "locationSelection"
                    )
                  }
                >
                  <MenuItem value="All">All Locations</MenuItem>
                  <MenuItem value="on_site">Wayside Waifs</MenuItem>
                  <MenuItem value="off_site">Other</MenuItem>
                </Select>
              </FormControl>
            )}
          </div>
        </div>

        <div>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={this.generateReport}
          >
            Generate Report
          </Button>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Program</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
                <th>School/Organization</th>
                <th>Number of Kids</th>
                <th>Number of Adults</th>
                <th>Grade</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Presenter</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>{eventDataArray}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
