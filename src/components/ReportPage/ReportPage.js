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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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
    this.setState(
      {
        ...this.state,
        filterOption: event.target.value,
      },
      () => {
        this.setState({
          reportArray: [...this.state.allEventsInDateRange],
          programSelection: "All",
          userSelection: "All",
          statusSelection: "All",
          locationSelection: "All",
        });
      }
    );
  };

  handelSelectionOptionsChange = (event, propertyKey) => {
    this.setState(
      {
        ...this.state,
        [propertyKey]: event.target.value,
      },
      () => {
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
      }
    );
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
            allEventsInDateRange: [...response.data],
            reportArray: [...response.data],
            filterOption: "Program",
          },
          () => {
            console.log(this.state);
          }
        );
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
    let totalNumberOfKids = 0;
    const eventDataArray = this.state.reportArray.map((item, index) => {
      if (parseFloat(item.student_number) === NaN) {
        totalNumberOfKids += 0;
      }
      totalNumberOfKids += parseFloat(item.student_number);
      return (
        <TableRow key={index}>
          <TableCell>{item.program}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>{item.program_date}</TableCell>
          <TableCell>{item.time_of_day}</TableCell>
          <TableCell>{item.organization}</TableCell>
          <TableCell>{item.student_number}</TableCell>
          <TableCell>{item.adult_sponsors}</TableCell>
          <TableCell>{item.grade_level}</TableCell>
          <TableCell>
            {item.contact_first_name} {item.contact_last_name}
          </TableCell>
          <TableCell>{item.contact_email}</TableCell>
          <TableCell>
            {item.first_name} {item.last_name}
          </TableCell>
          <TableCell>{item.location}</TableCell>
        </TableRow>
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
      <div className="report-background-container">
        <div className="report-container">
          <Grid
            container
            // direction="row"
            // justify="space-between"
            // alignItems="flex-start"
          >
            <Grid item>
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
            </Grid>
            <Grid item>
              <Button
                size="large"
                variant="contained"
                color="secondary"
                onClick={this.generateReport}
              >
                Generate Report
              </Button>
            </Grid>
            <Grid item>
              {this.state.filterOption && (
                <>
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
                </>
              )}
            </Grid>
            <Grid item>
              {this.state.filterOption === "Program" && (
                <>
                  <h3>Filter Options</h3>
                  <FormControl variant="outlined">
                    <Select
                      value={this.state.programSelection}
                      onChange={(event) =>
                        this.handelSelectionOptionsChange(
                          event,
                          "programSelection"
                        )
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
                        Activating Em-PAW-thy: Exploring Similarities between
                        Pets and People
                      </MenuItem>
                      <MenuItem value="OUT">
                        Once U-PAW-n a Time Reading Program
                      </MenuItem>
                      <MenuItem value="KIA">Kids-in-Action</MenuItem>
                      <MenuItem value="ET">Educational Tours</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
              {this.state.filterOption === "User" && (
                <>
                  <h3>Filter Options</h3>
                  <FormControl variant="outlined">
                    <Select
                      value={this.state.userSelection}
                      onChange={(event) =>
                        this.handelSelectionOptionsChange(
                          event,
                          "userSelection"
                        )
                      }
                    >
                      <MenuItem value="All">All Users</MenuItem>
                      {userArray}
                    </Select>
                  </FormControl>
                </>
              )}
              {this.state.filterOption === "Status" && (
                <>
                  <h3>Filter Options</h3>
                  <FormControl variant="outlined">
                    <Select
                      value={this.state.statusSelection}
                      onChange={(event) =>
                        this.handelSelectionOptionsChange(
                          event,
                          "statusSelection"
                        )
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
                </>
              )}
              {this.state.filterOption === "Location" && (
                <>
                  <h3>Filter Options</h3>
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
                </>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            {/* <Grid container spacing={5}> */}
            <Grid item>
              <Typography variant="h6">
                Total Number of Events: {eventDataArray.length}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Total Number of Students Reached: {totalNumberOfKids}
              </Typography>
            </Grid>

            <Grid item>
              <Button size="large" variant="contained" color="secondary">
                Export to Excel
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Program</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>School/Organization</TableCell>
                  <TableCell>Number of Kids</TableCell>
                  <TableCell>Number of Adults</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Presenter</TableCell>
                  <TableCell>Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{eventDataArray}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ReportPage);
