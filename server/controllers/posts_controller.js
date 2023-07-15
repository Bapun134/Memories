import express from 'express';
import mongoose from 'mongoose';
import mymodel from '../models/mymodel.js';

const router = express.Router();

//Get all Posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await mymodel.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
//Create New Post
export const createPost = async (req, res) => {
    const { title, message, creator, tags, selectedFile } = req.body;

    const newPost = new mymodel({ title, message, creator, tags, selectedFile })

    try {
        await newPost.save();
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({ message: error });
    }
}
//Get Post using ID
export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await mymodel.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

//Update Post
export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id: ${id}`);
    }

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await mymodel.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}
//Delete Post
export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id: ${id}`);
    }
    else{
        await mymodel.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
    }

}
//Like Post
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`No post with id: ${id}`);
    }

    const post = await mymodel.findById(id);

    const updatedLike = await mymodel.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

    res.json(updatedLike);
}

//export {getPosts,getPost,createPost,updatePost,deletePost,likePost};
export default router;