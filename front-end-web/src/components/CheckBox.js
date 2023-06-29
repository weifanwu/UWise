import React, { Component } from "react";

export default class Checkbox extends Component {
  render() {
    const { id, title, name, handleChange, checked, defaultChecked } = this.props;

    return (
      <div className="box">
        <input
          id={id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          defaultChecked={defaultChecked}
          checked={checked}
        />
        <label htmlFor={id}>{title}</label>
      </div>
    );
  }
}