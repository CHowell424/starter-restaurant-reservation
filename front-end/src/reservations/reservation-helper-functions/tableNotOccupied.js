import {listTables} from"../../utils/api";

// checks that the table is occupied

async function hasValidTableCapacity(tableId){
    let tables = await listTables();
    let table = tables.find((tabl)=>tabl.table_id == tableId);
    if(table.occupied == true){
        return `Table ${table.table_name} is currently occupied`;
    }
    return true;
}

export default hasValidTableCapacity;