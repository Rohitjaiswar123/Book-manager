import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // Don't return password by default
        },
        name: {
            type: String,
            required: [true, "Please provide your name"],
            trim: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
