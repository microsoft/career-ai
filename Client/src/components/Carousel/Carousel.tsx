import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Carousel.scss';

interface CarouselProps {
    images: string[];
    interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const slideTo = useCallback((index: number) => {
        const newIndex = index < 0 ? images.length - 1 : index % images.length;
        setCurrentIndex(newIndex);

        const track = carouselRef.current?.querySelector('.carousel-track') as HTMLDivElement | null;
        if (track) {
            track.style.transform = `translateX(${-newIndex * 100}%)`;
        }
    }, [images.length]);

    const prevSlide = useCallback(() => slideTo(currentIndex - 1), [currentIndex, slideTo]);
    const nextSlide = useCallback(() => slideTo(currentIndex + 1), [currentIndex, slideTo]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') prevSlide();
            if (event.key === 'ArrowRight') nextSlide();
        };

        const handleMouseEnter = () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };

        const handleMouseLeave = () => {
            if (!intervalRef.current) {
                intervalRef.current = setInterval(nextSlide, interval);
            }
        };

        const carouselElement = carouselRef.current;

        if (carouselElement) {
            carouselElement.addEventListener('keydown', handleKeyDown);
            carouselElement.addEventListener('mouseenter', handleMouseEnter);
            carouselElement.addEventListener('mouseleave', handleMouseLeave);
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (carouselElement) {
                carouselElement.removeEventListener('keydown', handleKeyDown);
                carouselElement.removeEventListener('mouseenter', handleMouseEnter);
                carouselElement.removeEventListener('mouseleave', handleMouseLeave);
            }
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [prevSlide, nextSlide, interval]); // Include interval, but remove currentIndex

    useEffect(() => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(nextSlide, interval);
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [interval, nextSlide]);

    return (
        <div className="carousel-wrapper">
            <button className="prev" onClick={prevSlide}>prev</button>
            <div className="carousel-container" ref={carouselRef} tabIndex={0}>
                <div className="carousel-track">
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`Slide ${index + 1}`}
                            style={{ width: '100%', transition: 'transform 0.5s ease-in-out' }}
                        />
                    ))}
                </div>
            </div>
            <button className="next" onClick={nextSlide}>next</button>
        </div>
    );
};