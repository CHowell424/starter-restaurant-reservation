//check that the enterd data is the correct data type
async function checkDataTypes (req,res,next){
    const {data={}} = req.body;
    const reservation_date = String(data.reservation_date);
    const reservation_time = String(data.reservation_time);
    const reservation_date_split = reservation_date.split("-");
    const reservation_time_split = reservation_time.split(":");
    if(data.status && data.status!=="booked"){
      return next({status:400, message:`reservation status must be set to booked not ${data.status}`})
    }
    if(reservation_date_split[0].length !==4 || reservation_date_split[1].length !==2 || reservation_date_split[2].length !==2){
      return next({status:400, message:"reservation_date is not currectly formated or isnt a date"});
    }
    if(reservation_time_split[0].length !==2 || reservation_time_split[1].length !==2){
      return next({status:400, message:"reservation_time is not currectly formated or isnt a date"});
    }
    if(typeof(data.people) !=="number"){
      return next({status:400, message:"people count must be a number"});
    }
    return next();
  }

module.exports=checkDataTypes;