import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewReservation from "../reservations/reservation-displays/NewReservation";
import NewTable from "../tables/tables-displays.js/tables-displays/NewTable";
import SeatReservation from "../reservations/reservation-displays/SeatReservation";
import Search from "../search/search-displays/Search";
import EditReservation from "../reservations/reservation-displays/EditReservation";
/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes({ date, setDate,refreshTables, tab}) {

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={date} setDate={setDate} tab={tab} refreshTables={refreshTables} />
      </Route>

      <Route exact={true} path = "/reservations/new">
        <NewReservation date={date} setDate={setDate} tab={tab} refreshTables={refreshTables} />
      </Route>

      <Route path = "/tables/new">
        <NewTable date={date} setDate={setDate} tab={tab} refreshTables={refreshTables}  />
      </Route>

      <Route path = "/reservations/:reservation_id/seat">
        <SeatReservation date={date} setDate={setDate} tab={tab} refreshTables={refreshTables}/>
      </Route>

      <Route path = "/reservations/:reservation_id/edit">
        <EditReservation date={date} setDate={setDate} tab={tab} refreshTables={refreshTables}/>
      </Route>

      <Route path = "/search">
        <Search />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
