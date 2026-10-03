const express = require("express");

const router = express.Router();

const {
    createSlot,
    getAllSlots,
    getSlotById
} = require("../controllers/slotController");

router.post("/", createSlot);
router.get("/", getAllSlots);
router.get("/:id", getSlotById);

module.exports = router;