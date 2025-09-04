/* eslint-disable react/prop-types */
const Slide = ({ img, title, mainTitle, price }) => {
    return (
        <div className="outline-none border-none relative w-full">
            <div className="relative w-full overflow-hidden rounded-xl">
                <img
                    src={img}
                    alt={title || "Promotional banner"}
                    loading="lazy"
                    className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                {/* Caption */}
                <div className="absolute inset-0 flex items-end md:items-center">
                    <div className="p-6 md:p-10 max-w-xl text-white">
                        {title && <p className="uppercase tracking-wider text-white/80 text-xs md:text-sm mb-1">{title}</p>}
                        {mainTitle && <h2 className="text-2xl md:text-4xl font-bold leading-tight">{mainTitle}</h2>}
                        {price && <p className="mt-2 text-white/90">Starting at <span className="font-semibold">{price}</span></p>}
                        <a href="#products" className="inline-block mt-4 px-5 py-2 rounded-full bg-primary hover:bg-secondary text-white text-sm font-semibold transition">
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;
