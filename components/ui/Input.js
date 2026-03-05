import React, { forwardRef } from "react";

const Input = forwardRef(({ className = "", label, error, ...props }, ref) => {
    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            <input
                ref={ref}
                style={{ color: 'var(--foreground)', backgroundColor: 'var(--card)', caretColor: 'var(--foreground)' }}
                className={`w-full border border-border rounded-xl px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""
                    } ${className}`}
                {...props}
            />
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
