"use client";

// import EditBooks from "@/components/EditBooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  name: string;
  author: string;
  title: string;
  image: string;
  isAvailable: boolean;
}

const ListBooks = () => {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooksData = async () => {
    try {
      setIsLoading(true);
      // setError(null);
      const res = await fetch("/api/get-books", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setBooksData(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Failed to fetch books", error);
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

  return (
    <>
      {booksData.length > 0 ? (
        booksData.map((book) => (
          <Card
            key={book._id}
            className="flex flex-col w-full hover:shadow-lg transition-all ease-in duration-[0.2s]"
          >
            <CardContent className="flex flex-col p-6">
              {book.image && (
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={book.image}
                    alt={book.name}
                    fill
                    priority
                    quality={100}
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <CardHeader className="pb-4">
                <h2 className="text-lg font-bold text-center capitalize">
                  book: {book.name}
                </h2>
              </CardHeader>
              <CardTitle className="pb-3">
                <h3 className="text-md font-semibold capitalize">
                  author name: {book.author}
                </h3>
              </CardTitle>
              <CardDescription className="pb-4">
                <h3 className="text-[12px] font-semibold">
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
              <CardFooter className="flex justify-end pt-2">
                <Button disabled={!book.isAvailable}>
                  <span className="flex items-center gap-1">
                    {book.isAvailable ? (
                      <>
                        <CheckIcon />
                        Add to Cart
                      </>
                    ) : (
                      <>
                        <X /> Add to Cart
                      </>
                    )}
                  </span>
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
    </>
  );
};

export default ListBooks;
