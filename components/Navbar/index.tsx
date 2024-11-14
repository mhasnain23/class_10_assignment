"use client";

import { navMenu } from "@/utils";
import Link from "next/link";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowRight, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full font-sans relative">
      <nav className="flex items-center justify-between px-4 lg:px-24 h-[70px] bg-white/20 border-b border-gray-300 w-full backdrop-blur-[8px] fixed z-50">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="capitalize text-transparent bg-clip-text bg-gradient-to-br from-black to-white font-extrabold text-2xl lg:text-3xl tracking-tight">
            <Link href={"/"}>hasnain dev</Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          <ul className="flex items-center space-x-12">
            {navMenu.map((item, index) => (
              <Link key={index} href={item.path}>
                <li className="font-bold text-[14px] hover:scale-[1.08] transition-all ease-in duration-[0.2s]">
                  {item.text}
                </li>
              </Link>
            ))}
          </ul>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="default">
                Admin <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>
                <p>Are you sure to perform CRUD operations</p>
              </DialogTitle>
              <DialogFooter>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/admin");
                  }}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="default" size="icon">
                <MenuIcon className=" h-14 w-14" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {navMenu.map((item, index) => (
                  <SheetClose asChild key={index}>
                    <Link
                      href={item.path}
                      className="text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {item.text}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    onClick={() => router.push("/admin")}
                    className="w-full mt-4"
                  >
                    Admin
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
};

export default Header;
