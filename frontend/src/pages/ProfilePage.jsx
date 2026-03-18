import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto p-4">
                <div className="glass-premium rounded-3xl p-8 space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold premium-text">Profile</h1>
                        <p className="mt-2 text-leaf/60 font-medium">Your personal space</p>
                    </div>

                    {/* avatar upload section */}

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg || authUser.profilePic || "/avatar.png"}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4 border-matcha/20 shadow-md"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                  absolute bottom-0 right-0 
                  bg-leaf hover:bg-sage hover:scale-105
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-300 shadow-lg
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
                            >
                                <Camera className="w-5 h-5 text-oatmilk" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-xs text-leaf/40 font-medium">
                            {isUpdatingProfile ? "Uploading your new look..." : "Touch the camera to refresh your avatar"}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                            <div className="text-xs font-bold uppercase tracking-wider text-leaf/40 flex items-center gap-2 px-1">
                                <User className="w-4 h-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-3 bg-white/40 rounded-xl border border-matcha/10 font-medium text-leaf">{authUser?.fullName}</p>
                        </div>

                        <div className="space-y-1.5">
                            <div className="text-xs font-bold uppercase tracking-wider text-leaf/40 flex items-center gap-2 px-1">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </div>
                            <p className="px-4 py-3 bg-white/40 rounded-xl border border-matcha/10 font-medium text-leaf">{authUser?.email}</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-matcha/5 rounded-2xl p-6 border border-matcha/10">
                        <h2 className="text-lg font-bold text-leaf mb-4 flex items-center gap-2">
                             Account Details
                        </h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between py-2.5 border-b border-matcha/10">
                                <span className="text-leaf/60 font-medium">Member Since</span>
                                <span className="text-leaf font-bold">{authUser.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2.5">
                                <span className="text-leaf/60 font-medium">Account Status</span>
                                <span className="px-2 py-0.5 bg-success/20 text-success rounded-full text-xs font-bold">Premium Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};
export default ProfilePage;
