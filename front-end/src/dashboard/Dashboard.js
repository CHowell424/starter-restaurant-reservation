import React, { useEffect, useState } from "react";
import { listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/reservation-displays/Reservations";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, dash, refreshTables}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if(params.date){
    date = params.date;
  }
  useEffect(loadDashboard, [date,dash]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  return (
    <main>
      <h4 className="text-center">Dashboard</h4>
      <div className="d-md-flex mb-3 justify-content-center">
        <button className="btn mr-3 btn-outline-dark">←</button>
        <h4 className="mb-0">{date}</h4>
        <button className="btn ml-3 btn-outline-dark">→</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations}/>
    </main>
  );
}

export default Dashboard;




/* 

CREATE SEPERATAE FILE FOR INDEVIDULE TABLE DISPLAY

*/
