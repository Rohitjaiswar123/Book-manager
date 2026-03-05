import React, { forwardRef } from "react";

const Button = forwardRef(
    ({ className = "", variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

        const variants = {
            primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm focus:ring-primary",
            secondary: "bg-muted text-foreground hover:bg-muted/80 border border-border focus:ring-muted",
            ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted focus:ring-muted",
            danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm focus:ring-red-500",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs rounded-lg",
            default: "h-11 px-5 text-sm rounded-xl",
            lg: "h-14 px-8 text-base rounded-2xl",
            icon: "h-11 w-11 rounded-xl",
        };

        const spinnerStyle = "animate-spin -ml-1 mr-2 h-4 w-4 text-current";

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && (
                    <svg className={spinnerStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;
