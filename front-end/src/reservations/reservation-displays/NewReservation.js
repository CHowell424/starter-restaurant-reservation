import React from "react";
import ReservationForm from "../reservation-displays/ReservationForm"
// displays the form for a new Reservation.

function NewReservation({dash,tab,refreshDash,refreshTables}){
    let reservation ={first_name:"",last_name:"",mobile_number:"",reservation_date:"",reservation_time:"",people:""}
    return (<div>
        <h1 className="center">New Reservation</h1>
        <ReservationForm reservation={reservation} type={"new"} tab={tab} refreshTables={refreshTables} refreshDash={refreshDash} dash={dash}/>
        </div>)
}
export default NewReservation;