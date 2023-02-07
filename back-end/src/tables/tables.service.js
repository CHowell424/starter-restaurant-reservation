const knex = require("../db/connection");

function list(){
    return knex("tables").select("*");
}

function create(table){
    return knex("tables").insert(table).returning("*").then((createdRecords)=>createdRecords[0]);
}

function read(table_id){
    return knex("tables").select("*").where({table_id:table_id}).first();
}

function seat(updatedtable){
    return knex("tables")
        .select("*")
        .where({table_id:updatedtable.table_id})
        .update(updatedtable,"*")
        .then((updatedRecords)=>updatedRecords[0]);
}
function finish(table){
    return knex("tables")
        .select("*")
        .where({table_id:table.table_id})
        .update(table,"*")
}

function reservationSeat(updatedReservation){
    return knex("reservations")
        .select("*")
        .where({reservation_id:updatedReservation.reservation_id})
        .update(updatedReservation,"*")
        .then((updatedRecords)=>updatedRecords[0]);
}
module.exports ={
    create,
    list,
    seat,
    read,
    finish,
    reservationSeat
}