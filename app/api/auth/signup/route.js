import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "Email already registered" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await signToken({ userId: user._id.toString() });

        (await cookies()).set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return NextResponse.json(
            { message: "User created successfully", user: { id: user._id, name: user.name, email: user.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
