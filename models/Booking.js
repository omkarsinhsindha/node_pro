const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        slotId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "EventSlot",
            required: true
        },
        studentName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        rollNo: {
            type: String
        },
        bookingStatus: {
            type: String,
            enum: ["Booked", "Cancelled"],
            default: "Booked"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Booking", bookingSchema);