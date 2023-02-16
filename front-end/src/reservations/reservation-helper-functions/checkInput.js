const hasValidReservationDate = require("./hasValidReservationDate");
const hasValidReservationTime = require("./hasValidReservationTime");
const hasValidPhoneNumber = require("./hasValidPhoneNumber");
const hasValidPeople = require("./hasValidPoeple");

// checks that all the inputs are valid and returns an error if not

function checkInputs(formData){
    let people = hasValidPeople(formData.people);
    let mn = hasValidPhoneNumber(formData.mobile_number);
    let rd = hasValidReservationDate(formData.reservation_date);
    let rt = hasValidReservationTime(formData.reservation_time);

    if(people === true ){
        if(mn === true){
            if(rd === true){
                if(rt === true){
                    return true;
                }else{
                    return new Error(rt)
                }
            }else{
                return new Error(rd)
            }
        }else{
            return new Error(mn)
        }
    }else{
        return new Error(people);
    }
}

module.exports = checkInputs;