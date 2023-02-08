import React, {useState} from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../../../layout/ErrorAlert";
import {createTable} from"../../../utils/api";
const hasValidTableName = require("../tables-helper-functions/hasValidTableName");
const hasValidCapacity = require("../tables-helper-functions/hasValidCappacity");

// Creates a form for tables and the event handelers


function TableForm({table, refreshTables,tab,dash,refreshDash}){
    const [formData,setFormData] = useState(table);
    const [inputError,setInputError]=useState(null);
    const history = useHistory();

    // handels the submition of the form including checking validity of input.

    const handleSubmit = async (event)=> {
        event.preventDefault();
        let hasValidName = hasValidTableName(formData.table_name);
        let hasValidCap = hasValidCapacity(Number(formData.capacity));
        if(hasValidCap === true && hasValidName === true){
            const abortController = new AbortController();
            await createTable(formData,abortController.signal);
            setFormData(table);
            refreshTables(!tab);
            refreshDash(!dash)
            history.push("/dashboard");
        }else{
            if(hasValidCap === true){
                let error = new Error(hasValidName)
                setInputError(error);
            }else{
                let error = new Error(hasValidCap)
                setInputError(error);
            }
        }
    }

    // handles the canel button

    const cancelHendeler = (event)=>{
        event.preventDefault();
        setFormData(table);
        history.goBack();
    }

    // updates form data to match the inputed data.

    const changeHandeler = (event) =>{
        let text = event.target.value;
        setFormData({...formData,[event.target.name]:text})
    }

    return (<div className="d-md-flex justify-content-center">

        <form onSubmit={handleSubmit}>
            <div className="row m-2 justify-content-around">
                <div className="col">
                    <label>Table Name:</label>
                    <input key={table.table_name} name = "table_name" onChange={changeHandeler} value = {formData.table_name}></input>
                </div>

                <div >
                    <label>Table Capacity:</label>
                    <input key={table.capacity} name = "capacity" onChange={changeHandeler} value = {formData.capacity}></input>
                </div>
            </div>

            <div className="row m-2 justify-content-around">
                <button className="btn btn-outline-dark" type = "submit"> Submit</button>
                <button className="btn btn-outline-dark" onClick={cancelHendeler}>Cancel</button>
            </div>
            <ErrorAlert error={inputError} />
        </form>

    </div>)
}

export default TableForm;