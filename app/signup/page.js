"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to create account");
            }

            router.push("/dashboard");
            router.refresh(); // Force refresh to update navigation state
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="absolute top-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background"></div>

            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-2xl font-bold tracking-tight mb-2">
                            Book <span className="text-primary">Manager</span>
                        </h1>
                    </Link>
                    <p className="text-muted-foreground">Create an account to start logging books.</p>
                </div>

                <div className="glass-panel rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-primary"></div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <Input
                            label="Full Name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="At least 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />

                        <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
                            Create account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline transition-all">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
