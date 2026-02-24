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
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={displayImage || "/avatar.png"} alt={displayName} />
                        </div>
                    </div>

                    {/* User/Group info */}
                    <div>
                        <h3 className="font-medium">{displayName}</h3>
                        <p className="text-sm text-base-content/70">
                            {selectedGroup ? (
                                `${selectedGroup.members?.length || 0} members`
                            ) : (
                                useChatStore.getState().typingUsers[selectedUser?._id] ? (
                                    <span className="text-primary animate-pulse italic">Typing...</span>
                                ) : (
                                    isOnline ? "Online" : "Offline"
                                )
                            )}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={handleClose}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;
