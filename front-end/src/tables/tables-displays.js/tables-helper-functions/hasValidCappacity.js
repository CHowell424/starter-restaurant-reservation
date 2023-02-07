// checks that a table capacity is not less that 1 and is a number.

function hasValidCapacity(capacity){
    if(typeof(capacity)!=="number"){
        return "Table capacity must be a number."
    }
    if(capacity<1){
        return "Table capacity must be 1 or more."
    }
    return true;
}

module.exports = hasValidCapacity;