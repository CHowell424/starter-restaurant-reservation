// checks that the table name is more than 2 charictors long

function hasValidTableName(table_name){
    if(table_name.length < 2){
        return "Table_name must be 2 or more charactors long."
    }
    return true;
}

module.exports = hasValidTableName;