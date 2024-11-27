'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"
import bcrypt from "bcryptjs"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

async function updateUser(userId, form)
{
    await dbConnect();

    let response = {};

    try {
        const { username, email, fullName, currentPassword, newPassword, bio, link } = form;
        let { profileImg, coverImg } = form;

        const user = await userModel.findById(userId);

        if (!user)
        {
            response = { success: false, message: "User not found" };
            return;
        }

        if ( (!currentPassword && newPassword) || (!newPassword && currentPassword) )
        {
            response = { success: false, message: "Please provide both current and new passwords" };
            return;
        }

        if (currentPassword && newPassword)
        {
            const isMatch = await bcrypt.compare(currentPassword, user.password);

            if (!isMatch)
            {
                response = { success: false, message: "Incorrect password" };
                return;
            }

            if (newPassword.length < 4)
            {
                response = { success: false, message: "Password must be at least 4 characters" };
                return;
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (profileImg && user.dp) {
            await cloudinary.uploader.destroy(user.dp?.split('/').pop().split('.')[0]);
        }

        if (coverImg && user.coverImage) {
            await cloudinary.uploader.destroy(user.coverImage?.split('/').pop().split('.')[0]);
        }

        user.username = username || user.username;
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.dp = profileImg || user.dp;
        user.coverImage = coverImg || user.coverImage;

        await user.save();

        user.password = undefined;

        response = { success: true, user: JSON.parse(JSON.stringify(user)) };
    }
    catch(err) {
        console.log("error in update-user.server:", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default updateUser