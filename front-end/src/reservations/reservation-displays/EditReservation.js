import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm"
import formatReservationDate from "../../utils/format-reservation-date";
import formatReservationTime from "../../utils/format-reservation-time";

function EditReservation({dash, refreshDash, tab,refreshTables}){
    const [reservationForm,setReservationForm]=useState(<div></div>);
    const params = useParams();
    async function LoadReservation(){
        const abortContoller = new AbortController();
        await getReservation(params.reservation_id,abortContoller.signal)
            .then(formatReservationDate)
            .then(formatReservationTime)
            .then((value)=>setReservationForm(<ReservationForm type="update" reservation={value} dash={dash} refreshDash={refreshDash} tab={tab} refreshTables={refreshTables}/>))
    }

    useEffect(LoadReservation,[]);

    return(<div>
        <h1 className="text-center">Edit Reservation</h1>
        {reservationForm}
    </div>)
}

export default EditReservation;