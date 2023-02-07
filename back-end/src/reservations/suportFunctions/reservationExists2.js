
const service = require("../reservations.services");

//Checks if the reservation exists in the data base
async function reservationExists2(req,res,next){
    const {reservation_id} = req.params;
  
    const reservation = await service.read(reservation_id);
    if(reservation){
      return next();
    }
    return next({status: 404, message: `Could not find the reservation with the id of ${reservation_id}`});
  }

module.exports = reservationExists2;