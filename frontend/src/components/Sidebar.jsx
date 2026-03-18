import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { MessageSquare, Search, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
    const {
        getUsers,
        users,
        groups,
        getGroups,
        selectedUser,
        setSelectedUser,
        selectedGroup,
        setSelectedGroup,
        isUsersLoading,
        searchUsers,
        sendChatRequest,
        handleChatRequest
    } = useChatStore();

    const { onlineUsers, authUser } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getUsers();
        getGroups();
    }, [getUsers, getGroups]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchUsers(searchQuery);
        } else {
            getUsers();
        }
    };

    const filteredUsers = showOnlineOnly
        ? users.filter((user) => onlineUsers.includes(user._id))
        : users;

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-cream flex flex-col transition-all duration-200 glass-premium">
            <div className="border-b border-cream w-full p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="size-6 text-leaf" />
                        <span className="font-bold hidden lg:block premium-text">Contacts</span>
                    </div>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="hidden lg:block mb-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="input-premium input-sm w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-leaf/40" />
                    </div>
                </form>

                {/* Chat Requests Section */}
                {authUser?.chatRequests?.some(r => r.status === 'pending') && (
                    <div className="hidden lg:block mb-4 p-2 bg-matcha/10 rounded-xl border border-matcha/20">
                        <p className="text-xs font-bold mb-2 text-leaf">Pending</p>
                        {authUser.chatRequests.filter(r => r.status === 'pending').map(req => (
                            <div key={req._id} className="flex items-center justify-between gap-2 mb-2 last:mb-0">
                                <span className="text-[10px] truncate text-leaf/70">New Request</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => handleChatRequest(req._id, 'accepted')}
                                        className="btn btn-xs bg-success text-white border-none min-h-0 h-5"
                                    >✓</button>
                                    <button
                                        onClick={() => handleChatRequest(req._id, 'rejected')}
                                        className="btn btn-xs bg-error text-white border-none min-h-0 h-5"
                                    >✕</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Groups Section Header */}
                <div className="hidden lg:flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase text-leaf/50 tracking-wider">Groups</span>
                    <button
                        className="btn btn-xs btn-ghost text-matcha hover:bg-matcha/10 text-xs"
                        onClick={() => document.getElementById('group_modal').showModal()}
                    >+ New</button>
                </div>

                <div className="hidden lg:block space-y-1 mb-4 overflow-y-auto max-h-40">
                    <AnimatePresence>
                        {groups.map((group, index) => (
                            <motion.button
                                key={group._id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedGroup(group)}
                                className={`
                                w-full p-2 flex items-center gap-3
                                hover:bg-matcha/10 transition-all rounded-xl
                                ${selectedGroup?._id === group._id ? "bg-matcha/20 shadow-sm" : ""}
                            `}
                            >
                                <div className="size-8 rounded-lg bg-matcha/10 flex items-center justify-center overflow-hidden border border-matcha/20">
                                    {group.image ? (
                                        <img src={group.image} alt={group.name} className="size-full object-cover" />
                                    ) : (
                                        <Users className="size-4 text-matcha" />
                                    )}
                                </div>
                                <span className="text-sm font-medium truncate text-leaf">{group.name}</span>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                    {groups.length === 0 && <p className="text-xs text-leaf/40 px-2 italic">None joined</p>}
                </div>

                {/* Online filter toggle */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}
                            className="checkbox checkbox-sm border-matcha/30 checked:border-matcha"
                        />
                        <span className="text-sm text-leaf/80">Online only</span>
                    </label>
                    <span className="text-[10px] text-leaf/40">({onlineUsers.length > 0 ? onlineUsers.length - 1 : 0})</span>
                </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
                <p className="px-5 py-2 text-xs font-bold lg:block hidden uppercase text-leaf/50 tracking-wider">Messages</p>
                <div className="space-y-1 px-2">
                    <AnimatePresence>
                        {filteredUsers.map((user, index) => (
                            <motion.button
                                key={user._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => setSelectedUser(user)}
                                className={`
                                    w-full p-3 flex items-center gap-3
                                    hover:bg-matcha/10 transition-all rounded-xl
                                    ${selectedUser?._id === user._id ? "bg-matcha/20 shadow-sm" : ""}
                                `}
                            >
                                <div className="relative mx-auto lg:mx-0">
                                    <img
                                        src={user.profilePic || "/avatar.png"}
                                        alt={user.fullName}
                                        className="size-12 object-cover rounded-full border border-matcha/20"
                                    />
                                    {onlineUsers.includes(user._id) && (
                                        <span
                                            className="absolute bottom-0 right-0 size-3 bg-success 
                                            ring-2 ring-oatmilk rounded-full"
                                        />
                                    )}
                                </div>

                                {/* User info - only visible on larger screens */}
                                <div className="hidden lg:flex flex-1 items-center justify-between min-w-0">
                                    <div className="text-left">
                                        <div className="font-semibold truncate text-leaf">{user.fullName}</div>
                                        <div className="text-xs text-leaf/50 font-medium">
                                            {onlineUsers.includes(user._id) ? "Active now" : "Recently active"}
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            sendChatRequest(user._id);
                                        }}
                                        className="btn btn-xs btn-ghost text-matcha hover:bg-matcha/20 rounded-lg"
                                        title="Quick Chat"
                                    >
                                        <MessageSquare className="size-4" />
                                    </button>
                                </div>
                            </motion.button>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center text-leaf/40 py-8 text-sm italic">No contacts found</div>
                )}
            </div>

        </aside>
    );
};
export default Sidebar;
