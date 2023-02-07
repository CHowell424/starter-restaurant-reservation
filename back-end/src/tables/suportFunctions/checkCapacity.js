
//checks that the capacity is a number and is 1 or more
function checkCapicity(req,res,next){
    const {data={}} = req.body;
    if(typeof(data.capacity) !== "number"){
        return next({status:400, message:"Table capacity must be a number."})
    }
    if(data.capacity <1){
        return next({status:400, message:"Table capacity must be 1 or more."})
    }
    next()
}

module.exports = checkCapicity;