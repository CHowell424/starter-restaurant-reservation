import React, { useEffect, useState } from "react";
import { finishTable} from "../../../utils/api";

function SingleTable({table, refreshTables, tab, refreshDash,dash}){
    const [button,setButton]=useState(<p className="col-md-4">N/A</p>)
    let occupiedString = table.occupied ? "Occupied" : "Free";

    
    useEffect(changeOccupied,[table.occupied])
    function changeOccupied(){
        if(table.occupied==true){
            setButton(<div className="col-md-4 "><button className="btn btn-sm btn-secondary" id={table.table_id} data-table-id-finish={table.table_id} onClick={finishHandler}>Finish</button></div>);
        }
    }

    const finishHandler = async (event)=>{
        let table_id = event.target.id;
        console.log(table_id);
          if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")){
            setButton(<p className="col-md-4">N/A</p>)
            await finishTable(table_id);
            await refreshDash(!dash);
            await refreshTables(!tab);
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