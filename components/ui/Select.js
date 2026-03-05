import React from "react";

export function Select({ label, error, className = "", options = [], ...props }) {
    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && <label className="text-sm font-medium text-foreground">{label}</label>}
            <div className="relative">
                <select
                    style={{ color: 'var(--foreground)', backgroundColor: 'var(--card)' }}
                    className={`appearance-none w-full border border-border rounded-xl px-4 py-3 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${error ? "border-red-500 focus:ring-red-500/50 focus:border-red-500" : ""
                        } ${className}`}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        </div>
    );
}

export default Select;
