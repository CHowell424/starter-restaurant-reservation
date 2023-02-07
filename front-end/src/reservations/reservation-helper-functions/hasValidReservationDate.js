// Checks if the reservation date is in the future and not on a tuesday

function hasValidReservationDate(date){
    let res_date = new Date(date);
    let current = new Date();
    let future = true;
    if(res_date.getDay() === 1){
        return "Reservation can not be on a tuesday because the restaurant is closed.";
    }
    if(current.getFullYear() > res_date.getFullYear()){
        future = false;
    } else if(current.getFullYear() === res_date.getFullYear()){
        if(current.getTime() > res_date.getTime()){
            future = false;
        }
    }

    if(!future){
        return "Reservation must be in the future.";
    }
    return true;
}
module.exports = hasValidReservationDate;