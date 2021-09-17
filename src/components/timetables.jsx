import React, { Component } from "react";
import Timetable from "./timetable";

class Timetables extends Component {
  state = {
    timetables: [{ name: "person", gmtOffset: 3, availability: [8, 9], id: 1 }],
  };

  handleSelect = (ttable, hour) => {
    let timetables = [...this.state.timetables];
    let timetable = timetables.find((e) => e.id === ttable.id);
    if (timetable.availability.includes(hour)) {
      timetable.availability = timetable.availability.filter((h) => h !== hour);
    } else {
      timetable.availability.push(hour);
    }

    this.setState({ timetables });
  };

  render() {
    const { timetables } = this.state;

    return (
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>GMT</th>
            {[...Array(24).keys()].map((hour) => (
              <th key={hour}>{hour}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetables.map((ttable) => (
            <Timetable
              key={ttable.id}
              ttable={ttable}
              onSelect={this.handleSelect}
            />
          ))}
        </tbody>
      </table>
    );
  }
}

export default Timetables;
