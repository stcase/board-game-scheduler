import React from "react";

class SelectAddTimetable extends React.Component {
  state = {
    adding: false,
  };

  handleSelectAdd = () => {
    this.setState({ adding: true });
  };

  handleCancel = () => {
    this.setState({ adding: false });
  };

  render() {
    const { adding } = this.state;
    const { onSubmit } = this.props;

    if (adding) {
      return <AddTimetable onCancel={this.handleCancel} onSubmit={onSubmit} />;
    } else {
      return (
        <i
          className="fa fa-plus-square"
          aria-hidden="true"
          style={{ cursor: "pointer" }}
          onClick={() => this.handleSelectAdd()}
        ></i>
      );
    }
  }
}

class AddTimetable extends React.Component {
  state = {
    gmtOffset: "0",
    name: "",
  };

  handleGmtOffsetChange = (event) => {
    this.setState({ gmtOffset: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    const { onCancel, onSubmit } = this.props;
    const { name, gmtOffset } = this.state;

    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="timetableName">
            Name
          </label>
        </div>
        <input
          type="text"
          className="form-control"
          id="timetableName"
          aria-describedby="basic-addon3"
          onChange={(event) => this.handleNameChange(event)}
        ></input>
        <select
          className="custom-select"
          id="gmtSelect"
          defaultValue={gmtOffset}
          onChange={(event) => this.handleGmtOffsetChange(event)}
        >
          {[...Array(12).keys()].map((num) => {
            const offset = num - 12;
            return (
              <option key={offset} value={offset}>
                UTC{offset}
              </option>
            );
          })}
          <option key="0" value="0">
            UTC
          </option>
          {[...Array(12).keys()].map((num) => {
            const offset = num + 1;
            return (
              <option key={offset} value={offset}>
                UTC+{offset}
              </option>
            );
          })}
        </select>
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onSubmit(name, Number(gmtOffset))}
        >
          Submit
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => onCancel()}
          type="button"
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default SelectAddTimetable;
