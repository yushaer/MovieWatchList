import mongoose from "mongoose";

const movieSigma = mongoose.Schema({
    movie:{
        type:{
            id:Number,
            title:String,
            release_date:Date,
            language:String,
            imageUrl:String  
        }
    },
    watched:{
        type:Boolean,
        default:false

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
      
});
const moviesList=mongoose.model('MovieList',movieSigma);
export default moviesList;