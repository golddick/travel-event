import { useState, useEffect, useRef, useCallback } from 'react';
import EllipsePictureFrame from './EllipsePictureFrame';

interface ServiceItemsProps {
    image: string[];
    title: string;
    description: string;
    autoPlayInterval?: number;
}

export default function ServiceItems({ 
    image: images, 
    title, 
    description, 
    autoPlayInterval = 3000 
}: ServiceItemsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    const autoPlayTimeoutRef = useRef<number | null>(null);

    // Auto-play for carousel
    useEffect(() => {
        if (images.length <= 1 || isPaused) return;
        
        const playNext = () => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        };
        
        autoPlayTimeoutRef.current = window.setTimeout(playNext, autoPlayInterval);
        
        return () => {
            if (autoPlayTimeoutRef.current) {
                window.clearTimeout(autoPlayTimeoutRef.current);
            }
        };
    }, [currentIndex, images.length, autoPlayInterval, isPaused]);

    // Touch swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;
        
        if (Math.abs(distance) < minSwipeDistance) {
            setIsPaused(false);
            return;
        }
        
        if (distance > 0) {
            // Swipe left - next image
            handleNext();
        } else {
            // Swipe right - previous image
            handlePrevious();
        }
        
        setIsPaused(false);
    };

    // Navigation handlers
    const handlePrevious = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000);
    }, [images.length]);

    // Handle mouse events
    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
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
        <div className='mb-7 md:mb-15 relative group'>
            <div className='flex justify-end'>
                <EllipsePictureFrame />
            </div>
            
            {/* Main container with relative positioning */}
            <div className="relative rounded-xl overflow-hidden">
                {/* Carousel Container */}
                <div 
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Images with fade transition */}
                    <div className="relative h-50  md:h-100 lg:h-125">
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                    i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                            >
                                <img 
                                    src={src} 
                                    alt={`${title} - Image ${i + 1}`} 
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ))}
                        
                        {/* Description overlay - positioned absolutely on top of images */}
                        <div className='absolute  hidden md:flex inset-0 z-20  items-end md:items-start p-4 md:p-6'>
                            <div className='font-[dmsans] w-full md:max-w-100 md:rounded-xl md:ml-[2%] md:mt-auto md:mb-[3%] text-white md:w-[50%] md:p-5 md:backdrop-blur-md md:bg-[#195C8933] md:border border-[#BABABA] bg-linear-to-t from-black/80 via-black/50 to-transparent md:bg-none p-4 rounded-b-xl'>
                                <h3 className='mb-2 font-medium text-[1.2rem] md:text-[1.1rem] lg:text-[1.5rem]'>{title}</h3>
                                <p className='font-light text-[1rem] leading-6 md:text-[0.95rem] lg:text-[1.1rem]'>{description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation buttons (only show if multiple images) */}
                    {images.length > 1 && (
                        <>
                            {/* Previous button */}
                            <button
                                onClick={handlePrevious}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Next button */}
                            <button
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}