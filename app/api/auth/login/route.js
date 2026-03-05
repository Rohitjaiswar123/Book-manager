import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Please provide email and password" }, { status: 400 });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = await signToken({ userId: user._id.toString() });

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json(
            { message: "Logged in successfully", user: { id: user._id, name: user.name, email: user.email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
