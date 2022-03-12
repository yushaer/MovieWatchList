import Jwt  from "jsonwebtoken";
import Bcrypt from 'bcrypt';
import Users from '../models/users.js';
import jwt from 'jsonwebtoken';
import movieConfig from "../movie-config.js";
export const login=async(req,res)=>{
    let{email,password}=req.body;
    try{
        const User = await Users.findOne({email});
        if(!User){
            return res.status(404).json({ message: "User Not Found" });

        }
        const isCorrect= await bcrypt.compare(password, User.password);
        if(!isCorrect){
            return res.status(400).json({ message: "Wrong Password" });
        }
        const token =jwt.sign({ email: User.email, id:User._id }, movieConfig.token_secret, { expiresIn: "1h" });
        res.status(200).json({ result:User, token });
    }
    catch (err) {
        res.status(500).json({ message: "Unable to Sign in" });
      }

}
export const register= async(req,res)=>{
    try{
        console.log(req.body)
        const user = req.body;
        const usernameExists= await Users.findOne({username:user.username});
        const emailExists= await Users.findOne({email:user.email});
        
        if(usernameExists||emailExists){
            if(usernameExists){
                return res.status(400).json({"message":"Username is in use"});
            }
            if(emailExists){
                return res.status(400).json({"message":"Email is in use"});
            }
           

        }
        else if ( user.password!=user.password2){
            return res.status(400).json({"message":"passwords dont match"});
        }
         
        
            user.password=await Bcrypt.hash(req.body.password,10);
            const User=await new Users({
                username:user.username,
                email:user.email,
                password:user.password

            });
         
            try{
                await User.save();
                res.status(200).json({message:"Account Successfully Created"})
            }
         
            catch(error){
                res.status(500).json({message:error.message});
            }
            
      

    }
     catch(error){
        res.status(500).json({error:error.message});
    }
  
}