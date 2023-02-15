import React from "react";
import ReservationForm from "../reservation-displays/ReservationForm"
// displays the form for a new Reservation.

function NewReservation({setDate}){
    let reservation ={first_name:"",last_name:"",mobile_number:"",reservation_date:"",reservation_time:"",people:""}
    return (<div>
        <h1 className="text-center">New Reservation</h1>
        <ReservationForm setDate={setDate} reservation={reservation} type={"new"} />
        </div>)
}
export default NewReservation;