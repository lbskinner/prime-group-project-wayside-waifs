import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

import "./ReportPage.css";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ReportPage extends Component {
  state = {
    heading: "Reports",
  };

  componentDidMount() {
    this.props.dispatch({
      type: "GET_EVENTS",
    });
  }

  render() {
    const eventDataArray = this.props.store.event.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.program}</td>
          <td>{item.program_date}</td>
          <td>{item.time_of_day}</td>
          <td>{item.organization}</td>
          <td>{item.student_number}</td>
          <td>{item.adult_sponsors}n</td>
          <td>{item.grade_level}</td>
          <td>
            {item.contact_first_name} {item.contact_last_name}
          </td>
          <td>{item.educator_id}</td>
          <td>{item.location}</td>
        </tr>
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
            <h3>Date Picker</h3>
          </div>

          <div>
            <h3>Filter By</h3>
            <ul>
              <li>Program</li>
              <li>User</li>
              <li>Location</li>
            </ul>
          </div>

          <div>
            <h3>Filter Options</h3>
            <input type="radio" className="filter1"></input>
            <label htmlFor="filter1">Filter 1</label>
            <br />
            <input type="radio" className="filter2"></input>
            <label htmlFor="filter2">Filter 2</label>
            <br />
            <input type="radio" className="filter3"></input>
            <label htmlFor="filter3">Filter 3</label>
          </div>
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <th>Program</th>
                <th>Date</th>
                <th>Time</th>
                <th>School/Organization</th>
                <th>Number of Kids</th>
                <th>Number of Adults</th>
                <th>Garde</th>
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
