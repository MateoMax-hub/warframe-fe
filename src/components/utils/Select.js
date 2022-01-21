import React, { useState } from "react";
import style from "./utils.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";

const Select = (props) => {
  const { options, placeHolder, width, setState, statePropName } = props;
  const { selectContainer, openOpts, closeOpts } = style;
  const [selected, setSelected] = useState(placeHolder || "");
  const [open, setOpen] = useState("init");

  const setfirstClose = () => {
    if (open === "init") {
      return "";
    } else if (open === true) {
      return openOpts;
    } else {
      return closeOpts;
    }
  };

  const handleTriggered = () => {
    if (open === "init") {
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };

  const handleClick = (option) => {
    setOpen(false);
    setSelected(option.label);
    setState({ [statePropName]: option.value });
  };

  return (
    <div onBlur={() => setOpen(false)} tabIndex={1} className={selectContainer}>
      <div
        style={width ? { width: width } : {}}
        onClick={handleTriggered}
        className={setfirstClose()}
      >
        {selected}
        <CaretDownOutlined />
      </div>
      <div style={width ? { width: width} : {}} className={setfirstClose()}>
        {options &&
          options.map((opt) => (
            <div onClick={() => handleClick(opt)}>{opt.label}</div>
          ))}
      </div>
    </div>
  );
};

export default Select;
