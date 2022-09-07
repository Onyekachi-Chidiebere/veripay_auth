const mongoose = require('mongoose');

const companySettingsSchema = new mongoose.Schema(
    {
        institution_code: {
            type: String,
            required: true,
        },
        institution_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Institution',
        },
        services: {
            type: Array//this is an array of objects with settings appended;
        },
        next_level_approval:{
            type:Number,
        },
        "2fa":{
            type:Number
        },

    },
    { timestamps: true }
);

const studentsModel = mongoose.model('CompanySettings', companySettingsSchema);

module.exports = studentsModel;
