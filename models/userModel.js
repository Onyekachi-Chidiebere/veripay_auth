const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        institution_code: {
            type: String,
            required: true,
        },
        institution_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institution',
        },
        password: {
            type: String,
            required: true,
        },
        password_expiry_date: {
            type: Date,
        },
        phone: {
            type: String,
            required: true,
        },
        photo_url: {
            type: String,
        },
        user_group_id: {
            type: String,
        },
        email:{type:String},
        created_on: {
            type: Date,
        },
        created_by: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            default:1,
        },
        first_login:{
            type:Number,
            default:0
        },
        is_employee:{
            type:Number
        },
        empoyee_verification_number:{
            type:String
        },
        email_validation_status:{
            type:Number,
            default:0,
        },
        email_validated_on:{
            type:Date,
        },
        phone_validation_status:{
            type:Number,
            default:0,
        },
        phone_validated_on:{
            type:Date,
        }

    },
    { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
