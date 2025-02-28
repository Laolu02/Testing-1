const err = require('../errorMiddleware/errorMW');
const generateToken = require('../jwt/tokengenerate')
const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
    const {password, gmail, username} = req.body
    if (!password || !gmail || !username) {
        return res.satus(404).json({message: ' All input field must be entered'})
    }
    try {
        const user = await userModel.findOne({gmail, username})
        if (user) {
            return res.status(409).json('User already existed')
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new userModel({...req.body, password: hashedPassword})
        await newUser.save()
        res.status(200).json({newUser,})
    } catch (error) {
        next({status: 500, message: "Something went wrong"}, err)
        console.log(error);
        
        
    }
};
const login = async (req,res) => {
    const {username, password} = req.body
    
    try {
        const user= await userModel.findOne({username})
        if (!user) {
            return res.json({message: ' username or password incorrect'}).status(400)
            
        }
        const comparison = await bcrypt.compare(password, user.password)
            if (!comparison) {
                return res.status(400).json("Username or password incorrect")
                
            }
            const {password: _ , ...userData} = user.toObject();
            const token =  await generateToken (user._id);
            res 
                .cookie('token', token, {
                   httpOnly: true,
                   secure: process.env.NODE_Env ==='production',
                   sameSite: 'strict',
                   maxAge: 3600000 
                })
        res.status(200).json({message: 'Login successfully', user: userData})
        
        
    } catch (error) {
      res.send(error)
      console.log(error);
        
    }
    
}
const allUser = async (req, res) => {
    try {const user = await userModel.find()
    //const {password:_ , ...userData} = user.toObject();
        if (!user) {
          res.json({message: "no user found"})  
        } res.status(200).json({user: user})
    }catch(error) {
        console.log(error);
        
    }
}
const delete_A_User = async (req, res) => {
    const paramId = req.params.id
    const tokenId = req.user.id
    
    if (paramId === tokenId) {
        try {
            await userModel.findByIdAndDelete(paramId)
        res.json({message: 'User deleted'}) 
        } catch (error) {
          console.log(error);
            
        }
        
    } else {
     return res.status(404).json({message: 'You can only delete you account'})   
    }
     res.status(200).json({user: user})
}

const update_A_User = async (req, res) => {
    const paramId = req.params.id
    const tokenId = req.user.id
    const body = req.body

    if (paramId === tokenId) {
        try {
            const updatedUser = await userModel.findByIdAndUpdate(paramId, {$set: body}, {new: true})
            return res.status(200).json({user: updatedUser})    
        } catch (error) {
            console.log(error);
            
        }
        
    } else {
     return res.status(404).json({message: 'You can only delete you account'})   
    }
     
}
const profileupdate = async (req, res) => {
    const tokenId = req.user.id
    const reqId = req.params.id
    const { country, phoneNumber, address, bio} =req.body
    if (tokenId === reqId) {
        try {
            await userModel.findByIdAndUpdate(tokenId, {
                $set:{
                    'profile.country' : country,
                    'profile.phoneNumber' : phoneNumber,
                    'profile.address' : address,
                    'profile.bio' : bio,
                }
            }, {new: true})
        } catch (error) {
            console.log(error);
            
        }
    } else {
        console.log('access denied');
        
    }

}


module.exports = {signup, login, allUser, delete_A_User, update_A_User, profileupdate}