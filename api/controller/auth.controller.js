import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import {supabase} from '../../client/src/supabase.js';
import jwt from 'jsonwebtoken';

export const signup= async (req,res,next) => {
    //req.body.username=req.body.username.toLowerCase();
    //console.log(req.body);
    const {username,email,password} = req.body;
    const hashedPassword= bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password: hashedPassword});
    try {
        await newUser.save();
    res.status(201).json("User created successfully");
    } catch(error) {
        //res.status(500).json(error.message);
       // next(errorHandler(550,'error from function'));--->creating manual error
        next(error);
    }
};

export const signin = async (req,res,next) => {
    const {email,password}=req.body;
    try {
        const validUser=await User.findOne({email});
        if(!validUser) return next(errorHandler(404,'User not found!'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Wrong credentials!'));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
        const {password: pass,...rest}=validUser._doc;
        res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest);//we are separating rest and password details to the user

    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
      const { access_token } = req.body;  // Access token received from frontend (Supabase)
  
      // Step 1: Verify the Supabase token and get the user information
      const { data: user, error } = await supabase.auth.api.getUser(access_token);
  
      if (error) {
        return res.status(401).json({ message: 'Invalid token', error });
      }
  
      // Step 2: Check if the user already exists in your database by email
      const existingUser = await User.findOne({ email: user.email });
  
      if (existingUser) {
        // Step 3: If the user exists, generate a JWT token
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        const { password, ...rest } = existingUser._doc;
  
        // Step 4: Send the JWT token and user info (excluding password) in response
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      } else {
        // Step 5: If user doesn't exist, create a new user in the database
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
  
        const newUser = new User({
          username: user.user_metadata.full_name
            .split(' ')
            .join('')
            .toLowerCase() + Math.random().toString(36).slice(-4),
          email: user.email,
          password: hashedPassword,
          avatar: user.user_metadata.avatar_url,
        });
  
        await newUser.save();
  
        // Step 6: Generate a JWT for the new user
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
  
        // Step 7: Send the JWT token and user info (excluding password) in response
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    } catch (error) {
      next(error);  // Error handling
    }
  };