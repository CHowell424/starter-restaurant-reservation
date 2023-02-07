import {listTables, getReservation} from"../../utils/api";

// checks that the table has a bigger capacity than the reservation

async function hasValidTableCapacity(tableId,reservationId){
    let tables = await listTables();
    let table = tables.find((tabl)=>tabl.table_id == tableId);
    let reservation = await getReservation(reservationId);
    if(Number(table.capacity) < Number(reservation.people)){
        return `Table ${table.table_name} does not have enough capacity for reservation ${reservationId}`;
    }
    return true;
}

export default hasValidTableCapacity;