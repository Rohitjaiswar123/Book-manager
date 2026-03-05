"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import Modal from "@/components/ui/Modal";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filtering states
    const [statusFilter, setStatusFilter] = useState("All");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch("/api/auth/me");
            const data = await res.json();
            if (!data.user) {
                router.push("/login");
            } else {
                setUser(data.user);
            }
        } catch (err) {
            console.error("Failed to fetch user");
            router.push("/login");
        }
    }, [router]);

    const fetchBooks = useCallback(async () => {
        try {
            const url = statusFilter !== "All"
                ? `/api/books?status=${encodeURIComponent(statusFilter)}`
                : `/api/books`;

            const res = await fetch(url);
            const data = await res.json();
            if (res.ok) {
                setBooks(data.books || []);
            }
        } catch (err) {
            console.error("Failed to fetch books", err);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter]);

    // Initial load
    useEffect(() => {
        fetchUser();
        fetchBooks();
    }, [fetchUser, fetchBooks]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
    };

    const handleOpenModal = (book = null) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingBook(null);
    };

    const handleSaveBook = async (bookData) => {
        setIsSubmitting(true);
        try {
            const isEditing = !!editingBook;
            const url = isEditing ? `/api/books/${editingBook._id}` : `/api/books`;
            const method = isEditing ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save book");
            }

            await fetchBooks();
            handleCloseModal();
        } catch (err) {
            alert(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBook = async (id) => {
        if (!confirm("Are you sure you want to delete this book?")) return;

        try {
            const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete book");
            await fetchBooks();
        } catch (err) {
            alert(err.message);
        }
    };

    // Metrics
    const totalBooks = books.length;
    const readingBooks = books.filter(b => b.status === "Reading").length;
    const completedBooks = books.filter(b => b.status === "Completed").length;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground font-medium">Loading your collection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Navbar */}
            <header className="sticky top-0 z-30 glass-panel border-b border-border/50 rounded-none w-full">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight">
                        Book <span className="text-primary">Manager</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium hidden sm:inline-block">
                            {user?.name}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            Log out
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-2">Your Collection</h2>
                        <p className="text-muted-foreground">Manage and track your reading journey.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()} className="w-full sm:w-auto shadow-md shadow-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add Book
                    </Button>
                </div>

                {/* Insight Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="glass-panel p-6 rounded-2xl border border-border/50 text-center hover:bg-muted/50 transition-colors">
                        <p className="text-3xl font-bold text-foreground mb-1">{totalBooks}</p>
                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Books</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-center transition-colors">
                        <p className="text-3xl font-bold text-blue-500 mb-1">{readingBooks}</p>
                        <p className="text-sm font-medium text-blue-500/80 uppercase tracking-wider">Currently Reading</p>
                    </div>
                    <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center transition-colors">
                        <p className="text-3xl font-bold text-emerald-500 mb-1">{completedBooks}</p>
                        <p className="text-sm font-medium text-emerald-500/80 uppercase tracking-wider">Completed</p>
                    </div>
                </div>

                {/* Filtering */}
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 hide-scrollbar">
                    {["All", "Want to Read", "Reading", "Completed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${statusFilter === status
                                    ? "bg-foreground text-background shadow-md"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80 border border-border/50"
                                }`}
                        >
                            {status} {status !== "All" && `(${books.filter(b => b.status === status).length})`}
                        </button>
                    ))}
                </div>

                {/* Book Grid */}
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                book={book}
                                onEdit={() => handleOpenModal(book)}
                                onDelete={handleDeleteBook}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 glass-panel rounded-3xl border border-dashed border-border">
                        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2">No books found</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                            {statusFilter === "All"
                                ? "Your collection is empty. Start by adding a book you want to read!"
                                : `You don't have any books marked as '${statusFilter}'.`}
                        </p>
                        <Button onClick={() => handleOpenModal()} variant="secondary">
                            Add your first book
                        </Button>
                    </div>
                )}
            </main>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingBook ? "Edit Book" : "Add to Collection"}
            >
                <BookForm
                    initialData={editingBook}
                    onSubmit={handleSaveBook}
                    onCancel={handleCloseModal}
                    isLoading={isSubmitting}
                />
            </Modal>
        </div>
    );
}
