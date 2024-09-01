const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    compName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    compPassword: {
        type: String,
        required: true
    },
    contactNo: {
        type: String, // Changed from Number to String to match the data type of contactNo in the request body
        required: false,
        unique: false,
        sparse: true // Allow unique constraint to work with null values
    },
    category: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'Active'
    },
    address: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    pincode: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        require: true,
    },
    modifyAt: {
        type: Date,
        require: true,
    },
    verifyOtp: {
        type: String
    },
    expireOtp: {
        type: Date
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    discription: {
        type: String,
        require: [true, ' Require to describe company product and services ']
    },
    image: {
        type: [String],
        // required: [true, 'image URL is required'],
    },
    videoURL: {
        type: String,
        // required: [true, 'video URL is required'],
    },
    place_Map_url: {
        type: String,
    },
    facebookURL: {
        type: String,
    },
    instagramURL: {
        type: String,
    },
    pinterestURL: {
        type: String,
    },
    skypeURL: {
        type: String,
    },
    linkedinURL: {
        type: String,
    },
    websiteURl: {
        type: String,
    },
    logo:{
        type:String,
    },


}, {
    timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
