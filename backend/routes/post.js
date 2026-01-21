import express from express
import { Router } from "express"
import Post from '../models/Post.js';

const router=Router();
router.post('/',async (req,res)=>{
   try{
    if(!req.body.title || !req.body.content){
        return res.status(400).json({message:"Title and Content are required"});
    }
    const newPost=new Post({
        title:req.body.title,
        content:req.body.content
    });
    const savedPost= await newPost.save();
    res.status(201).json(savedPost);
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
});
router.get('/',async (req,res)=>{
    try{
        const posts=await Post.find().sort({createdAt:-1});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json({message:"Server Error"});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const deletedPost=await Post.findByIdAndDelete(req.params.id);
        if(!deletedPost){
            return res.status(404).json({message:"Post not found"});
        }
        res.status(200).json({message:"Post deleted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
});
router.put('/:id',async (req,res)=>{
    try {
        const updatedPost=await Post.findByIdAndUpdate(
            req.params.id,
            {title:req.body.title,
            content:req.body.content},
            {new:true}
        );
    res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({message:"Server Error"});
    }
});
export default router;