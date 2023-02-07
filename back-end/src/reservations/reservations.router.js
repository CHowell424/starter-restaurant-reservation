/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// full route  = /reservations
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

// full route = /reservations/:reservationId
router.route("/:reservationId")
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router.route("/:reservation_id/status")
    .put(controller.updateStatus)
    .all(methodNotAllowed);

module.exports = router;
