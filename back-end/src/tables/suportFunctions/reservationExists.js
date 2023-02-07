const service = require("../../reservations/reservations.services");

//Checks if the reservation exists in the data base
async function reservationExists(req,res,next){
    let {data={}} = req.body;
    let reservationId = data.reservation_id;
  
    const reservation = await service.read(reservationId);
    if(reservation){
      return next();
    }
    return next({status: 404, message: `Could not find the reservation with the id of ${reservationId}`});
  }

module.exports = reservationExists;