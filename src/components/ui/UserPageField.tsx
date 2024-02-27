import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

const UserPageField = (props) => {
  let {
    editable: editable = false,
    name: name,
    inputType: inputType = "text",
    userProperty: userProperty,
    setUserProperty: setUserProperty,
    userPropertyName: userPropertyName = "",
    toggled: toggled = false,
    ...rest
  } = props;

  return (
    <div className="player container" style={{ display: "block" }}>
      <div className="player" style={{ display: "revert" }}>
        <div className="player" style={{ display: "flex" }}>
          <div style={{ display: "block" }}>
            <label className="player username" htmlFor={userProperty}>
              {name}
            </label>
            <input
              id={userProperty}
              name={userPropertyName}
              className="player input"
              type={inputType}
              value={userProperty}
              disabled={!toggled || !editable}
              style={{ width: "90%" }}
              onChange={(e) => setUserProperty(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

UserPageField.propTypes = {
  children: PropTypes.node,
  editable: PropTypes.boolean,
  name: PropTypes.string,
  value: PropTypes.string,
  inputType: PropTypes.string,
  userProperty: PropTypes.object,
  setUserProperty: PropTypes.func,
  userPropertyName: PropTypes.string,
  toggled: PropTypes.boolean,
};

export default UserPageField;
