import { useEffect } from "react";
import useBookStore from "../store/bookStore";

const useBooks = () => {
  const { books, loading, fetchBooks } = useBookStore();

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks();
    }
  }, [books.length, fetchBooks]);

  return {
    books,
    loading,
  };
};

export default useBooks;