import React, { useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Tables from "../tables/tables-displays.js/tables-displays/Tables";
import "./Layout.css";
import { today } from "../utils/date-time";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [tab,refreshTables]=useState(false);
  const [date,setDate]=useState(today());

  return (
    <div className="container-fluid">
      <div className="row h-100">

        <div className="col-md-2 side-bar">
          <Menu />
        </div>

        <div className="col-md-7">
          <Routes date={date} setDate={setDate} tab={tab} refreshTables={refreshTables}/>
        </div >

        <div className="col-md-3 side-bar text-white">
          <Tables date={date} setDate={setDate} tab={tab} refreshTables={refreshTables}/>
        </div>

      </div>
    </div>
  );
}

export default Layout;
