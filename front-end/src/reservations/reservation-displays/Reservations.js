import React from "react";
import SingleReservation from "../reservation-displays/SingleReservation";

function Reservations({reservations, tab, refreshTables, dash, refreshDash}){
    return(<div>
        {reservations.map((res)=>{
            return(<div key ={res.reservation_id}>
                    <SingleReservation reservation={res} tab={tab} refreshDash={refreshDash} dash={dash} refreshTables={refreshTables}/>
                </div>)
        })}
    </div>)
}

export default Reservations;