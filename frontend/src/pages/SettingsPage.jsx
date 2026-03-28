
import { Send } from "lucide-react";

const SettingsPage = () => {
    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto px-4">
                <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <p className="text-sm text-base-content/70">Chatichates configuration</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-base-300 rounded-xl p-6">
                            <h3 className="text-md font-medium mb-4">Notifications</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Push Notifications</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Sound Effects</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </div>
                            </div>
                        </div>

                        <div className="bg-base-300 rounded-xl p-6">
                            <h3 className="text-md font-medium mb-4">Privacy</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Show Online Status</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Read Receipts</span>
                                    <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SettingsPage;
