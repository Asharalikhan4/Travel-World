import Booking from "../models/Booking.js";


// Create a booking
export const createBooking = async(req, res) => {
    const newBooking = new Booking(req.body);
    try{
        const savedBooking = await newBooking.save();

        res.status(200).json({success: true, message: "Your tour is booked", data: savedBooking});
    } catch(error){
        res.status(500).json({success: false, message: "Internal Server Error. Try Again"});
    }
};


// Get a single booking
export const getBooking = async(req, res) => {
    const id = req.params.id;
    try{
        const book = await Booking.findById(id);
        
        res.status(200).json({success: true, message: "Successful", data: book});
    } catch(error){
        res.status(404).json({success: false, message: "Not Found"});
    }
};


// Get all booking
export const getAllBooking = async(req, res) => {
    try{
        const bookings = await Booking.find({});
        
        res.status(200).json({success: true, message: "Successful", data: bookings});
    } catch(error){
        res.status(404).json({success: false, message: "Internal Server Error"});
    }
};