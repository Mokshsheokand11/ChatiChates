import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-transparent">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center gap-4 mb-4">
                    <div className="relative">
                        <div
                            className="w-16 h-16 rounded-2xl bg-matcha/10 flex items-center
             justify-center animate-bounce border border-matcha/10"
                        >
                            <MessageSquare className="w-8 h-8 text-matcha" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-3xl font-bold premium-text">Welcome to Chatichates!</h2>
                <p className="text-leaf/60 font-medium">
                    Select a conversation from the sidebar to start chatting
                </p>

            </div>
        </div>
    );
};

export default NoChatSelected;
