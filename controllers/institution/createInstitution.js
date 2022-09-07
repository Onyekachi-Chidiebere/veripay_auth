const institutionModel = require("../../models/institutionModel");
const generateInstitutionCode = require("../../utils/generateInstitutionCode");

const createInstitution =async(req, res)=>{
    try {
        const {institution_name,company_url,email,phone,country_code} = req.body;
        //ensure required fields are provided;

        if(!institution_name){
            return res.status(200).send({code:'100', message:'Please provide Company Name'})
        }
        if(!company_url){
            return res.status(200).send({code:'101', message:'Please provide Company url'})
        }
        if(!email){
            return res.status(200).send({code:'102', message:'Please provide Company email'})
        }
        if(!phone){
            return res.status(200).send({code:'103', message:'Please provide Company phone'})
        }
        if(!country_code){
            return res.status(200).send({code:'104', message:'Please provide Company county code'})
        }

        //check if account has already been created;
        let institution = await institutionModel.findOne({phone});
        if(institution){
            //check if regitration is complete;
            if(institution.signup_complete ==1){
                return res.status(200).send({code:'201', message:'Institution phone already used'})
            }else{
                return res.status(200).send({code:'01', message:{institution_code:institution.institution_code, setup_stage:institution.setup_stage}})
            }
        }
        institution = await institutionModel.findOne({email});
        if(institution){
            //check if regitration is complete;
            if(institution.signup_complete ==1){
                return res.status(200).send({code:'202', message:'Institution email already used'})
            }else{
                //
                return res.status(200).send({code:'01',message:{institution_code:institution.institution_code, setup_stage:institution.setup_stage}})
            }
        }

        //generate institution code from util
        const institution_code = await generateInstitutionCode();
        if(!institution_code){
            return res.status(200).send({code:'105', message:'Unable to generate Institution code'})
        }

        //create institution for the first time;
        institution = await institutionModel.create({institution_name,company_url,email,phone,country_code,institution_code} );

        return res.status(200).send({code:'00', message:{institution_code:institution.institution_code}});

    } catch (error) {
        console.log({error});
        return res.status(200).send({message:'Unable to create institution', code:'500'})
        
    }
};

module.exports = createInstitution;