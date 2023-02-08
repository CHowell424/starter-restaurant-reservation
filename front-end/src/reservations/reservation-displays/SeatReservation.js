import React,{ useEffect,useState } from "react";
import { useHistory, useParams } from "react-router";
import {getReservation, listTables} from "../../utils/api"
import hasValidTableCapacity from"../reservation-helper-functions/hasValidTableCapacity"
import tableNotOccupied from"../reservation-helper-functions/tableNotOccupied";
import ErrorAlert from "../../layout/ErrorAlert";
import { seatTable } from "../../utils/api";

function SeatReservation({refreshTables,refreshDash, dash, tab}){
    const[tables,setTables] = useState([]);
    const[tableId,setTableId] = useState(1);
    const [inputError,setInputError]=useState(null);
    const reservationId = useParams().reservation_id;
    const history = useHistory();


    // loads the tables into the form
    async function loadTables(){
        const abortController =new AbortController();
        try{
            await listTables(abortController.signal).then(setTables);
    
        }catch(error){
            if(error.name==="AbortError"){
                console.log("Aboreted")
            }else{throw error}
        }
        return ()=>abortController.abort();
    }
    useEffect(loadTables,[])

    //handels change
    const changeHandeler = (event)=>{
        setTableId(event.target.value);
    }

    //handles submition of form
    const submitHandeler= async (event)=>{
        event.preventDefault();
        let hasCap = await hasValidTableCapacity(tableId,reservationId);
        let tableNotOccupie = await tableNotOccupied(tableId);
        let reservation = await getReservation(reservationId);
        if(tableNotOccupie == true && hasCap == true){
            const abortController = new AbortController();
            let dat = reservation.reservation_date;
            dat = dat.split("T");
            dat = dat[0];
            await seatTable(tableId,reservationId,abortController.signal);
            history.push({pathname:`/dashboard`,search:`date=${dat}`});
            refreshTables(!tab);
            refreshDash(!dash);
        }else{
            if(hasCap == true){
                let error = new Error(tableNotOccupie)
                setInputError(error)
            }else{
                let error = new Error(hasCap)
                setInputError(error)
            }
        }
    }

    //handles cancel button

    const cancelHandeler = (event)=>{
        history.goBack();
    }

    return (<div>
        <h1 className="text-center">Seat Reservation</h1>
        <div className="d-md-flex justify-content-center">
        <form onSubmit={submitHandeler}>
            <div className="row m-2 justify-content-aroundr">
                <label className="mr-1">Table Name:</label>
                <select name="table_id" onChange={changeHandeler}>
                     {tables.map((table)=>{return <option value={table.table_id} selected>{table.table_name} - {table.capacity}</option>})}
                </select>
            </div>
            <div className="row m-2 justify-content-around">
                <button className="btn btn-outline-dark" onClick={cancelHandeler}>Cancel</button>
                <button className="btn btn-outline-dark" type="submit">Submit</button>
            </div>
        </form>
        </div>
        <ErrorAlert error={inputError} />
    </div>)
}

export default SeatReservation;