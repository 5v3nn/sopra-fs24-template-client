import React from "react";
import "styles/views/Login.scss";
import PropTypes from "prop-types";

const RenderError = (props) => {
  if (props.err) {
    return (
      <div style={{ margin: "1em" }}>
        <p>{props.text}</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

RenderError.propTypes = {
  err: PropTypes.boolean,
  text: PropTypes.string,
};

// export default FormField;
export default RenderError;
