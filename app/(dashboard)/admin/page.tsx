import BooksCard from "@/components/BooksCard";
import BookForm from "@/components/CommonForm";
import ErrorBoundary from "@/components/ErrorBoundary";

const AdminPage = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="lg:sticky lg:top-8">
              <BookForm />
            </div>
            <div className="w-full">
              <BooksCard />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminPage;
