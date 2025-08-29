const express = require("express");
const { getAllParcels, getAllAgents, getAllCustomers, assignParcelToAgent } = require("../controllers/adminParcelControllers");


const router = express.Router();

router.get("/parcels", getAllParcels);         // all parcel show
router.get("/agents", getAllAgents);           // all agent show
router.get("/customers", getAllCustomers);     // all customer show
router.post("/assign", assignParcelToAgent);   // assign parcel to agent

module.exports = router;
