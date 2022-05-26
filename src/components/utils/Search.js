import React from "react";
import useDebounce from "../../hooks/useDebounce";
import style from './utils.module.scss';

const Search = (props) => {
  const { placeHolder, className, width, setState, statePropName, searchRef } = props;
  const { searchInput } = style;

  const handleChange = (e) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDebounce(() => {
      setState({[statePropName]: e.target.value});
    }, 500)
  };

  return (
    <input
      ref={searchRef ? searchRef : null}
      type="text"
      placeholder={placeHolder ? placeHolder : ""}
      className={`${searchInput} ${className && className}`}
      style={width ? { width: width} : {}}
      onChange={(e) => handleChange(e)}
    />
  );
};

export default Search;
