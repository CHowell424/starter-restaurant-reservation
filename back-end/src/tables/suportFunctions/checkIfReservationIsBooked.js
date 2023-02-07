const service = require("../../reservations/reservations.services")


async function checkIfReservationIsBooked(req,res,next){
    let {reservation_id} = req.body.data;
    let reservation = await service.read(reservation_id);
    if(reservation.status !=="booked"){
        next({status:400,message:`Reservation ${reservation} is allready seated or has already left.`})
    }
    next();
}

module.exports = checkIfReservationIsBooked;