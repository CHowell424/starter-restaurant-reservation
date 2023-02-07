import React from "react";
import TableForm from "./TableForm";

function NewTable({refreshTables,tab,refreshDash,dash}){
    let table = {table_name:"",capacity:""};
    return <TableForm table ={table} tab={tab} refreshTables={refreshTables} refreshDash={refreshDash} dash={dash}/>
}

export default NewTable;