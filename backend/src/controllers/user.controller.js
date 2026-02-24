import User from "../models/user.model.js";

export const searchUsers = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await User.find({
            fullName: { $regex: username, $options: "i" },
            _id: { $ne: req.user._id },
        }).select("-password");

        res.status(200).json(users);
    } catch (error) {
        console.log("Error in searchUsers: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const sendChatRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const receiver = await User.findById(receiverId);
        if (!receiver) return res.status(404).json({ message: "User not found" });

        const existingRequest = receiver.chatRequests.find(
            (req) => req.from.toString() === senderId.toString()
        );

        if (existingRequest) {
            return res.status(400).json({ message: "Request already sent" });
        }

        receiver.chatRequests.push({ from: senderId, status: "pending" });
        await receiver.save();

        res.status(200).json({ message: "Chat request sent" });
    } catch (error) {
        console.log("Error in sendChatRequest: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const handleChatRequest = async (req, res) => {
    try {
        const { requestId, status } = req.body; // status: 'accepted' or 'rejected'
        const userId = req.user._id;

        const user = await User.findById(userId);
        const requestIndex = user.chatRequests.findIndex((r) => r._id.toString() === requestId);

        if (requestIndex === -1) return res.status(404).json({ message: "Request not found" });

        user.chatRequests[requestIndex].status = status;

        if (status === "accepted") {
            // If accepted, we might want to add them to a "contacts" list or just allow messaging
            // For this simple version, the status change is enough for the frontend to allow chat
        }

        await user.save();
        res.status(200).json({ message: `Request ${status}` });
    } catch (error) {
        console.log("Error in handleChatRequest: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
