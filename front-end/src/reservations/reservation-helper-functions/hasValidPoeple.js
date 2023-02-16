// checks that the number of people is a number

function hasValidPeople(people){
    if(Number(people)){
        return true;
    }else{
        return "Number of people must be a number."
    }
}

module.exports = hasValidPeople;