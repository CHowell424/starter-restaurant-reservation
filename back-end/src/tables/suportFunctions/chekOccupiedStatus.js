const service = require("../tables.service");

async function checkOccupiedStatus(req,res,next){
    let {table_id} = req.params;
    let table = await service.read(Number(table_id));
    let occupied = table.occupied;
    if(occupied == true){
        return next({status:400,message:"Table is currently occupied."})
    }
    next();
}

module.exports = checkOccupiedStatus;