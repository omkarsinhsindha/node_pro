const EventSlot = require("../models/EventSlot");
const Booking = require("../models/Booking");

const createSlot = async (req, res) => {
    try {
        const {
            eventName,
            date,
            startTime,
            endTime,
            location,
            capacity
        } = req.body;

        if (!eventName || !date || !startTime || !endTime || !location || !capacity) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (capacity <= 0) {
            return res.status(400).json({
                message: "Capacity must be greater than 0"
            });
        }

        const slot = await EventSlot.create({
            eventName,
            date,
            startTime,
            endTime,
            location,
            capacity
        });

        res.status(201).json({
            message: "Event slot created",
            slot
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getAllSlots = async (req, res) => {
    try {
        const slots = await EventSlot.find();

        const result = [];

        for (const slot of slots) {
            const activeBookings = await Booking.countDocuments({
                slotId: slot._id,
                bookingStatus: "Booked"
            });

            result.push({
                ...slot.toObject(),
                availableSeats: slot.capacity - activeBookings
            });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getSlotById = async (req, res) => {
    try {
        const slot = await EventSlot.findById(req.params.id);

        if (!slot) {
            return res.status(404).json({
                message: "Slot not found"
            });
        }

        const activeBookings = await Booking.countDocuments({
            slotId: slot._id,
            bookingStatus: "Booked"
        });

        res.json({
            ...slot.toObject(),
            bookingCount: activeBookings,
            availableSeats: slot.capacity - activeBookings
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid slot ID"
        });
    }
};




module.exports = {
    createSlot,
    getAllSlots,
    getSlotById
};