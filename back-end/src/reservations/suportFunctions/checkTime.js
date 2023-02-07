async function checkTime(req,res,next){
    const {data={}} = req.body;
    let res_time = data.reservation_time;
    res_time = res_time.split(":");
    res_time = Number(res_time.join("."));
    if(res_time <=10.3 || res_time>=21.3){
        return next({status:400, message:"Reservation_time must be after 10:30AM and before 9:30PM"});
    }

    next();
}

module.exports = checkTime;