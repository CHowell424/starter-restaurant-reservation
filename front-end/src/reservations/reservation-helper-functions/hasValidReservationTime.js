// checks that the reservation time is within opperating hours.

function hasValidReservationTime(time){
    let res_time = time;
    res_time = res_time.split(":");
    res_time = Number(res_time.join("."));
    if(res_time <=10.3 || res_time>=21.3){
        return "Reservation_time must be after 10:30AM and before 9:30PM";
    }
    return true;
};

module.exports = hasValidReservationTime;