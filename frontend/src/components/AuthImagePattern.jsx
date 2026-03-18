const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-oatmilk to-cream p-12">
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className={`aspect-square rounded-2xl bg-matcha/20 shadow-sm ${i % 2 === 0 ? "animate-pulse" : ""
                                }`}
                        />
                    ))}
                </div>
                <h2 className="text-3xl font-bold mb-4 premium-text">{title}</h2>
                <p className="text-leaf/60 font-medium">{subtitle}</p>
            </div>
        </div>

    );
};

export default AuthImagePattern;
