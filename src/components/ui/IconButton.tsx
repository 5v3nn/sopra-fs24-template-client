import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/ui/Button.scss";
import "../../styles/ui/IconButton.scss";

const IconButton = (props) => {
  const {
    hoverIcon: HoverIcon,
    icon: Icon,
    toggled: toggled = false,
    ...rest
  } = props;
  const [hover, setHover] = useState(false);

  return (
    <button
      {...rest}
      style={{
        width: props.width,
        background: "none",
        border: "none",
        padding: 0,
        color: "inherit",
        cursor: "pointer",
        ...props.style,
      }}
      className={`primary-button icon-button ${props.className}`}
      onMouseEnter={() => setHover(true || toggled)}
      onMouseLeave={() => setHover(false || toggled)}
    >
      {hover && HoverIcon ? (
        <HoverIcon size={20} className={"icon-button-icon"} />
      ) : (
        <Icon size={20} className={"icon-button-icon"} />
      )}
      {props.children}
    </button>
  );
};

IconButton.propTypes = {
  width: PropTypes.number,
  style: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.func,
  hoverIcon: PropTypes.func,
  toggled: PropTypes.boolean,
};

export default IconButton;
