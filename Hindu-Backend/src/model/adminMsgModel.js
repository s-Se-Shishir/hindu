const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminmsgSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
    },
    phoneNo:{
        type:String,
    },
    comment: {
        type: String,
        required: true
    },
    msgDate:{
        type:Date,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('AdminMsg', adminmsgSchema);
