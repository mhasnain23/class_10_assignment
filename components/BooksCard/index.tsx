"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditBooks from "../EditBooks";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface Book {
  _id: string;
  name: string;
  author: string;
  title: string;
  image: string;
  isAvailable: boolean;
}

const BooksCard = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooksData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/get-books", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBooksData(data.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch books"
      );
      console.error("Failed to fetch books data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksData();

    const handleBookChange = () => {
      fetchBooksData();
    };

    window.addEventListener("bookAdded", handleBookChange);
    window.addEventListener("bookUpdated", handleBookChange);

    return () => {
      window.removeEventListener("bookAdded", handleBookChange);
      window.removeEventListener("bookUpdated", handleBookChange);
    };
  }, []);

  console.log(booksData, "booksData");

  const handleDelete = async (bookId: string) => {
    try {
      setIsDeleting(bookId);
      const response = await fetch(`/api/delete-books?bookId=${bookId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete book");
      }

      // Refresh the books list after successful deletion
      fetchBooksData();
    } catch (error) {
      console.error("Error deleting book:", error);
      setError(
        error instanceof Error ? error.message : "Failed to delete book"
      );
    } finally {
      setIsDeleting(null);
    }
  };

  console.log(booksData);

  return (
    <div className="w-full pt-4 translate-y-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
        {error && <p className="text-red-500 font-medium">{error}</p>}
        {booksData.length > 0 ? (
          booksData.map((book) => (
            <Card
              key={book._id}
              className="flex flex-col w-full hover:shadow-lg transition-all ease-in duration-[0.2s]"
            >
              <CardContent className="flex flex-col p-6">
                {/*book.image && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={book.image}
                      alt={book.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )*/}
                <CardHeader className="pb-4">
                  <h2 className="text-xl font-bold text-center capitalize">
                    book: {book.name}
                  </h2>
                </CardHeader>
                <CardTitle className="pb-3">
                  <h3 className="text-lg font-semibold capitalize">
                    author name: {book.author}
                  </h3>
                </CardTitle>
                <CardDescription className="pb-4">
                  <h3 className="text-[13px] font-semibold">
                    title: {book.title}
                  </h3>
                  <div
                    className={`mt-2 inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      book.isAvailable
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.isAvailable ? "In Stock" : "Out of Stock"}
                  </div>
                </CardDescription>
                <CardFooter className="flex justify-between pt-2">
                  <EditBooks book={book} onUpdate={fetchBooksData} />
                  <Button
                    onClick={() => handleDelete(book._id)}
                    disabled={isDeleting === book._id}
                    className="bg-red-600 hover:bg-red-700 hover:text-white/60 text-white/90 rounded-lg flex px-5 py-1.5 transition-all ease-in duration-[0.2s] disabled:bg-red-400"
                  >
                    {isDeleting === book._id ? "Deleting..." : "Delete"}
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-2xl font-bold text-black/90">
            {isLoading ? "Loading please wait..." : "No Book Available"}
          </p>
        )}
      </div>
    </div>
  );
};

export default BooksCard;
