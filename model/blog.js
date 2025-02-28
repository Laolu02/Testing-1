const mongoose = require('mongoose')
 const blog = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        read:{
            type: Number
        },
        author: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'user',
            required: true,
        },
        
    }, {timestamps: true}
 );

 module.exports = mongoose.model('blog', blog)