/* eslint-disable react/prop-types */
const Slide = ({ img, title, mainTitle, price }) => {
    return (
        <div className="outline-none border-none relative w-full group">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
                <img
                    src={img}
                    alt={title || "Promotional banner"}
                    loading="lazy"
                    className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Modern gradient overlay with futuristic design */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse" />

                {/* Geometric accent elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full blur-sm animate-spin-slow" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-primary/30 rounded-full blur-sm animate-pulse" />

                {/* Caption with modern typography and glassmorphism */}
                <div className="absolute inset-0 flex items-end md:items-center">
                    <div className="p-6 md:p-10 max-w-xl">
                        {/* Glassmorphism container */}
                        <div className="backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-gray-700/30 rounded-2xl p-6 md:p-8 shadow-xl">
                            {title && (
                                <p className="uppercase tracking-widest text-white/90 text-xs md:text-sm mb-3 font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    {title}
                                </p>
                            )}
                            {mainTitle && (
                                <h2 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4 drop-shadow-lg">
                                    {mainTitle}
                                </h2>
                            )}
                            {price && (
                                <p className="text-white/90 text-lg mb-6">
                                    Starting at <span className="font-bold text-primary">{price}</span>
                                </p>
                            )}
                            <a
                                href="#products"
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md backdrop-blur-sm border border-white/20"
                            >
                                Shop Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;
