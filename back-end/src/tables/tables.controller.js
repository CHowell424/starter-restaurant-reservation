const service = require("./tables.service");
const resService = require("../reservations/reservations.services")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const checkCapicity = require("./suportFunctions/checkCapacity");
const checkTableName = require("./suportFunctions/checkTableName");
const hasProperties = require("../suportFuntions/generalSuportFunctions/hasProperties");
const mergeSort = require("../suportFuntions/generalSuportFunctions/mergeSort");
const compare = require("./suportFunctions/compare");
const checkOccupiedStatus = require("./suportFunctions/chekOccupiedStatus");
const reservationExists = require("./suportFunctions/reservationExists");
const checkTableCapacity = require("./suportFunctions/checkTableCapacity")
const tableExitst = require("./suportFunctions/tableExits");
const checkSeatedStatus = require("./suportFunctions/checkSeatedStatus")
const checkIfReservationIsBooked = require("./suportFunctions/checkIfReservationIsBooked")


async function list(req,res,next){
    const dat = await service.list();
    let data = mergeSort(compare,dat);
    res.json({data:data})
}

async function create(req,res,next){
    const table = {...req.body.data,occupied:false};
    let created =  await service.create(table);
    res.status(201).json({data:created})
}

async function seat(req,res,next){
    const {data={}} = req.body;
    const {table_id} = req.params;
    const table = await service.read(table_id);
    const updatedTable = {...table,reservation_id:data.reservation_id,occupied:true};
    const seated = await service.seat(updatedTable)
    res.json({data: seated});
}

async function seatReservation(req,res,next){
    const {reservation_id}=req.body.data;
    let reservation = await resService.read(reservation_id);
    let updatedRes = {...reservation,status:"seated"}
    await service.reservationSeat(updatedRes);
    next();
}

async function finishReservation(req,res,next){
    const table_id = req.params.table_id;
    const table = await service.read(table_id);
    const reservation = await resService.read(table.reservation_id);
    let updatedReservation = {...reservation,status:"finished"};
    await resService.update(updatedReservation);
    next();
}

async function finish(req,res,next){
    const table_id = req.params.table_id;
    let table = await service.read(table_id);
    let updatedTable = await service.finish({...table,occupied:false});
    res.json({data:updatedTable});
}

module.exports ={
    list:[asyncErrorBoundary(list)],
    create:[
        asyncErrorBoundary(hasProperties("table_name","capacity")),
        asyncErrorBoundary(checkCapicity),
        asyncErrorBoundary(checkTableName),
        asyncErrorBoundary(create)],
    seat:[
        asyncErrorBoundary(hasProperties("reservation_id")),
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(checkOccupiedStatus),
        asyncErrorBoundary(checkTableCapacity),
        asyncErrorBoundary(checkIfReservationIsBooked),
        asyncErrorBoundary(seatReservation),
        asyncErrorBoundary(seat)
    ],
    finish:[
        asyncErrorBoundary(tableExitst),
        asyncErrorBoundary(checkSeatedStatus),
        asyncErrorBoundary(finishReservation),
        asyncErrorBoundary(finish)],
};