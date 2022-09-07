const institutionModel = require("../../models/institutionModel");
const otpModel = require("../../models/tokenModel");
const sendSms = require("../../utils/sendSms");

const resendOtp = async (req, res) => {
    try {
        const { institution_code, email, phone } = req.body;
        //ensure required fields are provided;

        if (!institution_code) {
            return res.status(200).send({ code: 'E100', message: 'Please provide institution code' })
        }

        if (!email && !phone) {
            return res.status(200).send({ code: 'E101', message: "Please provide phone or email" })
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        const institution = await institutionModel.findOne({ institution_code });
        console.log({institution})
        let today = new Date();
        //otp expires in 1 hr
        today.setHours(today.getHours() + 1)
        if (phone) {
            //send sms for phone number validation
            let smsSent = await sendSms({ phone: institution.country_code + institution.phone.substring(1, institution.phone.length), message: `your veripay otp ${otp}` })

            if (smsSent.code !== '00')
                return res.status(200).send({ code: 'E402', message: smsSent.message });

            // invalidate nay other otp if any
            const tokenData = await otpModel.findOne({ institution_code, status: 0, phone: institution.phone });
            if (tokenData) {
                tokenData.status = 2;
                tokenData.save()
            }
            //save otp;
            await otpModel.create({
                institution_code,
                token: otp,
                phone,
                expiration_date: today
            })
        }

        res.status(200).send({code:'00',message:'Otp resent'})
    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to resend otp', code: '500' })

    }
};

module.exports = resendOtp;