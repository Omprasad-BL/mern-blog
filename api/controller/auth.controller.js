import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "Please fill all the fields." });
    next(errorHandler(400,"all fields Required"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  // if objects key value name same you can use name one's
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // res.status(500).json({message:error.message})
    // instaed above code use next middleware
    next(error);
  }
};

export const signin=async (req, res, next) => {
  const { email,password}= req.body;
  if(!email || !password  || email===''|| password===''){
    next(errorHandler(400,'All fields are required'));
  }
    try {
       const validUser= await User.findOne({email});
       if(!validUser){
        next(errorHandler(404,'User not found'));
       }
       const validPassword=bcryptjs.compareSync(password,validUser.password);
       if (!validPassword) {
        return next(errorHandler(400,'Invalid password'));
       }
       const token=jwt.sign({id:validUser._id}, process.env.JWT_SECRET);
       const {password:pass,...rest}=validUser._doc; //hiding password from user just by assigning psw to single variable
       res.status(200).cookie('access_token',token,{
        httpOnly: true,
       }).json(rest);
    } catch (error) {
      next(error);
    }
    
};