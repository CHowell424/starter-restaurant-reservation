import React, { useState } from "react"
import { setStatus } from "../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";

function SingleReservation({reservation, dash, tab, refreshDash, refreshTables}){
    let seatButton = <div></div>
    const [inputError,setInputError]=useState(null);
    const cancelReservation = async (event)=>{
        event.preventDefault();
        if(reservation.status =="booked"){
            if(window.confirm("Do you want to cancel this reservation?")){
                const abortController = new AbortController();
                let hi = await setStatus(reservation.reservation_id,"cancelled",abortController.signal)
                await refreshDash(hi)
        }}else{
            let error = new Error("Can not cancel reservation that is seated");
            setInputError(error)
        }
    }

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
            <a href = {`/reservations/${reservation.reservation_id}/edit`}>Edit</a>
            <button className="btn btn-outline-dark" data-reservation-id-cancel={reservation.reservation_id} onClick={cancelReservation}>Cancel reservation</button>
            {seatButton}
        </div>
        <ErrorAlert error={inputError} />
    </div>)
}

export default SingleReservation;