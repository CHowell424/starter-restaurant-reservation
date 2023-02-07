/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// full route  = /tables
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

router.route("/:table_id/seat")
    .put(controller.seat)
    .delete(controller.finish)
    .all(methodNotAllowed)

module.exports = router;
