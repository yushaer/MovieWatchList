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

    }
      
});
const moviesList=mongoose.model('MovieList',movieSigma);
export default moviesList;