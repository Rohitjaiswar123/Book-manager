import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const decoded = await verifyToken(token);

        if (!decoded || !decoded.userId) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        await connectMongo();
        const user = await User.findById(decoded.userId);

        if (!user) {
            (await cookies()).delete("token");
            return NextResponse.json({ user: null }, { status: 200 });
        }

        return NextResponse.json(
            { user: { id: user._id, name: user.name, email: user.email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Auth me error:", error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}
