
const express = require("express");
const router = new express.Router();
const UserModel = require("../models/users.model");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");


router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await UserModel.findOne({email:email});

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await UserModel.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:process.env.EMAIL,
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES https://api.clinicadentalsofiacastro.com/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});


// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await UserModel .findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// change password

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await UserModel .findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await UserModel .findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})



module.exports = router;