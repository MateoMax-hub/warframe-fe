import React from "react";
import style from './utils.module.scss';

const Search = (props) => {
  const { placeHolder, className, width, setState, statePropName } = props;
  const { searchInput } = style;

  const handleChange = (e) => {
    setState({[statePropName]: e.target.value});
  };

  return (
    <input
      type="text"
      placeholder={placeHolder ? placeHolder : ""}
      className={`${searchInput} ${className && className}`}
      style={width ? { width: width} : {}}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Search;
