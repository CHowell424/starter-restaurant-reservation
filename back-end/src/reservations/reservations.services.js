const knex = require("../db/connection");

//returns the reservation that matched the given reservation id
function read (reservationId){
    return knex("reservations").select("*").where({reservation_id:reservationId}).first();
}

// returns all reservations with the given date with all feilds
function list (date){
    return knex("reservations").select("*").where({reservation_date: date});
}

function list2(){
    return knex("reservations").select("*");
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
    list2,
    create,
    destroy,
    update
}