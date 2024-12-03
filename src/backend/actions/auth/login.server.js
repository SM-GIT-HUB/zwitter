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
        const correctPassword = user? await bcrypt.compare(form.password, user.password) : false;

        if (!user || !correctPassword)
        {
            response = { success: false, message: "Invalid username or password" };
            return;
        }

        await generateToken(user._id);

        user.password = undefined;

        response = { success: true, user: JSON.parse(JSON.stringify(user)) };
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