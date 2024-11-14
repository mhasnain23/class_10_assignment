import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-200 to-white text-transparent bg-clip-text">
              Hasnain Dev
            </h3>
            <p className="text-gray-400 max-w-xs">
              Building digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-200">Connect</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/in/hasnain-h-993660334/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <LinkedinIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/mhasnain23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <GithubIcon className="h-6 w-6" />
              </Link>
              <Link
                href="codewithhasnain@gmail.com"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <MailIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://x.com/hasnaindev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                <TwitterIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Hasnain Dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
