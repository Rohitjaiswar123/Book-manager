import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import connectMongo from "@/lib/mongodb";
import Book from "@/models/Book";

async function getUserId() {
    const token = (await cookies()).get("token")?.value;
    if (!token) return null;
    const decoded = await verifyToken(token);
    return decoded?.userId || null;
}

export async function GET(req) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const tag = searchParams.get("tag");

        const query = { user: userId };

        if (status) {
            query.status = status;
        }

        if (tag) {
            query.tags = { $in: [tag] };
        }

        await connectMongo();

        // Sort by most recently updated
        const books = await Book.find(query).sort({ updatedAt: -1 });

        return NextResponse.json({ books }, { status: 200 });
    } catch (error) {
        console.error("GET /api/books error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, author, tags, status } = body;

        if (!title || !author) {
            return NextResponse.json({ message: "Title and author are required" }, { status: 400 });
        }

        await connectMongo();

        // Check if book with exact title already exists for this user
        const existingBook = await Book.findOne({ user: userId, title: { $regex: new RegExp(`^${title}$`, 'i') } });
        if (existingBook) {
            return NextResponse.json({ message: "You already have a book with this title" }, { status: 400 });
        }

        const book = await Book.create({
            title,
            author,
            tags: tags || [],
            status: status || "Want to Read",
            user: userId,
        });

        return NextResponse.json({ message: "Book added successfully", book }, { status: 201 });
    } catch (error) {
        console.error("POST /api/books error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
