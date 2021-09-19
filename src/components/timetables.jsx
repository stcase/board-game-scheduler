import React, { Component } from "react";
import CalculateOptimal from "./calculateOptimal";
import SelectAddTimetable from "./addTimetable";
import Timetable from "./timetable";

class Timetables extends Component {
  state = {
    adding: false,
    timetables: [
      {
        name: "Japan",
        gmtOffset: 9,
        availability: [8, 12, 19, 20, 21, 22],
        id: 1,
      },
      {
        name: "CEST",
        gmtOffset: 2,
        availability: [8, 12, 19, 20, 21, 22],
        id: 2,
      },
      {
        name: "USA-EDT",
        gmtOffset: -4,
        availability: [8, 12, 19, 20, 21, 22],
        id: 3,
      },
      {
        name: "USA-PDT",
        gmtOffset: -7,
        availability: [8, 12, 19, 20, 21, 22],
        id: 4,
      },
    ],
  };

  handleHourSelect = (ttable, hour) => {
    let timetables = [...this.state.timetables];
    let timetable = timetables.find((e) => e.id === ttable.id);
    if (timetable.availability.includes(hour)) {
      timetable.availability = timetable.availability.filter((h) => h !== hour);
    } else {
      timetable.availability.push(hour);
    }

    this.setState({ timetables });
  };

  handleAddTimetable = (name, gmtOffset) => {
    const availability = [8, 12, 19, 20, 21, 22];
    let id = 0;
    let found = 0;
    while (found !== -1) {
      id += 1;
      let check_id = id; // seems to be needed to avoid confusing semantics for garbage collection
      found = this.state.timetables.findIndex((tt) => tt.id === check_id);
    }

    this.setState({
      timetables: [
        ...this.state.timetables,
        { name, gmtOffset, availability, id },
      ],
    });
  };

  handleRemoveTimetable = (timetable) => {
    const timetables = this.state.timetables.filter(
      (tt) => tt.id !== timetable.id
    );
    this.setState({ timetables });
  };

  render() {
    const { timetables } = this.state;

    return (
      <div>
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
                onSelect={this.handleHourSelect}
                onDelete={this.handleRemoveTimetable}
              />
            ))}
          </tbody>
        </table>
        <SelectAddTimetable onSubmit={this.handleAddTimetable} />
        <CalculateOptimal timetables={timetables} />
      </div>
    );
  }
}

export default Timetables;
