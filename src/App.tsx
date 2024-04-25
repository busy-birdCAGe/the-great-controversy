import { useState, useEffect } from "react";
import ParagraphComponent from "./Paragraph";
import book from "./assets/book.json";

interface Paragraph {
  paragraph: string;
  content: string
}

interface Chapter {
  section: string;
  paragraphs: Array<Paragraph>;
}

function App() {
  const [index, setIndex] = useState<number>(2);
  const [bookData, setBookData] = useState<Chapter | null>(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const newIndex = parseInt(query.get("index") || "", 10);
    if (!isNaN(newIndex) && newIndex >= 0 && newIndex <= book.length-1) {
      setIndex(newIndex);
    }

    if (book[index]) {
      setBookData(book[index]);
    }
  }, [index]);

  return (
    <>
      {bookData && bookData.paragraphs.map((paragraph: Paragraph) => {
        return <ParagraphComponent content={paragraph.content} />;
      })}
    </>
  );
}

export default App;
