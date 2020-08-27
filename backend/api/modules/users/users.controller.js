const { registerUserService,getUsersService,getUserByEmailService,updateUserService ,deleteUserService ,getUserByIdService} = require("./users.service");
const { hash,compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const registerUserController = async (req,res) => {
    try {
        let db = req.app.get("db");
        let {name,email,password} = req.body;

        // Hashing the password
        let hashedPassword = await hash(password,10);
        password = hashedPassword;

        let response = await registerUserService(db,{user_name:name , user_email:email,user_password:password});
        // console.log("response",response)

        if(response.insertId){
            let res2 = await getUserByIdService(db , response.insertId)
            console.log("res 2" , res2)
            let jwtToken = sign({email:res2[0].user_email,userId:res2[0].user_id},process.env.JWT_KEY);
            return res.status(200).json({
                success: true,
                message: "User signup successfully",
                accessToken: jwtToken
            })
        }else{
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }

    } catch (e) {
        return res.json({
            success: false,
            message: "Something went wrong",
            error:e
        })
    }
}

const getUsersController = async(req,res) =>{
    try {
        let db = req.app.get("db");
        let response = await getUsersService(db);
        if(response.length > 0){
            return res.json({
                success:true,
                data: response
            })
        }else{
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

const getUserByIdController  = async(req,res)=>{
    try {
        let db = req.app.get("db");
        let user = req.app.get("user");
        let response = await getUserByIdService(db , user.userId );
        if(response){
            return res.json({
                success:true,
                data:response
            })
        }
        else{
            return res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
            
        }
        
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error:e
        })
        
    }
}


const loginUserController = async (req,res) =>{
    try {
        let db = req.app.get("db");

        let {email,password} = req.body;

        let fetchedUser = await getUserByEmailService(db,email);

        // If user don't exists
        if(fetchedUser.length == 0){
            return res.json({
                success:true,
                message:"User don't exist"
            })
        }else{
            // When user exists
            let isPasswordValid = await compare(password,fetchedUser[0].user_password);

            if(!isPasswordValid){
                return res.json({
                    success:false,
                    message:"Invalid email or password"
                })
            }else{
                console.log("aaaa" , fetchedUser)
                let jwtToken = sign({email:fetchedUser[0].user_email,userId:fetchedUser[0].user_id},process.env.JWT_KEY);
                return res.json({
                    success:true,
                    message:"User logged in successfully",
                    accessToken: jwtToken
                })
            }
        }
    } catch (e) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}


const updateUserController = async(req,res)=>{
    try {
        let db = req.app.get("db");

        let user = req.app.get("user");
        let {password , name} = req.body;
        let hashedPassword = await hash(password,10);
        password = hashedPassword;

        let response = await updateUserService(db,{name, password ,user_id:user.userId});

        if(response){
            return res.json({
                success:true,
                message:"User updaed successfully"
            })
        }else{
            return res.json({
                success:false,
                message:"Something went wrong"
            })
        }


    } catch (e) {
        return res.json({
            success:false,
            message:"Something went wrong",
            error:e
        })
    }
}

const deleteUserController = async (req,res) => {
    try {
        let db = req.app.get("db");
        let {userId} = req.body;

        let response = await deleteUserService(db,userId);

        if(response){
            return res.json({
                success:true,
                message:"User deleted successfully"
            })
        }else{
            return res.json({
                success:false,
                message:"Something went wrong"
            })
        }
    } catch (e) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

module.exports = {registerUserController,getUsersController,loginUserController,updateUserController,deleteUserController , getUserByIdController}