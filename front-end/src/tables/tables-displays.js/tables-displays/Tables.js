import React,{useEffect,useState} from "react";
import { listTables } from "../../../utils/api";
import SingleTable from "../tables-displays/SingleTable"
import ErrorAlert from "../../../layout/ErrorAlert";

function Tables({tab, refreshTables, setDate, date}){
    const [tables,setTables]=useState([])
    const [errorMessage,setErrorMessage] = useState(null)

    useEffect(loadTables,[tab])
    function loadTables(){
        setErrorMessage(null);
        const abortController = new AbortController();
        listTables(abortController.signal).then(setTables).catch(setErrorMessage)
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
{               tables.map((table)=>{return <div key={table.table_id}><SingleTable table={table} refreshTables={refreshTables} tab ={tab} setDate={setDate} date={date}/></div>})}
        <ErrorAlert error={errorMessage} />
    </div>)
}

export default Tables;