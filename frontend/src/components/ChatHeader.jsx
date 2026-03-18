import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
    const {
        selectedUser,
        selectedGroup,
        setSelectedUser,
        setSelectedGroup
    } = useChatStore();
    const { onlineUsers } = useAuthStore();

    const handleClose = () => {
        setSelectedUser(null);
        setSelectedGroup(null);
    };

    const displayName = selectedGroup ? selectedGroup.name : selectedUser?.fullName;
    const displayImage = selectedGroup ? selectedGroup.image : selectedUser?.profilePic;
    const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

    return (
        <div className="p-4 border-b border-cream">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative border border-matcha/20">
                            <img src={displayImage || "/avatar.png"} alt={displayName} />
                        </div>
                    </div>

                    {/* User/Group info */}
                    <div>
                        <h3 className="font-bold text-leaf">{displayName}</h3>
                        <p className="text-xs font-medium text-leaf/50">
                            {selectedGroup ? (
                                `${selectedGroup.members?.length || 0} members`
                            ) : (
                                useChatStore.getState().typingUsers[selectedUser?._id] ? (
                                    <span className="text-matcha animate-pulse italic">Thinking...</span>
                                ) : (
                                    isOnline ? "Active now" : "Recently active"
                                )
                            )}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button 
                    onClick={handleClose}
                    className="btn btn-sm btn-ghost btn-circle text-leaf/40 hover:text-leaf hover:bg-matcha/10 transition-all"
                >
                    <X className="size-5" />
                </button>
            </div>
        </div>

    );
};
export default ChatHeader;
