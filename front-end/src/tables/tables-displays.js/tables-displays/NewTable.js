import React from "react";
import TableForm from "./TableForm";

function NewTable({refreshTables,tab,refreshDash,dash}){
    let table = {table_name:"",capacity:""};
    return(<div> 
        <h1 className="text-center">New Table</h1>

        <div >
            <TableForm table ={table} tab={tab} refreshTables={refreshTables} refreshDash={refreshDash} dash={dash}/>
        </div>
        </div>)
}

export default NewTable;