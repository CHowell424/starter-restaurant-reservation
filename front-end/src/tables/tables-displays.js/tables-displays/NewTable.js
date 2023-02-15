import React from "react";
import TableForm from "./TableForm";

function NewTable({refreshTables,tab, date, setDate}){
    let table = {table_name:"",capacity:""};
    return(<div> 
        <h1 className="text-center">New Table</h1>

        <div >
            <TableForm date={date} setDate={setDate} table ={table} tab={tab} refreshTables={refreshTables}/>
        </div>
        </div>)
}

export default NewTable;