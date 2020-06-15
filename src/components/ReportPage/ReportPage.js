import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import moment from "moment";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

import { withStyles } from "@material-ui/core/styles";
import { InputLabel, CssBaseline } from "@material-ui/core";
import { CSVLink } from "react-csv";
import swal from "sweetalert";

import "./ReportPage.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const styles = (theme) => ({
  selectorPosition: {
    marginBottom: "15px",
  },
  filterByStyles: {
    padding: "10px 30px 10px 10px",
    minWidth: "78px",
    minHeight: "1.2rem",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
  filterOptionsStyles: {
    padding: "10px 30px 10px 10px",
    minWidth: "500px",
    minHeight: "1.2rem",
    fontSize: "1rem",
    backgroundColor: "#fff",
  },
});

const programKey = {
  FIA: 'Kindness in Action!" (formerly Families in Action)',
  NMB: '"No More Bullying!®"',
  DS: "PAW-etiquette for Pooches & People: Dog Safety",
  AE: "Activating Em-PAW-thy: Exploring Similarities between Pets and People",
  OUT: "Once U-PAW-n a Time Reading Program",
  KIA: "Kids-in-Action",
  ET: "Educational Tours",
  // didn't include other since other is free user input
  // other: "",
};

class ReportPage extends Component {
  state = {
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
    this.setState({
      ...this.state,
      endDate: date,
    });
  };

  generateReport = (event) => {
    if (!this.state.startDate || !this.state.endDate) {
      swal("Please enter date range!");
      return;
    }
    if (this.state.endDate < this.state.startDate) {
      swal("Please enter an end date that is greater than the start date!");
      return;
    }
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
        swal("Oops, something went wrong, please try again!");
      });
  };

  handleProgramOptions(program) {
    if (program === "All") {
      this.setState({
        reportArray: [...this.state.allEventsInDateRange],
      });
      return;
    }
    let filteredReportArray = [];
    if (program.toLowerCase() === "other") {
      filteredReportArray = this.state.allEventsInDateRange.filter((event) => {
        return !programKey.hasOwnProperty(event.program);
      });
    } else {
      filteredReportArray = this.state.allEventsInDateRange.filter((event) => {
        return event.program === program;
      });
    }
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
    const { classes } = this.props;
    let totalNumberOfKids = 0;
    const eventDataArray = this.state.reportArray.map((item) => {
      totalNumberOfKids += parseFloat(item.student_number);
      return (
        <StyledTableRow key={item.id}>
          <StyledTableCell component="th" scope="row" align="center">
            {programKey[item.program] ? programKey[item.program] : item.program}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item.status === "Missed" ? "Missed Connection" : item.status}
          </StyledTableCell>
          <StyledTableCell align="center">
            {moment(item.program_date).format("MM-DD-YYYY")}
          </StyledTableCell>
          <StyledTableCell align="center">{item.time_of_day}</StyledTableCell>
          <StyledTableCell align="center">{item.organization}</StyledTableCell>
          <StyledTableCell align="center">
            {item.student_number}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item.adult_sponsors}
          </StyledTableCell>
          <StyledTableCell align="center">{item.grade_level}</StyledTableCell>
          <StyledTableCell align="center">
            {item.contact_first_name} {item.contact_last_name}
          </StyledTableCell>
          <StyledTableCell align="center">{item.contact_email}</StyledTableCell>
          <StyledTableCell>
            {item.first_name} {item.last_name}
          </StyledTableCell>
          <StyledTableCell align="center">
            {item.location === "on_site" ? "Wayside Waifs" : item.location}
          </StyledTableCell>
        </StyledTableRow>
      );
    });
    // create array of literal objects for export to csv
    const exportData = this.state.reportArray.map((item) => {
      return {
        Program: programKey[item.program]
          ? programKey[item.program]
          : item.program,
        Status: item.status === "Missed" ? "Missed Connection" : item.status,
        Date: moment(item.program_date).format("MM-DD-YYYY"),
        Time: item.time_of_day,
        "School/Organization": item.organization,
        "# of Kids": item.student_number,
        "# of Adults": item.adult_sponsors,
        Grade: item.grade_level,
        Contact: `${item.contact_first_name} ${item.contact_last_name}`,
        Email: item.contact_email,
        Presenter: `${item.first_name} ${item.last_name}`,
        Location: item.location === "on_site" ? "Wayside Waifs" : item.location,
      };
    });

    const userArray = this.props.allUser.map((user) => {
      return (
        <CssBaseline>
          <MenuItem key={user.id} value={user.id}>
            {user.first_name} {user.last_name}
          </MenuItem>
        </CssBaseline>
      );
    });
    return (
      <CssBaseline>
        <div className="report-background-container">
          <div className="report-container">
            <Typography variant="h5">Select Date Range</Typography>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <DatePicker
                  placeholderText="Start date"
                  selected={this.state.startDate}
                  onChange={(date) => this.handleStartDateChange(date)}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  placeholderText="End date"
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
                    <InputLabel>Filter By</InputLabel>
                    <FormControl
                      variant="outlined"
                      classes={{ root: classes.selectorPosition }}
                    >
                      <Select
                        value={this.state.filterOption}
                        onChange={this.handelFilterOptionChange}
                        classes={{ root: classes.filterByStyles }}
                        className="selector-background"
                      >
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
                    <InputLabel>Filter Options</InputLabel>
                    <FormControl
                      variant="outlined"
                      classes={{ root: classes.selectorPosition }}
                    >
                      <Select
                        classes={{ root: classes.filterOptionsStyles }}
                        value={this.state.programSelection}
                        onChange={(event) =>
                          this.handelSelectionOptionsChange(
                            event,
                            "programSelection"
                          )
                        }
                        className="selector-background"
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
                <Grid item>
                  {this.state.filterOption === "User" && (
                    <>
                      <InputLabel>Filter Options</InputLabel>
                      <FormControl
                        variant="outlined"
                        classes={{ root: classes.selectorPosition }}
                      >
                        <Select
                          classes={{ root: classes.filterOptionsStyles }}
                          value={this.state.userSelection}
                          onChange={(event) =>
                            this.handelSelectionOptionsChange(
                              event,
                              "userSelection"
                            )
                          }
                          className="selector-background"
                        >
                          <MenuItem value="All">All Users</MenuItem>
                          {userArray}
                        </Select>
                      </FormControl>
                    </>
                  )}
                  {this.state.filterOption === "Status" && (
                    <>
                      <InputLabel>Filter Options</InputLabel>
                      <FormControl
                        variant="outlined"
                        classes={{ root: classes.selectorPosition }}
                      >
                        <Select
                          classes={{ root: classes.filterOptionsStyles }}
                          value={this.state.statusSelection}
                          onChange={(event) =>
                            this.handelSelectionOptionsChange(
                              event,
                              "statusSelection"
                            )
                          }
                          className="selector-background"
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
                      <InputLabel>Filter Options</InputLabel>
                      <FormControl
                        variant="outlined"
                        classes={{ root: classes.selectorPosition }}
                      >
                        <Select
                          classes={{ root: classes.filterOptionsStyles }}
                          value={this.state.locationSelection}
                          onChange={(event) =>
                            this.handelSelectionOptionsChange(
                              event,
                              "locationSelection"
                            )
                          }
                          className="selector-background"
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
            </Grid>
            <br />
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
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
                <Button size="large" variant="contained" color="primary">
                  <CSVLink className="link-text" data={exportData}>
                    Download Report
                  </CSVLink>
                </Button>
              </Grid>
            </Grid>
            <br />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Program</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Time</StyledTableCell>
                    <StyledTableCell align="center">
                      School/Organization
                    </StyledTableCell>
                    <StyledTableCell align="center"># of Kids</StyledTableCell>
                    <StyledTableCell align="center">
                      # of Adults
                    </StyledTableCell>
                    <StyledTableCell align="center">Grade</StyledTableCell>
                    <StyledTableCell align="center">Contact</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Presenter</StyledTableCell>
                    <StyledTableCell align="center">Location</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{eventDataArray}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </CssBaseline>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(ReportPage));
