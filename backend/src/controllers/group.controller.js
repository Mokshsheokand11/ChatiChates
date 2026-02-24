import Group from "../models/group.model.js";
import User from "../models/user.model.js";

export const createGroup = async (req, res) => {
    try {
        const { name, members, image } = req.body;
        const admin = req.user._id;

        if (!name || !members || members.length === 0) {
            return res.status(400).json({ message: "Name and members are required" });
        }

        const allMembers = [...new Set([...members, admin])];

        const newGroup = new Group({
            name,
            admin,
            members: allMembers,
            image: image || "",
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.log("Error in createGroup: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: userId }).populate("admin", "fullName profilePic");
        res.status(200).json(groups);
    } catch (error) {
        console.log("Error in getGroups: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await Group.findById(groupId);

        if (!group) return res.status(404).json({ message: "Group not found" });
        if (group.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only admin can add members" });
        }

        if (group.members.includes(userId)) {
            return res.status(400).json({ message: "User already in group" });
        }

        group.members.push(userId);
        await group.save();

        res.status(200).json(group);
    } catch (error) {
        console.log("Error in addMember: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
