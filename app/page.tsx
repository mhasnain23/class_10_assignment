import ListBooks from "@/components/ListBooks";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen items-center font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center justify-between gap-24 lg:py-24 p-0 translate-y-10">
        <div className="max-w-lg flex lg:order-none order-last">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Better your <br />
            <span>Knowledege Experince</span>
          </h1>
        </div>
        <div className="max-w-md max-h-min flex translate-y-24 lg:translate-y-0">
          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1669652639356-f5cb1a086976?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3MlMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="bg image"
            width={400}
            height={400}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20">
        <h1 className="text-4xl my-6 font-extrabold tracking-tight">
          Exlore our books
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          <ListBooks />
        </div>
      </div>
    </div>
  );
}
