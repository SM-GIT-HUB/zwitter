'use server'

import dbConnect from "../../db"
import Joi from "joi"
import userModel from "../../db/models/user.model"
import bcrypt from "bcryptjs"
import generateToken from "@/utils/generateToken"

const validUser = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string(),
    password: Joi.string().required()
})

async function signUp(form)
{
    await dbConnect();

    let response = {};

    try {
        form.email = form.email? form.email : "abc@gmail.com";
          
        const { error } = validUser.validate({ ...form });

        if (error)
        {
            response = { success: false, message: "Please provide valid details" };
            return;
        }

        const user = await userModel.findOne({ username: form.username });

        if (user)
        {
            response = { success: false, message: "Username already taken" };
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(form.password, salt);

        const newUser = await userModel.create({
            ...form,
            password: hashedPassword
        })

        if (newUser)
        {
            newUser.password = undefined;
            
            response = { success: true, user: JSON.parse(JSON.stringify(newUser)) };
            await generateToken(newUser._id);
        }
        else {
            response = { success: false, message: "Couldn't signup" };
        }
    }
    catch(err) {
        console.log("error in signup.server.js:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default signUp