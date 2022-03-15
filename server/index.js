import  express from "express";
import dotenv  from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import rootRouter from './routes/index.js';
if(!process.env.PRODUCTION){
   
    dotenv.config()
}

const app = express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use('/',rootRouter);
const CONNECTION_URL = process.env.DB;
const port = process.env.PORT||5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(port,()=>console.log(`Server running on port: ${port}`)))
.catch((error)=>console.log(error.message));
