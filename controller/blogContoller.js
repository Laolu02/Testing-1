const blog = require("../model/blog")

const post_A_blog = async (req,res) => {
    const tokenId = req.user.id
    const newBlog = new blog({author:tokenId, ...req.body})
    await newBlog.save()
    res.json(newBlog)
}
const get_A_blog = async (req, res) => {
    const reqId = req.params.id 
    try {
        const blogg = await blog.findById(reqId)
        if (!blogg) {
            return resizeBy.status(404).json({message: 'Blog doesnt exist'})
        }
        res.json(blogg)
    } catch (error) {
        res.json({error})
    }
}
const get_All_blogs = async (req,res) => {
    try {
        const blogs = await blog.find()
        console.log(blogs);
        if (!blogs) {
            return res.status(404).json({message: 'No blog found'})
        }
        res.json(blogs)
    } catch (error) {
        res.json({error})
    }
}
const get_blogs_by_query =async (req,res) => {
    const {search} = req.query

    try {
        if (!search) {
            return res.status(400).json({message: 'Provide a character in the input field'})
        }
       const searched=  search.split('')
       const queryBysearch= {
        $or : searched.map(eachword =>({
            content :{$regex:search, $options: 'i'}
        }))
       };
       const posts = await blog.find(queryBysearch)
       res.json(posts).status(200)
    } catch (error) {
        console.log(error);
        
    }
}
const get_A_User_blog = async (req,res) => {
    const tokenId = req.user.id
    try {
        const userblogs = awaitblog.findOne({writtenBy: tokenId})
        if (!userblogs) {
        return res.status(404).json({message: 'User has no blog yet'})
        }res.json(userblogs)
    } catch (error) {
        res.json({error})
    }
}

module.exports ={post_A_blog,get_A_User_blog,get_A_blog,get_All_blogs, get_blogs_by_query}