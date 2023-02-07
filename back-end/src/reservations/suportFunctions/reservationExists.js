const service = require("../reservations.services");

//Checks if the reservation exists in the data base
async function reservationExists(req,res,next){
    const {reservationId} = req.params;
  
    const reservation = await service.read(reservationId);
    if(reservation){
      return next();
    }
    return next({status: 404, message: `Could not find the reservation with the id of ${reservationId}`});
  }

module.exports = reservationExists;