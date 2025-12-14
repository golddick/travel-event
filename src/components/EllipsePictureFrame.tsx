import { useState, useEffect, useRef } from "react";

export default function EllipsePictureFrame() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    const images = ['/travelgroup.jpeg', '/travelgroupgreen.jpeg', '/travelgroupblack.jpeg', '/travelwaterfall.jpeg'];
    const overlayRef = useRef<HTMLDivElement>(null);
    
    // Handle ESC key
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "ArrowRight") handleNext();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [currentImageIndex]);

    // Prevent background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    // Touch swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;
        
        if (Math.abs(distance) < minSwipeDistance) return;
        
        if (distance > 0) {
            handleNext();
        } else {
            handlePrevious();
        }
    };

    const handlePrevious = () => {
        setCurrentImageIndex((prev) => 
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentImageIndex((prev) => 
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleImageClick = (index: number) => {
        setCurrentImageIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <div className='relative w-[20%] min-w-25 mb-1 md:mb-4 max-w-37.5 z-50 flex items-center justify-end'>
                {/* Container for the circular images */}
                <div className="relative flex items-center -space-x-3.75 md:-space-x-5">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative group cursor-pointer transition-all duration-300 hover:z-10 hover:scale-110"
                            onClick={() => handleImageClick(index)}
                        >
                            {/* Circular image container with border */}
                            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                <img 
                                    src={src} 
                                    alt={`Team member ${index + 1}`} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FULLSCREEN OVERLAY */}
            {isOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Backdrop blur */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Carousel container */}
                    <div className="relative z-10 w-full max-w-6xl h-[85%] md:h-[90%]">
                        {/* Close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 z-20 bg-white hover:bg-gray-200rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-300"
                            aria-label="Close gallery"
                        >
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Navigation buttons - FIXED: Removed opacity-0, changed to black background with white arrows */}
                        <button
                            onClick={handlePrevious}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-200 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-all duration-300"
                            aria-label="Previous image"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-200 rounded-full p-3 md:p-4 shadow-lg hover:scale-110 transition-all duration-300"
                            aria-label="Next image"
                        >
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Image counter */}
                        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm md:text-base">
                            {currentImageIndex + 1} / {images.length}
                        </div>

                        {/* Image display with touch support */}
                        <div
                            className="h-full w-full flex items-center justify-center p-4"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div className="relative w-full h-full max-w-4xl max-h-full flex items-center justify-center">
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`Expanded image ${currentImageIndex + 1}`}
                                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Thumbnail navigation - Circular thumbnails */}
                        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
                            {images.map((src, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentImageIndex(i)}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                                        i === currentImageIndex 
                                            ? 'border-white scale-125 ring-2 ring-white/50' 
                                            : 'border-transparent hover:border-white/50 hover:scale-110'
                                    }`}
                                    aria-label={`Go to image ${i + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={`Thumbnail ${i + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}