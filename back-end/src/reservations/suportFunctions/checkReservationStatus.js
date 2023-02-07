const service = require("../reservations.services");

async function checkReservationStatus(req,res,next){
    let {status} = req.body.data
    let current = await service.read(req.params.reservation_id);
    if(status !== "booked" && status!=="seated" && status !=="finished" &&status !=="cancelled"){
        return next({status:400,message:`Status ${status} is not a valid status`})
    }
    if(current.status == "finished"){
        return next({status:400,message:`Reservation ${current.reservation_id} is alread finished`})
    }
    next();
}

module.exports = checkReservationStatus;