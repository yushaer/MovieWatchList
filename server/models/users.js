import mongoose from "mongoose";

const userSigma = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
      
});
const users=mongoose.model('Users',userSigma);
export default users;