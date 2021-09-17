import React from "react";

class Timetable extends React.Component {
  render() {
    const { ttable, onSelect, onDelete } = this.props;
    return (
      <tr>
        <td>{ttable.name}</td>
        {[...Array(24).keys()].map((hour) => {
          const adjustedHour = mod(hour + ttable.gmtOffset, 24);
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

function mod(n, m) {
  // Fix the mod bug with negative numbers
  return ((n % m) + m) % m;
}

export default Timetable;
