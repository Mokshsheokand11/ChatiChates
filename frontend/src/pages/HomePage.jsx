import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import GroupModal from "../components/GroupModal";

const HomePage = () => {
    const { selectedUser, selectedGroup } = useChatStore();

    return (
        <div className="min-h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4 pb-10">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-10rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />

                        {!selectedUser && !selectedGroup ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
            <GroupModal />
        </div>
    );
};
export default HomePage;
