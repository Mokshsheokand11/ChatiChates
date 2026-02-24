import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Users, Check } from "lucide-react";

const GroupModal = () => {
    const { users, createGroup } = useChatStore();
    const [name, setName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);

    const handleToggleMember = (userId) => {
        if (selectedMembers.includes(userId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== userId));
        } else {
            setSelectedMembers([...selectedMembers, userId]);
        }
    };

    const handleCreate = async () => {
        if (!name.trim() || selectedMembers.length === 0) return;
        await createGroup({ name, members: selectedMembers });
        setName("");
        setSelectedMembers([]);
        document.getElementById('group_modal').close();
    };

    return (
        <dialog id="group_modal" className="modal">
            <div className="modal-box bg-base-200">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg mb-4">Create New Group</h3>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Group Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Project Alpha..."
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Select Members</span>
                    </label>
                    <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-base-300 rounded-lg">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center justify-between p-2 hover:bg-base-100 rounded-lg cursor-pointer transition-colors"
                                onClick={() => handleToggleMember(user._id)}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="size-8 rounded-full overflow-hidden">
                                        <img src={user.profilePic || "/avatar.png"} alt={user.fullName} />
                                    </div>
                                    <span className="text-sm">{user.fullName}</span>
                                </div>
                                {selectedMembers.includes(user._id) && (
                                    <Check className="size-4 text-primary" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-action">
                    <button
                        className="btn btn-primary w-full"
                        onClick={handleCreate}
                        disabled={!name.trim() || selectedMembers.length === 0}
                    >Create Group</button>
                </div>
            </div>
        </dialog>
    );
};

export default GroupModal;
