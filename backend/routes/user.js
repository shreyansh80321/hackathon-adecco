import express from express
import { Router } from "express"

import User from '../models/user.js';
const router=Router();
router.post('/register',async (req,res)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message:"Username and Password are required"});
        }
        const existingUser=await User.findOne({username:req.body.username});
        if(existingUser){
            return res.status(400).json({message:"Username already exists"});
        }
        const newUser=new User({
            username:req.body.username,
            password:req.body.password
        });
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});
router.post('/login',async (req,res)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message:"Username and Password are required"});
        }
        const user=await User.findOne({username:req.body.username});
        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        if(user.password!==req.body.password){
            return res.status(400).json({message:"Invalid Credentials"});
        }
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});


