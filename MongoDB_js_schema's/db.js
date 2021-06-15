const mongoose=require('mongoose');//we need module
const config = require('config');//config
const db = config.get('mongoURI');//get the db file

const connectDB = async () =>{
    try{
      await  mongoose.connect(db,{
          useNewUrlParser: true,
          useCreateIndex:true,
          useUnifiedTopology:true
         

      })
      console.log('MongoDB connected....');
    }catch(err){
        console.error(err.message);
        //Exit process with faliure
        process.exit(1);
    }
};
module.exports=connectDB;//export the given module