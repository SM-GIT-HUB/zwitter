'use server'

import dbConnect from "@/backend/db"
import userModel from "@/backend/db/models/user.model"
import { currentUser } from "@clerk/nextjs/server"

function generateUniqueUsername(fullName, email)
{
    const firstName = fullName.split(' ')[0].toLowerCase().split(6);
    const emailPart = email.match(/\d+@/)[0];

    let usernameBase = `${firstName}${emailPart}`;

    usernameBase += Date.now().toString().slice(-6);

    if (usernameBase.length > 25) {
        usernameBase = usernameBase.substring(0, 25);
    }
    return usernameBase;
}

async function syncUser(userId)
{
    await dbConnect();

    try {
        const user = await userModel.findOne({ clerkId: userId });

        if (user) {
            return { success: true, message: "User exists" };
        }

        const obj = await currentUser();
        console.log(obj);

        const imageUrl = obj.hasImage ? obj.imageUrl : null;
        const fullName = obj.passwordEnabled? obj.emailAddresses[0].emailAddress.split('@')[0] : `${obj.firstName} ${obj.lastName}`;
        const emailAddress = obj.emailAddresses.length > 0 ? obj.emailAddresses[0].emailAddress : null;

        const username = generateUniqueUsername(fullName, emailAddress, obj);

        console.log(fullName, emailAddress, username);

        // const newUser = await userModel.create({
        //     clerkId: userId,
        //     username,
        //     fullName,
        //     email: emailAddress,
        //     dp: imageUrl
        // })

        // console.log(newUser);

        // return { success: true, message: "User synced in" };

        return {};
    }
    catch(err) {
        console.log("error in syncuser.server.js:", err.message);
        return { success: false, message: "Something went wrong" };
    }

}

export default syncUser