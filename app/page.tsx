import BooksCard from "@/components/BooksCard";
import CommonForm from "@/components/CommonForm";


export default function Home() {


  return (
    <div className="w-full min-h-screen items-center">
      <div className="max-w-7xl mx-auto min-h-screen flex flex-col items-center gap-20">
        <CommonForm />
        <BooksCard />
      </div>
    </div>
  );
}
