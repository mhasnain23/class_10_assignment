


export const navMenu = [
    {
        text: "Home",
        path: "/",
    },
    {
        text: "Books",
        path: "/books",
    },
    {
        text: "About",
        path: "#",
    },
]

export const initialBooksFormData: {
    name: string;
    author: string;
    title: string;
    // isAvailable: boolean;
} = {
    name: "",
    author: "",
    title: "",
    // isAvailable: false || true,
}