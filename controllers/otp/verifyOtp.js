const otpModel = require("../../models/tokenModel");

const verifyOtp = async (req, res) => {
    try {
        const { institution_code, email, token, phone } = req.body;
        //ensure required fields are provided;
console.log({ institution_code, email, token, phone } )
        if (!institution_code) {
            return res.status(200).send({ code: '100', message: 'Please provide Company Code' })
        }
        if (!email && !phone) {
            return res.status(200).send({ code: '101', message: 'Please provide email or phone' })
        }
        if (!token) {
            return res.status(200).send({ code: '102', message: 'Please provide Code' })
        }
        // const tokenData =await otpModel.findOne({ institution_code, status: 0, $or: [{ email }, { phone }] });
        //GET OTP data;
        let tokenData;
        if(email)tokenData =await otpModel.findOne({ institution_code, status: 0,email });
        if(phone)tokenData =await otpModel.findOne({ institution_code, status: 0,phone });

        //check if user info exists
        if (!tokenData) {
            return res.status(200).send({ code: 'E202', message: 'Invalid user details' })
        }

        console.log({tokenData,token})
        //check if token is correct
        if (tokenData.token !== token) {
            return res.status(200).send({ code: 'E203', message: 'Invalid token' })
        }


        //check if token has expired;
        if(tokenData.expiration_date< new Date()){
            return res.status(200).send({code:'E204', message:'Token expired'})
        }


        //update token as use;
        tokenData.status = 1;
        tokenData.used_on = new Date();
        tokenData.save();

        res.status(200).send({code:'00', message:{institution_code}})
       

    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to create institution', code: '500' })

    }
};

module.exports = verifyOtp;