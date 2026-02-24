import mongoose from "react-hot-toast"; // Wait, that's wrong. I should use mongoose.
import mongoose_real from "mongoose";

const userSchema = new mongoose_real.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        friends: [
            {
                type: mongoose_real.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        friendRequests: [
            {
                from: { type: mongoose_real.Schema.Types.ObjectId, ref: "User" },
                status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
            },
        ],
        chatRequests: [
            {
                from: { type: mongoose_real.Schema.Types.ObjectId, ref: "User" },
                status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
            },
        ],
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose_real.model("User", userSchema);

export default User;
