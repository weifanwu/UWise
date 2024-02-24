import React from "react";

const Checkbox = ({
  id,
  title,
  name,
  handleChange,
  checked,
  defaultChecked,
}) => {
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
};

export default Checkbox;
