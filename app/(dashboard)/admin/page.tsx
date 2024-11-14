import BooksCard from "@/components/BooksCard";
import BookForm from "@/components/CommonForm";
import ErrorBoundary from "@/components/ErrorBoundary";

const AdminPage = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start relative">
            <div className="lg:sticky lg:top-20 h-fit">
              <BookForm />
            </div>
            <div className="w-full overflow-hidden">
              <BooksCard />
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminPage;
