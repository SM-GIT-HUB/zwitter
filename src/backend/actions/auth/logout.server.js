'use server'

import { cookies } from "next/headers"

function logout()
{
    let response = {};

    try {
        cookies().set({
            name: "jwt",
            value: "",
            maxAge: 0,
            path: '/'
        })

        response = { success: true, message: "Logged out successfully" };
    }
    catch(err) {
        console.log("error in logout.server.js", err.message);
        response = { success: false, message: "Something went wrong" };
    }
    finally {
        return response;
    }
}


export default logout