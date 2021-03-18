import React from "react";

export const navigationRef = React.createRef();

const navigate = (name, params) =>
  navigationRef.current?.navigate(name, params);
  console.log('asad')

export default {
  navigate,
};
