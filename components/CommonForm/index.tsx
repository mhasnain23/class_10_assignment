"use client";

import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

const BookForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    name: "",
    image: "",
    isAvailable: true,
  });

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files?.[0]) {
      const file = files[0];

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        alert("File size should be less than 5MB");
        return;
      }

      // Use createObjectURL for better performance with large images
      setImagePreview(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setBookData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);

      // Cleanup
      return () => {
        URL.revokeObjectURL(imagePreview as string);
      };
    } else {
      setBookData({
        ...bookData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      setIsLoading(true);

      const response = await fetch("/api/post-books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        setBookData({
          title: "",
          author: "",
          name: "",
          image: "",
          isAvailable: true,
        });
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      // Dispatch custom event after successful book creation
      window.dispatchEvent(new Event("bookAdded"));
      //set loading state to off when form is submitted
      setIsLoading(false);
      // Optionally reset the form or handle success
      setBookData({
        title: "",
        author: "",
        name: "",
        image: "",
        isAvailable: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-[3rem] w-full translate-y-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-10 max-w-2xl mx-auto bg-gray-100 rounded-lg px-7 py-10"
      >
        {/* Image Preview */}
        <div className="w-full flex flex-col items-center gap-4">
          {imagePreview && (
            <div className="relative w-32 h-32">
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
        <div className="w-full">
          <input
            className="w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/40 text-[13px font-semibold"
            type="text"
            name="title"
            placeholder="Title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <input
            className="w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/40 text-[13px font-semibold"
            type="text"
            name="author"
            placeholder="Author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full">
          <input
            className="w-full border-none rounded-lg py-1 bg-gray-300 placeholder:text-black/40 text-[13px font-semibold"
            name="name"
            placeholder="Name"
            value={bookData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="checkbox"
            name="isAvailable"
            id="isAvailable"
            checked={bookData.isAvailable}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label
            htmlFor="isAvailable"
            className="text-sm font-medium text-black/80"
          >
            Book Available in Stock
          </label>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`${
            isLoading ? "bg-gray-400" : ""
          } bg-blue-600 text-white/80 text-[13px] font-semibold tracking-tight flex w-full justify-center px-6 py-1.5 rounded-lg hover:bg-blue-700 hover:text-white/50 transition-all ease-in duration-[0.2s]`}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
