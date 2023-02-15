const knex = require("../db/connection");

//returns the reservation that matched the given reservation id
function read (reservationId){
    return knex("reservations").select("*").where({reservation_id:reservationId}).first();
}

// returns all reservations with the given date with all feilds
function list (param1 = null,param2,param3){
    if(param1){
        return knex("reservations").select("*").where(param1).whereNot(param2).whereNot(param3);
    }else{
       return knex("reservations").select("*");
    }
}

// return the pushed new reservation to the database and upadates the created records
function create(reservation){
    return knex("reservations").insert(reservation).returning("*").then((createdRecords)=>createdRecords[0]);
}

//returns the reservation that is deleted based of reservationId
function destroy(reservationId){
    return knex("reservations").where({reservation_id: reservationId}).del();
}

//returns the updated reservation
function update(reservation){
    return knex("reservations")
        .select("*")
        .where({reservation_id:reservation.reservation_id})
        .update(reservation,"*")
        .then((updatedRecords)=>updatedRecords[0]);
}


module.exports ={
    read,
    list,
    create,
    destroy,
    update
}