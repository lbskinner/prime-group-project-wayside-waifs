import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

class RequestForm extends Component {
  state = {
    heading: "Class Component",
  };

  render() {
    return (
      <div>
        <Paper>
          <Typography variant="h4">Humane Education Request Form</Typography>
          <Typography variant="h6">Contact Information</Typography>
          <Grid container spacing={4}>
            <Grid item>
              <TextField label="First Name" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Last Name" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Email" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField label="Phone Number" variant="outlined" />
            </Grid>
          </Grid>
        </Paper>
        <br />
        <Paper>
          <Typography variant="h6">School or Organization Name</Typography>
          <TextField variant="outlined" fullWidth />
        </Paper>
        <Paper>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h6">Estimated Number of Students</Typography>
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
        </Paper>
        <Paper>
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
        </Paper>
        <Paper>
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
            * Please note that in order to be good stewards of our resources we
            are unable to deliver programming at locations outside of a 30
            minute radius of Wayside Waifs.
          </Typography>
          <TextField variant="outlined" label="Enter full address" fullWidth />
        </Paper>
        <Paper>
          <Typography variant="h6">Preferred date of program</Typography>
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
            Because weekends are our busiest days for adoptions, educational
            programs are typically held Monday-Friday.
          </Typography>
          <TextField
            variant="outlined"
            label="will be a calendar, placeholder for now"
          />
        </Paper>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RequestForm);
