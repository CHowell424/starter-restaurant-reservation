import React,{useEffect,useState} from "react";
import { listTables } from "../../../utils/api";
import SingleTable from "../tables-displays/SingleTable"

function Tables({tab, refreshTables, dash, refreshDash}){
    const [tables,setTables]=useState([])

    useEffect(loadTables,[tab])
    function loadTables(){
        const abortController = new AbortController();
        listTables(abortController.signal).then(setTables)
        return ()=>abortController.abort();
    }
    return(<div className="col-md- justify-content-center">
                <h4 className="row justify-content-around">Tables</h4>
                <div className="row justify-content-around">
                    <p className="col-md-4">Table Name</p>
                    <p className="col-md-2 ">Capacity</p>
                    <p className="col-md-2">O</p>
                    <p className="col-md-4">Finish</p>
                </div>
{               tables.map((table)=>{return <div key={table.table_id}><SingleTable table={table} refreshTables={refreshTables} tab ={tab} refreshDash={refreshDash} dash={dash}/></div>})}
    </div>)
}

export default Tables;