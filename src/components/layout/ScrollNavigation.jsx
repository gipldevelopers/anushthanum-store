'use client';

import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollNavigation() {
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;

            // Show top button if scrolled down more than 300px
            setShowTop(scrollTop > 300);

            // Show bottom button if we are not near the bottom (allow 300px threshold)
            // Note: Use a small buffer to avoid flickering at the very bottom
            setShowBottom(scrollTop + winHeight < docHeight - 100);
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once to check initial state (e.g. if page is loaded scrolled down)
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 pointer-events-none">
            <AnimatePresence mode="popLayout">
                {showTop && (
                    <motion.button
                        key="top"
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        aria-label="Scroll to Top"
                    >
                        <ChevronUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.button>
                )}
                {showBottom && (
                    <motion.button
                        key="bottom"
                        initial={{ opacity: 0, y: -10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.8 }}
                        onClick={scrollToBottom}
                        className="pointer-events-auto w-10 h-10 md:w-12 md:h-12 bg-background/80 backdrop-blur-md border border-primary/20 rounded-full flex items-center justify-center text-primary shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                        aria-label="Scroll to Bottom"
                    >
                        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-0.5 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
