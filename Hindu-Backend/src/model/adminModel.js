const mongoose = require('mongoose');
const Schema = mongoose.Schema ;


const adminSchema =new Schema ({
    fullName:{
        type:String,
        require:true
    },
    
    // companyName:{
    //     type:String,
    //     require:true,
    //     unique:true
    // },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    adminPassword:{
        type:String,
        require:true,
        unique:true,
    },
    contactNo:{
        type:Number,
        require:true,
        unique:true
    },
    verifyOtp: {
        type: String
    },
    expireOtp: {
        type: Date
    },

},{
    timestamps: true
  });

module.exports = mongoose.model("admin" ,adminSchema);