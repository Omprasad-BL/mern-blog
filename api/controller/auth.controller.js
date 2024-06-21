import User from '../models/user.model.js';
export const signup= async(req,res)=>{
    const {username,password,email}= req.body;

    if (!username || !password || !email || username===''||email===''||password==='')
    {
        return res.status(400).json({message:"Please fill all the fields."});
    }
    // if objects key value name same you can use name one's
    const newUser= new User({username,email,password});
     await newUser.save();
     res.status(201).json(newUser);
}