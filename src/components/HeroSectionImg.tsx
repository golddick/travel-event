import { useState, useEffect, useRef, useCallback } from "react";
import EllipsePictureFrame from "./EllipsePictureFrame";

interface HeroSectionImgProps {
    images: string[];
    title?: string;
    description?: string;
    expandBtnOnMobileView?: boolean;
    heroSectionHeight?: boolean;
    showEllipsePictureFrame?: boolean;
    autoPlayInterval?: number;
}

export default function HeroSectionImg({ 
    title, 
    description, 
    expandBtnOnMobileView = true, 
    images = [], 
    heroSectionHeight = false, 
    showEllipsePictureFrame = true,
    autoPlayInterval = 3000
}: HeroSectionImgProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [heroCurrentIndex, setHeroCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const heroCarouselRef = useRef<HTMLDivElement | null>(null);
    const autoPlayTimeoutRef = useRef<number | null>(null);

    // Auto-play for hero carousel
    useEffect(() => {
        if (images.length <= 1 || isPaused || isOpen) return;
        
        const playNext = () => {
            setHeroCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        };
        
        autoPlayTimeoutRef.current = window.setTimeout(playNext, autoPlayInterval);
        
        return () => {
            if (autoPlayTimeoutRef.current) {
                window.clearTimeout(autoPlayTimeoutRef.current);
            }
        };
    }, [heroCurrentIndex, images.length, autoPlayInterval, isPaused, isOpen]);

    // Handle ESC key
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "ArrowRight") handleNext();
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [currentIndex]);

    // Prevent background scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    // Reset index when opening/closing
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
            if (autoPlayTimeoutRef.current) {
                window.clearTimeout(autoPlayTimeoutRef.current);
            }
        } else {
            setIsPaused(false);
        }
    }, [isOpen]);

    // Touch swipe handlers for hero carousel
    const handleHeroTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const handleHeroTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleHeroTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;
        
        if (Math.abs(distance) < minSwipeDistance) {
            setIsPaused(false);
            return;
        }
        
        if (distance > 0) {
            // Swipe left - next image
            setHeroCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            // Swipe right - previous image
            setHeroCurrentIndex((prevIndex) => 
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
        }
        
        setIsPaused(false);
    };

    // Touch swipe handlers for overlay carousel
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

    // Navigation handlers for overlay
    const handlePrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    // Navigation handlers for hero carousel
    const handleHeroPrevious = () => {
        setHeroCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
    };

    const handleHeroNext = () => {
        setHeroCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
    };

    // Auto-scroll to current image in overlay
    useEffect(() => {
        if (carouselRef.current && isOpen) {
            const container = carouselRef.current;
            const imageWidth = container.clientWidth;
            container.scrollTo({
                left: currentIndex * imageWidth,
                behavior: 'smooth'
            });
        }
    }, [currentIndex, isOpen]);

    // Handle mouse events for hero carousel
    const handleHeroMouseEnter = () => {
        setIsPaused(true);
    };

    const handleHeroMouseLeave = () => {
        setIsPaused(false);
    };

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (autoPlayTimeoutRef.current) {
                window.clearTimeout(autoPlayTimeoutRef.current);
            }
        };
    }, []);


    return (
        <div className="relative">
            <div className={`${showEllipsePictureFrame ? 'flex' : 'hidden'} justify-end bottom-0  -mb-5 md:-md-15`}>
                <EllipsePictureFrame />
            </div>
            
            {/* HERO CARD WITH CAROUSEL */}
            <div 
                className="group relative rounded-2xl overflow-hidden"
                onMouseEnter={handleHeroMouseEnter}
                onMouseLeave={handleHeroMouseLeave}
            >
                {/* Hero Carousel Container */}
                <div 
                    ref={heroCarouselRef}
                    className={`relative overflow-hidden ${heroSectionHeight ? 'h-64 lg:h-[80vh]' : 'h-50  md:h-100 lg:h-125'}`}
                    onTouchStart={handleHeroTouchStart}
                    onTouchMove={handleHeroTouchMove}
                    onTouchEnd={handleHeroTouchEnd}
                >
                    {/* Hero Images with transition */}
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                i === heroCurrentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        >
                            <img
                                src={src}
                                alt={`hero - ${i}`}
                                className="w-full h-full object-cover"
                            />
                            
                            {/* Description overlay on every image - positioned absolutely */}
                            {description && (
                                <div className="absolute inset-0 z-20 hidden md:flex  items-end md:items-start p-4 md:p-6">
                                    <div className="font-[dmsans] w-full  md:max-w-100 md:rounded-xl md:ml-[2%] md:mt-auto md:mb-[4%] text-white md:w-[50%] md:p-5 md:backdrop-blur-md md:bg-[#195C8933] md:border border-[#BABABA] bg-linear-to-t from-black/80 via-black/50 to-transparent md:bg-none p-4 rounded-b-xl">
                                        <h3 className="mb-2 font-medium text-[1.2rem] md:text-[1.1rem] lg:text-[1.5rem]">{title}</h3>
                                        <p className="font-light text-[1rem] leading-6 md:text-[0.95rem] lg:text-[1.1rem]">{description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Hero Navigation buttons (only show if multiple images) */}
                    {images.length > 1 && (
                        <>

                            <button
                                onClick={handleHeroPrevious}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={handleHeroNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Hero Dot indicators - positioned above description on mobile */}
                            {/* <div className={`absolute left-1/2 -translate-x-1/2 z-30 flex gap-1 md:gap-2 ${
                                description ? 'bottom-16 md:bottom-2' : 'bottom-2'
                            }`}>
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToHeroSlide(i)}
                                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                                            i === heroCurrentIndex 
                                                ? 'bg-white scale-125' 
                                                : 'bg-white/50 hover:bg-white/80'
                                        }`}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div> */}
                        </>
                    )}
                </div>

                {/* Expand button */}
                <button
                    onClick={() => setIsOpen(true)}
                    className={`${expandBtnOnMobileView ? 'flex' : 'hidden md:flex'} items-center justify-center absolute bottom-4 right-4 bg-white px-2 py-3 rounded-full shadow-md hover:cursor-pointer hover:bg-[#ffffffc4] w-[30px] h-[30px] md:w-[50px] md:h-[50px] z-40`}
                    aria-label="Expand images"
                >
                    <img src={'/Expand.png'} width='50' height='50' alt='hero section image expand button' />
                </button>
            </div>

            {/* FULLSCREEN OVERLAY */}
            {isOpen && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-50 flex items-end md:items-start justify-center p-6 md:p-12"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* backdrop blur */}
                    <div
                        className="absolute inset-0 bg-[#0000003b] backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* panel */}
                    <div className="relative z-10 w-full max-w-6xl h-[80%] md:h-full flex flex-col">
                        {/* close button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="self-end mb-4 md:mb-6 flex items-center justify-center z-20 bg-white rounded-full px-3 py-2 shadow-md hover:cursor-pointer hover:bg-[#ffffffcb] w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
                            aria-label="Close gallery"
                        >
                            ✕
                        </button>

                        {/* Main carousel container */}
                        <div className="relative flex-1 w-full overflow-hidden rounded-xl">
                            {/* Navigation buttons */}
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                                aria-label="Previous image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all hover:scale-110"
                                aria-label="Next image"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                            {/* Image counter */}
                            <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                {currentIndex + 1} / {images.length}
                            </div>

                            {/* Scrollable images with touch support */}
                            <div
                                ref={carouselRef}
                                className="h-full w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex"
                                style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {images.map((src, i) => (
                                    <div
                                        key={i}
                                        className="flex shrink-0 w-full h-full snap-center items-center justify-center overflow-hidden relative"
                                    >
                                        <img
                                            src={src}
                                            alt={`Img - ${i}`}
                                            className="w-full h-full object-contain"
                                            draggable={false}
                                        />
                                        
                                        {/* Description in overlay - only if description exists */}
                                        {description && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4 md:p-6 text-white z-10">
                                                <div className="max-w-4xl mx-auto">
                                                    <h3 className="mb-2 font-medium text-lg md:text-xl">{title}</h3>
                                                    <p className="font-light text-sm md:text-base opacity-90">{description}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Dot indicators */}
                            {/* <div className={`absolute left-1/2 -translate-x-1/2 z-20 flex gap-2 ${
                                description ? 'bottom-20 md:bottom-4' : 'bottom-4'
                            }`}>
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${i === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}







