const institutionModel = require("../models/institutionModel");

const generateInstitutionCode = async () => {
try {
    
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let index = Math.floor(Math.random() * 36);
    let code = Math.floor(Math.random() * 9999);
    let institution_code = groups[index] + code;
    
    console.log({ institution_code })

    const institution = await institutionModel.findOne({ institution_code })

    if (institution)
        return generateInstitutionCode()
    return institution_code;
} catch (error) {
    console.log({error})
    return false
}
}

module.exports = generateInstitutionCode;