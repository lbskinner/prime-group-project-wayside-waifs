import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const styles = (theme) => ({
  root: {
    width: "80%",
    minWidth: 720,
    margin: "10px auto",
    paddingTop: 10,
    paddingBottom: 10,
  },
  padding: {
    padding: "8px 20px",
    // paddingTop: 8,
    // paddingBottom: 8,
  },
});

class RequestForm extends Component {
  state = {
    startDate: null,
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ margin: 15 }}>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <Typography classes={{ root: classes.padding }} variant="h4">
            Humane Education Request Form
          </Typography>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Typography variant="h6">Contact Information</Typography>
            <Grid container spacing={4}>
              <Grid item>
                <TextField label="First Name" variant="outlined" size="small" />
              </Grid>
              <Grid item>
                <TextField label="Last Name" variant="outlined" size="small" />
              </Grid>
              <Grid item>
                <TextField label="Email" variant="outlined" size="small" />
              </Grid>
              <Grid item>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  size="small"
                />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Typography variant="h6">School or Organization Name</Typography>
            <TextField variant="outlined" fullWidth />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="h6">
                  Estimated Number of Students
                </Typography>
                <TextField variant="outlined" />
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  Please indicate the grade level and age of students
                </Typography>
                <TextField variant="outlined" />
              </Grid>
              <Grid item>
                <Typography variant="h6">Number of Adult Sponsors</Typography>
                <TextField variant="outlined" />
              </Grid>
            </Grid>
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Typography variant="h6">
              Which Program are you interested in?
            </Typography>
            <FormControl variant="outlined">
              <Select
                displayEmpty
                //  value={age}
                //  onChange={handleChange}
              >
                <MenuItem value="">Select a program</MenuItem>
                <MenuItem value="FIA">
                  "Kindness in Action!" (formerly Families in Action)
                </MenuItem>
                <MenuItem value="NMB">"No More Bullying!®"</MenuItem>
                <MenuItem value="DS">
                  PAW-etiquette for Pooches & People: Dog Safety
                </MenuItem>
                <MenuItem value="AE">
                  Activating Em-PAW-thy: Exploring Similarities between Pets and
                  People
                </MenuItem>
                <MenuItem value="OUT">
                  Once U-PAW-n a Time Reading Program
                </MenuItem>
                <MenuItem value="KIA">Kids-in-Action</MenuItem>
                <MenuItem value="ET">Educational Tours</MenuItem>
                <MenuItem value="">Other</MenuItem>
              </Select>
            </FormControl>
            {/* the text input field will conditional render, if other is selected */}
            <TextField variant="outlined" label="Enter program name" />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Typography variant="h6">Preferred location of Program</Typography>
            <FormControl variant="outlined">
              <Select
                displayEmpty
                //  value={age}
                //  onChange={handleChange}
              >
                <MenuItem value="">Select a location</MenuItem>
                <MenuItem value="on_site">Wayside Waifs</MenuItem>
                <MenuItem value="off_site">Other</MenuItem>
              </Select>
            </FormControl>
            {/* the text input field will conditional render, if other is selected */}
            <Typography>
              * Please note that in order to be good stewards of our resources
              we are unable to deliver programming at locations outside of a 30
              minute radius of Wayside Waifs.
            </Typography>
            <TextField
              variant="outlined"
              label="Enter full address"
              fullWidth
            />
          </div>
        </Paper>
        <Paper classes={{ root: classes.root }} elevation={3}>
          <div className={classes.padding}>
            <Typography variant="h6">Preferred date of program</Typography>
            <Typography>
              * Because weekends are our busiest days for adoptions, educational
              programs are typically held Monday-Friday.
            </Typography>
            <DatePicker
              placeholderText="Click to select a date"
              selected={this.state.startDate}
              onChange={this.handleChange}
              minDate={new Date()}
            />
            <Typography variant="h6">Time of day preferred</Typography>
            <FormControl variant="outlined">
              <Select
                displayEmpty
                //  value={age}
                //  onChange={handleChange}
              >
                <MenuItem value="">Select a time</MenuItem>
                <MenuItem value="morning">Morning</MenuItem>
                <MenuItem value="afternoon">Afternoon</MenuItem>
                <MenuItem value="evening">Evening</MenuItem>
                <MenuItem value="no_preference">No Preference</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(RequestForm));
