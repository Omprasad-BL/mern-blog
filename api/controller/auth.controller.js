import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
