import React, { useEffect, useState } from "react";
import { finishTable} from "../../../utils/api";
import { today } from "../../../utils/date-time";

function SingleTable({table, refreshTables, tab, date, setDate}){
    const [button,setButton]=useState(<p className="col-md-4">N/A</p>)
    let occupiedString = table.reservation_id ? "Occupied" : "Free";
    
    useEffect(changeOccupied,[table.occupied, table.reservation_id])
    function changeOccupied(){
        if(table.occupied==true || table.reservation_id){
            setButton(<div className="col-md-4 "><button className="btn btn-sm text-white btn-outline-light" id={table.table_id} data-table-id-finish={table.table_id} onClick={finishHandler}>Finish</button></div>);
        }
    }

    const finishHandler = async (event)=>{
        let table_id = event.target.id;
          if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            
            await finishTable(table_id);
            setDate(today())
            setDate(date)
            await refreshTables(!tab);
            setButton(<p className="col-md-4">N/A</p>)
          }
      }
    return(<div className="row justify-content-around">
        <p className="col-md-4">{table.table_name}</p>
        <p className="col-md-2">{table.capacity}</p>
        <p className="col-md-2" data-table-id-status={table.table_id}>{occupiedString}</p>
        {button}
    </div>)
}

export default SingleTable;