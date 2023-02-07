import React from "react";
import SingleReservation from "../reservation-displays/SingleReservation";

function Reservations({reservations}){
    return(<div>
        {reservations.map((res)=>{
            return(<div key ={res.reservation_id}>
                    <SingleReservation reservation={res}/>
                </div>)
        })}
    </div>)
}

export default Reservations;