const asyncHandler = require("express-async-handler")
const generateToken = require("../config/generateToken")
const User = require("../models/userModel")

const handleRegister = asyncHandler(async(req, res) => {
    const {name,email,password,language,pic} =req.body;

    if(!name||!email||!password||!language){
        res.status(400);
        throw new Error("All fields required!");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        // res.status(400);
        // throw new Error("email already exist");
        return res.status(400).json({ message: "Email already exists" });

    }
    
    const newUser = await User.create({
        name,email,password,language,pic
    })

    if(newUser){
        res.status(201).json({
            _id:newUser._id,
            name: newUser.name,
            email: newUser.email,
            language: newUser.language,
            pic: newUser.pic,
            token: generateToken(newUser._id),
        }) 
    }else{
        res.status(400)
        throw new Error("Failed to register new user")
    }

});

const handleAuthUser = asyncHandler(async(req,res) => {
   const {email, password} = req.body;
   const existingUser = await User.findOne({email});
   if(existingUser && (await existingUser.matchPassword(password))){
    res.json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        password: existingUser.password,
        language: existingUser.language,
        token: generateToken(existingUser._id),
    })
   }
   else{
    res.status(400);
    throw new Error("Invalid email and password");
   }
});

//  /api/user?search=kareena
const allUsers = asyncHandler(async(req,res)=>{
    const keyword = req.query.search?{
        //  $or:[
        //     {name:{$regex: req.query.search, $options: 'i'}},
        //     {email:{$regex: req.query.search, $options: 'i'}},
        //  ],

            name:{$regex: req.query.search, $options: 'i'},

    }:{};

    const users = await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
});


module.exports = { handleRegister, handleAuthUser, allUsers}
