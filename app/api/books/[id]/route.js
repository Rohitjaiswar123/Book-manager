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

export async function PUT(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = params.id;
        const body = await req.json();

        await connectMongo();

        // Only allow updating if the book belongs to the current user
        const book = await Book.findOneAndUpdate(
            { _id: id, user: userId },
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!book) {
            return NextResponse.json({ message: "Book not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book updated successfully", book }, { status: 200 });
    } catch (error) {
        console.error("PUT /api/books/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const id = params.id;

        await connectMongo();

        // Only allow deleting if the book belongs to the current user
        const book = await Book.findOneAndDelete({ _id: id, user: userId });

        if (!book) {
            return NextResponse.json({ message: "Book not found or unauthorized" }, { status: 404 });
        }

        return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("DELETE /api/books/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
