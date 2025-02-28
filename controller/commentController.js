const commentModel = require('../model/commentModel')

const post_comment = async (req, res) => {
    const paramId = req.params.id
    const tokenId = req.user.id
    const {comment} = req.body
    try {
        const newComment = new commentModel({comment, author: tokenId , onThePost: paramId})
        const savedComment = await newComment.save()
        return res.status(401).json({savedComment})
    } catch (error) {
        console.log(error);
        
    }
}

const get_A_blog_comment = async (req,res) => {
    const paramId= req.params.id
    try {
        const blogComment = await commentModel.find({onThePost: paramId}).populate('author','username')
        if (!blogComment) {
            return res.status(400).json({message : 'No comment yet'})
        }
        res.json({comments: blogComment})
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = {post_comment, get_A_blog_comment}