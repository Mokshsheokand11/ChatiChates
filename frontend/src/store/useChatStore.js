import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    groups: [],
    selectedUser: null,
    selectedGroup: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    typingUsers: {}, // {userId: boolean}

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, selectedGroup, messages } = get();
        try {
            const receiverId = selectedUser?._id;
            const groupId = selectedGroup?._id;

            const payload = { ...messageData };
            if (groupId) payload.groupId = groupId;

            const res = await axiosInstance.post(
                `/messages/send/${groupId || receiverId}`,
                payload
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const { selectedUser, selectedGroup } = get();

            let shouldAdd = false;
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                shouldAdd = true;
            } else if (selectedGroup && newMessage.groupId === selectedGroup._id) {
                shouldAdd = true;
            }

            if (!shouldAdd) return;

            set({
                messages: [...get().messages, newMessage],
            });
        });

        socket.on("typing", ({ senderId }) => {
            set((state) => ({
                typingUsers: { ...state.typingUsers, [senderId]: true },
            }));
        });

        socket.on("stopTyping", ({ senderId }) => {
            set((state) => ({
                typingUsers: { ...state.typingUsers, [senderId]: false },
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
        socket.off("typing");
        socket.off("stopTyping");
    },

    searchUsers: async (query) => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get(`/users/search?username=${query}`);
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getGroups: async () => {
        try {
            const res = await axiosInstance.get("/groups");
            set({ groups: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    createGroup: async (groupData) => {
        try {
            const res = await axiosInstance.post("/groups/create", groupData);
            set((state) => ({ groups: [...state.groups, res.data] }));
            toast.success("Group created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    sendChatRequest: async (userId) => {
        try {
            const res = await axiosInstance.post(`/users/chat-request/${userId}`);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    handleChatRequest: async (requestId, status) => {
        try {
            const res = await axiosInstance.post(`/users/handle-request`, { requestId, status });
            toast.success(res.data.message);
            useAuthStore.getState().checkAuth();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    markMessagesAsRead: async (userId) => {
        try {
            await axiosInstance.put(`/messages/read/${userId}`);
        } catch (error) {
            console.log("Error marking messages as read", error);
        }
    },

    setSelectedGroup: (selectedGroup) => set({ selectedGroup, selectedUser: null }),
    setSelectedUser: (selectedUser) => set({ selectedUser, selectedGroup: null }),
}));
