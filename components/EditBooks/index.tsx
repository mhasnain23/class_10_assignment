"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface EditBooksProps {
  book: {
    _id: string;
    name: string;
    author: string;
    title: string;
    image: string;
    isAvailable: boolean;
  };
  onUpdate: () => void;
}

const EditBooks = ({ book, onUpdate }: EditBooksProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(book.image);
  const [editData, setEditData] = useState({
    name: book.name,
    author: book.author,
    title: book.title,
    image: book.image,
    isAvailable: book.isAvailable,
  });

  const formData = useMemo(
    () => ({
      name: book.name,
      author: book.author,
      title: book.title,
      image: book.image,
      isAvailable: book.isAvailable,
    }),
    [book]
  );

  useEffect(() => {
    setEditData(formData);
    setImagePreview(book.image);
  }, [formData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files) {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
          setEditData((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setEditData({
        ...editData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`/api/put-books?bookId=${book._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update book");
      }

      setOpen(false);
      onUpdate();
      window.dispatchEvent(new Event("bookUpdated"));
    } catch (error) {
      console.error("Error updating book:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="px-6 py-2 rounded-lg hover:text-white/60 transition-all ease-in duration-[0.2s]"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Book Name
            </label>
            <Input
              id="name"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="author" className="text-sm font-medium">
              Author
            </label>
            <Input
              id="author"
              name="author"
              value={editData.author}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={editData.title}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            {imagePreview && (
              <div className="relative w-full h-48">
                <Image
                  src={imagePreview}
                  alt="Book preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={editData.isAvailable}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="isAvailable" className="text-sm font-medium">
              Available in Stock
            </label>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="default" disabled={isLoading}>
              {isLoading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBooks;
