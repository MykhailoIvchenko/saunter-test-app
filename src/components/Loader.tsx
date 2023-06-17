import React from "react";
import {Spin} from "antd";

const Loader = () => {
  //#region Render
  return (
    <div className={'Loader'}>
      <Spin size="large" />
    </div>
  );
  //#endregion
};

export default Loader;
