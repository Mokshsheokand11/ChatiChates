import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        selectedGroup,
        subscribeToMessages,
        unsubscribeFromMessages,
        markMessagesAsRead,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id);
            markMessagesAsRead(selectedUser._id);
        } else if (selectedGroup) {
            // getMessages(selectedGroup._id); // Assuming backend handles group messages separately
        }

        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser, selectedGroup, getMessages, subscribeToMessages, unsubscribeFromMessages, markMessagesAsRead]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message._id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                            ref={messageEndRef}
                        >
                            <div className=" chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img
                                        src={
                                            message.senderId === authUser._id
                                                ? authUser.profilePic || "/avatar.png"
                                                : selectedUser.profilePic || "/avatar.png"
                                        }
                                        alt="profile pic"
                                    />
                                </div>
                            </div>
                            <div className="chat-header mb-1">
                                <time className="text-xs opacity-50 ml-1">
                                    {formatMessageTime(message.createdAt)}
                                </time>
                            </div>
                            <div className="chat-bubble flex flex-col">
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="Attachment"
                                        className="sm:max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                            </div>
                            {message.senderId === authUser._id && message.isRead && (
                                <div className="chat-footer opacity-50 text-xs flex items-center gap-1">
                                    Seen
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <MessageInput />
        </div>
    );
};
export default ChatContainer;
