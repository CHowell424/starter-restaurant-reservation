import React, { useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Tables from "../tables/tables-displays.js/tables-displays/Tables";
import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [tab,refreshTables]=useState(false);
  const [dash,refreshDash]=useState(false);

  return (
    <div className="container-fluid">
      <div className="row h-100">

        <div className="col-md-2 side-bar">
          <Menu />
        </div>

        <div className="col-md-7">
          <Routes tab={tab} refreshTables={refreshTables} refreshDash={refreshDash} dash={dash} />
        </div >

        <div className="col-md-3">
          <Tables tab={tab} refreshTables={refreshTables} refreshDash={refreshDash} dash={dash}/>
        </div>

      </div>
    </div>
  );
}

/**setRefreshTables={setRefreshTables} refreshTables={refreshTables} dashRef ={dash}
 * refreshTables={refreshTables} refreshDash={refreshDash} dash={dash}
 */
export default Layout;
