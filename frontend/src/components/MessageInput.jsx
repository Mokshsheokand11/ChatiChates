import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Image, Send, X, Camera } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const { sendMessage, selectedUser } = useChatStore();
    const { socket } = useAuthStore();

    const handleTextChange = (e) => {
        setText(e.target.value);

        if (socket && selectedUser) {
            socket.emit("typing", { receiverId: selectedUser._id });

            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stopTyping", { receiverId: selectedUser._id });
            }, 2000);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;

        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };

    const onEmojiClick = (emojiObject) => {
        setText((prevText) => prevText + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input-premium input-sm sm:input-md rounded-xl"
                        placeholder="Type a message..."
                        value={text}
                        onChange={handleTextChange}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />

                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle btn-ghost transition-all
                     ${imagePreview ? "text-matcha bg-matcha/10" : "text-leaf/40 hover:bg-matcha/10"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>

                    <button
                        type="button"
                        className="btn btn-circle btn-ghost text-leaf/40 hover:bg-matcha/10 transition-all"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                        😊
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-sm btn-circle btn-premium"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={18} />
                </button>
            </form>


            {showEmojiPicker && (
                <div className="absolute bottom-20 right-10 z-50">
                    <button
                        className="btn btn-sm btn-circle absolute -top-5 -right-5 z-50"
                        onClick={() => setShowEmojiPicker(false)}
                    >
                        <X size={16} />
                    </button>
                    <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
                </div>
            )}
        </div>
    );
};
export default MessageInput;
