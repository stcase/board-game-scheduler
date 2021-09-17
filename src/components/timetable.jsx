import React from "react";

class Timetable extends React.Component {
  render() {
    const { ttable, onSelect } = this.props;
    return (
      <tr>
        <td>{ttable.name}</td>
        {[...Array(24).keys()].map((hour) => {
          const adjustedHour = (hour + ttable.gmtOffset) % 24;
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
          ></i>
        </td>
      </tr>
    );
  }
}

export default Timetable;
