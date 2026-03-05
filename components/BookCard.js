import React from "react";

const statusColors = {
    "Want to Read": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Reading: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};

export default function BookCard({ book, onEdit, onDelete }) {
    return (
        <div className="glass-panel rounded-2xl p-5 hover:shadow-lg transition-all group relative overflow-hidden flex flex-col h-full border border-border/50 hover:border-border">
            {/* Decorative gradient blob */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-3 gap-2">
                    <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-2">
                        {book.title}
                    </h3>
                    <span
                        className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap font-medium ${statusColors[book.status] || statusColors["Want to Read"]
                            }`}
                    >
                        {book.status}
                    </span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">By {book.author}</p>

                {book.tags && book.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {book.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border/50"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                <button
                    onClick={() => onEdit(book)}
                    className="flex-1 text-xs font-medium py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(book._id)}
                    className="flex-1 text-xs font-medium py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
