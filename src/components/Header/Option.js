import React from "react";

const Option = ({ language, label }) => {
  return <option value={label}>{language}</option>;
};

export default Option;
