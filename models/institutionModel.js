const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema(
    {
        institution_code: {
            type: String,
            required: true,
        },
        institution_name: {
            type: String,
            required: true,
        },
        company_url: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
        },
        country_code: {
            type: String,
        },
        company_address: {
            type: String,
        },
        country_name: {
            type: String,
        },
        state: {
            type: String,
        },
        lga: {
            type: String,
        },
        city: {
            type: String,
        },
        zip_code: {
            type: String,
        },
        logo_url: {
            type: String,
        },
        signup_complete:{
            type:Number,
            default:0
        },
        setup_stage:{
            type:Number,
            default:0,
        }
    },
    { timestamps: true }
);

const institutionModel = mongoose.model('Institution', institutionSchema);

module.exports = institutionModel;
