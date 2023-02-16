// checks that the input mobile number is valid 

function hasValidPhoneNumber(phoneNumber){
    let split = phoneNumber.split("-");
    let mn = split.join("");
    if(Number(mn)){
        if(mn.length == 10){
            return true
        }else{
            return "Mobile number must be 10 numbers long."
        }
    }else{
        return "Mobile number must be a Number"
    }
}

module.exports = hasValidPhoneNumber;