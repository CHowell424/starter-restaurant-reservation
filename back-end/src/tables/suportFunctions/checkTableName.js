
//checks that the table name is 2 or more charactors
function checkTableName(req,res,next){
    let {data = {}} = req.body;

    if(data.table_name.length <2){
        return next({status:400,message:"table_name must be 2 or more Charactors."})
    }

    next();
}

module.exports = checkTableName;