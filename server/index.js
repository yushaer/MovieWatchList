import  express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import movieRoutes from './routes/movies.js';
const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/movies',movieRoutes);
const CONNECTION_URL = 'mongodb+srv://YushaeR:yus123@cluster0.oxvtu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const port = process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(port,()=>console.log(`Server running on port: ${port}`)))
.catch((error)=>console.log(error.message));