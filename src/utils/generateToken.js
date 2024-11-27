import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

function generateToken(userId)
{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

    const cookie = {
        name: "jwt",
        value: token,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV != "development",
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
    }

    cookies().set(cookie);
}


export default generateToken