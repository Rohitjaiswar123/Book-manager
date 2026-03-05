import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide a title for the book"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Please provide the author's name"],
            trim: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        status: {
            type: String,
            enum: ["Want to Read", "Reading", "Completed"],
            default: "Want to Read",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Compound index for user + title to help with duplicate checks
BookSchema.index({ user: 1, title: 1 });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
