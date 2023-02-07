// compares two tables for the alphabetical order

function compare(t1,t2){
    let name1 = t1.table_name;
    let name2 = t2.table_name;
    if(name1[0]=="#" && name2[0]!=="#"){
        return true
    }
    if(name1>name2){
        return true;
    }
    return false;
}

module.exports=compare;