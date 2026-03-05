import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            <div className="glass-panel relative w-full mb-8 sm:mb-0 max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
}
