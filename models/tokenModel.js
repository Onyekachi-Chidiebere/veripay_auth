const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        institution_code: {
            type: String,
            required: true,
        },
       
        token: {
            type: String
        },
        email:{
            type:String,
        },
        phone:{
            type:String,
        },
        status:{
            type:Number, //1 used 0 not used
            default:0,
        },
        expiration_date:{
            type:Date,
        },
        used_on:{
            type:Date,
        }

    },
    { timestamps: true }
);

const otpModel = mongoose.model('token', tokenSchema);

module.exports = otpModel;
