import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import {createReservation,updateReservation} from"../../utils/api";
import ErrorAlert from "../../layout/ErrorAlert";
const hasValidReservationDate = require("../reservation-helper-functions/hasValidReservationDate");
const hasValidReservationTime = require("../reservation-helper-functions/hasValidReservationTime");


/**
 * reterns a reservation form with all of its event handelers
 * 
 *  the type paramiter allows it to be used for a new reservation or to update a reservation.
 */


function ReservationForm({reservation, type, dash,tab,refreshTables,refreshDash}){
    const [formData,setFormData] = useState({});
    const [inputError,setInputError]=useState(null);
    const history = useHistory();
    let fun = createReservation;
    let show=false;
    // handles the cancel reservation button


    //changes the submit to update a current reservation instead of creating a new one.
    if(type == "update"){
        fun = updateReservation;
        show = true;
    }


    //loads the given reservation into the form
    useEffect(LoadReservation,[])
    function LoadReservation(){
        setFormData(reservation);
    }


    // default submition hadelder 
    const handleSubmit = async (event)=> {
        event.preventDefault();
        let hasValidDate = hasValidReservationDate(formData.reservation_date);
        let hasValidTime = hasValidReservationTime(formData.reservation_time);
        if(hasValidDate ===true && hasValidTime ===true){
            const abortController = new AbortController();
            await fun(formData,abortController.signal)
            let reservation_date = formData.reservation_date;
            setFormData(reservation);
            history.push({pathname:`/dashboard`,search:`date=${reservation_date}`});
            refreshDash(!dash);
            refreshTables(!tab);
            
        }else{
            if(hasValidDate === true){
                let error = new Error(hasValidTime);
                setInputError(error);
            }else{
                let error = new Error(hasValidDate);
                setInputError(error);
            }
        }
    }


    // handles the cancel button

    const cancelHendeler = (event)=>{
        event.preventDefault();
        setFormData(reservation);
        history.goBack();
    }


    // updates form data to match the inputed data.

    const changeHandeler = (event) =>{
        let text = event.target.value;
        setFormData({...formData,[event.target.name]:text})
    }

    return(<div className="d-md-flex justify-content-center">
            <form onSubmit={handleSubmit}>
                <div className="row m-2 justify-content-around">
                    <div>
                        <label >First Name:</label>
                        <input name ="first_name" onChange={changeHandeler} value = {formData.first_name}></input>
                    </div>
                    
                    <div>
                        <label >Last Name:</label>
                        <input name ="last_name" onChange={changeHandeler} value = {formData.last_name}></input>
                    </div>
                </div>

                <div className="row m-2 justify-content-around">
                    <div>
                        <label >Mobile Number:</label>
                        <input name ="mobile_number" onChange={changeHandeler}  value = {formData.mobile_number}></input>
                    </div>

                    <div>
                        <label >Number of People:</label>
                        <input name ="people" onChange={changeHandeler} value = {formData.people}></input>
                    </div>
                </div>

                <div className="row m-2 justify-content-around">
                    <div>
                        <label >Reservation Date:</label>
                        <input type = "date" name ="reservation_date" onChange={changeHandeler}  value = {formData.reservation_date}></input>
                    </div>

                    <div>
                        <label >Reservation Time:</label>
                        <input type = "time" name ="reservation_time" onChange={changeHandeler} value = {formData.reservation_time}></input>
                    </div>
                </div>

                <div className="row m-2 justify-content-around">
                    <button className="btn btn-outline-dark" type = "submit">Submit</button>
                    <button className="btn btn-outline-dark" onClick={cancelHendeler}>Cancel</button>
                </div>

                <ErrorAlert error={inputError} />
            </form>
    </div>)
}

export default ReservationForm;