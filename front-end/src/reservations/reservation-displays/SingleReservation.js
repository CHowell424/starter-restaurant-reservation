import React from "react"

function SingleReservation({reservation}){
    let seatButton = <div></div>
    if(reservation.status == "booked"){
        seatButton = <a href ={`/reservations/${reservation.reservation_id}/seat`}>seat</a>;
    }
    return (<div className="col border border-dark">
        <div className="row justify-content-center">
            <p className="ml-1">{reservation.first_name}</p>
            <p className="ml-1">{reservation.last_name}</p>
            <p className="ml-1"> {reservation.reservation_time}</p>
        </div>
        <div className="row justify-content-around">
            <p className="ml-1">Number of people: {reservation.people}</p>
            <p className="ml-1" data-reservation-id-status={reservation.reservation_id}>Reservation status: {reservation.status}</p>
        </div>
        <div className="row justify-content-around">
            <p className="ml-1">Mobile number: {reservation.mobile_number}</p>
        </div>
        <div className="row justify-content-around">
            {seatButton}
        </div>
    </div>)
}

export default SingleReservation;