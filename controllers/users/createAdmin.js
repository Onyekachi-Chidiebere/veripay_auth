const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const institutionModel = require("../../models/institutionModel");
const getToken = require("../../utils/createJwt");

const createAdmin = async (req, res) => {
    try {
        const { institution_code,  password, } = req.body;
        //ensure that required fields are provided;
        if (!institution_code) {
            return res.status(200).send({ code: '110', message: 'Please add institution code' })
        }
        if (!password) {// this is the object Id of the institution;
            return res.status(200).send({ code: '112', message: 'Please add password' })
        }
       

        // //check if phone number has been used; 
        // let user = await userModel.findOne({ institution_code, phone })
        // if (user) {
        //     return res.status(200).send({ code: '201', message: 'phone number already exists' })
        // }

        // //check if email has been used;
        // user = await userModel.findOne({ institution_code, email })
        // if (user) {
        //     return res.status(200).send(({ code: '202', message: 'Email already exist for another user' }))

        // };


        //get institution;
        const institution = await institutionModel.findOne({ institution_code })

        //ensure that password contains min 1 uppercase, 1 lowercase, 1 letter, 1 number, 1 special character, and min of 6 
        const criteria = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
        if (!password.match(criteria)) {
            return res.status(200).send({ code: '203', message: 'Invalid password' })
        }

        //create pasword hash;
        let hashPassword = await bcrypt.hash(password, 10);



        //create user
        user = await userModel.create({
            institution_code,
            institution_id:institution._id,
            password: hashPassword,
            phone:institution.phone,
            email:institution.email,
            photo_url:institution.photo_url,
            user_group_id: 4,
            created_by: institution.institution_code,
        });
        
        //create and return jwt
        let jwt = await getToken({ ...user, institution });

        return res.status(200).send({ code: '00', message: jwt })
    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to create user', code: '500' })
    }
}

module.exports =createAdmin;