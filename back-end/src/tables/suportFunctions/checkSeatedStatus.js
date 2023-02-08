const service = require("../tables.service");

async function checkSeatedStatus(req,res,next){
    let table_id = req.params.table_id;
    let table = await service.read(table_id);
    if(!table.reservation_id){
        return next({status:400, message:`Table ${table.table_name} is not occupied at the moment.`})
    }
    return next();
}

module.exports = checkSeatedStatus;