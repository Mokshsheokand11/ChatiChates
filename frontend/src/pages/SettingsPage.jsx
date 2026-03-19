
import { Send } from "lucide-react";

const THEMES = ["chatichates", "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset"];

const SettingsPage = () => {
    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto px-4">
                <div className="space-y-6">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-semibold">Settings</h2>
                        <p className="text-sm text-base-content/70">Chatichates configuration and themes</p>
                    </div>

                    <div className="bg-base-300 rounded-xl p-6">
                        <h3 className="text-md font-medium mb-4">Themes</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {THEMES.map((t) => (
                                <button
                                    key={t}
                                    className="group flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-base-200 transition-colors"
                                    onClick={() => document.documentElement.setAttribute('data-theme', t)}
                                >
                                    <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                                        <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                                            <div className="rounded bg-primary"></div>
                                            <div className="rounded bg-secondary"></div>
                                            <div className="rounded bg-accent"></div>
                                            <div className="rounded bg-neutral"></div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-medium truncate w-full text-center">
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>
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
