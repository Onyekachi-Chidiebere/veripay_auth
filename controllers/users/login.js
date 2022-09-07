const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");
const institutionModel = require("../../models/institutionModel");
const getToken = require("../../utils/createJwt");

const loginEmail = async (req, res) => {
    try {
        const { email } = req.body;
        //ensure that required fields are provided;
        
        if (!email) {
            return res.status(200).send({ code: '112', message: 'Please add email' })
        }
       let user = await userModel.findOne({email});
       console.log({user})
       if(!user){
        return res.status(200).send({code:'E211', message:'Invalid User'})
       }
       return res.status(200).send({code:'00', message:email});
       
    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to verify email', code: '500' })
    }
}
const loginPassword = async (req, res) => {
    try {
        const { email,  password, } = req.body;
        //ensure that required fields are provided;
        
        if (!email) {
            return res.status(200).send({ code: '112', message: 'Please add email' })
        }
        if (!password) {
            return res.status(200).send({ code: '113', message: 'Please add password' })
        }
       let user = await userModel.findOne({email});
       if(!user){
        return res.status(200).send({code:'E211', message:'Invalid User'})
       }
       
       //compare user email;

       let validPassword = await bcrypt.compare(password,user.password)
       console.log({validPassword});
       if(!validPassword){
        return res.status(200).send({code:'E400', message:'Invalid login credentials'})
       }
        
       const institution = await institutionModel.findOne({institution_code:user.institution_code});

       if(!institution){
        return res.status(200).send({code:'E401', message:"Invalid institution code"})
       }
        //create and return jwt
        let jwt = await getToken({ ...user, institution });

        return res.status(200).send({ code: '00', message: jwt })
    } catch (error) {
        console.log({ error });
        return res.status(200).send({ message: 'Unable to login user', code: '500' })
    }
}


module.exports ={loginEmail,loginPassword};