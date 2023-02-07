const service = require("../tables.service");
const resService = require("../../reservations/reservations.services")

async function checkTableCapacity(req,res,next){
    let {data={}} = req.body;
    let {table_id} = req.params;
    let table = await service.read(table_id);
    let reservation = await resService.read(data.reservation_id);
    if(Number(reservation.people)>table.capacity){
        return next({status:400, message:`${table.table_name} does not have sefficent capacity`})
    }
    next();

}

module.exports = checkTableCapacity;