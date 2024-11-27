'use server'

import dbConnect from "../../db"
import userModel from "../../db/models/user.model"
import bcrypt from "bcryptjs"
import generateToken from "@/utils/generateToken"

async function login(form)
{
    await dbConnect();

    let response = {};

    try {
        const user = await userModel.findOne({ username: form.username });
        const correctPassword = user? await bcrypt.compare(form.password, user.password) : "";

        if (!user || !correctPassword)
        {
            response = { success: false, message: "Invalid username or password" };
            return;
        }

        generateToken(user._id);

        response = { success: true, user: {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            email: user.email
        } }
    }
    catch(err) {
        console.log("error in login.server.js:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default login