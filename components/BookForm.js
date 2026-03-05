import React, { useState, useEffect } from "react";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Button from "./ui/Button";

export default function BookForm({ initialData, onSubmit, onCancel, isLoading }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        status: "Want to Read",
        tags: "",
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                author: initialData.author || "",
                status: initialData.status || "Want to Read",
                tags: initialData.tags ? initialData.tags.join(", ") : "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Parse tags to array
        const tagsArray = formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        onSubmit({
            ...formData,
            tags: tagsArray,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Title"
                name="title"
                placeholder="E.g. Deceptively Simple"
                value={formData.title}
                onChange={handleChange}
                required
                autoFocus
            />

            <Input
                label="Author"
                name="author"
                placeholder="E.g. Jane Doe"
                value={formData.author}
                onChange={handleChange}
                required
            />

            <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                    { value: "Want to Read", label: "Want to Read" },
                    { value: "Reading", label: "Reading" },
                    { value: "Completed", label: "Completed" },
                ]}
            />

            <Input
                label="Tags (Comma separated)"
                name="tags"
                placeholder="E.g. Fiction, Sci-Fi, Mind-bending"
                value={formData.tags}
                onChange={handleChange}
            />

            <div className="flex gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="flex-1"
                    isLoading={isLoading}
                >
                    {initialData ? "Save Changes" : "Add Book"}
                </Button>
            </div>
        </form>
    );
}
