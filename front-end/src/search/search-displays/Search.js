import React, { useEffect, useState } from "react";
import SingleReservation from "../../reservations/reservation-displays/SingleReservation";
import ErrorAlert from "../../layout/ErrorAlert";
import {listReservations} from "../../utils/api";

function Search(){
    const [mobile_number,setSearchMN]=useState("");
    const [reservations, setReservations]=useState([]);
    const [inputError,setInputError]=useState(null);
    const changeHandeler = (event)=>{
        let text = event.target.value;
        setSearchMN(text);
    }

    const submitHandeler = async (event)=>{
        event.preventDefault();
        setInputError(null);
        const abortController = new AbortController();
        listReservations({ mobile_number }, abortController.signal)
            .then((value)=>{setReservations(value);if(value.length == 0){
                let error = new Error("No reservations found");
                setInputError(error);
            }else{
                setInputError(null);
            }})
            .catch(setInputError);
    }
    
    return(<div>
        <h1 className="text-center">Search</h1>
        <form className="d-md-flex justify-content-center" onSubmit={submitHandeler}>
            <label className="mr-2">Mobile number to search for:</label>
            <input name="mobile_number" value ={mobile_number} onChange={changeHandeler}></input>
            <button className="btn btn-outline-dark ml-5" type="submit">Find</button>
        </form>

        <ErrorAlert error={inputError} />

        {reservations.map((res)=>{return<div key = {res.reservation_id}><SingleReservation reservation={res}/></div>})}
    </div>)
}

export default Search;