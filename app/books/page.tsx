import ListBooks from "@/components/ListBooks";

const BooksPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-start p-20 translate-y-10 px-0">
      <div className="flex flex-col gap-4 w-full items-center justify-center py-7">
        <h1 className="text-4xl font-bold tracking-tight text-black/90">
          Explore our books
        </h1>
        <hr className="lg:w-[1000px] border-gray-300 w-full h-[1px]" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <ListBooks />
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
