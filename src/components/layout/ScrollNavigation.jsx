'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollNavigation() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollDown = () => {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    const scrollUp = () => {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onClick={scrollUp}
                        className="w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        aria-label="Scroll Up"
                    >
                        <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={scrollDown}
                className="w-10 h-10 md:w-12 md:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300"
                aria-label="Scroll Down"
            >
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>
        </div>
    );
}
