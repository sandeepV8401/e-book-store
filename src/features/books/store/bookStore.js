import { create } from "zustand";
import axios from "axios";
import {booksData} from "../../books/data/books.js"

const useBookStore = create((set) => ({
    books: [],
    loading: false,

    fetchBooks: async () => {
        try {
            set({ loading: true });

            // const res = await axios.get("http://localhost:3000/books");

            // set({
            //     books: res.data,
            //     loading: false,
            // });

            set({
                books: booksData,
                loading: false,
            });
        } catch (error) {
            console.error(error);
            set({ loading: false });
        }
    },
}));

export default useBookStore;