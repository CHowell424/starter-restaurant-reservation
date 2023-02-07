import { listTables } from "../../../utils/api";

async function tableIsOccupied(table_id){
    let tables = await listTables();
    let table = tables.find((t)=>t.table_id == table_id);
    if(table.occupied === false){
        return "Table is not occupied."
    }
    return true;
}
export default tableIsOccupied;