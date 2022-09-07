const mongoose = require('mongoose')
const mongodbConnection = async ()=>{
    //connect to mongodb;
    try {
      mongoose.set('toJSON',{virtuals:true})
      mongoose.set('toObject',{virtuals:true})
  
      const conn = await mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
      });
  
      console.log('connected to mongodb')
    } catch (error) {
      console.log({error});
      console.log('unable to connect to mongodb')
    } 
  };

  module.exports = mongodbConnection;