const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const msgSchema = new Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail:{
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

module.exports = mongoose.model('Message', msgSchema);
