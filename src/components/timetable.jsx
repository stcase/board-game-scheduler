import React from "react";
import gmtToLocalTime from "./common/timezone";

class Timetable extends React.Component {
  render() {
    const { ttable, onSelect, onDelete } = this.props;
    return (
      <tr>
        <td>{ttable.name}</td>
        {[...Array(24).keys()].map((hour) => {
          const adjustedHour = gmtToLocalTime(hour, ttable.gmtOffset);
          return (
            <td
              key={ttable.id + "-" + adjustedHour}
              className={
                ttable.availability.includes(adjustedHour)
                  ? "table-success"
                  : ""
              }
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(ttable, adjustedHour)}
            >
              {adjustedHour}
            </td>
          );
        })}
        <td>
          <i
            className="fa fa-times-circle"
            style={{ cursor: "pointer" }}
            aria-hidden="true"
            onClick={() => onDelete(ttable)}
          ></i>
        </td>
      </tr>
    );
  }
}

export default Timetable;
