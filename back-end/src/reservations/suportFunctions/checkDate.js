async function checkDate(req,res,next){
    let {data={}} = req.body;
    let res_date = new Date(data.reservation_date);
    let current = new Date();
    let future = true;
    if(res_date.getDay() == 1){
        return next({status:400,message:"Reservation_date can not be a tuesday because the store is closed"})
    }
    if(current.getFullYear() > res_date.getFullYear()){
        future = false;
    } else if(current.getFullYear() == res_date.getFullYear()){
        if(current.getTime() > res_date.getTime()){
            future = false;
        }
    }

    if(!future){
        return next({status:400,message:"Reservation must take place in the future"});
    }
    next();
}

module.exports=checkDate;