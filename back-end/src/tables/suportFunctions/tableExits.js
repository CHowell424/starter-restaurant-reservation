const service = require("../tables.service");

//checks that the table exitst
async function tableExists(req,res,next){
    const tableId = req.params.table_id;
    let table = await service.read(tableId);
    if(table){
        return next()
    }else{
        return next({status:404, message:`Could not find table with id of ${tableId}`});
    }
}

module.exports = tableExists;