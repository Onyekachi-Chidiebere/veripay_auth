const africastalking = require('africastalking')

const sendSms = async({phone, message})=>{
    try {
        //ensure required fields are provided;
        if(!phone){
            return {code:'E409',message:'please provide phone'}
        }
        if(!message){
            return {code:'E409',message:'please provide message'}
        }

        //get africa's talking credentials;
        const credentials = {
            apiKey:process.env.AFRICASTALKING_KEY,
            username:process.env.AFRICASTALING_USERNAME,
        }

        const africastalking = require('africastalking')(credentials)
        const sms = africastalking.SMS;
        const from = process.env.SMS_SENDERID;

        const options = {
            to:[phone],
            message,
            from,
        }
        const sender = await sms.send(options);

        let response = sender.SMSMessageData.Recipients;
        let status = response[0].status;
        if(status =='Success'){
            return {code:'00', message:'sms sent successfully'}
        }
        return {code:'E408', message:'unable to send sms'}

        
    } catch (error) {
        console.log({error});
        return {code:'E500', message:'Unable to sned sms'};
    }
};
module.exports = sendSms;