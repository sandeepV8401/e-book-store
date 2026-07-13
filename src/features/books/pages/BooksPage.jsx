import { useEffect } from "react";
import BookCard from "../components/BookCard";
import "./BooksPage.css";
// import { books } from "../data/books.js";
import useBooks from "../hooks/useBooks.js";
import useCart from "../../cart/hooks/useCart.js";
import { useSearchParams } from "react-router-dom";

const BooksPage = () => {
  const { books, loading } = useBooks();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );
  if (loading) return <Loader />;
  return (
    <>
      {filteredBooks.length === 0 && search && (
        <div className="empty-search">
          <h3>No books found</h3>
          <p>
            No books found related to "<strong>{search}</strong>".
          </p>
        </div>
      )}
      <section className="books-page">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </section>
    </>
  );
};

export default BooksPage;
