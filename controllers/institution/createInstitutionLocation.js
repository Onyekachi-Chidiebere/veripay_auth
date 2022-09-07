const institutionModel = require("../../models/institutionModel");
const otpModel = require("../../models/tokenModel");
const sendSms = require("../../utils/sendSms");

const createInstitutionLocation = async (req, res) => {
    try {
        const { institution_code, state, city, zip_code, country, address } = req.body;
        //ensure required fields are provided;

        if (!institution_code) {
            return res.status(200).send({ code: '100', message: 'Please provide Company Code' })
        }
        if (!state) {
            return res.status(200).send({ code: '101', message: 'Please provide State?Province' })
        }
        if (!city) {
            return res.status(200).send({ code: '102', message: 'Please provide City' })
        }
        if (!zip_code) {
            return res.status(200).send({ code: '103', message: 'Please provide Zip Code' })
        }
        if (!country) {
            return res.status(200).send({ code: '104', message: 'Please provide Country' })
        }
        if (!address) {
            return res.status(200).send({ code: '105', message: 'Please provide Address' })
        }

        //get institution info
        let institution = await institutionModel.findOne({ institution_code });
        if (!institution) {
            return res.status(200).send({ code: 'E401', message: "Invalid Credentials" })
        }

        //update institution;
        institution.state = state;
        institution.city = city;
        institution.zip_code = zip_code;
        institution.country = country;
        institution.address = address;
        institution.signup_complete = 1;

        //save modified institution;
        institution.save();

        const otp = Math.floor(100000 + Math.random() * 900000);

        //send sms for phone number validation
        let smsSent = await sendSms({ phone: institution.country_code + institution.phone.substring(1, institution.phone.length), message: `your veripay otp ${otp}` })

        if (smsSent.code !== '00')
            return res.status(200).send({ code: 'E402', message: smsSent.message });

        let today = new Date();
        //otp expires in 1 hr
        today.setHours(today.getHours() + 1)

        // invalidate nay other otp if any
        const tokenData = await otpModel.findOne({ institution_code, status: 0, $or: [{ email: institution.email }, { phone: institution.phone }] });
        if (tokenData) {
            tokenData.status = 2;
            tokenData.save()
        }

        //save otp;
        await otpModel.create({
            institution_code,
            token: otp,
            phone: institution.phone,
            expiration_date: today
        })


        return res.status(200).send({ code: '00', message: { institution_code: institution.institution_code } });


    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to create institution', code: '500' })

    }
};

module.exports = createInstitutionLocation;