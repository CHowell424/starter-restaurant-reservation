import React, { useEffect, useState } from "react";
import { listReservations} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../reservations/reservation-displays/Reservations";
import { today } from "../utils/date-time";
import { useHistory } from "react-router";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({date, dash, refreshTables, tab, refreshDash}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [displayDate,setDisplayDate]=useState(date);
  const history = useHistory()
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

  if(params.date){
    date = params.date;
  }

  const changeDate = (event)=>{
    event.preventDefault();
    let name = event.target.name;
    let subDate = new Date(date);
    if(name === "forward"){
      subDate.setDate(subDate.getDate() + 1);
    }else if(name === "back"){
      subDate.setDate(subDate.getDate()-1);
    }else{
      subDate = new Date(today());
    }
    const month = subDate.getUTCMonth() + 1; 
    const day = subDate.getUTCDate();
    const year = subDate.getUTCFullYear();
    date = `${year}/${month}/${day}`;
    history.push({pathname:`/dashboard`,search:`date=${date}`});
    refreshDash(!dash);
  }


  useEffect(loadDashboard, [date,dash]);
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setDisplayDate(date);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h4 className="text-center">Dashboard</h4>
      <div className="d-md-flex mb-3 justify-content-center">
        <button onClick={changeDate} name="back" className="btn mr-3 btn-outline-dark">←</button>
        <h4 className="mb-0">{displayDate}</h4>
        <button onClick={changeDate} name="forward" className="btn ml-3 btn-outline-dark">→</button>
      </div>
      <div className="d-md-flex m-1 justify-content-center">
        <button name="today" onClick={changeDate} className="btn btn-outline-dark">Today</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <Reservations reservations={reservations} tab={tab} refreshDash={refreshDash} refreshTables={refreshTables} dash={dash}/>
    </main>
  );
}

export default Dashboard;




/* 

CREATE SEPERATAE FILE FOR INDEVIDULE TABLE DISPLAY

*/
