'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

async function getMe()
{
    await dbConnect();

    let response = {};

    try {
        const cookieSet = await cookies();
        const token = cookieSet.get("jwt")?.value;

        if (!token)
        {
            response = { success: false, message: "Not verified" };
            return;
        }

        const res = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(res.userId).select("-password");

        if (!user)
        {
            cookieSet.delete("jwt");
            response = { success: false, message: "User not found" };
            return;
        }

        response = { success: true, user: JSON.parse(JSON.stringify(user)) };
    }
    catch(err) {
        response = { success: false, message: "Something went wrong" };
        console.log("error in get-me.server", err.message);
    }
    finally {
        return response;
    }
}


export default getMe