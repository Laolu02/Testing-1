const mongoose = require('mongoose')
 const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        gmail: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        publications:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }],
        profile : {
            country:{
                type: String
            },
            phoneNumber:{
                type: String
            },
            address:{
                type: String
            },
            bio:{
                type: String
            }
        }
    }, {timestamps: true}
 );

 module.exports = mongoose.model('user', userModel)